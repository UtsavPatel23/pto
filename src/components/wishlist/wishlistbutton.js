import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { addWishlist, removeWishlist } from '../../utils/wishlist';
import { useRouter } from 'next/router';
import Router from "next/router";


var spiner = '';
function wishlistButton({ customerData, setCustomerData, product, tokenValid, listing }) {

    const [wishlist, setWishlist] = useState(0);
    const router = useRouter();
    const [wishlistLoding, setWishlistLoding] = useState(false);
    const [wlPopup, setWlPopup] = useState(false);

    const removeWishlistPro = () => {
        removeWishlist(customerData, setCustomerData, product, setWishlistLoding, setWishlist);
    }

    const addWishlistPro = async () => {
        if (customerData?.id) {
            addWishlist(customerData, setCustomerData, product, setWishlistLoding, setWishlist);
        } else {
            setWlPopup(true);
        }
    }
    useEffect(() => {
        if (tokenValid == 1 && customerData?.wishlist != '') {
            const wishlistValue = customerData?.wishlist && (customerData?.wishlist != 0) ? customerData?.wishlist.find(function (element) {
                return element == product?.id;
            }) : null

            if (wishlistValue) {
                setWishlist(1);
            } else {
                setWishlist(0);
            }
        }

    }, [tokenValid, product]);



    return (
        <div key='wishlist' className={`border border-victoria-700 flex items-center justify-center ${listing ? 'w-fit mx-auto' : ''}`}>
            {/* Wishlist : */}
            {router?.pathname != '/wishlist' ?
                <>{wishlist == '1' ?
                    <button onClick={removeWishlistPro} className='size-10 inline-block bg-victoria-700'><i className="fa-solid fa-heart text-2xl text-white"></i></button>
                    :
                    <button onClick={addWishlistPro} className='size-10 inline-block'><i className="fa-light fa-heart text-2xl text-victoria-700"></i></button>
                }</>
                : <button onClick={removeWishlistPro} className='size-10 inline-block'>
                    {listing ? <i className="fa-solid fa-trash text-red-600"></i> : <i className="fa-solid fa-heart text-2xl text-victoria-700"></i>}
                </button>}
            {wishlistLoding ?
                <>
                    <div className='size-10 absolute bg-white flex items-center justify-center'>
                        <span className='wishloader'></span>
                    </div>
                </>
                : null}
            {
                wlPopup ?
                    <section className='home-auto-popup'>
                        <div className="fixed z-20 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5">
                            <div className="w-full max-w-[570px] rounded-[10px] bg-white p-8 text-center relative">
                                <button
                                    onClick={(e) => setWlPopup(false)}
                                    className="absolute top-0 right-0 p-1 text-xl text-gray-500 hover:text-red-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <h3 className="pb-2 text-xl font-semibold ">
                                    You must first <span className='underline'>Login</span> OR <span className='underline'>Create an account</span>  to add to a Wishlist
                                </h3>
                                <span className="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-victoria-800"></span>
                                <div className="-mx-3 sm:flex flex-wrap space-y-3 sm:space-y-0">
                                    <div className="sm:w-1/2 px-3">
                                        <button
                                            onClick={(e) => {
                                                Router.push("/my-account/");
                                            }}
                                            className="block w-full rounded border border-victoria-800 p-3 text-center text-base font-medium text-dark transition hover:border-victoria-800 hover:bg-victoria-800 hover:text-white"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="sm:w-1/2 px-3">
                                        <button
                                            onClick={(e) => {
                                                Router.push("/my-account/");
                                            }}
                                            className="block w-full rounded border bg-victoria-800 p-3 text-center text-base font-medium text-white transition hover:bg-white hover:text-victoria-800 hover:border-victoria-800"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    : null
            }
        </div>
    )
}

export default wishlistButton
