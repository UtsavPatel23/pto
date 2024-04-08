import Link from 'next/link';
import React from 'react';
import { signOut } from "next-auth/react";
import Image from 'next/image';
import icon1 from '../../../public/assets/img/my-account/1dash.png';
import icon2 from '../../../public/assets/img/my-account/2mydetail.png';
import icon3 from '../../../public/assets/img/my-account/3address.png';
import icon4 from '../../../public/assets/img/my-account/4rewards.png';
import icon5 from '../../../public/assets/img/my-account/5order.png';
import icon6 from '../../../public/assets/img/my-account/6cart.png';
import icon7 from '../../../public/assets/img/my-account/7wishlist.png';
import icon8 from '../../../public/assets/img/my-account/8track.png';
import icon9 from '../../../public/assets/img/my-account/9faq.png';
import icon10 from '../../../public/assets/img/my-account/10logout.png';
import { useState } from 'react';

function Sidebar({ setTokenValid, setIsMyaccountOpen, isMyaccountOpen }) {
    //function logout
    const logoutHanlder = async () => {
        let tokenName = localStorage.getItem('token');
        //remove token from localstorage
        localStorage.setItem("token", '');
        localStorage.setItem("user_lgdt", '');
        localStorage.setItem('customerData', '');
        localStorage.setItem('coutData', '');
        if (tokenName == 'logingoogle') {
            await signOut();
        } else {
            setTokenValid(0);
        }
    };
    const closeMyaccount = () => {
        setIsMyaccountOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full w-full opacity-50 bg-black z-10 ${isMyaccountOpen ? 'block' : 'hidden'}`} onClick={closeMyaccount}
            ></div>
            <div id='accountsidebar' className={`shadow-full md:shadow-none bg-white  ${isMyaccountOpen ? 'right-0' : '-right-full'}`}>
                <div className='relative profilter overflow-y-auto scroll-smooth theme-scroll'>
                    <div key='sidebar' className='border border-gray-300 p-2 xl:w-3/4'>
                        <ul className='space-y-2'>
                            <li>
                                <Link href="/my-account/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon1}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-account/edit-account/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon2}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    My Profile
                                </Link>

                            </li>
                            <li>
                                <Link href="/my-account/edit-address/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon3}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    Addresses
                                </Link>

                            </li>
                            <li>
                                <Link href="/my-account/splashpass" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon4}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    Splash Pass Rewards
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-account/orders/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon5}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    My Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon6}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon7}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    My Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon8}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    Track Order
                                </Link>

                            </li>
                            <li>
                                <Link href="/faqs/" className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon9}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <button onClick={logoutHanlder} className='flex gap-3 items-center shadow-full border border-gray-300 hover:border-victoria-700 py-1 px-2 w-full text-base font-medium'>
                                    <Image
                                        src={icon10}
                                        alt="Dashboard"
                                        width={40}
                                        height={40}
                                    />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
