export interface ErisResult<T> {
    readonly code?: number | undefined;
    readonly msg: string;
    readonly data: T;
}
