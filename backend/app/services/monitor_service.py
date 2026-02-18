from app.models import db
from app.models import dto
from app.models import enums
from app.repos import monitor_repo
from app.exceptions.scheme import AppException

from app.mappers import user_mapper # Assuming we might need user info later, though not directly for monitor creation


def create_monitor(user_id: int, obj: dto.MonitorCreateDTO) -> dto.MonitorDTO:
    monitor_db = db.MonitorDb(
        user_id=user_id,
        name=obj.name,
        url=obj.url,
        monitor_type=obj.monitor_type,
        interval=obj.interval,
        timeout=obj.timeout,
        status=enums.MonitorStatus.PENDING # Default status when created
    )
    new_monitor = monitor_repo.add(monitor_db)
    return _db_to_dto(new_monitor)

def get_all_monitors(user_id: int, limit: int = 1000, offset: int = 0) -> list[dto.MonitorDTO]:
    monitors = monitor_repo.get_all(user_id, limit, offset)
    return [_db_to_dto(monitor) for monitor in monitors]

def get_monitor_by_id(id: int, user_id: int) -> dto.MonitorDTO:
    monitor = monitor_repo.get_by_id(id, user_id)
    if monitor is None:
        raise AppException(message="Monitor not found", status_code=404)
    return _db_to_dto(monitor)

def delete_monitor(id: int, user_id: int) -> None:
    monitor_repo.delete(id, user_id)

def _db_to_dto(monitor_db: db.MonitorDb) -> dto.MonitorDTO:
    return dto.MonitorDTO(
        id=monitor_db.id,
        user_id=monitor_db.user_id,
        name=monitor_db.name,
        url=monitor_db.url,
        monitor_type=monitor_db.monitor_type,
        status=monitor_db.status,
        interval=monitor_db.interval,
        timeout=monitor_db.timeout,
        updated_at=monitor_db.updated_at,
        created_at=monitor_db.created_at
    )
