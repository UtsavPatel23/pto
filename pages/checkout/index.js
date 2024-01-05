import Layout from '../../src/components/layout';
import {
	HEADER_FOOTER_ENDPOINT,
	WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from '../../src/utils/constants/endpoints';
import axios from 'axios';
import CheckoutForm from '../../src/components/checkout/checkout-form';
import { get_countries } from '../../src/utils/customjs/custome';

export default function Checkout({ headerFooter }) {
	const countries = get_countries();
	var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	const options = headerFooter?.footer?.options;
	paymentModes = paymentModes.filter(obj => 
		{
		if (obj.method_enabled == true) {
			return true;
		}
	});
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1>Checkout</h1>
			<CheckoutForm countriesData={countries} paymentModes={ paymentModes } options={options}/>
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		
	};
}
