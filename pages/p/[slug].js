/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT, WEB_DEVICE } from '../../src/utils/constants/endpoints';
import {  getProductBySlug, getreviewsByProID } from '../../src/utils/products';
import Layout from '../../src/components/layout';
import SingleProduct from '../../src/components/single-product';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { useRouter } from 'next/router';
import Router from "next/router";
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export default function Product( { headerFooter, product,reviews } ) {
	console.log('product',product);
	//console.log('reviews',reviews);
	const router = useRouter();
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}
	useEffect(() => {
		if (isEmpty(product)) {
			Router.push("/404/");
		}
	}, [product])
	var p_slug = '/p/'+product?.slug;
		if(!WEB_DEVICE)
			{
				p_slug = '/product/?prodict_single=1&sname='+product?.slug;
			}
	return (
		<Layout
			headerFooter={ headerFooter || {} }
			seo={ product?.yoast_head_json ?? {} }
			uri={ `${ p_slug ?? '' }` }
			pageData = {product}
		>
			<SingleProduct singleProduct={ product } reviews={reviews} options={headerFooter?.footer?.options ?? ''}/>
		</Layout>
	);
}
// getStaticProps // getServerSideProps
export async function getServerSideProps( { params } ) {
	
	const { slug } = params || {};
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductBySlug( slug );
	const { data: reviews } = await getreviewsByProID( product[ 0 ]?.id );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product.length ? product[ 0 ] : {},
			reviews: reviews.length ? reviews : {},
		},
		
	};
}

/*export async function getStaticPaths() {
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
}*/
