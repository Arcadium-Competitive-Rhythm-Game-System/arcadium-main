from app.models import PlayerRating

LADDER_SEED_OFFSET = {"ec": 150, "hc": 300}
ELO_FLOOR = 100

def seed_rd(num_scores: int | None) -> float:
    if not num_scores:
        return 300.0
    if num_scores < 50:
        return 250.0
    if num_scores < 300:
        return 200.0
    if num_scores < 1000:
        return 160.0
    return 130.0

def initial_rating(seed: dict | None, ladder: str) -> tuple[float, float]:
    elo = seed["elo"] if seed else ELO_FLOOR
    elo = max(ELO_FLOOR, elo - LADDER_SEED_OFFSET.get(ladder, 0))
    rd = seed_rd(seed["numScores"] if seed else None)
    return elo, rd

def find_rating_for_filter(ratings: list[PlayerRating], game: str, playtype: str, ladder: str) -> PlayerRating:
    for rating in ratings:

        if rating.game == game and rating.playtype == playtype and rating.ladder == ladder:

            return {
                "game": rating.game,
                "playtype": rating.playtype,
                "ladder": rating.ladder,
                "display_rating": rating.display_rating,
                "placed": rating.placed,
                "games_played": rating.games_played,
            }

    return None