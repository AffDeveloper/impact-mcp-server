/**
 * Impact.com API client with Basic Auth and rate limit handling.
 */
export interface ImpactConfig {
    readonly accountSid: string;
    readonly authToken: string;
    readonly baseUrl?: string;
}
export interface PaginatedResponse<T> {
    readonly items: readonly T[];
    readonly totalCount: number;
    readonly pageSize: number;
    readonly page: number;
}
export declare class ImpactApiError extends Error {
    readonly status: number;
    readonly body: string;
    constructor(message: string, status: number, body: string);
}
export declare class RateLimitError extends ImpactApiError {
    readonly retryAfterSeconds: number;
    constructor(retryAfterSeconds: number, body: string);
}
export declare function createClient(config: ImpactConfig): {
    request: <T>(path: string, options?: {
        readonly method?: string;
        readonly params?: Record<string, string | undefined>;
        readonly body?: Record<string, unknown>;
    }) => Promise<T>;
};
export type ImpactClient = ReturnType<typeof createClient>;
//# sourceMappingURL=client.d.ts.map