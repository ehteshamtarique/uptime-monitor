from fastapi import FastAPI

from app.core import lifespan
from app.controllers.api import auth_controller
from app.controllers.api import user_controller
from app.controllers.api import monitor_controller # Import the new monitor controller

from app.core.middlewares import cors_middleware
from app.exceptions import handler

# Main application instance
app = FastAPI()

# API sub-application instance
api = FastAPI(lifespan=lifespan.lifespan) # api for json

# custom exception handlers
handler.add_json(api)

# add middlewares
cors_middleware.add(api)

# include api routers
api.include_router(auth_controller.router)
api.include_router(user_controller.router)
api.include_router(monitor_controller.router) # Include the new monitor router

# mount api app
app.mount("/api", api)

