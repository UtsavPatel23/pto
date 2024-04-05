import Layout from '../../src/components/layout';
import {
	HEADER_FOOTER_ENDPOINT, WEB_DEVICE,
} from '../../src/utils/constants/endpoints';
import axios from 'axios';
import CheckoutForm from '../../src/components/checkout/checkout-form';
import { get_countries } from '../../src/utils/customjs/custome';

export default function Checkout({ headerFooter }) {
	const countries = get_countries();
	var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	const options = headerFooter?.footer?.options;
	paymentModes = paymentModes.filter(obj => {
		if (!WEB_DEVICE) {
			return obj.method_enabled_mobile;
		} else {
			return obj.method_enabled;
		}
	});
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border'>Checkout</h1>
			<CheckoutForm countriesData={countries} paymentModes={paymentModes} options={options} />
		</Layout>
	);
}

export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);

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
