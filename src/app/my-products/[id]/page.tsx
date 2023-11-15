"use client"
import React, {useState, useEffect} from 'react';
import {getBookById, deleteProduct, updateProduct} from '@/app/api/api';
import Image from 'next/image';

const Page =  ({ params }: {params: {id: number}}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [productsData, setProductsData] = useState<Product>();

useEffect(() => {
  const fetchData = async () => {
    const data = await getBookById(params.id);
    setProductsData(data);
  };

  fetchData();
}, [params.id]);

const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = event.target;
  if (productsData) {  
  setProductsData({
    ...productsData,
    attributes: {
      ...productsData.attributes,
      [name]: name === 'Price' || name === 'InStock' ? parseFloat(value) : value,
    },
  
  });
 
}
  console.log(productsData);
};


const handleDelete = async () => {
  if (productsData) {
    const confirmed = window.confirm('Weet je zeker dat je dit boek wilt verwijderen?');
    if (confirmed) {
      await deleteProduct(productsData.id);
      window.location.href = '/my-products';
    }
  }
};

const handleEdit = () => {
  setIsEditing(true);
};

const handleSave = async () => {
  if (productsData) {
    setIsEditing(false);
    await updateProduct(productsData);
  }
};

const handleCancel = () => {
  setIsEditing(false);
};

if (!productsData) {
    return <div>Something went wrong!</div>;
    
}
return (
    <div className="m-8 flex flex-col">
      <form>
        <div className='flex justify-between flex-wrap'>
        <div>
          <input 
          className="text-2xl mb-4 uppercase font-semibold"
          type="text"
          disabled={!isEditing}
          onChange={handleOnChange}
          name='Title'
          value={productsData.attributes.Title || ""}
         
          />
        </div>
        <div>
          <button 
          className="bg-red-500 hover:bg-red-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-red-300" 
          onClick={handleDelete}
          >
          Delete
          </button>
          {isEditing ? (
          <>
          <button 
            className="bg-blue-500 hover:bg-blue-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-blue-300" 
            onClick={handleSave}
          >
            Save
          </button>
          <button 
            className="bg-red-500 hover:bg-red-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-red-300" 
            onClick={handleCancel}
          >
            Cancel
          </button>
          </>
          ) : (
          <button 
            className="bg-green-500 hover:bg-green-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-green-300" 
            onClick={handleEdit}
          >
            Edit
          </button>
          )}
        </div>
        </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/2">
          {productsData.attributes.Images?.data.map((attributes: any, index: any) => (
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_API_URL}${attributes.attributes.url}`}
              alt={productsData.attributes.Title}
              width={100}
              height={100}
              className="mb-4"
            />
          ))}
        </div>
        <div className="md:w-1/2 md:ml-4">
        <input 
        className="text-2xl font-semibold"
        type="text"
        disabled={!isEditing}
        onChange={handleOnChange}
        name='Author'
        value={productsData.attributes.Author || ""}
        />
        <div className="flex items-center">
          <span className="mr-2 text-lg">Aantal in voorraad:</span>
          <input
            type="number"
            id="instock"
            name="InStock"
            value={productsData.attributes.InStock || 0}
            onChange={handleOnChange}
          disabled={!isEditing}
          
          />
        </div>
          <p
            className={
              productsData.attributes.InStock <= 0
                ? 'text-red-500 font-semibold'
                : 'text-green-500 font-semibold'
            }
          >
            {productsData.attributes.InStock <= 0 ? 'Uitgeleend' : 'Beschikbaar'}
          </p>
          <label htmlFor="Price" className='font-semibold'>
            Huurprijs
          </label>
          <div>
            <span className="mr-2 text-lg">€</span>
            <input type="number"
            className="text-lg"
            disabled={!isEditing}
            onChange={handleOnChange}
            name='Price'
            value={productsData.attributes.Price || ""}
            />
          </div>
          
          <p className="mb-2">Taal: {productsData.attributes.Language}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-semibold underline">Achterzijde van het boek</h2>
        <textarea rows={6} cols={70}
        name="Description"
        value={productsData.attributes.Description || ""}
        disabled={!isEditing}
        onChange={handleOnChange}>
        </textarea>
       
      </div>
      </form>
    </div>
  
  );
  
  
}
export default Page;