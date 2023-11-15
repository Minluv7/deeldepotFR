'use client'
import RequestList from "@/components/RequestList";
import { rentRequests } from "@/app/api/api";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import SentRequest from "@/components/SentRequest";

const RequestPage = () => {
  const { data: session } = useSession();

  const { loading, error, data } = useQuery(rentRequests, {
    variables: {
      userId: session?.id || null,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
   skip: !session, // Skip de query als er geen sessie is
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const requests = data?.rentRequests?.data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">Verzoeken</h1>
      <RequestList requests={requests} />
      <SentRequest/>
    </div>
  );
};

export default RequestPage;
