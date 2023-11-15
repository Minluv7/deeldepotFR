"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/api/api";
import UserCard from "@/components/UserCard";
const ProfilePage = () => {
  const session = useSession();
  
  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: { userId: session?.data?.id || null },
    skip: !session?.data?.id,
  });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {session ? (
        <UserCard data={userData} pagetype="Profiel" />
      ) : (
        "Je bent niet ingelogd"
      )}
    </div>
  );
};

export default ProfilePage;