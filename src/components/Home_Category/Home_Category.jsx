import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { BoxerShorts, denimjeans, Shirts, Trackpant, Trousers, TShirts } from '../Images/Images'; // Add your images here
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home_Category = () => {
  const categories = [
    { name: 'DENIM JEANS', image: denimjeans },
    { name: 'Boxer Shorts', image: BoxerShorts },
    { name: 'Trousers', image: Trousers },
    { name: 'Shirts', image: Shirts },
    { name: 'T Shirts', image: TShirts }
  ];

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
          slidesToShow: 2,
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
    <div className='bg-white  z-[99] relative overflow-hidden '>
      <div className='max-w-[1800px] m-auto px-[10px] my-[50px]'>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <Link key={index} to={`/category/${category.name}`} className='text-center'>
              <img src={category.image} alt={category.name} className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] rounded-[50%] m-auto' />
              <h1 className='text-[20px] font-lato font-bold mt-[15px]'>{category.name}</h1>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home_Category;
