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
	const [totalPriceDis,setTotalPriceDis] =useState(totalPrice);
	const [discoutDis,setDiscoutDis] =useState('');
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );
	const [inputshipdisabled,setInputshipdisabled] = useState(false);
	const [notice,setNotice] = useState('');
	const [validatorPostcode,setValidatorPostcode] = useState('');
	const [postcodedis,setPostcodedis] = useState('');

	// Coupon
	const [couponCodeText, setCouponCodeText] = useState('');
    const [couponCodeResTmp, setCouponCodeResTmp] = useState('');
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

	/** Shipping calculation  */
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
					console.log('result return ',result);
					var usage_left = 1;
					if(result.couponData.usage_limit != null)
					{
						usage_left = result.couponData.usage_limit - result.couponData.usage_count;
					}
					
					const toDay = new Date();
					const date_expires = new Date(result.couponData.date_expires);
					var used_byMsg = false;
					if(!isEmpty(result.couponData.used_by))
					{
						var customerData = JSON.parse(Cookies.get('customerData'));
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
					}
					else{
					response.success = true;
					response.couponData = result?.couponData ?? '';
					response.couponId = result?.couponId ?? '';
					}
					
				} catch ( error ) {
					// @TODO to be handled later.
					response.error = "In validate Coupon";
					response.success = false;
					console.warn( 'Handle create order error', error?.message );
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
		setCouponCodeText(e.target.value);
	  }
	/* Remove coupon  */
	const removeCouponCode = ()=>{
		setCouponCodeResTmp('');
		setCoutData( {
			...coutData,
			"CouponApply":''}
			);
	}

	//hook useEffect variable data set
    useEffect(() => {
        if(Cookies.get('coutData')) {
			setCoutData(JSON.parse(Cookies.get('coutData')));
		}
    }, []);

	//hook useEffect Checkout data set in cookies
    useEffect(() => {
        Cookies.set('coutData',JSON.stringify(coutData));
    }, [coutData]);

	//hook useEffect Cart change evemt
    useEffect(() => {
		if(coutData.CouponApply != undefined && coutData.CouponApply != '' && coutData.CouponApply.couponData != null)
		{
			if(parseFloat(coutData.CouponApply.couponData.minimum_amount) >	cart.totalPrice && coutData.CouponApply.couponData.minimum_amount != 0)
			{
				setCoutData( {
					...coutData,
					"CouponApply":''}
					);
			}else if(parseFloat(coutData.CouponApply.couponData.maximum_amount) <	cart.totalPrice && coutData.CouponApply.couponData.maximum_amount != 0)
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
		if(undefined != shippingCost)
		{
			totalPriceSum = totalPriceSum+shippingCost
		}
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
			totalPriceSum = totalPriceSum - discount_cal;
			}
		}
		setDiscoutDis(discount_cal);
		setTotalPriceDis(totalPriceSum);
		
    }, [totalPrice,shippingCost,coutData]);
	
	
	//console.log('coutData in',coutData);
	//console.log('shippingCost',shippingCost);
	//console.log('notice',notice);
	//console.log('cart',cart);
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
							<h5>Calculate Shipping Charge</h5>
							<input type="number" onKeyUp={shippingCalculation}  size="4"  name="product_code" placeholder="POSTCODE"  disabled={inputshipdisabled} /> 
							<button onClick={shippingCalculation}>Calculate</button>
							<span>{validatorPostcode}</span>
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
					</div>
					
					
					{/*Cart Total*/ }
					<div className="woo-next-cart-total-container lg:col-span-1 p-5 pt-0">
						<h2>Cart Total</h2>
						<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
							<p className="col-span-2 p-2 mb-0">Sub Total({totalQty})</p>
							<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{parseFloat(totalPrice).toFixed(2)}</p>
						</div>
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
						{(() => {
							if(coutData.CouponApply != undefined) 
							{
								if(coutData.CouponApply.success)
								{
									return (
										<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
											<p className="col-span-2 p-2 mb-0">Discount <button onClick={removeCouponCode}>Remove</button></p>
											<p className="col-span-1 p-2 mb-0">-{cartItems?.[0]?.currency ?? ''}{ discoutDis }</p>
										</div>
										)
								}
									
							} 
						})()} 
						<div className="flex grid grid-cols-3 bg-gray-100 mb-4">
							<p className="col-span-2 p-2 mb-0">Total({totalQty})</p>
							<p className="col-span-1 p-2 mb-0">{cartItems?.[0]?.currency ?? ''}{parseFloat(totalPriceDis).toFixed(2)}</p>
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
