import { isEmpty } from 'lodash';
import { WCAPI_QUERY_PRM } from '../constants/endpoints';
import { serialize } from '../customjs/custome';
const axios = require('axios');

/**
 * Create order.
 *
 * @return {Promise<void>}
 */
 export const createOrderWC = async ( orderData ) => {
    
    const responseData = {
      success: false,
      orderId: '',
      total: '',
      currency: '',
      error: '',
      order_key: '',
    };
    
    var srData = WCAPI_QUERY_PRM+serialize(orderData);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/orders/'+srData+'&create_order=1',
      };
  await axios.request(config)
        .then((response) => {
          const {data } = response;
          
          responseData.success = true;
          responseData.orderId = data.number;
          responseData.orderPostID = data.id;
          responseData.total = data.total;
          responseData.currency = data.currency;
          responseData.paymentUrl = data.payment_url;
          responseData.order_key = data.order_key;
          responseData.allData = data;
        })
        .catch((error) => {
        console.log('error',error);
        responseData.error = error.message;
        
        });
        return responseData ;
};

// Get Order 
export const get_order = async ( id ) => {	
	const responseData = {
		success: false,
		orderData: '',
		error: '',
	};
	
	if(id == '' || id == undefined)
	{
		responseData.error = 'Required data not sent';
		return responseData;
	}
	
	let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/orders/'+id+WCAPI_QUERY_PRM,
      };
	await axios.request(config)
	.then((response) => {
		const {data } = response;
		
		console.log("Order ", data);
		
		responseData.success = true;
		responseData.data = {orderData :data};
		console.log("Create responseData", responseData);
		
	})
	.catch((error) => {
	
		console.log( 'error', error );
		responseData.error = error.message;
		responseData.data = {error : error.message};
	
	});
	return responseData;
	
}

// Get orders
export const get_orders = async ( customer_id ) => {	
	
	const responseData = {
		success: false,
		orderData: '',
		error: '',
	};
	
	if(customer_id == '' || customer_id == undefined)
	{
		responseData.error = 'Required data not sent';
		return responseData;
	}
	const orderReq = {
		customer: customer_id,
		per_page: 99,
	  };
	
	
	var srData = WCAPI_QUERY_PRM+serialize(orderReq);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/orders/'+srData,
      };
  await axios.request(config)
        .then((response) => {
			const {data } = response;
			responseData.success = true;
			responseData.data = {orderData :data};
			console.log("Create responseData", responseData);
		})
        .catch((error) => {
			console.log( 'error', error );
			responseData.data = {error : error.message};
		});
        return responseData ;
	
}


// udate order notes
export const update_order_notes = async ( newOrderNote ) => {

	
	const responseData = {
		success: false,
		error: '',
	};
	
	
	if ( isEmpty( newOrderNote ) ) {
		responseData.error = 'Required data not sent';
		return responseData;
	}
	
	var noteMessage = newOrderNote.noteMessage;
	
	
	
	if(noteMessage != '')
	{
		const noteData = {
			note: noteMessage
		  };
		
		var srData = WCAPI_QUERY_PRM+serialize(noteData);
		let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/orders/'+ newOrderNote.orderId +'/notes'+srData,
			};
		await axios.request(config)
        .then((response) => {
			const {data } = response;
			console.log( '✅ Order note updated data', data );
		})
        .catch((error) => {
			console.error('Order note updated error', error);
		});
	}
    
}

// Order update 
export const update_order = async ( newOrderDataReq ) => {
	const responseData = {
		success: false,
		error: '',
	};
	var noteMessage = '';
	
	
	if ( isEmpty( newOrderDataReq ) ) {
		responseData.error = 'Required data not sent';
		return responseData;
	}
	
	let newOrderData = {};
	if(newOrderDataReq?.web_to_mobil == 1)
	{
		newOrderData = {
			meta_data: [
				{
				  "key": "_web_to_mobil",
				  "value": newOrderDataReq._web_to_mobil
				}
			  ]
		}
	}
	else if(newOrderDataReq?.redeem == 1)
	{
		newOrderData = {
			meta_data: [
				{
				  "key": "_redeemed_reward_points",
				  "value": newOrderDataReq._redeemed_reward_points
				},
				{
				  "key": "_reward_points_used",
				  "value": "1"
				}
			  ]
		}
	}else if(newOrderDataReq?.bacs == 1)
	{
		newOrderData = {
			status: 'on-hold',
		}
		noteMessage = 'Awaiting BACS payment Order status changed from Pending payment to On hold.';
	}else if(newOrderDataReq?.orderStausAfterpay == 1)
	{
		newOrderData = {
			status: 'snv'
		}
		noteMessage = 'Order charge successful in '+newOrderDataReq?.payment_method+'. Token : ' +newOrderDataReq?.orderToken+ "  Order no : "+newOrderDataReq?.orderno;
	}else if(newOrderDataReq?.orderStausLaybuy == 1)
	{
		newOrderData = {
			status: 'snv'
		}
		noteMessage = 'Order charge successful in '+newOrderDataReq?.payment_method+'. Token : ' +newOrderDataReq?.token+ "  Order no : "+newOrderDataReq?.orderno;
	}else if(newOrderDataReq?.paypal == 1)
	{
		newOrderData = {
			status: 'snv',
			meta_data: [
				{
				  "key": "_create_checkout_token",
				  "value": newOrderDataReq?.token
				}
				],
		}
		noteMessage = 'Order charge successful in '+newOrderDataReq?.payment_method+'. Token : ' +newOrderDataReq?.token+ "  Order no : "+newOrderDataReq?.orderno;
	}else if(!isEmpty(newOrderDataReq?.meta_data)){
		newOrderData = {meta_data : newOrderDataReq?.meta_data};
	}else if(newOrderDataReq?.paymentMethodUpdate == 1)
	{
		newOrderData = {
			meta_data: [
				{
				  "key": "_payment_method",
				  "value": newOrderDataReq.paymentMethodName
				},
				{
				  "key": "_payment_method_title",
				  "value":newOrderDataReq.paymentMethodName
				}
			  ]
		}
	}else if(newOrderDataReq?.orderCancelledByCustomer == 1)
	{
		newOrderData = {
			status: 'cancelled',
		}
		noteMessage = 'Order cancelled by customer. ';
	}
	
	if(newOrderDataReq?.customer_id != '' && newOrderDataReq?.customer_id != undefined)
		{
			newOrderData = {...newOrderData,customer_id : newOrderDataReq?.customer_id}
		}
		
	if(noteMessage != '')
	{

		const newOrderNote = {
			orderId: newOrderDataReq.orderId,
			noteMessage: noteMessage
		};
		await update_order_notes(newOrderNote);

	}
	
	// Update order
	var srData = WCAPI_QUERY_PRM+serialize(newOrderData);
		let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL +'/wp-json/wc/v3/orders/'+ newOrderDataReq.orderId +srData,
			};
		await axios.request(config)
        .then((response) => {
			const {data } = response;
			console.log( '✅ Order updated data', data );
			responseData.success = true;
		//responseData.newOrderData = newOrderData;
		})
        .catch((error) => {
			console.log( 'error', error );
			responseData.data = {error : error.message};
		});
	return responseData;
}