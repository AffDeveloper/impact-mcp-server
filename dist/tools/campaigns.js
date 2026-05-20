/**
 * Impact.com Campaigns/Programs tools.
 */
import { z } from "zod";
export function registerCampaignTools(server, client) {
    server.tool("list_campaigns", "List all campaigns/programs in your Impact account", {}, async () => {
        const data = await client.request("/Campaigns");
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
    server.tool("get_campaign", "Get details for a specific campaign/program", {
        campaignId: z.string().describe("The campaign ID"),
    }, async ({ campaignId }) => {
        const data = await client.request(`/Campaigns/${campaignId}`);
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    });
}
//# sourceMappingURL=campaigns.js.map