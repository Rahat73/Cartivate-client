import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedItemCard from './AdvertisedItemCard';

const AdvertisedItems = () => {

    const { data: advertisedProducts = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`http://localhost:5000/advertisedProducts/`)
            .then(res => res.json())
    })

    return (
        <div>
            {
                (advertisedProducts?.length > 0) ?
                    <>
                        <div className='bg-gradient-to-br from-emerald-700 to-slate-300 pt-14 pb-20'>
                            <h1 className='text-5xl font-semibold text-white underline mb-10'>Advertised Products</h1>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-11/12 mx-auto'>
                                {
                                    advertisedProducts.map(advertisedProduct => <AdvertisedItemCard
                                        key={advertisedProduct._id}
                                        advertisedProduct={advertisedProduct}
                                    >
                                    </AdvertisedItemCard>)
                                }
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }
        </div>
    );
};

export default AdvertisedItems;