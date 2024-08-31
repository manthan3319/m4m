import React from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data/categories';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const category = categories.find(cat => cat.name === categoryName);

  return (
    <div className='max-w-[1800px] m-auto px-[10px] pt-[150px] mb-[60px]'>
      <h1 className='text-[30px] font-lato font-bold text-center mb-8'>{category?.name}</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {category?.products.map((product, index) => (
          <div key={index} className='relative border rounded-lg overflow-hidden'>
            <img src={product.image} alt={product.name} className='w-full min-h-[400px] max-h-[400px] rounded-[10px] mb-2' />
            <div className='p-4'>
              <h2 className='text-lg font-lato font-bold mb-1'>{product.name}</h2>
              <div className='flex flex-row gap-[12px]'>
                <p className='text-gray-700'><b>{product.price}</b></p>
                <p className='text-gray-500 line-through'>MRP: {product.mrp}</p>
              </div>
            </div>
            {/* Coming Soon Tag */}
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <span className='text-white text-2xl font-bold font-lato'>Coming Soon</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
