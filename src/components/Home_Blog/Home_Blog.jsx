import React, { useState, useEffect, useCallback } from 'react';
import { blog1 } from '../Images/Images';
import { getBlog } from '../../Admin/Components/Api/Api';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const Home_Blog = () => {
    const [blogdata, setblogdata] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlog = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getBlog();
            if (response.data.length >= 1) {
                setblogdata(response.data);
            } else {
                setblogdata([]);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    const staticBlogData = [
        {
            id: 1,
            category: "Business",
            title: "Overcoming Challenges to Make a Living Online",
            description: "Making money online is attainable. However, even if the processes are simple, you may still need help with issues.",
            image: blog1,
            date: "1 Sep 2023",
            rating: 4.5
        }
    ];

    const blogDataToDisplay = blogdata.length > 0 ? blogdata : staticBlogData;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='md:py-[170px] py-[110px]'>
            <div className='lg:max-w-[2000px] m-auto px-[10px]'>
                <div className='text-center'>
                    <h1 className='lg:text-[45px] font-lato font-bold border-b-2 inline-block text-[35px]'>
                        Here is our blog's
                    </h1>
                </div>

                <div className='mt-[50px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10'>
                    {blogDataToDisplay.map(blog => (
                        <div key={blog.id} className='border-[2px] border-black rounded-[5px] blog_box'>
                            <div className='overflow-hidden'>
                                <img
                                    src={blog.imageName ? `${imgurl}/${blog.imageName}` : blog1}  
                                    alt='blog'
                                    className='w-[100%] min-h-[220px] max-h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-105'
                                />
                            </div>
                            <div className='p-[15px]'>
                                <h2 className='font-poppins text-[19px] font-semibold'>{blog.Category}</h2>
                                <h1 className='font-lato lg:text-[25px] font-bold mt-[7px]'>{blog.Title}</h1>
                                <p className='font-roboto text-[16px] mt-[5px]'>{blog.Content}</p>
                            </div>
                            <div className='flex justify-between border-t-2 p-[15px]'>
                                <div>
                                    <p className='flex flex-row gap-[10px]'>
                                        <span><i className="fa fa-calendar" aria-hidden="true"></i></span> 
                                        {formatDate(blog.createDate)}  
                                    </p>
                                </div>
                                {/* <div className='flex gap-[5px]'>
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const rating = blog.rating - index;
                                        return (
                                            <span key={index}>
                                                <i className={`fa ${rating >= 1 ? 'fa-star' : rating > 0.5 ? 'fa-star-half-o' : 'fa-star-o'}`} aria-hidden="true"></i>
                                            </span>
                                        );
                                    })}
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home_Blog;
