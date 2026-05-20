/**
 * Impact.com API client with Basic Auth and rate limit handling.
 */
export class ImpactApiError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
        this.name = "ImpactApiError";
    }
}
export class RateLimitError extends ImpactApiError {
    retryAfterSeconds;
    constructor(retryAfterSeconds, body) {
        super(`Rate limited. Retry after ${retryAfterSeconds} seconds.`, 429, body);
        this.retryAfterSeconds = retryAfterSeconds;
        this.name = "RateLimitError";
    }
}
export function createClient(config) {
    const baseUrl = config.baseUrl ?? "https://api.impact.com";
    const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64");
    async function request(path, options = {}) {
        const method = options.method ?? "GET";
        const url = new URL(`/Advertisers/${config.accountSid}${path}`, baseUrl);
        if (options.params) {
            for (const [key, value] of Object.entries(options.params)) {
                if (value !== undefined) {
                    url.searchParams.set(key, value);
                }
            }
        }
        const headers = {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
        };
        const fetchOptions = { method, headers };
        if (options.body) {
            headers["Content-Type"] = "application/json";
            fetchOptions.body = JSON.stringify(options.body);
        }
        const response = await fetch(url.toString(), fetchOptions);
        if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get("X-RateLimit-Reset") ?? "60", 10);
            throw new RateLimitError(retryAfter, await response.text());
        }
        if (!response.ok) {
            const body = await response.text();
            throw new ImpactApiError(`Impact API error: ${response.status} ${response.statusText}`, response.status, body);
        }
        if (response.status === 204) {
            return {};
        }
        return response.json();
    }
    return { request };
}
//# sourceMappingURL=client.js.map