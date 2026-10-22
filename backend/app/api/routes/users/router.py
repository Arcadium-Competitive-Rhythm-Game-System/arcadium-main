from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select, func

from app.api.dependencies import CurrentUser, DbSession
from app.services.match import get_standing, get_active_match_by_userid, SEARCH_WINDOW_START
from app.services.user import (
    get_user_by_id, 
    get_num_double_a, 
    get_rank_on_ladder, 
    get_last_played_on_ladder, 
    get_rating_series, 
    get_table_winrates,
    get_latest_matches,
    get_activity,
    get_lamps
    )
from app.services.rating import get_player_rating
from app.logic.ratings import ELO_FLOOR, find_rating_for_filter
from app.models import ChartTableLevel, ChartRating

from app.schemas.match import MatchOut
from app.schemas.auth import UserRatingOut
from app.schemas.user import UserProfileInfoOut, ProfileGenericOut, BMSProfileOut, LadderStatsOut


router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me/ratings", response_model=list[UserRatingOut])
def get_user_ratings(db: DbSession, user: CurrentUser):
    results = []
    
    for rating in user.ratings:
        rank, total, wins, losses = get_standing(db, rating, user.id)

        results.append({
            "game": rating.game,
            "playtype": rating.playtype,
            "ladder": rating.ladder,
            "display_rating": rating.display_rating,
            "placed": rating.placed,
            "games_played": rating.games_played,
            "selected_tables": rating.selected_tables,
            "rank": rank,
            "total": total,
            "wins": wins,
            "losses": losses
        })

    return results

@router.get("/me/ratings/{game}/{playtype}/{ladder}", response_model=UserRatingOut)
def get_user_rating_filtered(game: str, playtype: str, ladder: str, db: DbSession, user: CurrentUser):
    
    for rating in user.ratings:

        if rating.game == game and rating.playtype == playtype and rating.ladder == ladder:
            rank, total, wins, losses = get_standing(db, rating, user.id)

            return {
                "game": rating.game,
                "playtype": rating.playtype,
                "ladder": rating.ladder,
                "display_rating": rating.display_rating,
                "placed": rating.placed,
                "games_played": rating.games_played,
                "selected_tables": rating.selected_tables,
                "rank": rank,
                "total": total,
                "wins": wins,
                "losses": losses
            }



@router.get("/me/can-queue")
def can_queue(user: CurrentUser):
    able = False

    if user.tachi_api_key != "" and user.tachi_api_key:
        able = True

    return {
        "can_queue": able
    }

@router.get("/me/active-match", response_model=MatchOut | None)
def get_user_active_match(db: DbSession, user: CurrentUser):
    return get_active_match_by_userid(db, user.id)

@router.get("/me/get_table_search_counts/{game}/{playtype}/{ladder}", response_model=dict[str, int])
def get_table_search_counts(db: DbSession, user: CurrentUser, game: str, playtype: str, ladder: str):
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "You are not logged in!")

    rating = find_rating_for_filter(user.ratings, game, playtype, ladder)

    low = max(ELO_FLOOR, rating["display_rating"] - SEARCH_WINDOW_START)
    high = rating["display_rating"] + SEARCH_WINDOW_START

    search = (
        select(
        ChartTableLevel.table_icon,
        func.count(func.distinct(ChartTableLevel.chart_id)).label("count"),
    
        )
        .join(ChartRating, ChartRating.chart_id == ChartTableLevel.chart_id)
        .where(
            ChartRating.ladder == ladder,
            ChartRating.rating.between(low, high),
        )
        .group_by(ChartTableLevel.table_icon)
    )

    rows = db.execute(search).all()

    return {r.table_icon: r.count for r in rows}

@router.get("/profile/{id}/{game}/{playtype}/{ladder}", response_model=UserProfileInfoOut, status_code=200)
def get_profile_info(db: DbSession, id: int, game: str, playtype: str, ladder: str):
    user = get_user_by_id(db, id)

    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User doesn't exist!")

    if len(user.ratings) == 0:
        raise HTTPException(status.HTTP_409_CONFLICT, "User doesn't have any ratings!")

    player_rating = get_player_rating(db, user.id, game, playtype, ladder)

    if player_rating is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not have a rating on this ladder!")

    num_aa = 0

    if game == "bms":
        num_aa = get_num_double_a(db, user.id, playtype, ladder)

    profile_generic = ProfileGenericOut(display_name=user.display_name, join_date=user.created_at)

    rank, total = get_rank_on_ladder(db, player_rating)
    last_played = get_last_played_on_ladder(db, user.id, game, playtype, ladder);
    rating_series = get_rating_series(db, user.id, game, playtype, ladder)
    table_winrate = get_table_winrates(db, user.id, game, playtype, ladder)
    latest_matches = get_latest_matches(db, user.id, game, playtype, ladder)
    activity = get_activity(db, user.id, game, playtype, ladder)
    lamp_counts = get_lamps(db, user.id, game, playtype, ladder)

    ladder_stats = LadderStatsOut(rating_series=rating_series, matches=latest_matches, activity=activity, lamp_counts=lamp_counts)

    return UserProfileInfoOut(
        generic=profile_generic,
        ratings=user.ratings,
        ladder_stats=ladder_stats,
        rating_rank=rank,
        rating_total=total,
        last_played=last_played,
        bms=BMSProfileOut(num_aa=num_aa, table_winrate=table_winrate)
    )