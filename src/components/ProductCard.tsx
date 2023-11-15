"use client"
import Image from 'next/image'


const ProductCard = (product: Product) => {

const description = product.attributes.Description;
const maxLength = description.length / 3;

  return(
    <div className="bg-white border rounded-lg p-4 m-4 max-w-md">
          
        <h2 className="text-lg font-bold mb-4">{product.attributes.Title}</h2>
       
        {product.attributes.Images?.data.map((attributes, index) => (
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_API_URL}${attributes.attributes.url}`}
              alt={product.attributes.Title}
              width={100}
              height={100}
              className="mb-4"
            />
          ))}
          <p className="font-semibold mb-2">Auteur: {product.attributes.Author}</p>
          <p className="font-semibold mb-2">{product.attributes.InStock} in voorraad</p>
          <p className={product.attributes.InStock <= 0 ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                {product.attributes.InStock <= 0 ? 'Uitgeleend' : 'Beschikbaar'}</p>
            <p className="font-semibold mb-2">{product.attributes.Price} EURO</p>
            <p className="mb-2">Taal: {product.attributes.Language}</p>
          <p className="text-gray-600">{description.slice(0, maxLength)}...</p>

    </div>
)}

export default ProductCard;

