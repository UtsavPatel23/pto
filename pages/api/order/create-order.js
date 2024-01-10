const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
} );

// pages/api/example.js
import axios from 'axios';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
});



// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

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
	 // Run the middleware
	 await runMiddleware(req, res, cors);
	const responseData = {
		success: false,
		orderId: '',
		total: '',
		currency: '',
		error: '',
		order_key: '',
	};
	
	if ( isEmpty( req.body ) ) {
		responseData.error = 'Required data not sent';
		return responseData;
	}

	if(req.body?.payment_method == '')
	{
		responseData.error = 'Payment method not found.';
		return responseData;
	}
	if(req.body?.line_items == '' || req.body?.line_items == undefined)
	{
		responseData.error = 'Product not found.';
		return responseData;
	}
	
	const data = req.body;
	data.status = 'pending';
	data.set_paid = false;
	
	try {
		const { data } = await api.post(
			'orders',
			req.body,
		);

		console.log("Create Product data", data);
		
		responseData.success = true;
		responseData.orderId = data.number;
		responseData.orderPostID = data.id;
		responseData.total = data.total;
		responseData.currency = data.currency;
		responseData.paymentUrl = data.payment_url;
		responseData.order_key = data.order_key;
		responseData.allData = data;
		
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
