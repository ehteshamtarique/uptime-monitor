from datetime import datetime

from pydantic import BaseModel
from pydantic import Field

from app.models.enums import UserRole
from app.models.enums import MonitorType
from app.models.enums import MonitorStatus

# USER
class UserCreateDTO(BaseModel):
    name: str
    surname: str
    email: str
    password: str = Field(..., min_length=4) # For 1 big letter, 1 small letter, 1 number, 1 special character and min 8 characters: pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

class UserDTO(BaseModel):
    id: int
    name: str
    surname: str
    role: UserRole
    email: str
    updated_at: datetime
    created_at: datetime

class UserUpdateNameDTO(BaseModel):
    name: str
    surname: str

class UserLoginDTO(BaseModel):
    email: str
    password: str

class UserUpdatePassDTO(BaseModel):
    old_password: str = Field(..., min_length=4)
    new_password: str = Field(..., min_length=4)

# Token
class Token(BaseModel):
    user_id: int
    role: str

# Monitor
class MonitorCreateDTO(BaseModel):
    name: str
    url: str
    monitor_type: MonitorType
    interval: int = Field(default=60, gt=0)
    timeout: int = Field(default=5, gt=0)

class MonitorDTO(BaseModel):
    id: int
    user_id: int
    name: str
    url: str
    monitor_type: MonitorType
    status: MonitorStatus
    interval: int
    timeout: int
    updated_at: datetime
    created_at: datetime
