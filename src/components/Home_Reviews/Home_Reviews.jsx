import React from 'react';
import { facebook, google, justdial } from '../Images/Images';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const reviews = [
    {
        image: google,
        altText: 'google',
        rating: 4.5,
        count: 850,
        name: 'Reviews'
    },
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
        <div className='bg-black  z-[9999999] relative overflow-hidden '>
        <div className=' py-10'>
            <div className='lg:max-w-[1800px] m-auto px-[20px]'>
                {/* <div className='flex justify-between items-center md:flex-row flex-col gap-[20px]' ref={ref}>
                    {reviews.map((review, index) => (
                        <div key={index} className='sm:w-[15%] flex flex-col justify-center items-center'>
                            <img src={review.image} alt={review.altText} className='md:w-[100%] sm:w-[250px] w-[200px] m-auto' />
                            <p className='text-white flex gap-[8px] text-[18px]'>
                                {renderStars(review.rating)}
                            </p>
                            <h1 className='text-white mt-[10px] font-lato text-2xl flex items-center gap-[2px]'>
                                {inView && (
                                    <CountUp start={0} end={review.count} duration={2} separator="," />
                                )}
                                <span className='text-sm'>+ {review.name}</span>
                            </h1>
                        </div>
                    ))}
                </div> */}
              <iframe src='https://widgets.sociablekit.com/google-reviews/iframe/25456177' frameborder='0' width='100%' height='250'></iframe>
            </div>
        </div>
        </div>
    );
}

export default Home_Reviews;
