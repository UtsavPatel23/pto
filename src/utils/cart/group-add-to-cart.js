import { getSession, storeSession } from './session';
import { getApiCartConfig } from './api';
import axios from 'axios';
import { CART_ENDPOINT } from '../constants/endpoints';
import { isEmpty, isArray } from 'lodash';
;

/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 * @param {Function} setCart Sets The New Cart Value
 * @param {Function} setIsAddedToCart Sets A Boolean Value If Product Is Added To Cart.
 * @param {Function} setLoading Sets A Boolean Value For Loading State.
 */
export const groupAddToCart = async( productId, qty = 1, setCart, itemCountAdd,setItemCountAdd, setLoading ,ViewCartaction,i,setAddcartMsg) => {
	const storedSession = getSession();
	const addOrViewCartConfig = getApiCartConfig();
	
	setLoading(true);
	
	await axios.post( CART_ENDPOINT, {
			product_id: productId,
			quantity: qty,
		},
		addOrViewCartConfig,
	)
		.then( async( res ) => {
			
			if ( isEmpty( storedSession ) ) {
				storeSession( res?.headers?.[ 'x-wc-session' ] );
			}
			if (ViewCartaction)
			{
				await groupViewCart(setCart, setLoading);
				setItemCountAdd(i);
			}
			
			//setLoading(false);
		} )
		.catch( err => {
			console.log('err', err);
			setAddcartMsg('You cannot add this product to the cart because the product is just stocked out.');
			setLoading(false);
		} );
};

/**
 * View Cart Request Handler
 *
 * @param {Function} setCart Set Cart Function.
 * @param {Function} setProcessing Set Processing Function.
 */
export const groupViewCart = ( setCart, setProcessing = () => {} ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	axios.get( CART_ENDPOINT, addOrViewCartConfig )
		.then( async( res ) => {
			const formattedCartData = await getFormattedCartData( res?.data ?? [] )
			setCart( formattedCartData );
			setProcessing(false);
		} )
		.catch( err => {
			console.log( 'err', err );
			setProcessing(false);
		} );
};

const getFormattedCartData = ( cartData ) => {
	if ( ! cartData.length ) {
		return null;
	}
	const cartTotal = calculateCartQtyAndPrice( cartData || [] );
	return {
		cartItems: cartData || [],
		...cartTotal,
	};
};

/**
 * Calculate Cart Qty And Price.
 *
 * @param cartItems
 * @return {{totalQty: number, totalPrice: number}}
 */
const calculateCartQtyAndPrice = ( cartItems ) => {
	const qtyAndPrice = {
		totalQty: 0,
		totalPrice: 0,
	}
	
	if ( !isArray(cartItems) || !cartItems?.length ) {
		return qtyAndPrice;
	}
	
	cartItems.forEach( (item, index) => {
		qtyAndPrice.totalQty += item?.quantity ?? 0;
		qtyAndPrice.totalPrice += item?.line_total ?? 0;
	} )
	
	return qtyAndPrice;
}




