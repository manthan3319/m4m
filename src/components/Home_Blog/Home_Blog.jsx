import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { blog1 } from '../Images/Images';

const Home_Blog = () => {
    const blogData = [
        {
            id: 1,
            category: "Business",
            title: "Overcoming Challenges to Make a Living Online",
            description: "Making money online is attainable. However, even if the processes are simple, you may still need help with issues.",
            image: blog1,
            date: "1 Sep 2023",
            rating: 4.5
        },
    ];

    const options = {
        items: 5,
        nav: true,
        rewind: true,
        autoplay: true,
        loop: true,
        margin: 20,
        dots: true,
        navText: [
            "<div class='owl-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></div>",
            "<div class='owl-next'><i class='fa fa-angle-right' aria-hidden='true'></i></div>"
        ],
        responsive: {
            0: {
                items: 1, 
                nav: true,
            },
            600: {
                items: 2, 
                nav: true,
            },
            1000: {
                items: 3,
                nav: true,
            },
            1200: {
                items: 4, 
                nav: true,
            },
            1400: {
                items: 5, 
                nav: true,
            }
        }
    };
    

    return (
        <div className='py-[130px]'>
            <div className='lg:max-w-[1800px] m-auto px-[20px]'>
                <div className='text-center pt-[25px]'>
                    <h1 className='lg:text-[45px] font-lato font-bold border-b-2 inline-block text-[35px]'>Here is our blog's</h1>
                </div>

                <div className='mt-[50px]'>
                    <OwlCarousel options={options}>
                        {blogData.map(blog => (
                            <div key={blog.id} className='lg:w-[100%] border-[2px] border-black rounded-[5px] blog_box'>
                                <div className='overflow-hidden'>
                                    <img 
                                        src={blog.image} 
                                        alt='blog' 
                                        className='w-[100%] min-h-[220px] max-h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-105' 
                                    />
                                </div>
                                <div className='p-[15px]'>
                                    <h2 className='font-poppins text-[19px] font-semibold '>{blog.category}</h2>
                                    <h1 className='font-lato lg:text-[25px] font-bold mt-[7px]'>{blog.title}</h1>
                                    <p className='font-roboto text-[16px] mt-[5px]'>{blog.description}</p>
                                </div>
                                <div className='flex justify-between border-t-2 p-[15px]'>
                                    <div>
                                        <p><span><i className="fa fa-calendar" aria-hidden="true"></i></span> {blog.date}</p>
                                    </div>
                                    <div className='flex gap-[5px]'>
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const rating = blog.rating - index;
                                            return (
                                                <span key={index}>
                                                    <i className={`fa ${rating >= 1 ? 'fa-star' : rating > 0.5 ? 'fa-star-half-o' : 'fa-star-o'}`} aria-hidden="true"></i>
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
}

export default Home_Blog;
