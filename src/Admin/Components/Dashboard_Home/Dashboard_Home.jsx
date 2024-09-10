import React from 'react';
import Saidbar from '../Saidbar/Saidbar';

const Dashboard_Home = () => {
  return (
    <div>
       <div>
          <Saidbar/>
        </div>
        <div className='ml-[250px] px-[30px] pt-[25px]'>
          <div className='flex gap-[25px]'>
              <div className='bg-black px-[30px] py-[30px] w-[15%] flex flex-col gap-[10px] rounded-[16px]'>
                  <h1 className='text-white text-[22px] font-poppins font-bold'>Our Total Blog</h1>
                  <p className='text-white text-[26px] font-poppins font-bold'>2</p>
              </div>
              <div className='bg-black px-[30px] py-[30px] w-[15%] flex flex-col gap-[10px] rounded-[16px]'>
                  <h1 className='text-white text-[22px] font-poppins font-bold'>Our Category</h1>
                  <p className='text-white text-[26px] font-poppins font-bold'>2</p>
              </div>
              <div className='bg-black px-[30px] py-[30px] w-[15%] flex flex-col gap-[10px] rounded-[16px]'>
                  <h1 className='text-white text-[22px] font-poppins font-bold'>Our Product</h1>
                  <p className='text-white text-[26px] font-poppins font-bold'>2</p>
              </div>
              <div className='bg-black px-[30px] py-[30px] w-[15%] flex flex-col gap-[10px] rounded-[16px]'>
                  <h1 className='text-white text-[22px] font-poppins font-bold'>Our Culture</h1>
                  <p className='text-white text-[26px] font-poppins font-bold'>2</p>
              </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard_Home;
