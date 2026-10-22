from datetime import datetime, date
from pydantic import BaseModel, ConfigDict

from app.schemas.match import MatchOut

class ProfileGenericOut(BaseModel):
    display_name: str
    join_date: datetime

class ProfilePlayerRatingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    game: str
    playtype: str
    ladder: str
    display_rating: float
    placed: bool
    games_played: int
    wins: int
    peak_rating: float

class TableWinrateOut(BaseModel):
    table_icon: str
    games: int
    wins: int

class RatingPointOut(BaseModel):
    date: date
    rating: float

class LadderStatsOut(BaseModel):
    rating_series: list[RatingPointOut]
    matches: list[MatchOut]
    activity: dict[str, int]
    lamp_counts: dict[str, int]

class BMSProfileOut(BaseModel):
    num_aa: int
    table_winrate: list[TableWinrateOut]

# Eventually put rating_rank and rating_total within ratings somehow.
class UserProfileInfoOut(BaseModel):
    generic: ProfileGenericOut
    ratings: list[ProfilePlayerRatingOut]
    ladder_stats: LadderStatsOut
    rating_rank: int
    rating_total: int
    last_played: datetime | None
    bms: BMSProfileOut | None