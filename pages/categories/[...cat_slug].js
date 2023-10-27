/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_CATEGORIES_CAT_SLUG,SHOP_PRODUCTLIST_BY_PARAMETER} from '../../src/utils/constants/endpoints';
 import isEmpty from 'is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../../src/components/layout';
import Products from '../../src/components/products';
import Category from '../../src/components/categories/category';


 export default function cat_slug({ headerFooter, products ,categories}) {
    //console.log('params',params);
    console.log('products',products);
    console.log('categories',categories);
    
    
    if(isEmpty(products))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    }else{
        return (
            <Layout headerFooter={headerFooter || {}}>
                <div key={'cat_'+categories.length} className=" flex flex-wrap -mx-3 overflow-hidden product-filter-right ">
                { categories.length ? categories.map( category => {
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


export async function getServerSideProps(context){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
   
    const {data : res} = await axios.get(SHOP_PRODUCTLIST_BY_PARAMETER,context);
    const {data : res_cat} = await axios.get(SHOP_CATEGORIES_CAT_SLUG,context);
	
    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
            products: res,
            categories: res_cat,
        },
    };
  };
  
 

