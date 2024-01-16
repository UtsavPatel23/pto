import axios from "axios";
import { WCAPI_QUERY_PRM } from "../constants/endpoints";
import { serialize } from "../customjs/custome";


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
export const valid_coupon = async ( couponData ) => {	
	const responseData = {
		success: false,
		couponId: '',
		couponData: '',
		error: '',
	};
	
	if(couponData == '' || couponData == undefined)
	{
		responseData.error = 'Required data';
		return responseData;
	}
	

	var srData = WCAPI_QUERY_PRM+serialize(couponData);
		let config = {
				method: 'get',
				maxBodyLength: Infinity,
				url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/coupons/'+srData,
			};
		await axios.request(config)
        .then((response) => {
			const {data } = response;
			console.log( '✅ coupons data', data );
			responseData.success = true;
			responseData.couponData = data[0];
			responseData.couponId = data[0].id;
		})
        .catch((error) => {
				console.log( 'error', error );
				if("Cannot read properties of undefined (reading 'id')" == error.message)
				{
					error.message = "Coupon '"+couponData.code+"' does not exist!"
				}
				responseData.error = error.message;
		});
	return responseData;
}
