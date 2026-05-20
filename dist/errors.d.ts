/**
 * MCP-compatible error formatting.
 * Returns { content, isError } so the AI client sees the error message
 * without the SDK throwing an opaque exception.
 */
export interface ToolResult {
    content: Array<{
        type: "text";
        text: string;
    }>;
    isError?: boolean;
}
export declare function formatError(error: unknown): ToolResult;
export declare function withErrorHandling<T extends readonly unknown[]>(fn: (...args: T) => Promise<ToolResult>): (...args: T) => Promise<ToolResult>;
//# sourceMappingURL=errors.d.ts.map