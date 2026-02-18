/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonitorCreateDTO } from '../models/MonitorCreateDTO';
import type { MonitorDTO } from '../models/MonitorDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MonitorsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create Monitor
     * @param requestBody
     * @param userId
     * @returns MonitorDTO Successful Response
     * @throws ApiError
     */
    public createMonitorMonitorPost(
        requestBody: MonitorCreateDTO,
        userId: number = 1,
    ): CancelablePromise<MonitorDTO> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/monitor',
            query: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get All Monitors
     * @param userId
     * @returns MonitorDTO Successful Response
     * @throws ApiError
     */
    public getAllMonitorsMonitorAllGet(
        userId: number = 1,
    ): CancelablePromise<Array<MonitorDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/monitor/all',
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Monitor By Id
     * @param monitorId
     * @param userId
     * @returns MonitorDTO Successful Response
     * @throws ApiError
     */
    public getMonitorByIdMonitorMonitorIdGet(
        monitorId: number,
        userId: number = 1,
    ): CancelablePromise<MonitorDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/monitor/{monitor_id}',
            path: {
                'monitor_id': monitorId,
            },
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Monitor
     * @param monitorId
     * @param userId
     * @returns void
     * @throws ApiError
     */
    public deleteMonitorMonitorMonitorIdDelete(
        monitorId: number,
        userId: number = 1,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/monitor/{monitor_id}',
            path: {
                'monitor_id': monitorId,
            },
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
