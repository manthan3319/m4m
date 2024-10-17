import React, { useState, useEffect } from 'react';
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
        triggerOnce: true, // Counter will trigger only once
        threshold: 0.1,
    });

    const initialCount = 478500;
    const targetCount = initialCount + 5000; // Increment the target count by 5000

    const [currentCount, setCurrentCount] = useState(() => {
        // Retrieve the saved count from localStorage or start from the initial count
        const savedCount = localStorage.getItem('currentCount');
        return savedCount ? parseInt(savedCount, 10) : initialCount;
    });

    const [hasCounted, setHasCounted] = useState(false);

    useEffect(() => {
        let interval;
        if (inView && !hasCounted) {
            interval = setInterval(() => {
                setCurrentCount((prevCount) => {
                    if (prevCount >= targetCount) {
                        clearInterval(interval); 
                        setHasCounted(true); 
                        return targetCount;
                    }
                    const newCount = prevCount + 1;
                    localStorage.setItem('currentCount', newCount); 
                    return newCount;
                });
            }, 3000);
        }
        return () => clearInterval(interval); 
    }, [inView, hasCounted, currentCount, targetCount]);

    return (
        <div className='bg-white z-[9999999] relative overflow-hidden py-10'>
            <div className='-[20px]'>
                <div className='grid md:grid-cols-2 grid-cols-1 md:w-[30%] m-auto gap-[20px]' ref={ref}>
                    <div className='bg-blue-100 p-6 rounded-lg shadow-lg text-center flex items-center flex-col justify-center'>
                        <h1 className='text-3xl font-bold text-blue-800 mt-2'>
                            {currentCount}
                        </h1>
                        <p className='text-lg text-blue-600 mt-2'>Our Happy Customers</p>
                    </div>
                    <div className='flex flex-wrap justify-between items-center gap-[20px] w-full'>
                        {reviews.map((review, index) => (
                            <div key={index} className='w-full flex flex-col justify-center items-center'>
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
};

export default Home_Reviews;
