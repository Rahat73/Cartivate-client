import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Category from './Category/Category';
import HomeBanner from './HomeBanner/HomeBanner';

const Home = () => {

    return (
        <div className=''>
            <HomeBanner></HomeBanner>
            <Category></Category>
            <AdvertisedItems></AdvertisedItems>
        </div>
    );
};

export default Home;