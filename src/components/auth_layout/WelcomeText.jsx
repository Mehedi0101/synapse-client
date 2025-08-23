import React from 'react';

const WelcomeText = () => {
    return (
        // ---------- texts above login and registration form ----------
        <div className='max-w-96 text-center mx-auto my-10'>
            <h2 className='font-poppins text-2xl xl:text-3xl font-semibold text-white'>Welcome to Synapse</h2>
            <p className='text-sm xl:text-base text-gray-300 mt-4'>Join our community where knowledge, mentorship, and career opportunities come together.</p>
        </div>
    );
};

export default WelcomeText;