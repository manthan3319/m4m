import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const CategoryDetails = () => {
  const location = useLocation();
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('categoryid');


  const fetchProduct = async () => {
    try {
      const response = await getProduct();
      if (response.data.length >= 1) {
        setProductData(response.data);

        const filtered = response.data.filter(
          (product) => product.categoryid === categoryId
        );
        setFilteredProducts(filtered);
      } else {
        setProductData([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [categoryId]); // Refetch when categoryId changes

  return (
    <div className='max-w-[1800px] m-auto px-[10px] pt-[90px] md:pt-[150px] pr mb-[60px]'>
      <h1 className='text-[30px] font-lato font-bold text-center mb-8'>
        {filteredProducts.length > 0 ? filteredProducts[0].categoryName : 'Category Not Found'}
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className='relative border rounded-lg overflow-hidden'>
              <img
                src={`${imgurl}/${product.imageName}`}
                alt={product.productName}
                className='w-full md:min-h-[400px] md:max-h-[400px] max-h-[180px] mb-2 object-cover' // Added object-cover to maintain aspect ratio
              />

              <div className='p-4'>
                <h2 className='text-lg font-lato font-bold mb-1'>{product.productName}</h2>
                <div className='flex flex-row gap-[12px]'>
                  <p className='text-gray-700'><b>₹{product.price}</b></p>
                  <p className='text-gray-500 line-through'>₹ {product.mrp}</p>
                </div>
              </div>
              {/* Coming Soon Tag */}
              {product.isEnabled ? null : (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                  <span className='text-white text-2xl font-bold font-lato'>Coming Soon</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
