import React from 'react';

const BannerItem = ({ slide }) => {
    const { image, id, prev, next, title1, title2 } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='bg-gradient-to-r from-black to-stone-400 '>
                <h1 className='absolute lg:text-7xl uppercase font-extrabold text-white text-start z-10 mx-40 top-1/4'>{title1} <br /> {title2}</h1>
                <img src={image} alt='bannerImg' className="w-full -z-10 opacity-60" />
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${prev}`} className="btn btn-circle">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;