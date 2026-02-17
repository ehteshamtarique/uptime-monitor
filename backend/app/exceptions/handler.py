from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse

from app.exceptions.scheme import AppException


def add_json(app: FastAPI):
    @app.exception_handler(AppException)
    async def exception_handler(request: Request, exc: AppException):
        """
        Handle exceptions and return a JSON response.
        :param request: FastAPI request object
        :param exc: Exception object
        :return: JSON response with error details
        """
        return JSONResponse(
            {
                "message": exc.message,
            },
            status_code=exc.status_code,
        )