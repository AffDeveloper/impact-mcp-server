/**
 * Impact.com Media Partners tools.
 */
import { z } from "zod";
export function registerPartnerTools(server, client) {
    server.tool("list_partners", "List all media partners (affiliates) with filtering by campaign, status, country, and group", {
        campaignId: z.string().optional().describe("Filter by campaign ID"),
        state: z
            .enum(["ACTIVE", "PENDING", "DECLINED", "SUSPENDED", "DEACTIVATED"])
            .optional()
            .describe("Filter by partner status"),
        country: z.string().optional().describe("Filter by country code (e.g. US)"),
        groupId: z.string().optional().describe("Filter by partner group ID"),
        page: z.number().optional().describe("Page number"),
        pageSize: z.number().optional().describe("Results per page"),
    }, async (params) => {
        const data = await client.request("/MediaPartners", {
            params: {
                CampaignId: params.campaignId,
                State: params.state,
                Country: params.country,
                GroupId: params.groupId,
                Page: params.page?.toString(),
                PageSize: params.pageSize?.toString(),
            },
        });
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("get_partner", "Get details for a specific media partner/affiliate", {
        partnerId: z.string().describe("The media partner ID"),
    }, async ({ partnerId }) => {
        const data = await client.request(`/MediaPartners/${partnerId}`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("list_partner_groups", "List partner groups within a campaign", {
        campaignId: z.string().describe("The campaign ID"),
    }, async ({ campaignId }) => {
        const data = await client.request(`/Campaigns/${campaignId}/MediaPartnerGroups`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("list_contacts", "List contacts for a campaign's partners", {
        campaignId: z.string().describe("The campaign ID"),
    }, async ({ campaignId }) => {
        const data = await client.request(`/Campaigns/${campaignId}/Contacts`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
}
//# sourceMappingURL=partners.js.map