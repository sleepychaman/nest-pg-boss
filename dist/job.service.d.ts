import { FactoryProvider } from "@nestjs/common";
import * as PGBoss from "pg-boss";
export declare class JobService<JobData extends object> {
    readonly name: string;
    readonly pgBoss: PGBoss;
    constructor(name: string, pgBoss: PGBoss);
    send(data: JobData, options: PGBoss.SendOptions): Promise<string | null>;
    sendAfter(data: JobData, options: PGBoss.SendOptions, date: Date | string | number): Promise<string | null>;
    sendOnce(data: JobData, options: PGBoss.SendOptions, key: string): Promise<string | null>;
    sendSingleton(data: JobData, options: PGBoss.SendOptions): Promise<string | null>;
    sendThrottled(data: JobData, options: PGBoss.SendOptions, seconds: number, key?: string): Promise<string | null>;
    sendDebounced(data: JobData, options: PGBoss.SendOptions, seconds: number, key?: string): Promise<string | null>;
    insert(jobs: Omit<PGBoss.JobInsert<JobData>, "name">[]): Promise<any>;
    schedule(cron: string, data: JobData, options: PGBoss.ScheduleOptions): Promise<void>;
    unschedule(): Promise<void>;
}
export interface WorkHandler<ReqData> {
    (job?: PGBoss.Job<ReqData>): Promise<void>;
}
export interface WorkHandlerBatch<ReqData> {
    (jobs?: PGBoss.Job<ReqData>[]): Promise<void>;
}
interface MethodDecorator<PropertyType> {
    <Class>(target: Class, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<PropertyType>): TypedPropertyDescriptor<PropertyType>;
}
interface HandleDecorator<JobData extends object> {
    <Options extends PGBoss.WorkOptions>(options?: Options): MethodDecorator<Options extends {
        batchSize: number;
    } ? WorkHandlerBatch<JobData> : WorkHandler<JobData>>;
}
export interface Job<JobData extends object = any> {
    ServiceProvider: FactoryProvider<JobService<JobData>>;
    Inject: () => ParameterDecorator;
    Handle: HandleDecorator<JobData>;
}
export declare const createJob: <JobData extends object>(name: string) => Job<JobData>;
export {};
