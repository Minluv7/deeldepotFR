
import { GetNextAuthOptions } from "next-auth-integration-graphql";
import { authOptions } from "@/libs/auth";

const apiUrl = "https://whimsical-activity-841245cb28.strapiapp.com"; // Vervang dit met de daadwerkelijke URL van je Strapi-backend

export default GetNextAuthOptions({
  ...authOptions,
  providers: [
    ...authOptions.providers,
    // Voeg eventuele extra providers toe indien nodig
  ],
  site: apiUrl,
  // Andere configuratie-opties hier ...
});