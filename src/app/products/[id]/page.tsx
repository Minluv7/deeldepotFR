"use client"
import React, {useState} from 'react';
import {getProductById, createRentalRequest} from '@/app/api/api';
import Image from 'next/image';
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page =  ({ params }: {params: {id: number}}) => {
  const session = useSession();
  const router = useRouter();
  const { data, loading, error } = useQuery(getProductById, {
    variables: { id: params.id },
  });
  const [amountToRequest, setAmountToRequest] = useState(0);
  const [createRequest] = useMutation(createRentalRequest);

  
  if (!session) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;

  
  const currentDate = new Date();
  const formattedStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const formattedEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );

  const isoFormattedStartDate = formattedStartDate.toISOString().split('T')[0];
  const isoFormattedEndDate = formattedEndDate.toISOString().split('T')[0];

  const handleAmountToRequestChange = (e: any) => {
    console.log('New Amount to Request:', e.target.value);
    setAmountToRequest(e.target.value);
  };

const requestProduct = async (id: number) => {
  console.log('Requesting product...', data.product.data);

    const InStock = data.product.data.attributes.InStock;
    const requestedAmount = amountToRequest > InStock ? InStock : amountToRequest;

    console.log(`Requesting ${requestedAmount} of ${productData.Title}`);
    console.log(`Renter: ${session.data?.id}`);
console.log(data)
createRequest({
  variables: {
    data: {
      endDate: isoFormattedEndDate,
      hirer: session.data?.id,
      product: id,
      startDate: isoFormattedStartDate,
      status: "waiting",
      amountRequested: parseInt(String(amountToRequest)),
    },
  },
});
console.log('Amount to Request:', amountToRequest);
console.log('InStock:', productData.attributes.InStock);
      console.log('InStock:', productData.attributes.InStock);

};


 const handleRequestClick = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault(); // Add this line to prevent default form submission behavior
   if (!session || !session.data || !session.data.id) {
    router.push('/api/auth/signin?callbackUrl=%2Frequests');
    return;
  } 
  requestProduct(productData.id);
 };

const productData = data.product.data;



return (
    <div className="m-8 flex flex-col">
      <form>
        <div className='flex justify-between flex-wrap'>
        <div  className="text-2xl mb-4 uppercase font-semibold">
          <p>{productData.attributes.Title || ""}</p>
        </div>
        {productData.attributes.InStock > 0 ? (
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    min="1"
                    max={productData.attributes.InStock}
                    defaultValue="1"
                    value={amountToRequest}
                    className="w-16 h-10 border-gray-300 rounded-md"
                    onChange={handleAmountToRequestChange}
                  />
                  
                  <button
                    onClick={handleRequestClick}
                    className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
                  >
                    Huur aanvraag
                  </button>
                  
                </div>
              ) : null}
        </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/2">
          {productData.attributes.Images?.data.map((attributes: any, index: any) => (
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_API_URL}${attributes.attributes.url}`}
              alt={productData.attributes.Title}
              width={100}
              height={100}
              className="mb-4"
            />
          ))}
        </div>
        <div className="md:w-1/2 md:ml-4">
        <label htmlFor="Author" className='font-semibold'>
            Auteur
          </label>
        <p>{productData.attributes.Author || ""}</p>
        <div className="flex items-center">
       
          <p>{productData.attributes.InStock || 0} op stock</p>
        </div>
          <p
            className={
              productData.attributes.InStock <= 0
                ? 'text-red-500 font-semibold'
                : 'text-green-500 font-semibold'
            }
          >
            {productData.attributes.InStock <= 0 ? 'Uitgeleend' : 'Beschikbaar'}
          </p>
          <label htmlFor="Price" className='font-semibold'>
            Huurprijs
          </label>
          <div>
            <p>€ {productData.attributes.Price || ""}</p>
          </div>
          
          <p className="mb-2">Taal: {productData.attributes.Language}</p>
          <p className="text-gray-700 mb-2">
                Eigenaar:{" "}{productData.attributes.users_permissions_user.data.attributes.username}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-semibold underline">Achterzijde van het boek</h2>
        <textarea rows={6} cols={70}
        name="Description"
        value={productData.attributes.Description}
        >
        </textarea>
      </div>
      </form>
    </div>
  
  );
  
  
}
export default Page;