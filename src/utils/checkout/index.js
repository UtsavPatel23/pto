import { isArray, isEmpty } from 'lodash';
import { createCheckoutSession } from 'next-stripe/client'; // @see https://github.com/ynnoj/next-stripe
import { loadStripe } from '@stripe/stripe-js';
import { createTheOrder, getCreateOrderData } from './order';
import { clearCart } from '../cart';
import axios from 'axios';
import { NEXT_PUBLIC_SITE_API_URL, WEB_DEVICE, WOOCOMMERCE_STATES_ENDPOINT } from '../constants/endpoints';
import Router from 'next/router';
import { update_order, update_order_notes } from '../apiFun/order';

/**
 * Handle Other Payment Method checkout.
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsOrderProcessing
 * @param setCreatedOrderData
 * @return {Promise<{orderId: null, error: string}|null>}
 */
export const handleOtherPaymentMethodCheckout = async (shippingCost,couponName, input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData,cartSubTotalDiscount ) => {
	setIsOrderProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products,cartSubTotalDiscount);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	const cartCleared = await clearCart( setCart, () => {
	} );
	setIsOrderProcessing( false );
	
	if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
		setRequestError( 'Clear cart failed' );
		return null;
	}
	
	setCreatedOrderData( customerOrderData );
	
	return customerOrderData;
};

/**
 * Handle Stripe checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 4. On success set show stripe form to true
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsProcessing
 *
 * @param setCreatedOrderData
 */
export const handleStripeCheckout = async (
					shippingCost,
					couponName,
					totalPriceDis, 
					input, 
					products, 
					setRequestError, 
					setCart, 
					setIsProcessing, 
					setCreatedOrderData,
					coutData,
					setCoutData,
					cartSubTotalDiscount
					) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData,cartSubTotalDiscount);
	//console.log('input orderData',orderData);return '';
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	setCoutData('');
	
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	await createCheckoutSessionAndRedirect( 
					totalPriceDis,
					products, 
					input, 
					customerOrderData?.orderId,
					customerOrderData?.orderPostID,
					setIsProcessing,
					customerOrderData?.order_key,
					1, // checkOutOrderPay
					setRequestError,
					setCart,
					customerOrderData
					);
	
	return customerOrderData;
};

/**
 * Handle Bacs Direct bank transfer  checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 
 */
 export const handleBacsCheckout = async (
				shippingCost,
				couponName,
				totalPriceDis, 
				input, 
				products, 
				setRequestError, 
				setCart, 
				setIsProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData,cartSubTotalDiscount);
	console.log('input orderData',orderData);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	console.log('customerOrderData',customerOrderData);
	const newOrderData = {
		bacs : 1,
		orderId: customerOrderData?.orderPostID,
	};
	 update_order(newOrderData);
   	
	setCoutData('');
	const cartCleared = await clearCart( setCart, () => {
	} );
	setIsProcessing( false );
	
	if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
		setRequestError( 'Clear cart failed' );
		return null;
	}
	
	//window.location.href = process.env.NEXT_PUBLIC_SITE_URL+'/thank-you/?orderPostnb='+window.btoa(customerOrderData?.orderPostID)+'&orderId='+customerOrderData?.orderId+'&status=SUCCESS';
	Router.push('/thank-you/?orderPostnb='+window.btoa(customerOrderData?.orderPostID)+'&orderId='+customerOrderData?.orderId+'&status=SUCCESS');
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	
	return customerOrderData;
};

/**
 * Handle Afterpay  checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 
 */
 export const handleAfterpayCheckout = async (
						shippingCost,
						couponName,
						totalPriceDis, 
						input, 
						products, 
						setRequestError, 
						setCart, 
						setIsProcessing, 
						setCreatedOrderData,
						coutData,
						setCoutData,
						cartSubTotalDiscount
						) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData,cartSubTotalDiscount);
	console.log('input orderData',orderData);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	console.log('customerOrderData',customerOrderData);
	setCoutData('');
	
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	await createCheckoutAfterpayAndRedirect( 
					totalPriceDis,
					products, 
					input, 
					customerOrderData?.orderId,
					customerOrderData?.orderPostID,
					setIsProcessing,
					customerOrderData?.order_key,
					1, // checkOutOrderPay
					setRequestError,
					setCart,
					customerOrderData
				);
	return customerOrderData;
};


/**
 * Handle Laybuy  checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 
 */
 export const handleLaybuyCheckout = async (
					shippingCost,
					couponName,
					totalPriceDis, 
					input, 
					products, 
					setRequestError, 
					setCart, 
					setIsProcessing, 
					setCreatedOrderData,
					coutData,
					setCoutData,
					cartSubTotalDiscount
					) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData,cartSubTotalDiscount);
	console.log('input orderData',orderData);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	console.log('customerOrderData',customerOrderData);
	setCoutData('');
	
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	await createCheckoutLaybuyAndRedirect( 
			totalPriceDis,
			products, 
			input, 
			customerOrderData?.orderId,
			customerOrderData?.orderPostID,
			setIsProcessing,
			customerOrderData?.order_key,
			1, // checkOutOrderPay
			setRequestError,
			setCart,
			customerOrderData
			);
	return customerOrderData;
};

/**
 * Handle Laybuy  checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 
 */
 export const handlePaypalCheckout = async (
					shippingCost,
					couponName,
					totalPriceDis, 
					input, 
					products, 
					setRequestError, 
					setCart, 
					setIsProcessing, 
					setCreatedOrderData,
					coutData,
					setCoutData,
					cartSubTotalDiscount
					) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData,cartSubTotalDiscount);
	console.log('input orderData',orderData);
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	console.log('customerOrderData',customerOrderData);
	setCoutData('');
	
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	await createCheckoutPaypalAndRedirect( 
		totalPriceDis,
		products, 
		input, 
		customerOrderData?.orderId,
		customerOrderData?.orderPostID,
		setIsProcessing,
		customerOrderData?.order_key,
		1, // checkOutOrderPay
		setRequestError,
		setCart,
		customerOrderData
		);
	
	return customerOrderData;
};

/**
 * Create Checkout Session and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
export const createCheckoutSessionAndRedirect = async ( 
								totalPriceDis,
								products, 
								input, 
								orderId,
								orderPostID,
								setIsProcessing,
								order_key,
								checkOutOrderPay,
								setRequestError,
								setCart,
								customerOrderData
								) => {
	const sessionData = {
		success_url: NEXT_PUBLIC_SITE_API_URL + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${ orderId }&status=SUCCESS`,
		//cancel_url: window.location.href,
		cancel_url: process.env.NEXT_PUBLIC_SITE_URL+'/checkout/order-pay?orderid='+orderPostID+'&key='+order_key,
		customer_email: input.billingDifferentThanShipping ? input?.shipping?.email : input?.billing?.email,
		//line_items: getStripeLineItems( products ),
		line_items:  [{
			quantity: 1,
			name: 'PTO',
			images: [ 'https://pooltableoffers.com.au/wp-content/uploads/2023/09/logo.png' ],
			amount: Math.round( ( totalPriceDis ) * 100 ),
			currency: 'aud',
		}],
		metadata: getMetaData( input, orderId,orderPostID ),
		payment_method_types: [ 'card' ],
		mode: 'payment',
	};
	console.log( 'sessionData', sessionData );
	
	let session = {};
	try {
		session = await createCheckoutSession( sessionData );
	} catch ( err ) {
		console.log( 'createCheckout session error', err );
	}

	if(session?.id)
	{
		// cartCleared
		if(checkOutOrderPay == 1)
		{
			const cartCleared = await clearCart( setCart, () => {
			} );
			if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
				setRequestError( 'Clear cart failed' );
				return null;
			}
			setIsProcessing( false );
		}

		try {
			const stripe = await loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );
			if ( stripe ) {
				stripe.redirectToCheckout( { sessionId: session.id } );
			}
		} catch ( error ) {
			console.log( error );
		}

	}else{
		const newOrderNote = {
			orderId: orderPostID,
			noteMessage: 'Error : session not created.'
		};
		update_order_notes(newOrderNote);
		setRequestError('Error : session not created.');
		setIsProcessing( false );
	}
	
};

/**
 * Get Stripe Line Items
 *
 * @param products
 * @return {*[]|*}
 */
 const getStripeLineItems = ( products ) => {
	if ( isEmpty( products ) && ! isArray( products ) ) {
		return [];
	}
	
	return products.map( product => {
		return {
			quantity: product?.quantity ?? 0,
			name: product?.data?.name ?? '',
			images: [ product?.data?.images?.[ 0 ]?.src ?? '' ?? '' ],
			amount: Math.round( ( parseFloat(product?.data?.price) ?? 0 ) * 100 ),
			currency: 'aud',
		};
	} );
};

/**
 * Get meta data.
 *
 * @param input
 * @param {String} orderId Order Id.
 *
 * @returns {{shipping: string, orderId: String, billing: string}}
 */
export const getMetaData = ( input, orderId,orderPostID ) => {
	
	return {
		billing: JSON.stringify( input?.billing ),
		shipping: JSON.stringify(input.billingDifferentThanShipping ? input?.shipping?.email : input?.billing?.email),
		orderPostID: orderPostID,
		orderId,
	};
	
	// @TODO
	// if ( customerId ) {
	//     metadata.customerId = customerId;
	// }
	
};

/**
 * Handle Billing Different Than Shipping.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.billingDifferentThanShipping };
	setInput( newState );
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleCreateAccount = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.createAccount };
	setInput( newState );
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
 export const handleAgreeTerms = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.agreeTerms };
	setInput( newState );
};

/**
 * Set states for the country.
 *
 * @param {Object} target Target.
 * @param {Function} setTheStates React useState function to set the value of the states basis country selection.
 * @param {Function} setIsFetchingStates React useState function, to manage loading state when request is in process.
 *
 * @return {Promise<void>}
 */
export const setStatesForCountry = async ( target, setTheStates, setIsFetchingStates ) => {
	if ( 'country' === target.name ) {
		setIsFetchingStates( true );
		const countryCode = target[ target.selectedIndex ].getAttribute( 'data-countrycode' );
		const states = await getStates( countryCode );
		setTheStates( states || [] );
		setIsFetchingStates( false );
	}
};

/**
 * Get states
 *
 * @param {String} countryCode Country code
 *
 * @returns {Promise<*[]>}
 */
export const getStates = async ( countryCode = '' ) => {
	
	if ( ! countryCode ) {
		return [];
	}
	
	const { data } = await axios.get( WOOCOMMERCE_STATES_ENDPOINT, { params: { countryCode } } );
	
	return data?.states ?? [];
};

/**
 * Create Checkout Afterpay and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
export const createCheckoutAfterpayAndRedirect = async ( 
								totalPriceDis,
								products, 
								input, 
								orderId,
								orderPostID,
								setIsProcessing,
								order_key,
								checkOutOrderPay,
								setRequestError,
								setCart,
								customerOrderData
									) => {
	let afterpayOrderData = JSON.stringify({
			"amount": {
			"amount":  totalPriceDis.toFixed(2),
			"currency": "AUD"
			},
			"consumer": {
				"phoneNumber": input?.billing?.phone,
				"givenNames": input?.billing?.firstName ? input?.billing?.firstName : input?.billing?.first_name,
				"surname": input?.billing?.lastName ? input?.billing?.lastName : input?.billing?.last_name,
				"email": input?.billing?.email
				},
			"merchant": {
				"redirectConfirmUrl": NEXT_PUBLIC_SITE_API_URL+'/thank-you/?orderPostnb='+window.btoa(orderPostID)+'&orderId='+orderId+'&WEB_DEVICE='+WEB_DEVICE,
				"redirectCancelUrl": NEXT_PUBLIC_SITE_API_URL+'/thank-you/?orderPostnb='+window.btoa(orderPostID)+'&orderId='+orderId+'&key='+order_key+'&WEB_DEVICE='+WEB_DEVICE,
				//"redirectCancelUrl": NEXT_PUBLIC_SITE_API_URL+'/checkout/order-pay?orderid='+orderPostID+'&key='+order_key+'&WEB_DEVICE='+WEB_DEVICE
				},
			"merchantReference": orderId,
		});
		const createCheckout = {
			afterpay : 1,
			afterpayOrderData: afterpayOrderData,
		};
		var createCheckoutRes = '';
		   await	axios.post( NEXT_PUBLIC_SITE_API_URL + '/api/afterpay/create-checkout', createCheckout )
			.then( res => {
				if(res?.data.redirectCheckoutUrl)
				{
					createCheckoutRes = res?.data;
				}
				//console.log('res ',res);
			} )
			.catch( err => {
				console.log('err ',err);
			} )
		if(createCheckoutRes != '' && createCheckoutRes != undefined)
		{
			const newOrderData = {
				meta_data: [
					{
					  "key": "_create_checkout_token",
					  "value": JSON.stringify(createCheckoutRes)
					}
				  ],
				  orderId : orderPostID,
			};
			await update_order(newOrderData);
			
			// cartCleared
			if(checkOutOrderPay == 1)
			{
				const cartCleared = await clearCart( setCart, () => {
				} );
				if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
					setRequestError( 'Clear cart failed' );
					return null;
				}
				setIsProcessing( false );
			}
			//window.location.href = createCheckoutRes?.redirectCheckoutUrl;
			Router.push(createCheckoutRes?.redirectCheckoutUrl);
		}else{
			const newOrderNote = {
				orderId: orderPostID,
				noteMessage: 'Error :'+ createCheckoutRes?.message
			};
			update_order_notes(newOrderNote);
			setRequestError('Error :' + createCheckoutRes?.message);
			setIsProcessing( false );
		}
};

/**
 * Create Checkout Laybuy and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
 export const createCheckoutLaybuyAndRedirect = async ( 
								totalPriceDis,
								products, 
								input, 
								orderId,
								orderPostID,
								setIsProcessing,
								order_key,
								checkOutOrderPay,
								setRequestError,
								setCart,
								customerOrderData
								) => {
	let laybuyOrderData = {
				amount: totalPriceDis,
				currency: 'AUD',
				returnUrl: NEXT_PUBLIC_SITE_API_URL+'/thank-you/?orderPostnb='+window.btoa(orderPostID)+'&orderId='+orderId+'&key='+order_key+'&WEB_DEVICE='+WEB_DEVICE,
				merchantReference: orderId,
				customer: {
				firstName: input?.billing?.firstName ? input?.billing?.firstName : input?.billing?.first_name,
				lastName: input?.billing?.lastName ? input?.billing?.lastName : input?.billing?.last_name,
				email: input?.billing?.email,
				phone: input?.billing?.phone,
				}
			}
		const createCheckout = {
			laybuy : 1,
			laybuyOrderData: laybuyOrderData,
		};
		console.log('createCheckout',createCheckout);
		var createCheckoutRes = '';
		   await	axios.post( NEXT_PUBLIC_SITE_API_URL +'/api/laybuy/create-checkout', createCheckout )
			.then( res => {
				//if(res?.data.paymentUrl)
				//{
					createCheckoutRes = res?.data;
				//}
				//console.log('res ',res);
			} )
			.catch( err => {
				console.log('err ',err);
			} )
		if(createCheckoutRes != '' && createCheckoutRes != undefined)
		{
			if(createCheckoutRes.result == 'SUCCESS')
			{
				const newOrderData = {
					meta_data: [
						{
						  "key": "_create_checkout_token",
						  "value": JSON.stringify(createCheckoutRes)
						}
					  ],
					  orderId : orderPostID,
				};
				await update_order(newOrderData);
					
				// cartCleared
				if(checkOutOrderPay == 1)
				{
					const cartCleared = await clearCart( setCart, () => {
					} );
					if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
						setRequestError( 'Clear cart failed' );
						return null;
					}
					setIsProcessing( false );
				}
				//window.location.href = createCheckoutRes?.paymentUrl;
				Router.push(createCheckoutRes?.paymentUrl);
			}else{
				const newOrderNote = {
                    orderId: orderPostID,
                    noteMessage: 'Error :'+ createCheckoutRes?.error
                };
				update_order_notes(newOrderNote);
               setRequestError('Error :' + createCheckoutRes?.error);
				setIsProcessing( false );
			}
			
		}
};

/**
 * Create Checkout Paypal and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
 export const createCheckoutPaypalAndRedirect = async ( 
								totalPriceDis,
								products, 
								input, 
								orderId,
								orderPostID,
								setIsProcessing,
								order_key,
								checkOutOrderPay,
								setRequestError,
								setCart,
								customerOrderData
								) => {
				// cartCleared
				if(checkOutOrderPay == 1)
				{
					setIsProcessing( false );
				}
		
};