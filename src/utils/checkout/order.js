/**
 * Get line items for create order
 *
 * @param {array} products Products.
 *
 * @returns {*[]|*} Line items, Array of objects.
 */
import { isArray, isEmpty } from 'lodash';

export const getCreateOrderLineItems = ( products ) => {
	
	if ( isEmpty( products ) || ! isArray( products ) ) {
		return [];
	}
	
	return products?.map(
		( { product_id, quantity } ) => {
			return {
				quantity,
				product_id,
				// variation_id: '', // @TODO to be added.
			};
		},
	);
};

/**
 * Get Formatted create order data.
 *
 * @param order
 * @param products
 * @return {{shipping: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}, payment_method_title: string, line_items: (*[]|*), payment_method: string, billing: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}}}
 */
export const getCreateOrderData = ( shippingCost,couponName,order, products ,coutData,cartSubTotalDiscount) => {
	// Set the billing Data to shipping, if applicable.
	const shippingData = order.billingDifferentThanShipping ? order.shipping : order.billing;
	
	var tmpOrderData = {
		billing: {
			first_name: order?.billing?.firstName,
			last_name: order?.billing?.lastName,
			address_1: order?.billing?.address1,
			address_2: order?.billing?.address2,
			city: order?.billing?.city,
			country: order?.billing?.country,
			state: order?.billing?.state,
			postcode: order?.billing?.postcode,
			email: order?.billing?.email,
			phone: order?.billing?.phone,
			company: order?.billing?.company,
		},
		shipping: {
			first_name: shippingData?.firstName,
			last_name: shippingData?.lastName,
			address_1: shippingData?.address1,
			address_2: shippingData?.address2,
			city: shippingData?.city,
			country: shippingData?.country,
			state: shippingData?.state,
			postcode: shippingData?.postcode,
			email: shippingData?.email,
			phone: shippingData?.phone,
			company: shippingData?.company,
		},
		"fee_lines":[             
			{    
				"name":"Shipping:",
				"total":shippingCost.toString()
			}
		],
		"customer_note":order.orderNotes,
		payment_method: order?.paymentMethod,
		payment_method_title: order?.paymentMethod,
		line_items: getCreateOrderLineItems( products ),
	}
	// Add discount coupon
	if(couponName != '' && (undefined != couponName)) {
		tmpOrderData = { ...tmpOrderData, ...{
			"coupon_lines" :[
				{
						"code" : couponName
				}
			]
			}};
	}
	// Add redeem pride
	if(coutData?.redeemPrice != undefined)
		{
			if(coutData?.redeemPrice > 0)
			{
				tmpOrderData = { ...tmpOrderData, ...{
					"fee_lines":[             
						...tmpOrderData.fee_lines,
						{    
							"name":"Redeem Price:",
							"total": '-'+coutData?.redeemPrice.toString()
						}
					],
					"meta_data" : [
						{
						  "key": "_customer_after_reedem_reward_points",
						  "value": order?._customer_after_reedem_reward_points
						}
					  ]
					}};


			}
		}

	
	if(Object.keys(cartSubTotalDiscount).length > 0)
	{
			Object.keys(cartSubTotalDiscount).map(function(key) {
				if(cartSubTotalDiscount[key] != '')
				{
					tmpOrderData = { ...tmpOrderData, ...{
						"fee_lines":[             
							...tmpOrderData.fee_lines,
							{    
								"name":cartSubTotalDiscount[key].name,
								"total": '-'+cartSubTotalDiscount[key].discount.toFixed(2)
							}
						]
						}};
				}
				
			})
	}

	// Checkout data.
	return tmpOrderData;
};

/**
 * Create order.
 *
 * @param {Object} orderData Order data.
 * @param {function} setOrderFailedError sets the react state to true if the order creation fails.
 * @param {string} previousRequestError Previous request error.
 *
 * @returns {Promise<{orderId: null, error: string}>}
 */
export const createTheOrder = async ( orderData, setOrderFailedError, previousRequestError ) => {
	let response = {
		orderPostID: null,
		orderId: null,
		total: '',
		currency: '',
		error: '',
		order_key: '',
		order_key: '',
	};
	
	// Don't proceed if previous request has error.
	if ( previousRequestError ) {
		response.error = previousRequestError;
		return response;
	}
	
	setOrderFailedError( '' );
	
	try {
		const request = await fetch( '/api/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( orderData ),
		} );
		
		const result = await request.json();
		//console.log('c order',result);
		if ( result.error ) {
			response.error = result.error;
			setOrderFailedError( 'Something went wrong. Order creation failed. Please try again' );
		}
		response.orderId = result?.orderId ?? '';
		response.orderPostID = result?.orderPostID ?? '';
		response.total = result.total ?? '';
		response.currency = result.currency ?? '';
		response.paymentUrl = result.paymentUrl ?? '';
		response.order_key = result.order_key ?? '';
		
	} catch ( error ) {
		// @TODO to be handled later.
		console.warn( 'Handle create order error', error?.message );
	}
	
	return response;
};
