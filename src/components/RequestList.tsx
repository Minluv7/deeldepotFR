"use client"
import { RequestItem } from "@/app/types/requestItem";
import RequestListItem from "./RequestListItem";
import {ApolloProvider} from "@apollo/client";
import {client} from "@/libs/apolloClient";
import {useState} from "react";

const RequestList = ({ requests }: { requests: RequestItem[] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [requestsToShow, setRequestsToShow] = useState(requests);

  const toggleSection = (section: string) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const handleUpdateRequest = (request: RequestItem) => {
    const updatedRequests = requestsToShow.map((r) =>
      r.id === request.id ? request : r
    );
    setRequestsToShow(updatedRequests);
  };

  return (
    <ApolloProvider client={client}>
      <div className="p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Ontvangen huurverzoeken</h1>

        <div className="mb-4">
          <button
            className={`mb-2 border ${
              activeSection === "waiting"
                ? "bg-teal-500 text-white"
                : "border-teal-500 text-teal-500"
            } font-bold py-2 px-4 rounded-full`}
            onClick={() => toggleSection("waiting")}
          >
            Wachtende Requests
          </button>
          {activeSection === "waiting" && (
            <ul className="grid grid-cols-1 gap-4">
              {requests
                .filter((request) => request.attributes.status === "waiting")
                .map((request) => (
                  <RequestListItem
                    key={request.id}
                    request={request}
                    handleUpdateRequest={handleUpdateRequest}
                  />
                ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <button
            className={`mb-2 border ${
              activeSection === "geaccepteerd"
                ? "bg-teal-500 text-white"
                : "border-teal-500 text-teal-500"
            } font-bold py-2 px-4 rounded-full`}
            onClick={() => toggleSection("geaccepteerd")}
          >
            Geaccepteerde Requests
          </button>
          {activeSection === "geaccepteerd" && (
            <ul className="grid grid-cols-1 gap-4">
              {requests
                .filter((request) => request.attributes.status === "geaccepteerd")
                .map((request) => (
                  <RequestListItem
                    key={request.id}
                    request={request}
                    handleUpdateRequest={handleUpdateRequest}
                  />
                ))}
            </ul>
          )}
        </div>

        <div>
          <button
            className={`mb-2 border ${
              activeSection === "afgewezen"
                ? "bg-teal-500 text-white"
                : "border-teal-500 text-teal-500"
            } font-bold py-2 px-4 rounded-full`}
            onClick={() => toggleSection("afgewezen")}
          >
            Afgewezen Requests
          </button>
          {activeSection === "afgewezen" && (
            <ul className="grid grid-cols-1 gap-4">
              {requests
                .filter((request) => request.attributes.status === "afgewezen")
                .map((request) => (
                  <RequestListItem
                    key={request.id}
                    request={request}
                    handleUpdateRequest={handleUpdateRequest}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
};

export default RequestList;
