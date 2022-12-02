import { useEffect } from 'react';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Category from './Category/Category';
import HomeBanner from './HomeBanner/HomeBanner';
import advertiseImage from '../../assets/images/sports-car.jpg'

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className=''>
            <HomeBanner></HomeBanner>
            <Category></Category>
            <AdvertisedItems></AdvertisedItems>
            <div>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src={advertiseImage} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">A family of 20k people</h2>
                        <p>Share your life adventure with us.  Join our community.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;