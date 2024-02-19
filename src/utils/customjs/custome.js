import { WCAPI_QUERY_PRM } from '../constants/endpoints';
import { serialize } from '../customjs/custome';
const axios = require('axios');


// Get orders
export const get_products_ids = async ( product_ids ) => {	
	
	const responseData = {
		success: false,
		productList: '',
		error: '',
	};
	
	if(product_ids == '' || product_ids == undefined)
	{
		responseData.error = 'Required data not sent';
		return responseData;
	}
	const productReq = {
		include: product_ids,
		prodict_list: 1,
	  };
	
	
	var srData = WCAPI_QUERY_PRM+serialize(productReq);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/products/'+srData,
      };
  await axios.request(config)
        .then((response) => {
			const {data } = response;
			responseData.success = true;
			responseData.productList = data;
		})
        .catch((error) => {
			console.log( 'error', error );
			responseData.data = {error : error.message};
		});
        return responseData ;
	
}

