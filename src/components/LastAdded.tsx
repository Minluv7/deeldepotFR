"use client"
import { useEffect, useState } from 'react';
import { getselectedBooks } from '@/app/api/api';
import Link from 'next/link';

import HomePageCards from '@/components/HomePageCards';
// Definieer het Product type of importeer het op de juiste manier

export default function LastAdded() {
    const [productsData, setProductsData] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getselectedBooks();
            setProductsData(data);
        }
        fetchData();
    }, []); // Voeg een lege array toe voor useEffect

    return (
        <>
            <div className="ml-4 md:ml-20 mr-4 md:mr-20">
                <h2 className="font-bold uppercase">Laatst toegevoegde boeken</h2>
                <div className="flex flex-wrap md:flex-nowrap justify-between">
                    {productsData
                        .sort((a, b) => new Date(b.attributes.createdAt as Date).getTime() - new Date(a.attributes.createdAt as Date).getTime())
                        .slice(0, 3)
                        .map((product: Product) => (
                            <div key={product.id} className="w-full md:w-1/3 p-4">
                                <Link href={`/products/${product.id}`}>
                                    {/* Verondersteld dat HomePageCards een geldige component is */}
                                    <HomePageCards {...product} />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
