from app.models.db import MonitorDb
from app.core.db_context import session_maker


def add(monitor: MonitorDb) -> MonitorDb:
    with session_maker.begin() as session:
        session.add(monitor)
        session.flush() # To get the ID of the new monitor
        return monitor

def get_all(user_id: int, limit: int = 1000, offset: int = 0) -> list[MonitorDb]:
    with session_maker() as session:
        return session.query(MonitorDb).filter_by(user_id=user_id).limit(limit).offset(offset).all()

def get_by_id(id: int, user_id: int) -> MonitorDb | None:
    with session_maker() as session:
        return session.query(MonitorDb).filter_by(id=id, user_id=user_id).first()

def update(monitor: MonitorDb) -> None:
    with session_maker.begin() as session:
        session.merge(monitor)

def delete(id: int, user_id: int) -> None:
    with session_maker.begin() as session:
        session.query(MonitorDb).filter_by(id=id, user_id=user_id).delete()