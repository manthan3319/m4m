import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getCategory } from '../../Admin/Components/Api/Api';
import { BoxerShorts2, denimjeans4, Shirts, Trousers, TShirts } from '../Images/Images';
import { imgurl } from '../../Admin/Components/Credentials/Credentials';

const Home_Category = () => {
  const [categories, setCategories] = useState([]);
  const [isStatic, setIsStatic] = useState(false);

  const staticCategories = [
    { id: 1, categoryName: 'DENIM JEANS', imageName: denimjeans4 },
    { id: 2, categoryName: 'Boxer Shorts', imageName: BoxerShorts2 },
    { id: 3, categoryName: 'Trousers', imageName: Trousers },
    { id: 4, categoryName: 'Shirts', imageName: Shirts },
    { id: 5, categoryName: 'T Shirts', imageName: TShirts }
  ];

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response.data && response.data.length > 0) {
        setCategories(response.data);
        setIsStatic(false);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(staticCategories);
      setIsStatic(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='bg-white z-[99] relative overflow-hidden'>
      <div className='max-w-[1800px] m-auto px-[10px] my-[50px]'>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={category._id || index} className='relative flex flex-col items-center'>
              {category.comingSoon === "yes" ? (
                <div className='relative'>
                  <img
                    src={isStatic ? category.imageName : `${imgurl}/${category.imageName}`}
                    alt={`Image of ${category.categoryName}`}
                    className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] rounded-[50%] m-auto object-cover'
                    loading="lazy"
                  />

                  <div className='absolute inset-0 flex items-center justify-center sm:w-[203px] sm:h-[200px] w-[150px] top-0 left-0 m-auto bg-black bg-opacity-80 rounded-full'>
                    <span className='text-white sm:text-2xl font-bold font-lato text-[18px] text-center text-shadow-md'>
                      Coming Soon <br /> {category.categoryName}
                    </span>
                  </div>
                </div>
              ) : (
                <Link to={isStatic ? '#' : `/category/?categoryid=${category._id}`} className={`text-center ${isStatic ? 'pointer-events-none' : ''}`}>
                  <img
                    src={isStatic ? category.imageName : `${imgurl}/${category.imageName}`}
                    alt={`Image of ${category.categoryName}`}
                    className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] rounded-[50%] m-auto object-cover'
                    loading="lazy"
                  />

                  <h1 className='text-[20px] font-lato font-bold mt-[15px] text-center text-shadow-md'>{category.categoryName}</h1>
                </Link>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home_Category;
