/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonitorType } from './MonitorType';
export type MonitorCreateDTO = {
    name: string;
    url: string;
    monitor_type: MonitorType;
    interval?: number;
    timeout?: number;
};

