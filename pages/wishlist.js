/**
 * Internal Dependencies.
 */
 import { HEADER_FOOTER_ENDPOINT, SHOP_PRODUCTLIST } from '../src/utils/constants/endpoints';
 import Product from '../src/components/products/product';
 
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../src/components/layout';
 import { useEffect, useState } from 'react';
 ;
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Loader from "./../public/loader.gif";
 
 export default function Home({ headerFooter}) {
     
     const options = headerFooter?.footer?.options;
     const [tokenValid,setTokenValid]=useState(0);
     const [customerData,setCustomerData] = useState(0);
     const [wishlistProducts,setWishlistProducts] = useState(null);
     const customerWishlist  = customerData?.wishlist;
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
         if(localStorage.getItem('token')) {
             setTokenValid(1);
			 if(localStorage.getItem('customerData')) {
             var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
			 setCustomerData(customerDataTMP);
			 }
         }
     }, []);

     useEffect(() => {
        if(customerWishlist)
        {
        (async () => {
            setLoading(true);
            const res1 = await fetch(SHOP_PRODUCTLIST);
            let products1 = await res1.json();
            setWishlistProducts(products1.filter(obj => {
                return (customerWishlist && (customerWishlist != 0))?customerWishlist.find(function (element) {
                    return parseInt(element) == obj['id'];
                   }):null;
                   
               }));
            setLoading(false);
        })();
        }
        return () => {
          // this now gets called when the component unmounts
        };
      }, [customerWishlist]);
     
    
        return (
            <Layout headerFooter={ headerFooter || {} } seo={ seo }>
                <div className='grid grid-cols-4 gap-4'>
                { loading && <img className="loader" src={Loader.src} alt="Loader"/> }
                {wishlistProducts && !isEmpty(wishlistProducts)? wishlistProducts.map( product => {
                        return (
                           <Product  product={product}    tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData}/>
                        )
                       }):<Link href="/shop/" className='mx-1 my-1 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded'>Add Wishlist</Link>}
                </div>
            </Layout>
        )
   
        
     
 }
 
 export async function getStaticProps() {
     
     const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
     
     //const res = await fetch(SHOP_PRODUCTLIST);
     //let products = await res.json();
     
   
     return {
         props: {
             headerFooter: headerFooterData?.data ?? {},
            // products: products,
         },
         
         /**
          * Revalidate means that if a new request comes to server, then every 1 sec it will check
          * if the data is changed, if it is changed then it will update the
          * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
          */
         
     };
 }
 