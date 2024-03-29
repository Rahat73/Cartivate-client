import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {


    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('Category.json')
            .then(res => res.json())
    })

    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     fetch('Category.json')
    //         .then(res => res.json())
    //         .then(data => setCategories(data))
    // }, [])
    // console.log(categories)
    return (
        <div className='bg-gradient-to-r bg-base-200 px-10 pt-14 pb-20'>
            <h1 className='text-5xl font-semibold underline text-white mb-10'>Categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
                {
                    categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Category;