import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import CartItem from './cart-item';

import Link from 'next/link';
import { clearCart } from '../../utils/cart';
import { getShipping, get_discount_bundle, get_discount_type_cart } from '../../utils/customjs/custome';

import Loader from "./../../../public/loader.gif";
;
import { isEmpty } from 'lodash';
import RedeemPoints from './redeem-points';
import LoginForm from '../my-account/login';
import Router from "next/router";
import { valid_coupon } from '../../utils/apiFun/valid-coupon';


const CartItemsContainer = ({options}) => {
	const [ cart, setCart ] = useContext( AppContext );
	const { cartItems, totalPrice, totalQty,shippingCost } = cart || {};
	const [totalPriceDis,setTotalPriceDis] =useState(totalPrice);
	const [discoutDis,setDiscoutDis] =useState('');
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );
	const [inputshipdisabled,setInputshipdisabled] = useState(false);
	const [notice,setNotice] = useState('');
	const [postcodedis,setPostcodedis] = useState('');
	const [product_code,setProduct_code] = useState('');
	const [cartError,setCartError] = useState('');
	
	// Coupon
	const [couponCodeText, setCouponCodeText] = useState('');
    const [couponCodeResTmp, setCouponCodeResTmp] = useState('');
	const [loading, SetLoading] = useState(false);
	const [coutData,setCoutData]  = useState('');
	const [tokenValid,setTokenValid]=useState(0);
	const [customerData,setCustomerData] = useState(0);

	// Redeem point
	const [redeem_your_pointsText, setRedeem_your_pointsText] =useState('');
    const [messageRyp,setMessageRyp] =  useState({
        success: false,
		error: '',
    });

	// Cart sub total Discount 
	const [cartSubTotalDiscount,setCartSubTotalDiscount] = useState(null);
	
	// Bundle disount 
	const [discountBundleDis, setDiscountBundleDis] = useState(0);

	// Clear the entire cart.
	const handleClearCart = async ( event ) => {
		event.stopPropagation();
		if (isClearCartProcessing) {
			return;
		}
		await clearCart( setCart, setClearCartProcessing );
	};

	
	/** Shipping calculation  */
	useEffect(() => {
		shippingCalculation();
	},[totalPrice]);
	const inputShipping = async(e) => {
		if(e.target.value.length <= 4)
		{
			setProduct_code(e.target.value);
		}
	};

	const shippingCalculation = async() => {
		if(product_code == '')
		{
			return '';
		}
		const postcode = product_code;
		console.log('postcode',postcode);
		setPostcodedis(postcode);
		//console.log('cart',cartItems.length);
		if(postcode.length == 4 && (cartItems.length > 0))
		{
			
			setInputshipdisabled(true);
			
			const  shippingData  = await getShipping(postcode,cartItems);
			console.log('shippingData',shippingData);
			//console.log('notice L',shippingData.notice.length);
			setNotice(shippingData.notice)
			if(shippingData.notice.length > 0)
			{
				setCart( { ...cart, shippingCost: -1} );
				var catItemId = document.getElementById('pro_'+shippingData.notice[0]?.replaceAll("-","_"));
				if(catItemId)
				{
					catItemId.focus();
				}
			}else{
				setCart( { ...cart, shippingCost: shippingData.shippingTotal} );
			}
			setInputshipdisabled(false);
		}
	}
	/*  Coupon validatoin with API */
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
					setCouponCodeResTmp(response);
					return ;
				}
				if(coutData.CouponApply != undefined && coutData.CouponApply != '')
				{
					if(coutData.CouponApply.couponData != null && coutData.CouponApply.couponData.code == couponCodeText)
					{
						response.error = "SORRY, COUPON "+couponCodeText+" HAS ALREADY BEEN APPLIED AND CANNOT BE USED IN CONJUNCTION WITH OTHER COUPONS.";
						setCouponCodeResTmp(response);
						return ;
					}
				}
				
				SetLoading(true);
				const couponData =  {
					//code: "snv22",
					code: couponCodeText,
				};
				
				const result = await  valid_coupon(couponData);
				
				if(result.success && result.error == '')
				{
					if ( result.error ) {
						response.error = result.error;
					// setOrderFailedError( 'Something went wrong. Order creation failed. Please try again' );
					}
					console.log('result return ',result);
					var usage_left = 1;
					if(result?.couponData?.usage_limit != null)
					{
						usage_left = result.couponData.usage_limit - result.couponData?.usage_count;
					}
					
					const toDay = new Date();
					const date_expires = new Date(result.couponData?.date_expires);
					var used_byMsg = false;
					var used_login = false;
					if(!isEmpty(result.couponData.used_by) && result.couponData.usage_limit_per_user)
					{
						var customerDatastring = localStorage.getItem('customerData')
						var customerData = {};
						if(customerDatastring != undefined)
						{
							customerData = JSON.parse(customerDatastring);
						}
						if(customerData.email != undefined)
						{
							var used_coun_user = 0;
							result.couponData.used_by.find((element) => {
								if(element == customerData.email || element == customerData.id)
								{
									used_coun_user++; 
								}
							});
							if(used_coun_user >= result.couponData.usage_limit_per_user && (result.couponData.usage_limit_per_user != null))
							{
								used_byMsg = true;
							}
							
						}else{
							used_login = true;
						}
						
					}

					if(result.couponData.code != couponCodeText)
					{
					response.error = "Coupon '"+couponCodeText+"' does not exist!";
					response.success = false;
					}
					else if(parseFloat(result.couponData.minimum_amount) >	cart.totalPrice && result.couponData.minimum_amount != 0)
					{
						response.error = "THE MINIMUM SPEND FOR THIS COUPON IS $ "+result.couponData.minimum_amount+".";
						response.success = false;
					}else if(parseFloat(result.couponData.maximum_amount) <	cart.totalPrice && result.couponData.maximum_amount != 0)
					{
						response.error = "THE MAXIMUM SPEND FOR THIS COUPON IS $ "+result.couponData.maximum_amount+".";
						response.success = false;
					}else if(usage_left == 0)
					{
						response.error = "SORRY, COUPON USAGE LIMIT HAS BEEN REACHED.";
						response.success = false;
					}else if(date_expires < toDay && result.couponData.date_expires != null)
					{
						response.error = "THIS COUPON HAS EXPIRED.";
						response.success = false;
					}else if(used_byMsg)
					{
						response.error = "COUPON USAGE LIMIT HAS BEEN REACHED.";
						response.success = false;
					}else if(used_login)
					{
						response.error = "PLEASE USAGE LOGIN.";
						response.success = false;
					}
					else{
					response.success = true;
					response.couponData = result?.couponData ?? '';
					response.couponId = result?.couponId ?? '';
					}
					
				} else {
					// @TODO to be handled later.
					response.error = "In validate Coupon";
					response.success = false;
				}
				setCoutData( {
					...coutData,
					"CouponApply":response }
					);
				setCouponCodeResTmp(response);
				SetLoading(false);
			console.log('response',response);
		}
	
		const handleCouponCodeVariable = (e) => {
		setCouponCodeText(e.target.value.trim());
	  }
	/* Remove coupon  */
	const removeCouponCode = ()=>{
		setCouponCodeResTmp('');
		setCoutData( {
			...coutData,
			"CouponApply":''}
			);
		setCouponCodeText('');
	}

	/* Remove coupon  */
	const removeRedeemPrice = (errorMsg)=>{
		setCoutData( {
			...coutData,
			"redeemPrice":''}
			);
			/*if(errorMsg)
			{
				setMessageRyp({...messageRyp,error: errorMsg,success: false})
				
			}else{
				setMessageRyp({...messageRyp,error: '',success: false})
			}*/
		
		setRedeem_your_pointsText('');
	}

	//hook useEffect variable data set
    useEffect(() => {
        if(localStorage.getItem('coutData')) {
			setCoutData(JSON.parse(localStorage.getItem('coutData')));
		}
		if(localStorage.getItem('token')) {
			setTokenValid(1);
        }
		if(localStorage.getItem('customerData')) {
			setCustomerData(JSON.parse(localStorage.getItem('customerData')));
		}
    }, []);

	//hook useEffect Checkout data set in localStorage
    useEffect(() => {
        localStorage.setItem('coutData',JSON.stringify(coutData));
    }, [coutData]);

	//hook useEffect Cart change evemt
    useEffect(() => {
		if(coutData.CouponApply != undefined && coutData.CouponApply != '' && coutData.CouponApply.couponData != null)
		{
			if(parseFloat(coutData.CouponApply.couponData.minimum_amount) >	cart?.totalPrice && coutData.CouponApply.couponData.minimum_amount != 0)
			{
				setCoutData( {
					...coutData,
					"CouponApply":''}
					);
			}else if(parseFloat(coutData.CouponApply.couponData.maximum_amount) <	cart?.totalPrice && coutData.CouponApply.couponData.maximum_amount != 0)
			{
				setCoutData( {
					...coutData,
					"CouponApply":''}
					);
			}
		}
    }, [cart]);
	
	//hook useEffect Total Price change
    useEffect(() => {
		
		var totalPriceSum = totalPrice;
		var discount_cal = 0;
        const {CouponApply} = coutData;
		// shippingCost
		if(undefined != shippingCost)
		{
			totalPriceSum = totalPriceSum+shippingCost
		}

		// discount Bundle  product
		var discount_bundle = 0;
		discount_bundle = get_discount_bundle(cartItems,options,totalPrice,coutData);
		console.log('reurn bundle discount', discount_bundle);
		if(discount_bundle != 0)
		{
			setDiscountBundleDis(discount_bundle);
			if (coutData?.bundlediscountPrice != undefined) {
				if (coutData?.bundlediscountPrice > 0 && coutData?.bundlediscountPrice != discount_bundle) {
					setCoutData({
						...coutData,
						"bundlediscountPrice": discount_bundle
					}
					);
				}
			} else { 
				setCoutData({
					...coutData,
					"bundlediscountPrice": discount_bundle
				}
				);
			}
			totalPriceSum = totalPriceSum - discount_bundle;
		}

		// CouponApply
		if(CouponApply != '' && CouponApply != undefined)
		{
			if(CouponApply.success)
			{
				if(CouponApply.couponData.discount_type == "fixed_cart")
				{
					discount_cal = parseFloat(CouponApply.couponData.amount);
					
				}
				if(CouponApply.couponData.discount_type == "percent")
				{
					discount_cal = ((totalPrice*parseFloat(CouponApply.couponData.amount))/100);
				}
				if(totalPrice >= discount_cal)
				{
					totalPriceSum = totalPriceSum - discount_cal;
				}else{
					let response = {
						success: false,
						couponId: null,
						couponData: null,
						error: 'You can`t Coupon more Dicount than order subtotal.',
					};
					setCouponCodeResTmp(response);
					setCoutData( {
						...coutData,
						"CouponApply":''}
						);
					setCouponCodeText('');
				}
			}
		}
		setDiscoutDis(discount_cal);
		//  redeemPrice
		if(coutData.redeemPrice != undefined)
		{
			if(coutData?.redeemPrice > 0)
			{
				if(totalPriceSum >= coutData.redeemPrice)
				{
					totalPriceSum = totalPriceSum - coutData.redeemPrice;
					setMessageRyp({...messageRyp,error: '',})
				}else{
					var errorMsg = '';
					if(totalPrice == totalPriceSum)
					{
						 errorMsg = "You can`t Redeem more Points than order subtotal, Please enter Right Value.";
					}else{
						errorMsg = "Please enter Right Value.";

					}
					removeRedeemPrice(errorMsg);
				}
			}
		}
		
		// discount_type_cart_quantity
		var discount_type_cart_cal = 0;
		discount_type_cart_cal = get_discount_type_cart(cartItems,options,setCartSubTotalDiscount,cartSubTotalDiscount,undefined,totalPrice,tokenValid);
		
		if(discount_type_cart_cal != 0)
		{
			totalPriceSum = totalPriceSum - discount_type_cart_cal;
		}
		//console.log('options',options);
		//console.log('cartItems',cartItems);
		//console.log('discount_type_cart_cal',discount_type_cart_cal);
		
		// Final total price
		setTotalPriceDis(totalPriceSum);
		
    }, [totalPrice,shippingCost,coutData,tokenValid]);
	
	
	console.log('cartSubTotalDiscount',cartSubTotalDiscount);
	
	//console.log('coutData in',coutData);
	//console.log('shippingCost',shippingCost);
	console.log('notice',notice);
	//console.log('cart',cart);
	console.log('cartItems',cartItems);
	
	const cartSubmit = async() => {
		if(!isEmpty(notice))
		{
			var catItemId = document.getElementById('pro_'+notice[0]?.replaceAll("-","_"));
				if(catItemId)
				{
					catItemId.focus();
				}
			return null;
		}
		//  redeemPrice
		/*if(coutData.redeemPrice != undefined)
		{
			if(coutData?.redeemPrice > 0)
			{
				if(totalPrice < coutData.redeemPrice)
				{
					setCartError({...cartError,redeemPrice:"You can`t Redeem more Points than order subtotal, Please enter Right Value."});
					removeRedeemPrice();
					return null;
				}
			}
		}
		setCartError({...cartError,redeemPrice:""});*/
		Router.push("/checkout/");
	}
	if (typeof window !== "undefined") {
		const input_product_code = document.getElementById('input_product_code');
		if(input_product_code)
		{
			document.getElementById('input_product_code').addEventListener('keydown', function(event) {
				// Allow numeric keys, backspace, and arrow keys
				if ((event.keyCode >= 48 && event.keyCode <= 57) || // 0-9
					(event.keyCode >= 96 && event.keyCode <= 105) || // Numeric keypad
					event.keyCode === 8 || // Backspace
					(event.keyCode >= 37 && event.keyCode <= 40) // Arrow keys
					) {
				  // Allow the keypress
				} else {
				  // Prevent the keypress
				  event.preventDefault();
				}
			  });
		}
	  }
	return (
		<div className="content-wrap-cart">
			{ loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
			{ cart ? (
				<div key="cart-left" className="woo-next-cart-table-row grid lg:grid-cols-3 gap-4">
					{cartSubTotalDiscount?.discount_type_cart_product != '' ? 
					<div key="discount_type_cart_product"
						dangerouslySetInnerHTML={ {
							__html: cartSubTotalDiscount?.discount_type_cart_product?.cartNote[0]?.purchase_note ?? '',
						} }
						className="woo-next-cart-table lg:col-span-2 mb-md-0 mb-5"
					/> 	
					:null}
					
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
								cartNote = {cartSubTotalDiscount?.discount_type_cart_quantity?.cartNote ?? null}
							/>
						) ) }
						<div key="calculat-shipping">
							<h5>Calculate Shipping Charge</h5>
							<input type="number" onChange={inputShipping}  size="4" id="input_product_code" value={product_code}  name="product_code" placeholder="POSTCODE"  disabled={inputshipdisabled} /> 
							<button onClick={shippingCalculation}>Calculate</button>
						</div>
						<div key="coupon">
							<h5 htmlFor="coupon_code" className="">Coupon:</h5> 
							 {/*Message : {coutData.CouponApply != undefined? 
							 <>
							 {coutData.CouponApply.error} {coutData.CouponApply.success?<>APPLIED</>:null}
							 </>
							 : null} */}
							 Message : {couponCodeResTmp.error} {couponCodeResTmp.success?<>APPLIED</>:null}<br></br>
							 <br></br>
        						<input type='text' name="coupon" id="coupon_code" onChange={handleCouponCodeVariable} value={couponCodeText} className=" border border-sky-500"></input>
        						<button onClick={validCoupon}>Apply coupon</button>
						</div>
						{tokenValid?<RedeemPoints 
							customerData={customerData} 
							setCoutData={setCoutData} 
							totalPrice={totalPrice} 
							coutData={coutData}
							redeem_your_pointsText ={redeem_your_pointsText}
							setRedeem_your_pointsText = {setRedeem_your_pointsText}
							messageRyp = {messageRyp}
							setMessageRyp = {setMessageRyp}
						></RedeemPoints>:null}
						{!tokenValid?<LoginForm setTokenValid={setTokenValid} setCustomerData={setCustomerData}></LoginForm>:null}
						
					</div>
					
					
					{/*Cart Total*/ }
					<div className="woo-next-cart-total-container lg:col-span-1 p-5 pt-0">
						<h2>Cart Total</h2>
						<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
							<p className="col-span-2 p-2 mb-0">Sub Total({totalQty})</p>
							<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{parseFloat(totalPrice).toFixed(2)}</p>
						</div>
						<div key='bundle_dis'>
						{ /*Print Bundle disount */}
						{(() => {
								if (discountBundleDis != 0)
								{
									return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Bundle Discount : </p>
											<p className="col-span-1 p-2 mb-0">-{cartItems?.[0]?.currency ?? ''}{discountBundleDis}</p>
										</div>
									);
								}
						})()} 
						</div>
						<div key='discount'>
							{/* cart Sub Total Discount */}
							{(() => {
								if(cartSubTotalDiscount != null)
								{
									if(Object.keys(cartSubTotalDiscount).length > 0)
									{
										return (
											Object.keys(cartSubTotalDiscount).map(function(key) {
												//console.log('key',cartSubTotalDiscount[key].name);
												//console.log('key',key);
												if(cartSubTotalDiscount[key] != '' && cartSubTotalDiscount[key]?.discount != 0)
												{
													return (
														<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
															<p className="col-span-2 p-2 mb-0">{cartSubTotalDiscount[key]?.name}</p>
															<p className="col-span-1 p-2 mb-0">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{cartSubTotalDiscount[key]?.discount?.toFixed(2) ?? ''}</p>
														</div>
													)
												}
												
											})
										)
									}
								}
							})()} 
						</div>
						{(() => {
							if(coutData?.CouponApply != undefined) 
							{
								if(coutData?.CouponApply?.success)
								{
									return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Discount ({coutData?.CouponApply?.couponData?.code} <button onClick={removeCouponCode}>Remove</button>)</p>
											<p className="col-span-1 p-2 mb-0">-{cartItems?.[0]?.currency ?? ''}{ discoutDis }</p>
										</div>
										)
								}
									
							} 
						})()}
						{(() => {
							if(coutData.redeemPrice != undefined) 
							{
								if(coutData.redeemPrice != '')
								{
									return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Redeem Points <button onClick={removeRedeemPrice}>Remove</button></p>
											<p className="col-span-1 p-2 mb-0">-{cartItems?.[0]?.currency ?? ''}{ coutData.redeemPrice }</p>
										</div>
										)
								}
							} 
						})()} 
						{(() => {
							if(shippingCost >= 0 && (undefined != shippingCost)) 
							{
								return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Shipping Cost</p>
											<p className="col-span-1 p-2 mb-0">+{cartItems?.[0]?.currency ?? ''}{ shippingCost }</p>
										</div>
										)	
							} 
						})()} 
						<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
							<p className="col-span-2 p-2 mb-0">Total({totalQty})</p>
							<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{parseFloat(totalPriceDis).toFixed(2)} (Includes GST)</p>
						</div>
						
						{cartError?.redeemPrice ?<div className="invalid-feedback d-block text-red-500">{ cartError.redeemPrice }</div>:null}
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
							{/*}<Link href="/checkout">{*/}
							 <button onClick={cartSubmit} className="text-white duration-500 bg-brand-orange hover:bg-brand-royal-blue focus:ring-4 focus:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
			                  <span className="woo-next-cart-checkout-txt">
			                    Proceed to Checkout
			                  </span>
									<i className="fas fa-long-arrow-alt-right"/>
								</button>
							{/*}</Link>{*/}
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
