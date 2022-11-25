import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div>
            <h3 className='text-3xl font-semibold'>Terms & Conditions</h3>
            <p>Go back to: <Link className='text-amber-300' to="/registration">Registration</Link></p>
        </div>
    );
};

export default TermsAndConditions;