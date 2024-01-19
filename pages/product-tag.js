/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_PRODUCTLIST_BY_PARAMETER} from '../src/utils/constants/endpoints';
 import isEmpty from 'is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../src/components/layout';
import Products from '../src/components/products';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Loader from "./../public/loader.gif";

 export default function tag_slug({ headerFooter }) {
    //console.log('params',params);
    const [productsTMP,setProductsTMP] = useState({});
    const slug = process.browser ? Router.query.sname : null;
    const [loading, SetLoading] = useState(true);
    const [dataMsg , setDataMsg] = useState('');
    useEffect(()=>{
        (async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: SHOP_PRODUCTLIST_BY_PARAMETER+'?tag_slug='+slug,
            };
        await axios.request(config)
        .then((response) => {
          const {data } = response;
          setProductsTMP(data);
        })
        .catch((error) => {
        console.log( 'error', error );
        });
        SetLoading(false);
        setTimeout(function(){
            if(isEmpty(productsTMP))
            {
                setDataMsg('Data Not found');
            }
        },500)
    })();
    },[slug != null])
    console.log('productsTMP',productsTMP);
    if(loading)
    {
         return(
            <Layout headerFooter={headerFooter || {}}>
                { loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
            </Layout>
        )
    }
    else if(isEmpty(productsTMP))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
               {dataMsg}
            </Layout>
        )
    }else{
        return (
            <Layout headerFooter={headerFooter || {}}>
                <Products products={productsTMP}/>
            </Layout>
        )
    }
    
 }


export async function getStaticProps(){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
   
    
    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },
    };
  };
  
 

