"use client";
import { rentRequests, updateRentRequest } from "@/app/api/api";
import { RequestItem } from "@/app/types/requestItem";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";

type Answer = "waiting" | "geaccepteerd" | "afgewezen";

const RequestListItem = ({ request, handleUpdateRequest }: { request: RequestItem, handleUpdateRequest: (request: RequestItem) => void }) => {
  const { data: session } = useSession();
  const [updateRequest, { loading, error }] = useMutation(updateRentRequest);

  if (!session) {
    // Als de gebruiker niet is ingelogd, toon bijvoorbeeld een login-knop of redirect naar inlogpagina.
    return <p>Log in om verzoeken te bekijken.</p>;
  }

  const userId = session.id;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleAcceptOrDecline = (request: RequestItem, answer: Answer) => {
    updateRequest({
      variables: {
        id: request.id,
        data: {
          status: answer,
        },
      },
    });
    request.attributes.status = answer;
    handleUpdateRequest(request);
  };

  return (
    <li key={request.id} className="bg-white border rounded-lg p-4 shadow-lg">
      <div className="font-bold text-lg mb-2">
      <span className="font-semibold">Aanbieder:</span>{" "}
        {request.attributes.hirer.data.attributes.username}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Product:</span>{" "}
        {request.attributes.product.data?.attributes?.Title || "No title"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Aantal:</span>{" "}
        {request.attributes.amountRequested}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span>{" "}
        {request.attributes.status}
      </div>
      {userId && request.attributes.status !== "accepted" && (
         <div className="flex space-x-4">
         <div className="border border-gray-300 p-2 rounded">
           <button
             className="btn btn-accept"
             onClick={() => handleAcceptOrDecline(request, "waiting")}
           >
             Wacht
           </button>
         </div>
         <div className="border border-gray-300 p-2 rounded">
           <button
             className="btn btn-accept"
             onClick={() => handleAcceptOrDecline(request, "geaccepteerd")}
           >
             Accepteer
           </button>
         </div>
         <div className="border border-gray-300 p-2 rounded">
           <button
             className="btn btn-decline"
             onClick={() => handleAcceptOrDecline(request, "afgewezen")}
           >
             Afwijzen
           </button>
         </div>
       </div>
      )}
    </li>
  );
};

export default RequestListItem;
