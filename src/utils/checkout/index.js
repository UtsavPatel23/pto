import { isArray, isEmpty } from 'lodash';
import { createCheckoutSession } from 'next-stripe/client'; // @see https://github.com/ynnoj/next-stripe
import { loadStripe } from '@stripe/stripe-js';
import { createTheOrder, getCreateOrderData } from './order';
import { clearCart } from '../cart';
import axios from 'axios';
import { WOOCOMMERCE_STATES_ENDPOINT } from '../constants/endpoints';

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
export const handleOtherPaymentMethodCheckout = async (shippingCost,couponName, input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData ) => {
	setIsOrderProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products);
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
export const handleStripeCheckout = async (shippingCost,couponName,totalPriceDis, input, products, setRequestError, setCart, setIsProcessing, setCreatedOrderData ,coutData,setCoutData) => {
	//console.log('input order ',input);
	setIsProcessing( true );
	const orderData = getCreateOrderData(shippingCost,couponName, input, products ,coutData);
	//console.log('input orderData',orderData);return '';
	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );
	setCoutData('');
	const cartCleared = await clearCart( setCart, () => {
	} );
	setIsProcessing( false );
	
	if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
		setRequestError( 'Clear cart failed' );
		return null;
	}
	
	// On success show stripe form.
	setCreatedOrderData( customerOrderData );
	await createCheckoutSessionAndRedirect( totalPriceDis,products, input, customerOrderData?.orderId,customerOrderData?.orderPostID );
	
	return customerOrderData;
};

/**
 * Create Checkout Session and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
const createCheckoutSessionAndRedirect = async ( totalPriceDis,products, input, orderId,orderPostID ) => {
	const sessionData = {
		success_url: window.location.origin + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${ orderId }`,
		cancel_url: window.location.href,
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
	try {
		const stripe = await loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );
		if ( stripe ) {
			stripe.redirectToCheckout( { sessionId: session.id } );
		}
	} catch ( error ) {
		console.log( error );
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

