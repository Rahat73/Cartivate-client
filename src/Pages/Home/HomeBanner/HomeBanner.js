import React from 'react';
import banner1 from '../../../assets/images/car-1.jpg'
import banner2 from '../../../assets/images/car-2.jpg'
import banner3 from '../../../assets/images/car-3.jpg'
import BannerItem from './BannerItem';

const bannerData = [
    {
        image: banner1,
        title1: "Sale",
        title2: "to buy",
        id: 1,
        prev: 3,
        next: 2
    },
    {
        image: banner2,
        title1: "Get",
        title2: "exactly what you need",
        id: 2,
        prev: 1,
        next: 3
    },
    {
        image: banner3,
        title1: "Buy",
        title2: "your dream car",
        id: 3,
        prev: 2,
        next: 1
    }
]

const HomeBanner = () => {
    return (
        <div>
            <div className="carousel w-full">
                {
                    bannerData.map(slide => <BannerItem
                        key={slide.id}
                        slide={slide}
                    ></BannerItem>)
                }
            </div>
        </div>
    );
};

export default HomeBanner;