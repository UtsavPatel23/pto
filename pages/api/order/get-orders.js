const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
	consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
	version: "wc/v3"
} );

/**
 * Create order endpoint.
 *
 * @see http://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#create-an-order
 *
 * @param {Object} req Request.
 * @param {Object} res Response.
 *
 * @return {Promise<{orderId: string, success: boolean, error: string}>}
 */
export default async function handler( req, res ) {
	
	const responseData = {
		success: false,
		orderData: '',
		error: '',
	};
	
	if(isEmpty(req?.body))
	{
		responseData.error = 'Required data not sent';
		res.json(responseData);
	}
	const orderReq = {
		customer: req.body.customer_id,
		per_page: 99,
	  };
	try {
		const { data } = await api.get(
			'orders/',orderReq
		);
		responseData.success = true;
		responseData.orderData = data;
		console.log("Create responseData", responseData);
		res.json(responseData);
	} catch ( error ) {
		console.log( 'error', error );
		/**
		 * Request usually fails if the data in req.body is not sent in the format required.
		 *
		 * @see Data shape expected: https://stackoverflow.com/questions/49349396/create-an-order-with-coupon-lines-in-woocomerce-rest-api
		 */
		responseData.error = error.message;
		res.status( 500 ).json( responseData );
	}
	
}
