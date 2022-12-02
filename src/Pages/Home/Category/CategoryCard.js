import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <div className="card bg-base-100 shadow-xl image-full transition ease-in-out hover:scale-105">
            <figure><img src={category.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{category.category}</h2>
                <p>{category.desc}</p>
                <div className="card-actions justify-end">
                    <Link to={`/category/${category._id}`}><button className="btn btn-primary">View</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;