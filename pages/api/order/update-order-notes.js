const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
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
		error: '',
	};
	
	
	if ( isEmpty( req.body ) ) {
		responseData.error = 'Required data not sent';
		res.json(responseData);
	}
	
	var noteMessage = req.body.noteMessage;
	
	
	
	if(noteMessage != '')
	{
		const noteData = {
			note: noteMessage
		  };
		try {
			const {data} = await api.post( `orders/${ req.body.orderId }/notes`, noteData );
			console.log( '✅ Order updated data', data );
		} catch (ex) {
			console.error('Order creation error', ex);
			throw ex;
		}
	}
    
}
