import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import CartItem from './cart-item';

import Link from 'next/link';
import { clearCart } from '../../utils/cart';
import { getShipping } from '../../utils/customjs/custome';

import Loader from "./../../../public/loader.gif";
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';


const CartItemsContainer = () => {
	const [ cart, setCart ] = useContext( AppContext );
	const { cartItems, totalPrice, totalQty,shippingCost } = cart || {};
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );
	const [inputshipdisabled,setInputshipdisabled] = useState(false);
	const [notice,setNotice] = useState('');
	const [validatorPostcode,setValidatorPostcode] = useState('');
	const [postcodedis,setPostcodedis] = useState('');

	const [couponCodeText, setCouponCodeText] = useState('');
    const [couponCodeRes, setCouponCodeRes] = useState('');
    
	const [loading, SetLoading] = useState(false);
	const [coutData,setCoutData]  = useState('');
	
	// Clear the entire cart.
	const handleClearCart = async ( event ) => {
		event.stopPropagation();
		
		if (isClearCartProcessing) {
			return;
		}
		
		await clearCart( setCart, setClearCartProcessing );

	};
	
	const shippingCalculation = async(e) => {
		const postcode = e.target.value;
		//console.log('postcode',postcode);
		setPostcodedis(postcode);
		//console.log('cart',cartItems.length);
		setValidatorPostcode('');
		if(postcode.length == 4 && (cartItems.length > 0))
		{
			
			setInputshipdisabled(true);
			
			const  shippingData  = await getShipping(postcode,cartItems);
			console.log('shippingData',shippingData);
			//console.log('notice L',shippingData.notice.length);
			setNotice(shippingData.notice)
			if(shippingData.notice.length > 0)
			{
				setCart( { ...cart, shippingCost: 0} );
			}else{
				setCart( { ...cart, shippingCost: shippingData.shippingTotal} );
			}
			setInputshipdisabled(false);
		}
	}

	const validCoupon = async()=>{
				let response = {
					success: false,
					couponId: null,
					couponData: null,
					error: '',
				};
				if(couponCodeText == '')
				{
					response.error = "Please enter valid coupon";
					setCouponCodeRes(response);
					return ;
				}
				SetLoading(true);
				const couponData =  {
					//code: "snv22",
					code: couponCodeText,
				};
				
				try {
					const request = await fetch( '/api/valid-coupon', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify( couponData ),
					} );
					
					const result = await request.json();
					if ( result.error ) {
						response.error = result.error;
					// setOrderFailedError( 'Something went wrong. Order creation failed. Please try again' );
					}

					var usage_left = result.couponData.usage_limit - result.couponData.usage_count;
					const toDay = new Date();
					const date_expires = new Date(result.couponData.date_expires);
					var used_byMsg = false;
					if(!isEmpty(result.couponData.used_by))
					{
						var customerData = JSON.parse(Cookies.get('customerData'));
						if(customerData.email != undefined)
						{
							used_byMsg = result.couponData.used_by.find((element) => {
								if(element == customerData.email)
								{
									return true;
								}
							});
							if(used_byMsg != undefined)
							{
								used_byMsg = true;
							}
						}
						
					}

					if(result.couponData.code != couponCodeText)
					{
					response.error = "Coupon '"+couponCodeText+"' does not exist!";
					}
					/*else if(couponData.code == coutData.CouponApply)
					{
					response.error = "SORRY, COUPON "+couponCodeText+" HAS ALREADY BEEN APPLIED AND CANNOT BE USED IN CONJUNCTION WITH OTHER COUPONS.";
					}*/
					else if(parseFloat(result.couponData.minimum_amount) >	cart.totalPrice && result.couponData.minimum_amount != 0)
					{
						response.error = "THE MINIMUM SPEND FOR THIS COUPON IS $ "+result.couponData.minimum_amount+".";
					}else if(parseFloat(result.couponData.maximum_amount) <	cart.totalPrice && result.couponData.maximum_amount != 0)
					{
						response.error = "THE MAXIMUM SPEND FOR THIS COUPON IS $ "+result.couponData.maximum_amount+".";
					}else if(usage_left == 0)
					{
						response.error = "SORRY, COUPON USAGE LIMIT HAS BEEN REACHED.";
					}else if(date_expires < toDay && result.couponData.date_expires != null)
					{
						response.error = "THIS COUPON HAS EXPIRED.";
					}else if(used_byMsg)
					{
						response.error = "COUPON USAGE LIMIT HAS BEEN REACHED.";
					}
					else{
					response.success = true;
					setCoutData( {
						...coutData,
						"CouponApply":couponCodeText }
						);
						console.log('CouponApply' + parseFloat(result.couponData.minimum_amount) + '<'+cart.totalPrice);
						console.log('ct',cart.totalPrice);
					}
					console.log('used_byMsg',used_byMsg);
					response.couponData = result?.couponData ?? '';
					response.couponId = result?.couponId ?? '';
				} catch ( error ) {
					// @TODO to be handled later.
					console.warn( 'Handle create order error', error?.message );
				}
				setCouponCodeRes(response);
				SetLoading(false);
			console.log('response',response);
		}

	const handleCouponCodeVariable = (e) => {
		setCouponCodeText(e.target.value);
	  }

	//hook useEffect
    useEffect(() => {
        //check token
        if(Cookies.get('coutData')) {
			setCoutData(JSON.parse(Cookies.get('coutData')));
		}
    }, []);
	//hook useEffect
    useEffect(() => {
        //check token
        Cookies.set('coutData',JSON.stringify(coutData));
    }, [coutData]);

	console.log('coutData in',coutData);
	console.log('shippingCost',shippingCost);
	console.log('notice',notice);
	console.log('cart',cart);
	return (
		<div className="content-wrap-cart">
			{ loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
			{ cart ? (
				<div key="cart-left" className="woo-next-cart-table-row grid lg:grid-cols-3 gap-4">
					{/*Cart Items*/ }
					<div key='product-list' className="woo-next-cart-table lg:col-span-2 mb-md-0 mb-5">
						{ cartItems.length &&
						cartItems.map( ( item ) => (
							<CartItem
								key={ item.product_id }
								item={ item }
								products={ cartItems }
								setCart={setCart}
								notice={notice != ''?notice.find((element) => element == item?.data?.sku):null}
								postcodedis={postcodedis}
							/>
						) ) }
						<div key="calculat-shipping">
							<h4>Calculate Shipping Charge</h4>
							<input type="number" onKeyUp={shippingCalculation}  size="4"  name="product_code" placeholder="POSTCODE"  disabled={inputshipdisabled} /> 
							<button onClick={shippingCalculation}>Calculate</button>
							<span>{validatorPostcode}</span>
						</div>
						<div key="coupon">
							<label for="coupon_code" className="">Coupon:</label> 
							 Message : {couponCodeRes.error} {couponCodeRes.success?<>APPLIED</>:null}<br></br>
        						<input type='text' name="coupon" id="coupon_code" onChange={handleCouponCodeVariable} value={couponCodeText} className=" border border-sky-500"></input>
        						<button onClick={validCoupon}>Apply coupon</button>
						</div>
					</div>
					
					
					{/*Cart Total*/ }
					<div className="woo-next-cart-total-container lg:col-span-1 p-5 pt-0">
						<h2>Cart Total</h2>
						{(() => {
							if(shippingCost != 0 && (undefined != shippingCost)) 
							{
								return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Shipping Cost</p>
											<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{ shippingCost }</p>
										</div>
										)	
							} 
						})()} 
						
						<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
							<p className="col-span-2 p-2 mb-0">Total({totalQty})</p>
							<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{ shippingCost? totalPrice+shippingCost : totalPrice}</p>
						</div>
						
						<div className="flex justify-between">
							{/*Clear entire cart*/}
							<div className="clear-cart">
								<button
									className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
									onClick={(event) => handleClearCart(event)}
									disabled={isClearCartProcessing}
								>
									<span className="woo-next-cart">{!isClearCartProcessing ? "Clear Cart" : "Clearing..."}</span>
								</button>
							</div>
							{/*Checkout*/}
							<Link href="/checkout">
								<button className="text-white duration-500 bg-brand-orange hover:bg-brand-royal-blue focus:ring-4 focus:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
			                  <span className="woo-next-cart-checkout-txt">
			                    Proceed to Checkout
			                  </span>
									<i className="fas fa-long-arrow-alt-right"/>
								</button>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="mt-14">
					<h2>No items in the cart</h2>
					<Link href="/">
						<button className="text-white duration-500 bg-brand-orange hover:bg-brand-royal-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
			              <span className="woo-next-cart-checkout-txt">
			                Add New Products
			              </span>
							<i className="fas fa-long-arrow-alt-right"/>
						</button>
					</Link>
				</div>
			) }
		</div>
	);
};

export default CartItemsContainer;
