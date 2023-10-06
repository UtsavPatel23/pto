/**
 * Internal Dependencies.
 */
 //import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_PRODUCTLIST_BY_PARAMETER} from '../../src/utils/constants/endpoints';
 import isEmpty from 'is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import Layout from '../../src/components/layout';
import Products from '../../src/components/products';


 export default function tag_slug({ headerFooter, products }) {
    //console.log('params',params);
    //console.log('products',products);
    
    
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
                <Products products={products}/>
            </Layout>
        )
    }
    
 }


export async function getServerSideProps(context){
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
   
    const {data : res} = await axios.get(SHOP_PRODUCTLIST_BY_PARAMETER,context);
	
    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
            products: res,
        },
    };
  };
  
 

