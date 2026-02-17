/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Token } from '../models/Token';
import type { UserCreateDTO } from '../models/UserCreateDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserLoginDTO } from '../models/UserLoginDTO';
import type { UserUpdatePassDTO } from '../models/UserUpdatePassDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Register
     * @param requestBody
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public registerAuthRegisterPost(
        requestBody: UserCreateDTO,
    ): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login
     * @param requestBody
     * @returns string Successful Response
     * @throws ApiError
     */
    public loginAuthLoginPost(
        requestBody: UserLoginDTO,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Logout
     * @returns void
     * @throws ApiError
     */
    public logoutAuthLogoutGet(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/logout',
        });
    }
    /**
     * Check Session
     * @returns Token Successful Response
     * @throws ApiError
     */
    public checkSessionAuthValidateGet(): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/validate',
        });
    }
    /**
     * Update Password
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updatePasswordAuthPasswordUpdatePut(
        requestBody: UserUpdatePassDTO,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/auth/password/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Reset Password
     * @param email
     * @returns void
     * @throws ApiError
     */
    public resetPasswordAuthPasswordResetPost(
        email: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/password/reset',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
