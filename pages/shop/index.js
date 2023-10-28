/**
 * Internal Dependencies.
 */
import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT, SHOP_PRODUCTLIST } from '../../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
//import { getProductsData } from '../../src/utils/products'; // api default
import Layout from '../../src/components/layout';

export default function Home({ headerFooter, products }) {
	console.log('products',products);
	//debugger;
	const seo = {
		title: 'Shop',
		description: 'dis shop',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}
	return (
		<Layout headerFooter={ headerFooter || {} } seo={ seo }>
			<Products products={products}/>
		</Layout>
	)
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	//const res = await fetch('https://pooltableoffers.com.au/snv/api_json/product/products_data.js');
	const res = await fetch(SHOP_PRODUCTLIST);
	let products = await res.json();
	//const {data : res} = await axios.get(SHOP_PRODUCTLIST);

  
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			products: products,
			//products: res,
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
