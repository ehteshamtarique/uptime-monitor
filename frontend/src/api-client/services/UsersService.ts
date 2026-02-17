/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDTO } from '../models/UserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Me
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public getMeUserMeGet(): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/me',
        });
    }
    /**
     * Get All
     * @param limit
     * @param offset
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public getAllUserAllGet(
        limit: number = 1000,
        offset?: number,
    ): CancelablePromise<Array<UserDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/all',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Admin Only
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public getAdminOnlyUserAdminOnlyGet(): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/admin_only',
        });
    }
    /**
     * Get By Id
     * @param id
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public getByIdUserIdGet(
        id: number,
    ): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get By Email
     * @param email
     * @returns UserDTO Successful Response
     * @throws ApiError
     */
    public getByEmailUserEmailEmailGet(
        email: string,
    ): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/email/{email}',
            path: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
