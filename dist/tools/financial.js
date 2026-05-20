/**
 * Impact.com Financial tools - invoices and contracts.
 */
import { z } from "zod";
export function registerFinancialTools(server, client) {
    server.tool("list_invoices", "List all invoices in your Impact account", {}, async () => {
        const data = await client.request("/Invoices");
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("get_invoice", "Get details for a specific invoice", {
        invoiceId: z.string().describe("The invoice ID"),
    }, async ({ invoiceId }) => {
        const data = await client.request(`/Invoices/${invoiceId}`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("list_contracts", "List all partner contracts", {}, async () => {
        const data = await client.request("/Contracts");
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("get_contract", "Get details for a specific contract", {
        contractId: z.string().describe("The contract ID"),
    }, async ({ contractId }) => {
        const data = await client.request(`/Contracts/${contractId}`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
}
//# sourceMappingURL=financial.js.map