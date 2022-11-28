// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('Category.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    console.log(categories)
    return (
        <div className='px-10 py-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
                {
                    categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Category;