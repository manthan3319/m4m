import React from 'react';
import { facebook, google, happycustomer, justdial } from '../Images/Images';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const reviews = [
    {
        image: facebook,
        altText: 'facebook',
        rating: 3.5,
        count: 500,
        name: 'Reviews'
    },
    {
        image: justdial,
        altText: 'justdial',
        rating: 3.5,
        count: 1000,
        name: 'Reviews'
    }
];

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <>
            {[...Array(fullStars)].map((_, index) => (
                <i key={`full-${index}`} className="fa fa-star" aria-hidden="true"></i>
            ))}
            {halfStar && <i className="fa fa-star-half-o" aria-hidden="true"></i>}
            {[...Array(emptyStars)].map((_, index) => (
                <i key={`empty-${index}`} className="fa fa-star-o" aria-hidden="true"></i>
            ))}
        </>
    );
};

const Home_Reviews = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.1, // Trigger when 10% of the component is visible
    });

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden py-10'>
            <div className='-[20px]'>
                <div className='flex justify-center items-center md:flex-row flex-col md:gap-[100px] mb-[50px]' ref={ref}>
                    <div className='bg-blue-100 p-6 rounded-lg shadow-lg text-center'>
                        <h1 className='text-3xl font-bold text-blue-800'>
                            {inView && (
                                <CountUp start={0} end={50000} duration={2} separator="," />
                            )}
                        </h1>
                        <p className='text-lg text-blue-600 mt-2'>Our Happy Customers</p>
                    </div>
                    <div className='flex flex-wrap justify-between items-center gap-[20px] w-full md:w-[30%]'>
                        {reviews.map((review, index) => (
                            <div key={index} className='w-full sm:w-[45%] md:w-[30%] flex flex-col justify-center items-center'>
                                <img src={review.image} alt={review.altText} className='md:w-[100%] w-[150px] m-auto mb-[20px]' />
                                <p className='text-black flex gap-[8px] text-[18px]'>
                                    {renderStars(review.rating)}
                                </p>
                                <h1 className='text-black mt-[10px] font-lato text-2xl flex items-center gap-[2px]'>
                                    {inView && (
                                        <CountUp start={0} end={review.count} duration={2} separator="," />
                                    )}
                                    <span className='text-sm'>+ {review.name}</span>
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
                <iframe src='https://widgets.sociablekit.com/google-reviews/iframe/25456177' frameBorder='0' width='100%' height='250'></iframe>
            </div>
        </div>
    );
}

export default Home_Reviews;
