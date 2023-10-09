/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getProductsData, getProductBySlug, getRelatedProductData } from '../../src/utils/products';
import Layout from '../../src/components/layout';
import SingleProduct from '../../src/components/single-product';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '../../src/utils/customjs/custome';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export default function Product( { headerFooter, product ,RelatedProduct} ) {
	console.log('product',product);
	console.log('RelatedProduct',RelatedProduct);
	const router = useRouter();
	const [your_browsing_history, setYour_browsing_history] = useState('');
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}
	useEffect(()=>{
		var tmp_product_cookiedata = [] ;
		var product_cookiedata = getCookie('your_browsing_history');
		
		if(!isEmpty(product_cookiedata) && (product_cookiedata != ''))
		{
			product_cookiedata = JSON.parse(product_cookiedata);
			//console.log('L = ',product_cookiedata.length);
			//console.log('get coo  = ',product_cookiedata);
			var isadded =  product_cookiedata.findIndex(element =>{
				//console.log('element',element.id);
				return(element.id == product.id);
			} );
			//console.log('isadded',isadded);
			if(isadded < 0)
			{
				if(product_cookiedata.length > 4)
				{
					product_cookiedata.shift();
				}
				product_cookiedata[product_cookiedata.length] = {
					id:product.id,
					name:product.name,
					images:product.images,
					slug:product.slug,
					};
				//console.log('tmp',product_cookiedata);
				setCookie('your_browsing_history',JSON.stringify(product_cookiedata),5);
			}
			
		}else{
			//console.log('tmp',product_cookiedata);
			tmp_product_cookiedata[0] = {
				id:product.id,
				name:product.name,
				images:product.images,
				slug:product.slug,
				}; 
			setCookie('your_browsing_history',JSON.stringify(tmp_product_cookiedata),5);
		}

		var list_bh_product = getCookie('your_browsing_history');
		
		if(!isEmpty(list_bh_product) && (list_bh_product != ''))
		{
			list_bh_product = JSON.parse(list_bh_product);
			var display_list_index =  list_bh_product.findIndex(element =>{
				return(element.id == product.id);
			} );
			if (display_list_index > -1) { // only splice array when item is found
				list_bh_product.splice(display_list_index, 1); // 2nd parameter means remove one item only
			}
		  //console.log('list_bh_product',list_bh_product);
		//setYour_browsing_history(list_bh_product);
		}
	},[]);
	return (
		<Layout
			headerFooter={ headerFooter || {} }
			seo={ product?.yoast_head_json ?? {} }
			uri={ `/product/${ product?.slug ?? '' }` }
		>
			<SingleProduct product={ product } your_browsing_history={your_browsing_history}/>
		</Layout>
	);
}

export async function getStaticProps( { params } ) {
	
	const { slug } = params || {};
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductBySlug( slug );
	const { data: RelatedProduct } = await getRelatedProductData(product[ 0 ].related_ids);
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product.length ? product[ 0 ] : {},
			RelatedProduct: RelatedProduct.length ? RelatedProduct : {},
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const { data: products } = await getProductsData();
	
	// Expected Data Shape: [{ params: { slug: 'pendant' } }, { params: { slug: 'shirt' } }],
	const pathsData = [];
	
	products.length && products.map( ( product ) => {
		if ( product.slug ) {
			pathsData.push( { params: { slug: product.slug ?? '' } } );
		}
	} );
	
	return {
		paths: pathsData,
		fallback: true,
	};
}
