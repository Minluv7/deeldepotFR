"use client"
import { useEffect, useState } from 'react';
import { getBooks } from '@/app/api/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

import { useQuery } from "@apollo/client";
import { useSession } from 'next-auth/react';

const ProductPage = () => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('all');
  const session = useSession();
  const { data, loading, error } = useQuery(getBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;
  if (!session) return null;

  const filteredProducts = data.products.data.filter((product: Product) => {
    const includesSearch = (
      product.attributes.Title.toLowerCase().includes(search.toLowerCase()) ||
      product.attributes.Author.toLowerCase().includes(search.toLowerCase())
    );

    if (sortField === 'all') {
      return includesSearch;
    } else {
      const isAvailable = product.attributes.InStock > 0;
      if (sortField === 'available' && isAvailable) {
        return includesSearch;
      } else if (sortField === 'notAvailable' && !isAvailable) {
        return includesSearch;
      }
      return false;
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4">Overzicht boeken</h1>
      <div className='flex justify-around items-baseline'>
        <div className='flex justify-center mt-2'>
          <input className='border rounded-lg px-3 py-2'
            type="text"
            placeholder="Zoek titel of auteur"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </div>
        <select
          className="border rounded-lg px-3 py-2"
          onChange={(e) => { setSortField(e.target.value) }}
          value={sortField}
        >
          <option value="all">Alle boeken</option>
          <option value="available">Beschikbare boeken</option>
          <option value="notAvailable">Niet beschikbare boeken</option>
        </select>
        
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProducts.map((product: Product) => (
          <div key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
