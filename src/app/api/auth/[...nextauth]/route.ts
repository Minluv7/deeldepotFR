import { authOptions } from "@/libs/auth";
import NextAuth, { AuthOptions } from "next-auth";

const apiUrl = "https://whimsical-activity-8412sidkfj.strapiapp.com"; // Vervang dit met de daadwerkelijke URL van je Strapi-backend

const customOptions: AuthOptions = {
  ...authOptions, // Voeg eventuele bestaande opties toe vanuit authOptions

  // Voeg nieuwe opties toe of overschrijf bestaande opties
  providers: [
    ...authOptions.providers, // Voeg eventuele bestaande providers toe vanuit authOptions
    // Hier kun je aanvullende providers configureren indien nodig
  ],
};

const handler = NextAuth(customOptions);

export { handler as GET, handler as POST };
