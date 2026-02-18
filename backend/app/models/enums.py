from enum import StrEnum


class UserRole(StrEnum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"


class MonitorType(StrEnum):
    HTTP = "HTTP(s)"
    TCP = "TCP"
    PING = "Ping"
    DNS = "DNS"
    DOCKER = "Docker"
    PUSH = "Push"


class MonitorStatus(StrEnum):
    UP = "up"
    DOWN = "down"
    PENDING = "pending"
    MAINTENANCE = "maintenance"