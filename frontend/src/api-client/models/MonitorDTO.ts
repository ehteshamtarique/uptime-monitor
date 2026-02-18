/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonitorStatus } from './MonitorStatus';
import type { MonitorType } from './MonitorType';
export type MonitorDTO = {
    id: number;
    user_id: number;
    name: string;
    url: string;
    monitor_type: MonitorType;
    status: MonitorStatus;
    interval: number;
    timeout: number;
    updated_at: string;
    created_at: string;
};

