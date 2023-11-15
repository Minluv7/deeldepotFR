"use client"
import Image from 'next/image';

const HomePageCards = (product: Product) => {
    return (
      <div className="w-30 h-30 bg-white shadow-lg rounded-lg p-4">
        <h2 className="whitespace-normal max-w-xs text-uppercase">
          {product.attributes.Title}
        </h2>
        <ul className="flex justify-center">
          {product.attributes.Images?.data.map((attributes, index) => (
            <li key={index} className="m-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${attributes.attributes.url}`}
                alt={product.attributes.Title}
                width={100}
                height={100}
                className="mb-4"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default HomePageCards;
