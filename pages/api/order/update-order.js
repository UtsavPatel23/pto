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
	var noteMessage = '';
	
	
	if ( isEmpty( req.body ) ) {
		responseData.error = 'Required data not sent';
		res.json(responseData);
	}
	
	let newOrderData = {};
	if(req.body?.redeem == 1)
	{
		newOrderData = {
			meta_data: [
				{
				  "key": "_redeemed_reward_points",
				  "value": req.body._redeemed_reward_points
				},
				{
				  "key": "_reward_points_used",
				  "value": "1"
				}
			  ]
		}
	}else if(req.body?.bacs == 1)
	{
		newOrderData = {
			status: 'on-hold',
		}
		noteMessage = 'Awaiting BACS payment Order status changed from Pending payment to On hold.';
	}else if(req.body?.orderStausAfterpay == 1)
	{
		newOrderData = {
			status: 'snv'
		}
		noteMessage = 'Order charge successful in '+req.body?.payment_method+'. Token : ' +req.body?.orderToken+ "  Order no : "+req.body?.orderno;
	}else if(req.body?.orderStausLaybuy == 1)
	{
		newOrderData = {
			status: 'snv'
		}
		noteMessage = 'Order charge successful in '+req.body?.payment_method+'. Token : ' +req.body?.token+ "  Order no : "+req.body?.orderno;
	}else if(req.body?.paypal == 1)
	{
		newOrderData = {
			status: 'snv',
			meta_data: [
				{
				  "key": "_create_checkout_token",
				  "value": req.body?.token
				}
				],
		}
		noteMessage = 'Order charge successful in '+req.body?.payment_method+'. Token : ' +req.body?.token+ "  Order no : "+req.body?.orderno;
	}else if(!isEmpty(req.body?.meta_data)){
		newOrderData = {meta_data : req.body?.meta_data};
	}else if(req.body?.paymentMethodUpdate == 1)
	{
		newOrderData = {
			meta_data: [
				{
				  "key": "_payment_method",
				  "value": req.body.paymentMethodName
				},
				{
				  "key": "_payment_method_title",
				  "value":req.body.paymentMethodName
				}
			  ]
		}
	}else if(req.body?.orderCancelledByCustomer == 1)
	{
		newOrderData = {
			status: 'cancelled',
		}
		noteMessage = 'Order cancelled by customer. ';
	}
	
	if(req.body?.customer_id != '')
		{
			newOrderData = {...newOrderData,customer_id : req.body?.customer_id}
		}
		
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
    

	try {
		const {data} = await api.put( `orders/${ req.body.orderId }`, newOrderData );
		console.log( '✅ Order updated data', data );
		responseData.success = true;
		//responseData.newOrderData = newOrderData;
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
