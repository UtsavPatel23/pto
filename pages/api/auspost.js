import axios from "axios";
import { isEmpty } from "lodash";


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
	const config = {
		headers:{
			'accept': 'application/json',
			 'AUTH-KEY': process.env.AUSPOST_KEY,
		 }
	  };

	const responseData = {
		success: false,
		postCodeData : '',
		error: '',
	};
	
	if ( isEmpty( req.query ) ) {
		responseData.error = 'Required data not sent';
		res.json(responseData);
	}
	if(req.query.postcode == '')
	{
		responseData.error = 'Required data not sent';
		res.json(responseData);
	}

	const { postcode } = req?.query ?? {}; 
	
	try {
		 await axios.get('https://digitalapi.auspost.com.au/postcode/search?q='+postcode,config)
		.then(res=> 
			{
				console.log(res);
				responseData.success = true;
				responseData.postCodeData = res;
				res.json(responseData);
			}
			)
		.catch(err=> 
			{
				console.log(err)
				responseData.success = false;
				responseData.error = err;
				res.json(responseData);
			})

		
		
		
		
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
