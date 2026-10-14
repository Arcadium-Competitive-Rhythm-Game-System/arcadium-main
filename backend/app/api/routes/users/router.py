from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select, func

from app.api.dependencies import CurrentUser, DbSession
from app.services.match import get_standing, get_active_match_by_userid, SEARCH_WINDOW_START
from app.logic.ratings import ELO_FLOOR, find_rating_for_filter
from app.models import ChartTableLevel, ChartRating

from app.schemas.match import MatchOut
from app.schemas.chart import TableSearchOut
from app.schemas.auth import UserRatingOut


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