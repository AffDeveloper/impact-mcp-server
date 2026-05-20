/**
 * Impact.com Deals & Promo Codes tools.
 */
import { z } from "zod";
export function registerDealTools(server, client) {
    server.tool("list_deals", "List all deals/offers available to partners", {}, async () => {
        const data = await client.request("/Deals");
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("get_deal", "Get details for a specific deal", {
        dealId: z.string().describe("The deal ID"),
    }, async ({ dealId }) => {
        const data = await client.request(`/Deals/${dealId}`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("create_deal", "Create a new deal/offer for partners", {
        name: z.string().describe("Deal name"),
        description: z.string().optional().describe("Deal description"),
        campaignId: z.string().describe("Campaign ID"),
        startDate: z.string().optional().describe("Start date (YYYY-MM-DD)"),
        endDate: z.string().optional().describe("End date (YYYY-MM-DD)"),
        dealType: z.string().optional().describe("Deal type"),
    }, async (params) => {
        const data = await client.request("/Deals", {
            method: "POST",
            body: {
                Name: params.name,
                Description: params.description,
                CampaignId: params.campaignId,
                StartDate: params.startDate,
                EndDate: params.endDate,
                DealType: params.dealType,
            },
        });
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("list_promo_codes", "List all promo codes", {}, async () => {
        const data = await client.request("/PromoCodes");
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("create_promo_code", "Create a new promo code and optionally assign to a partner", {
        code: z.string().describe("The promo code string"),
        campaignId: z.string().describe("Campaign ID"),
        assignedPartnerId: z
            .string()
            .optional()
            .describe("Partner ID to assign this code to"),
        creditPolicy: z
            .enum(["ALWAYS", "INVOLVED", "WINNER"])
            .optional()
            .describe("When the partner gets credit"),
        startDate: z.string().optional().describe("Start date (YYYY-MM-DD)"),
        endDate: z.string().optional().describe("End date (YYYY-MM-DD)"),
        dealId: z.string().optional().describe("Associated deal ID"),
    }, async (params) => {
        const data = await client.request("/PromoCodes", {
            method: "POST",
            body: {
                Code: params.code,
                CampaignId: params.campaignId,
                AssignedPartnerId: params.assignedPartnerId,
                CreditPolicy: params.creditPolicy,
                StartDate: params.startDate,
                EndDate: params.endDate,
                DealId: params.dealId,
            },
        });
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
}
//# sourceMappingURL=deals.js.map