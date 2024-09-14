import React, { useEffect, useState } from 'react';
import Saidbar from '../Saidbar/Saidbar';
import { getDetails } from '../Api/Api'; // Ensure the path is correct

const Dashboard_Home = () => {
  const [data, setData] = useState({
    blog: 0,
    category: 0,
    product: 0,
    culture: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getDetails();
        if (response) {
          setData({
            blog: response.blog,
            category: response.category,
            product: response.product,
            culture: response.culture
          });
        } else {
          console.error('Failed to fetch details:', response.message);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div>
      <div>
        <Saidbar />
      </div>
      <div className='sm:ml-[250px] px-[30px] sm:pt-[25px] pt-[120px] relative'>
        <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-[25px]'>
          <div className='bg-black px-[30px] py-[30px] flex flex-col gap-[10px] rounded-[16px]'>
            <h1 className='text-white text-[22px] font-poppins font-bold'>Our Total Blog</h1>
            <p className='text-white text-[26px] font-poppins font-bold'>{data.blog}</p>
          </div>
          <div className='bg-black px-[30px] py-[30px]  flex flex-col gap-[10px] rounded-[16px]'>
            <h1 className='text-white text-[22px] font-poppins font-bold'>Our Category</h1>
            <p className='text-white text-[26px] font-poppins font-bold'>{data.category}</p>
          </div>
          <div className='bg-black px-[30px] py-[30px]  flex flex-col gap-[10px] rounded-[16px]'>
            <h1 className='text-white text-[22px] font-poppins font-bold'>Our Product</h1>
            <p className='text-white text-[26px] font-poppins font-bold'>{data.product}</p>
          </div>
          <div className='bg-black px-[30px] py-[30px]  flex flex-col gap-[10px] rounded-[16px]'>
            <h1 className='text-white text-[22px] font-poppins font-bold'>Our Culture</h1>
            <p className='text-white text-[26px] font-poppins font-bold'>{data.culture}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard_Home;
