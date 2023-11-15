import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth";

const apiUrl = "https://whimsical-activity-841245cb28.strapiapp.com"; // Vervang dit met de daadwerkelijke URL van je Strapi-backend

const handler = NextAuth({
  ...authOptions, // Voeg eventuele bestaande opties toe vanuit authOptions

  // Voeg nieuwe opties toe of overschrijf bestaande opties
  providers: [
    ...authOptions.providers, // Voeg eventuele bestaande providers toe vanuit authOptions
    // Hier kun je aanvullende providers configureren indien nodig
  ],
  
  // Voeg de nieuwe optionele baseUrl toe aan site die overeenkomt met je Strapi-backend
  baseUrl: apiUrl,

  // Andere algemene NextAuth-configuraties hier ...
  // ...
});

export { handler as GET, handler as POST };
