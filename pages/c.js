/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_CATEGORIES_CAT_SLUG,SHOP_CATEGORIES_CAT_SLUG_CACHE} from '../src/utils/constants/endpoints';
 import isEmpty from 'is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../src/components/layout';
import Products from '../src/components/products';
import Category from '../src/components/categories/category';
import { useState } from 'react';
import { useEffect } from 'react';
import Router from 'next/router';
import Loader from "./../public/loader.gif";

 export default function cat_slug({ headerFooter}) {
    //console.log('params',params);
    //console.log('products',products);
     
    const [categories,setCategories] = useState({});
    const slug = process.browser ? Router.query.sname : null;
    const [loading, SetLoading] = useState(true);
    const [dataMsg, setDataMsg] = useState('');
    const {products} = categories;
    const {cat_list} = categories;
    const {cat_data} = categories;
    
    useEffect(()=>{
        (async () => {
            if (categories.products == undefined)
            {
                await get_catdata();
                SetLoading(false);
                setTimeout(function(){
                    if(isEmpty(products))
                    {
                        setDataMsg('Data Not found');
                    }
                },500)
            }
            
    })();
    }, [slug != null])
     
     const get_catdata = async () => { 
         if (slug != undefined)
         {
            const {data : res_cat_cache} = await axios.get(SHOP_CATEGORIES_CAT_SLUG_CACHE+'product_cat_'+slug+'.js');
            if(res_cat_cache?.products != undefined)
            {
                var rsCat = res_cat_cache;
            }else{
                const { data: res_cat } = await axios.get(SHOP_CATEGORIES_CAT_SLUG, {cat_slug:slug});
                var rsCat = res_cat;
            }
            setCategories(rsCat);  
        }
        
     }
    console.log('categories',categories);
    
    if(loading)
    {
         return(
            <Layout headerFooter={headerFooter || {}}>
                { loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
            </Layout>
        )
    }
    else if(isEmpty(products))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                {dataMsg}
            </Layout>
        )
    }else{
        return (
            <Layout 
            headerFooter={headerFooter || {}}
            seo={ cat_data?.yoast_head_json ?? {} }
            uri={ `/categories/${ cat_data?.term_link?? '' }` }
            >
                <div key={'cat_'+cat_list.length} className=" flex flex-wrap -mx-3 overflow-hidden product-filter-right ">
                { cat_list.length ? cat_list.map( category => {
					return (
						<Category key={ category?.id } category={category} />
					)
				} ) : null }
                </div>
                <Products products={products}/>
            </Layout>
        )
    }
    
 }


export async function getStaticProps(context){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },
    };
  };
  


