/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_CATEGORIES,SHOP_CATEGORIES_CAT_SLUG,SHOP_CATEGORIES_CAT_SLUG_CACHE} from '../src/utils/constants/endpoints';
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
import Categories from '../src/components/categories';

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
            
                await get_catdata();
                SetLoading(false);
                setTimeout(function(){
                    if(isEmpty(products))
                    {
                        setDataMsg('Data Not found');
                    }
                },500)
     })();
    }, [slug])
     
     const get_catdata = async () => { 
         if (slug != undefined)
         {
             if (slug == 'all') { 
                 const { data: CategoriesData } = await axios.post(SHOP_CATEGORIES);
                 console.log('CategoriesData', CategoriesData);
                 var rsCat = CategoriesData;
             } else {
                 const {data : res_cat_cache} = await axios.get(SHOP_CATEGORIES_CAT_SLUG_CACHE+'product_cat_'+slug+'.js');
                if(res_cat_cache?.products != undefined)
                {
                    var rsCat = res_cat_cache;
                }else{
                    const { data: res_cat } = await axios.get(SHOP_CATEGORIES_CAT_SLUG, {cat_slug:slug});
                    var rsCat = res_cat;
                }
             }
            
            setCategories(rsCat);  
        }
        
     }
     console.log('slug', slug);
     console.log('categories', categories);
    
    if(loading)
    {
         return(
            <Layout headerFooter={headerFooter || {}}>
                { loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
            </Layout>
        )
    }
    else if(isEmpty(categories))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                {dataMsg}
            </Layout>
        )
    } else if (slug == 'all')
    {
        return (
            <Layout headerFooter={headerFooter || {}}>
                <Categories categories={categories || {}}></Categories>
            </Layout>
        )
    }
    else {
        console.log('cat_list', cat_list);
        return (
            <Layout 
            headerFooter={headerFooter || {}}
            seo={ cat_data?.yoast_head_json ?? {} }
            uri={ `/categories/${ cat_data?.term_link?? '' }` }
            >
                {cat_list != undefined ? 
                <div key={'cat_'+cat_list.length} className=" flex flex-wrap -mx-3 overflow-hidden product-filter-right ">
                {  cat_list.length > 0 ? cat_list.map( category => {
					return (
						<Category key={ category?.id } category={category} />
					)
				} ) : null  } 
                </div> : null}
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
  


