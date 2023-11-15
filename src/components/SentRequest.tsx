"use client"
import { RequestItem } from "@/app/types/requestItem";
import SentRequestListItem from "./SentRequestListItem";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/libs/apolloClient";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { rentRequestsOwner } from "@/app/api/api";
import { useQuery } from "@apollo/client";

const SentRequestList = () => {
    const { data: session } = useSession();
    const hirerId = session?.id || "";
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const { loading, error, data: rentRequestsData } = useQuery(
        rentRequestsOwner,
      {
        variables: {
          hirerId: hirerId,
        },
      }
    );
  
    const toggleSection = (section: string) => {
      setActiveSection((prevSection) =>
        prevSection === section ? null : section
      );
    };
  
    const handleUpdateRequest = (request: RequestItem) => {
      // Implementeer de logica voor het bijwerken van het verzoek
      console.log("Update request:", request);
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const requests = rentRequestsData?.rentRequests?.data || [];
  
    return (
      <ApolloProvider client={client}>
        <div className="p-4 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Mijn huurverzoeken</h1>
          {["waiting", "geaccepteerd", "afgewezen"].map((section) => (
            <div key={section} className="mb-4">
              <button
                className={`mb-2 border ${
                  activeSection === section
                    ? "bg-teal-500 text-white"
                    : "border-teal-500 text-teal-500"
                } font-bold py-2 px-4 rounded-full`}
                onClick={() => toggleSection(section)}
              >
                {section === "waiting" && "Wachtende Requests"}
                {section === "geaccepteerd" && "Geaccepteerde Requests"}
                {section === "afgewezen" && "Afgewezen Requests"}
              </button>
              {activeSection === section && (
                <ul className="grid grid-cols-1 gap-4">
                  {requests
                    .filter((request: any) => request.attributes.status === section)
                    .map((request: any) => (
                      <SentRequestListItem
                        key={request.id}
                        request={request}
                        handleUpdateRequest={handleUpdateRequest}
                      />
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </ApolloProvider>
    );
  };
  
  export default SentRequestList;
