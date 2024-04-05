import React from 'react'

function MobileBtn({ setIsMyaccountOpen, isMyaccountOpen }) {
    const toggleMyaccount = () => {
        setIsMyaccountOpen(!isMyaccountOpen);
        document.body.style.overflow = 'hidden';
    };
    return (
        <div onClick={toggleMyaccount} className='md:hidden myacc-btn absolute right-0 top-0 flex items-center justify-center size-11 border border-victoria-800 rounded cursor-pointer'>
            <i class="fa-solid fa-user fa-xl text-victoria-700"></i>
        </div>
    )
}

export default MobileBtn