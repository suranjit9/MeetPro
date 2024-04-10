import Image from 'next/image';
import React from 'react';

const Loader = () => {
    return (
        <div className='flex-center h-screen w-full'>
            <Image src='/icons/loading-circle.svg' alt='loader' width={100} height={100}/>
        </div>
    );
};

export default Loader;