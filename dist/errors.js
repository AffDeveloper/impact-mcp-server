/**
 * MCP-compatible error formatting.
 * Returns { content, isError } so the AI client sees the error message
 * without the SDK throwing an opaque exception.
 */
import { ImpactApiError, RateLimitError } from "./client.js";
export function formatError(error) {
    if (error instanceof RateLimitError) {
        return {
            content: [
                {
                    type: "text",
                    text: `Rate limited by Impact.com API. Retry after ${error.retryAfterSeconds} seconds.`,
                },
            ],
            isError: true,
        };
    }
    if (error instanceof ImpactApiError) {
        return {
            content: [
                {
                    type: "text",
                    text: `Impact API error (${error.status}): ${error.message}\n${error.body}`,
                },
            ],
            isError: true,
        };
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return {
        content: [{ type: "text", text: message }],
        isError: true,
    };
}
export function withErrorHandling(fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        }
        catch (error) {
            return formatError(error);
        }
    };
}
//# sourceMappingURL=errors.js.map