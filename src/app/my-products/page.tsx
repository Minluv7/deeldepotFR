"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getBooksFromUser } from "@/app/api/api";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard";
import NewProduct from "@/components/NewProduct";

const Page = () => {
  const session = useSession();
  console.log(session);
  const userId= session?.data?.id;
  const { data, loading, error } = useQuery(getBooksFromUser, {
    variables: { userId: userId },
  });
console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data</p>;
    if (!session) return null;

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4" >Eigen producten</h1>
      {data.products.data.length === 0 ? (
        <div className="text-center">
        <p >Je hebt nog geen producten. Voeg een nieuw product toe </p>
        <NewProduct userId={userId} />
        </div>
      ) : (
        <div>
        <div className="float-right">
            <NewProduct userId={userId} />
          </div>
      <ul className="flex flex-wrap justify-center">
        {data.products.data.map((product: Product) => (
          <li key={product.id}>
          <Link href={`/my-products/${encodeURIComponent(product.id)}`}>
            <ProductCard {...product}/>
          </Link>
          </li>
        ))}
      </ul>
      </div>
      )}
    </>
  );
};

export default Page;