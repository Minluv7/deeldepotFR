"use client";
import { rentRequests, updateRentRequest } from "@/app/api/api";
import { RequestItem } from "@/app/types/requestItem";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";

const RequestListItem = ({ request, handleUpdateRequest }: { request: RequestItem, handleUpdateRequest: (request: RequestItem) => void }) => {
  const { data: session } = useSession();
  const [updateRequest, { loading, error }] = useMutation(updateRentRequest);

  if (!session) {
    // Als de gebruiker niet is ingelogd, toon bijvoorbeeld een login-knop of redirect naar inlogpagina.
    return <p>Log in om verzoeken te bekijken.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

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
     
    </li>
  );
};

export default RequestListItem;
