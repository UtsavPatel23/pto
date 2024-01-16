import axios from 'axios';
import { WCAPI_QUERY_PRM} from '../constants/endpoints';
import { serialize } from '../customjs/custome';


// Create customer
export const createCustomers = async ( dataUser ) => {
	const responseData = {
		success: false,
		customers: []
	}
	var srData = WCAPI_QUERY_PRM+serialize(dataUser);
	let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/customers/'+srData,
      };
  await axios.request(config)	
	.then((response) => {
				console.log(response.data);
				responseData.success = true;
				responseData.customers = response.data;
			
				return responseData ;
			  })
			  .catch((error) => {
				console.log(error.response.data);
				responseData.error = error.response.data;
				return responseData ;
			  });
}
// Get curomer
export const getCustomers = async ( email ) => {
	
	const responseData = {
		success: false,
		customers: []
	}
	if(email == '' || email == undefined)
	{
		responseData.error = 'Required data not sent';
		return responseData;
	}
	var srData = WCAPI_QUERY_PRM+'email='+email;
	
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/customers/'+srData,
      };
  await axios.request(config)
        .then((response) => {
			const {data } = response;
			responseData.success = true;
			responseData.customers = data;
			console.log('======customers=====',data);
			return responseData;
        })
        .catch((error) => {
			responseData.error = error.message;
			return responseData;
        
        });
        return responseData ;
}

// update cutpmer
export const updateCustomers = async ( dataUser ) => {
	
	const responseData = {
		success: false,
		customers: []
	}
	var srData = WCAPI_QUERY_PRM+serialize(dataUser);
	let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/customers/'+dataUser.id+srData,
      };
  	await axios.request(config)	
			.then((response) => {
                responseData.success = true;
				responseData.data ={customers:  response.data};
              })
			  .catch((error) => {
				console.log(error.response.data);
				responseData.error = error.response.data;
			  });
    return responseData;	
}
