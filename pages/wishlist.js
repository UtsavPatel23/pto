/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT, WEB_DEVICE, WISHLIST_LIST, WISHLIST_URL } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { useEffect, useState } from 'react';
import Image from '../src/components/image';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { get_products_ids } from '../src/utils/apiFun/productwooapi';
import Loader from '../src/components/loaderspin';
import AddToCart from '../src/components/cart/add-to-cart';
import WishlistButton from '../src/components/wishlist/wishlistbutton'

export default function Home({ headerFooter }) {

    const [tokenValid, setTokenValid] = useState(0);
    const [customerData, setCustomerData] = useState(0);
    const [wishlistProducts, setWishlistProducts] = useState(null);
    const customerWishlist = customerData?.wishlist;
    const [loading, setLoading] = useState(false);
    //debugger;
    const seo = {
        title: 'Wishlist',
        description: 'Dis Wishlist',
        og_image: [],
        og_site_name: 'React WooCommerce Theme',
        robots: {
            index: 'index',
            follow: 'follow',
        },
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setTokenValid(1);
            if (localStorage.getItem('customerData')) {
                var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
                setCustomerData(customerDataTMP);
            }
        }
    }, []);

    useEffect(() => {
        if (customerWishlist && customerWishlist != '') {
            (async () => {
                setLoading(true);
                const productlist = await get_products_ids(customerWishlist.toString());
                const payload = {
                    product_ids: customerWishlist.toString()
                };
                const { data: wishlistList } = await axios.post(WISHLIST_LIST, payload);
                setWishlistProducts(wishlistList);
                //setWishlistProducts(productlist.productList);
                setLoading(false);
            })();
        }
        return () => {
            // this now gets called when the component unmounts
        };
    }, [customerWishlist]);
   
    const clearAll = async() => {
            setLoading(true);
            const payload = {
                user_id: customerData?.id,
                action: 'remove',
                remove: 'all'
            };
            const { data: wishlistData } = await axios.post(WISHLIST_URL, payload);
            
        if (wishlistData?.code == '200') {
                
                    setCustomerData({ ...customerData, wishlist: null });
                    setWishlistProducts(null);
                    localStorage.setItem('customerData', JSON.stringify({ ...customerData, wishlist: null }));
            }
           
        setLoading(false);
        
    }

    return (
        <Layout headerFooter={headerFooter || {}} seo={seo}>
            <>
                {loading && isEmpty(wishlistProducts) ?
                    <div className='my-5 text-center'>
                        <Loader />
                    </div> : null
                }

                {wishlistProducts && !isEmpty(wishlistProducts) ?
                    <>
                        <div className="relative overflow-x-auto">
                            {loading &&
                                <div className='text-center absolute w-full h-full left-0 bg-slate-400 z-10 opacity-60 rounded'>
                                    <Loader />
                                </div>
                            }
                            <table className="border-collapse w-full border border-slate-300">
                                <thead>
                                    <tr>
                                        <th className='border border-slate-300 p-2 '>Image</th>
                                        <th className='border border-slate-300 p-2 text-left'>Product name</th>
                                        <th className='border border-slate-300 p-2 text-left'>Stock status</th>
                                        <th className='border border-slate-300 p-2 text-left'>Action</th>
                                        <th className='border border-slate-300 p-2 text-center'>Clear</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlistProducts.map(product => {
                                        var p_slug = '/p/' + product?.slug;
                                        if (!WEB_DEVICE) {
                                            p_slug = '/product/?sname=' + product?.slug;
                                        }
                                        return (
                                            <tr>
                                                <td className='border border-slate-300 p-2'>
                                                    <Link href={p_slug}>
                                                        <Image
                                                            sourceUrl={product?.img_url}
                                                            altText={product?.name ?? ''}
                                                            title={product?.name ?? ''}
                                                            width="65"
                                                            height="65"
                                                            className="shadow-full mx-auto"
                                                        />
                                                    </Link>
                                                </td>
                                                <td className='border border-slate-300 p-2'>
                                                    <Link href={p_slug}>{product?.name ?? ''}</Link>
                                                </td>
                                                <td className='border border-slate-300 p-2'>
                                                    {product?.stock_quantity > 0 ? <>In stock</> : <>Out of stock</>}
                                                </td>
                                                <td className='border border-slate-300 p-2'>
                                                    {product.stock_quantity >= 1 ?
                                                        <AddToCart product={product} />
                                                        :
                                                        <Link href={p_slug}>
                                                            <span className='hidden sm:inline-block'>Read more</span>
                                                        </Link>
                                                    }
                                                </td>
                                                <td className='border border-slate-300 p-2 text-center'>
                                                    <WishlistButton customerData={customerData} setCustomerData={setCustomerData} product={product} tokenValid={tokenValid} listing={true} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='text-center'>
                            <button onClick={clearAll} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 mt-4'>Clear All</button>
                        </div>
                    </> :
                    <>
                        {(() => {
                            if (customerWishlist == null) {
                                return (
                                    <div className='text-center'>
                                        <Link href="/shop/" className='inline-block p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Add Product To Wishlist</Link>
                                    </div>
                                )
                            }
                        })()}

                    </>
                }
            </>
        </Layout>
    )





}

export async function getStaticProps() {

    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);


    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },

        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */

    };
}
