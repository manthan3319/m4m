import React from 'react';
import Saidbar from '../Saidbar/Saidbar';

const AddAboutus = () => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          maxWidth: '800px',
          borderRadius: '10px',
          padding: '20px',
        },
      };
    
    return (
        <div>
            <div>
                <Saidbar />
            </div>
            <div className='ml-[250px] px-[30px] pt-[25px]'>
                <div className='mt-[31px]'>
                    <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Update AboutUs</h2>
                </div>

                <div className="text-right">
                    <button
                        className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                    >
                        Add About Us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAboutus;