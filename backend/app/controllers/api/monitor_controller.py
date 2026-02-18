from typing import List
from fastapi import APIRouter
from fastapi import status
from fastapi import Response
from fastapi import Depends
from app.models import dto
from app.services import monitor_service
from app.core import dependencies

router = APIRouter(
    prefix="/monitor",
    tags=["Monitors"]
)

@router.post("", status_code=status.HTTP_201_CREATED, response_model=dto.MonitorDTO)
def create_monitor(
    monitor_create_dto: dto.MonitorCreateDTO,
    user_id: int = 1  # Temporarily set a default user_id for unauthenticated access
):
    return monitor_service.create_monitor(user_id, monitor_create_dto)

@router.get("/all", status_code=status.HTTP_200_OK, response_model=List[dto.MonitorDTO])
def get_all_monitors(
    user_id: int = 1  # Temporarily set a default user_id for unauthenticated access
):
    return monitor_service.get_all_monitors(user_id)

@router.get("/{monitor_id}", status_code=status.HTTP_200_OK, response_model=dto.MonitorDTO)
def get_monitor_by_id(
    monitor_id: int,
    user_id: int = 1  # Temporarily set a default user_id for unauthenticated access
):
    return monitor_service.get_monitor_by_id(monitor_id, user_id)

@router.delete("/{monitor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_monitor(
    monitor_id: int,
    user_id: int = 1  # Temporarily set a default user_id for unauthenticated access
):
    monitor_service.delete_monitor(monitor_id, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
