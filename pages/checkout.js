import Layout from '../src/components/layout';
import {
	HEADER_FOOTER_ENDPOINT,
	WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from '../src/utils/constants/endpoints';
import axios from 'axios';
import CheckoutForm from '../src/components/checkout/checkout-form';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

export default function Checkout({ headerFooter, countries, paymentModes }) {

	paymentModes = paymentModes.filter(obj => 
		{
		if (obj.enabled == true) {
			return true;
		}
	});
	
	console.log("paymentModes", paymentModes);
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1>Checkout</h1>
			<CheckoutForm countriesData={countries} paymentModes={ paymentModes } />
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: countries } = await axios.get( WOOCOMMERCE_COUNTRIES_ENDPOINT );
	const { data: paymentModes } = await api.get('payment_gateways');

	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			countries: countries || {},
			paymentModes: paymentModes || {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
