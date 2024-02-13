import { useState, useContext } from 'react';
import cx from 'classnames';

import YourOrder from './your-order';
import PaymentModes from './payment-modes';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import Address from './user-address';
import { AppContext } from '../context';
import CheckboxField from './form-elements/checkbox-field';
import {
	handleAfterpayCheckout,
	handleAgreeTerms,
	handleBacsCheckout,
	handleBillingDifferentThanShipping,
	handleCreateAccount, handleLaybuyCheckout, handleOtherPaymentMethodCheckout, handlePaypalCheckout, handleStripeCheckout,
	setStatesForCountry,
} from '../../utils/checkout';
import { useEffect } from 'react';
;
import { getShipping, get_discount_bundle, get_discount_type_cart, get_points, get_stateList } from '../../utils/customjs/custome';
import Loader from "./../../../public/loader.gif";
import axios from 'axios';
import { CHECKOUT_API_CALL_LIMIT, CHECKOUT_API_TIME_INT, SUBURB_API_URL, WEB_DEVICE } from '../../utils/constants/endpoints';
import { debounce, isEmpty } from 'lodash';
import TextArea from './form-elements/textarea-field';
import { get_customer, handleCreateCustomer } from '../../utils/customer';
import InputField from './form-elements/input-field';
import LoginForm from '../my-account/login';
import { fieldFocusSet } from './field-focus';
import PaypalButtonCheckout from './paypal/paypal-button';
import CancelOrderButton from './cancel-order';
import Router from 'next/router';
import { get_order } from '../../utils/apiFun/order';

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
// 	firstName: 'Imran',
// 	lastName: 'Sayed',
// 	address1: '123 Abc farm',
// 	address2: 'Hill Road',
// 	city: 'Mumbai',
// 	country: 'IN',
// 	state: 'Maharastra',
// 	postcode: '221029',
// 	email: 'codeytek.academy@gmail.com',
// 	phone: '9883778278',
// 	company: 'The Company',
// 	errors: null,
// };

const defaultCustomerInfo = {
	firstName: '',
	lastName: '',
	address1: '',
	address2: '',
	city: '',
	country: 'AU',
	state: '',
	postcode: '',
	email: '',
	phone: '',
	company: '',
	errors: null
}

const CheckoutForm = ( { countriesData , paymentModes , options} ) => {

	
	const { billingCountries, shippingCountries } = countriesData || {};

	const initialState = {
		billing: {
			...defaultCustomerInfo,
		},
		shipping: {
			...defaultCustomerInfo,
		},
		createAccount: false,
		createAccountPassword: '',
		orderNotes: '',
		billingDifferentThanShipping: false,
		paymentMethod: '',
		agreeTerms: false,
	};
	const stateList = get_stateList();
	const [ cart, setCart ] = useContext( AppContext );
	const [ input, setInput ] = useState( initialState );
	const [ requestError, setRequestError ] = useState( null );
	const [ theShippingStates, setTheShippingStates ] = useState( stateList );
	const [ isFetchingShippingStates, setIsFetchingShippingStates ] = useState( false );
	const [ theBillingStates, setTheBillingStates ] = useState( stateList );
	const [ isFetchingBillingStates, setIsFetchingBillingStates ] = useState( false );
	const [ isOrderProcessing, setIsOrderProcessing ] = useState( false );
	const [ createdOrderData, setCreatedOrderData ] = useState( {} );

	const [coutData,setCoutData]=useState('');
	const { totalPrice, shippingCost } = cart || {};
	const [totalPriceDis,setTotalPriceDis] =useState(totalPrice);
	const [discoutDis,setDiscoutDis] =useState('');
	const [couponName,setCouponName] =useState('');

	const [notice,setNotice] = useState('');
	const [loading, SetLoading] = useState(false);
	const [postcodedis,setPostcodedis] = useState('');
	const [onloadShippingCal,setOnloadShippingCal] = useState(true);

	const [theShippingsuburb, setTheShippingsuburb] = useState([]);
	const [theBillingsuburb, setTheBillingsuburb] = useState([]);
	const [isFetchingShippingSuburb, setIsFetchingShippingSuburb] = useState(false);
	const [isFetchingBillingSuburb, setIsFetchingBillingSuburb] = useState(false);

	const [tokenValid,setTokenValid]=useState(0);
	const [customerData,setCustomerData] = useState(0);

	const [paymentMethodDiscount , setPaymentMethodDiscount] = useState(0);
	const [cartSubTotalDiscount,setCartSubTotalDiscount] = useState(null);
	
	// Paypal
	const [paypalButtonBisible,setPaypalButtonBisible] = useState(false);
	
	// Bundle disount 
	const [discountBundleDis, setDiscountBundleDis] = useState(0);

	// redirect web to mobile
	const [webtomobileURL, setWebtomoblieURL] = useState('');
	var webtomobileURLCount = 0;
	var myInterval = ''
	
	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		//console.log('event',event);
		event?.preventDefault();
		/**
		 * Validate Billing and Shipping Details
		 *
		 * Note:
		 * 1. If billing is different than shipping address, only then validate billing.
		 * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
		 * the respective states should only be mandatory, if a country has states.
		 */
		// validation billing and shipping fileds
		const billingValidationResult =  validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length ,false);
		const shippingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length ,true) : {
			errors: null,
			isValid: true,
		};
		// validation other fiield 
		const ValidationResult =  validateAndSanitizeCheckoutForm( input);
		console.log('ValidationResult',ValidationResult);
		
		// update error message
		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
			errors: ValidationResult.errors
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid || !ValidationResult.isValid) {
			fieldFocusSet(billingValidationResult,shippingValidationResult,ValidationResult);
			return null;
		}

		
		// cart shiiping cost error 
		if(notice.length > 0)
		{
			var  el =  document.getElementById("yourorder_list");
			if(el){el.scrollIntoView();}
			return null;
		}

		// shipping validation 
		if(shippingCost == undefined || shippingCost < 0)
		{
			setInput( {
				...input,
				errors: {shippingCost:'Please add post code properly and reshipping calculation.'}
			} );
			return null;
		}

		// redeemPrice
		if(coutData.redeemPrice != undefined)
		{
			if(coutData?.redeemPrice > 0)
			{
				var customerDataTMPData = await get_customer(customerData?.email,setCustomerData);
				//console.log('customerData call after readim',customerData);
				var rewardPoints = get_points(customerDataTMPData);
				//console.log('customerData call rewardPoints',rewardPoints);
				if(rewardPoints < (coutData?.redeemPrice * 100))
				{
					setInput( {
						...input,
						errors: {rewardPoints:'Reward Points invalid. Please goto cat please check your point.'}
					} );
					setCoutData( {
						...coutData,
						"redeemPrice":''}
						);
					return null;
				}
			}
		}
		
		// totalPriceDis validation 
		if(totalPriceDis != undefined)
		{
			if(totalPriceDis < 0)
			{
				setInput( {
					...input,
					errors: {totalPriceDis:'Invalid Amount.'}
				} );
				return null;
			}
		}
		
		// Create account 
		if(input.createAccount)
		{
			const createAccountData = await handleCreateCustomer(input);
			if(createAccountData.error?.code == 'registration-error-email-exists')
			{
				setInput( {
					...input,
					billing: { ...input.billing, errors: null },
					shipping: { ...input.shipping, errors: null },
					errors: {createAccount:'An account is already registered with your email address.'}
				} );
			}	
			if(!createAccountData.success)
			{
				return null;
			}
			console.log('createAccountData',createAccountData);
		}
		
		// For stripe payment mode, handle the strip payment and thank you.
		if ( 'stripe' === input.paymentMethod ) {
			const createdOrderData = await handleStripeCheckout( 
				shippingCost,
				couponName,
				totalPriceDis,
				input, 
				cart?.cartItems, 
				setRequestError, 
				setCart, 
				setIsOrderProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				);
			return null;
		}

		// For bacs payment mode, handle the bacs payment and thank you.
		if ( 'bacs' === input.paymentMethod ) {
			const createdOrderData = await handleBacsCheckout( 
				shippingCost,
				couponName,
				totalPriceDis,
				input, 
				cart?.cartItems, 
				setRequestError, 
				setCart, 
				setIsOrderProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				);
			return null;
		}

		// For Afterpay payment mode, handle the afterpay payment and thank you.
		if ( 'afterpay' === input.paymentMethod ) {
			const createdOrderData = await handleAfterpayCheckout( 
				shippingCost,
				couponName,
				totalPriceDis,
				input, 
				cart?.cartItems, 
				setRequestError, 
				setCart, 
				setIsOrderProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				);
			return null;
		}

		// For Laybuy payment mode, handle the laybuy payment and thank you.
		if ( 'laybuy' === input.paymentMethod ) {
			const createdOrderData = await handleLaybuyCheckout( 
				shippingCost,
				couponName,
				totalPriceDis,
				input, 
				cart?.cartItems, 
				setRequestError, 
				setCart, 
				setIsOrderProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				);
			return null;
		}
		
		// For Paypal payment mode, handle the paypal payment and thank you.
		if ( 'ppcp-gateway' === input.paymentMethod ) {
			const createdOrderData = await handlePaypalCheckout( 
				shippingCost,
				couponName,
				totalPriceDis,
				input, 
				cart?.cartItems, 
				setRequestError, 
				setCart, 
				setIsOrderProcessing, 
				setCreatedOrderData,
				coutData,
				setCoutData,
				cartSubTotalDiscount
				);
			return null;
		}
		// For Any other payment mode, create the order and redirect the user to payment url.
		const createdOrderData = await handleOtherPaymentMethodCheckout( 
			shippingCost,
			couponName,
			totalPriceDis,
			input, 
			cart?.cartItems, 
			setRequestError, 
			setCart, 
			setIsOrderProcessing, 
			setCreatedOrderData,
			coutData,
			setCoutData,
			cartSubTotalDiscount
			);
		
		if ( createdOrderData.paymentUrl ) {
			//window.location.href = createdOrderData.paymentUrl;
			Router.push(createdOrderData.paymentUrl)
		}

		setRequestError( null );

	};

	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 * @param {bool} isShipping If this is false it means it is billing.
	 * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
	 *
	 * @return {void}
	 */
	const handleOnChange = async ( event, isShipping = false, isBillingOrShipping = false ) => {
		const { target } = event || {};
		SetLoading(true);

		//  paymentMethod Discount
		if ( 'paymentMethod' === target.name ) {
			const toDay = new Date();
			var paymentModesDisSel = paymentModes.filter(obj => 
				{
				var	product_start_date = new Date(obj.discount_start_time+' 00:00:00');
				var	product_end_date = new Date(obj.discount_end_time+' 23:59:59');
				if (obj.method_key == target.value && obj.discount_enabled == true && product_start_date <= toDay && toDay <= product_end_date) {
					return true;
				}
			});
			if(!isEmpty(paymentModesDisSel))
			{
				setPaymentMethodDiscount(paymentModesDisSel[0]?.discount);
			}else{
				setPaymentMethodDiscount(0);
			}
			if(target.value == 'ppcp-gateway')
			{
				setPaypalButtonBisible(true);
			}else{
				setPaypalButtonBisible(false);
			}
		} 

		if ( 'createAccount' === target.name ) {
			handleCreateAccount( input, setInput, target );
		} 
		else if ( 'agreeTerms' === target.name ) {
			handleAgreeTerms( input, setInput, target );
		} else if ( 'billingDifferentThanShipping' === target.name ) {
			await handleBillingDifferentThanShipping( input, setInput, target );
			if(input?.billingDifferentThanShipping)
			{
				//console.log('yes billing post code',input.billing.postcode);
				await shippingCalculation(input.billing.postcode);
			}else{
				//console.log('yes sipping post code',input.shipping.postcode);
				await shippingCalculation(input.shipping.postcode);
			}
		} else if ( isBillingOrShipping ) {
			//console.log('post 11');
			if ( isShipping ) {
				await handleShippingChange( target );
			} else {
				await handleBillingChange( target );
			}
			if(input?.billingDifferentThanShipping && isShipping)
			{
				if(target.name == 'postcode')
				{
					await shippingCalculation(target.value);
				}
			}else if(!input?.billingDifferentThanShipping){
				if(target.name == 'postcode')
				{
				await shippingCalculation(target.value);
				}
			}
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}
		SetLoading(false);
	};
	/* change event for shipping  */
	const handleShippingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
		}
		
		
		if(target.name == 'city' && target.value != '')
		{
			const selectSuburb = theShippingsuburb.find((element) => element.location == target.value);
			if(selectSuburb.state != undefined)
			{
				const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value ,state:selectSuburb.state } };
				setInput( newState );
			}else{
				const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
				setInput( newState );
			}
			
		}else if(target.name == 'postcode' && target.value != '')
		{
			const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value , city: '' } };
			setInput( newState );
			
		}else{
			const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
			setInput( newState );
		}

		if(target.name == 'postcode' && target.value != '')
		{
			getAuspost(target.value,false);
		}
		await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};
	/* change event for billng  */
	const handleBillingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
			
		}
		if(target.name == 'city' && target.value != '')
		{
			const selectSuburb = theBillingsuburb.find((element) => element.location == target.value);
			if(selectSuburb.state != undefined)
			{
				const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value ,state:selectSuburb.state } };
				setInput( newState );
			}else{
				const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
				setInput( newState );
			}
			
		}else if(target.name == 'postcode' && target.value != '')
		{
			const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value , city: '' } };
			setInput( newState );
			
		}else{
			const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
			setInput( newState );
		}
		if(target.name == 'postcode' && target.value != '')
		{
			getAuspost(target.value,true);
		}
		//await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};
	console.log('input',input);
	console.log('customerData',customerData);
	useEffect(() => {
        if(localStorage.getItem('customerData')) {
			var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
			setCustomerData(customerDataTMP);
			console.log('customerDataTMP',customerDataTMP);
			if(customerDataTMP != undefined && customerDataTMP != '')
			{
				// Shipping field
				customerDataTMP.shipping.firstName = customerDataTMP.shipping.first_name;
				customerDataTMP.shipping.lastName = customerDataTMP.shipping.last_name;
				customerDataTMP.shipping.address1 = customerDataTMP.shipping.address_1;
				customerDataTMP.shipping.address2 = customerDataTMP.shipping.address_2;
				setTheShippingsuburb([{
					"location":customerDataTMP.shipping.city,
					"state": customerDataTMP.shipping.state
				  },]);

				// Billing field
				customerDataTMP.billing.firstName = customerDataTMP.billing.first_name;
				customerDataTMP.billing.lastName = customerDataTMP.billing.last_name;
				customerDataTMP.billing.address1 = customerDataTMP.billing.address_1;
				customerDataTMP.billing.address2 = customerDataTMP.billing.address_2;
				setTheBillingsuburb([{
					"location":customerDataTMP.billing.city,
					"state": customerDataTMP.billing.state
				  },]);

				 // redeem point  
				var rewardPoints = get_points(customerDataTMP);
				
				setInput( {
					...input,
					billing: customerDataTMP.billing,
					shipping: customerDataTMP.shipping,
					_customer_after_reedem_reward_points: rewardPoints,
				} );

				if(input?.billingDifferentThanShipping)
				{
					console.log('s ',customerDataTMP.billing.postcode);
					 shippingCalculation(customerDataTMP.shipping.postcode);
				}else{
					console.log('b ',customerDataTMP.billing.postcode);
					 shippingCalculation(customerDataTMP.billing.postcode);
				}

				
			}
			
		}

		//hook useEffect variable data set
		if(localStorage.getItem('coutData')) {
			setCoutData(JSON.parse(localStorage.getItem('coutData')));
		}

		//check token
        if(localStorage.getItem('token')) {
			setTokenValid(1)
        }
	}, [tokenValid]);
	useEffect(() => {
    			if(input?.billingDifferentThanShipping)
				{
					//console.log('yes sipping post code',input.shipping.postcode);
					// getAuspost(input.shipping.postcode,false);
					 shippingCalculation(input.shipping.postcode);
				}else{
					//console.log('yes billing post code',input.billing.postcode);
					//getAuspost(input.billing.postcode,true);
					 shippingCalculation(input.billing.postcode);
				}
				setOnloadShippingCal(false);
	}, [cart && onloadShippingCal]);
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
		discount_bundle = get_discount_bundle(cart?.cartItems,options,totalPrice,coutData);
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
				setCouponName(CouponApply.couponData.code);
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

		
		

		// redeemPrice
		if(coutData.redeemPrice != undefined)
		{
			if(coutData?.redeemPrice > 0)
			{
				totalPriceSum = totalPriceSum - coutData.redeemPrice;
			}
		}

		// discount_type_cart_quantity
		var discount_type_cart_cal = 0;
		discount_type_cart_cal = get_discount_type_cart(cart?.cartItems,options,setCartSubTotalDiscount,cartSubTotalDiscount,paymentMethodDiscount,totalPrice,tokenValid);
		
		if(discount_type_cart_cal != 0)
		{
			if(totalPriceSum >= discount_type_cart_cal)
			{
				totalPriceSum = totalPriceSum - discount_type_cart_cal;
			}else{
				totalPriceSum = totalPriceSum - totalPriceSum;
			}
		}
		
		setDiscoutDis(discount_cal);
		setTotalPriceDis(totalPriceSum);
		
    }, [totalPrice,shippingCost,coutData,paymentMethodDiscount,tokenValid]);

	
	/******   getAuspost  *******/
	const getAuspost = async (postcode,isBilling = true)=>{
		//console.log('postcode W',postcode)
		if(undefined != postcode)
		{
			var postcodeLength = postcode.length;
			if(postcodeLength >= 3 && postcodeLength <= 4)
			{
				if(isBilling)
				{
					setIsFetchingBillingSuburb(true);
				}else{
					setIsFetchingShippingSuburb(true);
				}
	
				console.log('postcode suburb',postcode)
				var resDta = '';
				await axios.post(SUBURB_API_URL,{postcode:postcode})
				.then(res=> {
					//console.log(res);
					resDta = res.data;
				})
				.catch(err=> console.log(err))
				console.log('dataPost',resDta);
				var errorsuburbRes = false;
				if(!isEmpty(resDta) && resDta != '' && resDta != undefined)
				{
					if(!isEmpty(resDta.localities) &&  resDta.localities != '' && resDta.localities != undefined)
					{
						if(isBilling)
						{
							setTheBillingsuburb(resDta.localities.locality);
							
						}else{
							setTheShippingsuburb(resDta.localities.locality);
							
						}
					}else{
						 errorsuburbRes = true;
					}
				}else{
					errorsuburbRes = true;
				}
				if(errorsuburbRes)
				{
					//errors[postcode] = 'In valid post code';
					if(isBilling)
					{
						setTheBillingsuburb({});
					}else{
						setTheShippingsuburb({});
					}
				}
				setIsFetchingBillingSuburb(false);
				setIsFetchingShippingSuburb(false);
			}
			
		}
		
	};

	/** Shipping calculation  */
	const shippingCalculation = async(postcode) => {
		setPostcodedis(postcode);
		console.log('postcode shipping',postcode);
		if(postcode.length == 4 && (cart?.cartItems?.length > 0))
		{
			
			const  shippingData  = await getShipping(postcode,cart?.cartItems);
			console.log('shippingData',shippingData);
			setNotice(shippingData.notice)
			if(shippingData.notice.length > 0)
			{
				setCart( { ...cart, shippingCost: -1} );
			}else{
				setCart( { ...cart, shippingCost: shippingData.shippingTotal} );
			}
			
		}
	}

	useEffect(() => { 
		console.log('cart', cart);
		if (!WEB_DEVICE && cart == null) { 
			//createdOrderData.
			if (createdOrderData?.allData?.payment_method == 'afterpay' || 
				createdOrderData?.allData?.payment_method == 'laybuy')
			{
				console.log('createdOrderData payment_method', createdOrderData?.allData?.payment_method);
				console.log('api call', cart);
				//createdOrderData?.orderPostID
				
				(async () => {
					myInterval = setInterval(get_web_to_mobile, CHECKOUT_API_TIME_INT);
					
					//await get_web_to_mobile();
				})();
			}
			
		}
	}, [cart]);

	useEffect(() => { 
		
		if (webtomobileURL != '') { 
			clearInterval(myInterval);
			console.log('webtomobileURL', webtomobileURL);
			Router.push(webtomobileURL);
		}
	}, [webtomobileURL]);
	
	const get_web_to_mobile = async () => { 
		if (webtomobileURLCount < CHECKOUT_API_CALL_LIMIT)
		{
		var getOrder_web_to_mobile = await get_order(createdOrderData?.orderPostID);	
		//var getOrder_web_to_mobile = await get_order(587286);	
		if (getOrder_web_to_mobile?.data?.orderData?.meta_data) { 
			if (getOrder_web_to_mobile?.data?.orderData?.meta_data.length > 0)
			{
				let found = getOrder_web_to_mobile?.data?.orderData?.meta_data.find(function (meta_data) {
					return '_web_to_mobil' ==  meta_data?.key;
				});
				if (found == undefined) {
					console.log('notfound');
				} else { 
					setWebtomoblieURL(found.value);
				}
			}
			
		}
		console.log('orderDataget',getOrder_web_to_mobile);
		webtomobileURLCount++;
		}
		console.log('webtomobileURLCount', webtomobileURLCount);
	};

	console.log('paymentMethodDiscount', paymentMethodDiscount);
	console.log('cartSubTotalDiscount',cartSubTotalDiscount);
	console.log('createdOrderData',createdOrderData);
	console.log('coutData', coutData);
	
	

	return (
		<>
		{ loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
			{ cart ? (
				<div key="check-outform">
				<form onSubmit={ handleFormSubmit } id="checkout_form" className="woo-next-checkout-form">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						<div>
							{/*Billing Details*/ }
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Billing Details</h2>
									<Address
										suburbs={ theBillingsuburb }
										states={ theBillingStates }
										countries={ billingCountries.length ? billingCountries: shippingCountries }
										input={ input?.billing }
										handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
										isFetchingStates={ isFetchingBillingStates }
										isFetchingSuburb={ isFetchingBillingSuburb }
										isShipping={ false }
										isBillingOrShipping
									/>
								</div>
								{/* Create Account Details*/ }
								{!tokenValid ? (
									<CheckboxField
										name="createAccount"
										type="checkbox"
										checked={ input?.createAccount }
										handleOnChange={ handleOnChange }
										label="Create an account?"
										containerClassNames="mb-4 pt-4"
										errors = {input?.errors ? input.errors : null}
									/>
								) : null}
								{ input?.createAccount ? (
									<InputField
										name="createAccountPassword"
										inputValue={input?.createAccountPassword}
										required
										handleOnChange={handleOnChange}
										label="Create account password"
										errors={input?.errors ? input.errors : null}
										containerClassNames="mb-4"
										type = 'password'
									/>
								) : null }
								<div>
									<h4 className="mt-4 mb-4">Additional Information</h4>
										<TextArea
											name="orderNotes"
											handleOnChange={ handleOnChange }
											errors={input?.errors ? input.errors : null}
											placeholder="Notes about your order, e.g. special notes for delivery."
											label="Order notes (optional)"
											containerClassNames="mb-4 pt-4"
										/>
								
								</div>
								<div>
									<CheckboxField
										name="billingDifferentThanShipping"
										type="checkbox"
										checked={ input?.billingDifferentThanShipping }
										handleOnChange={ handleOnChange }
										label="Shipping different than shipping"
										containerClassNames="mb-4 pt-4"
									/>
								</div>
							
							{/*Shipping Details*/ }
							{ input?.billingDifferentThanShipping ? (
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Shipping Details</h2>
									<Address
										suburbs={ theShippingsuburb}
										states={ theShippingStates }
										countries={ shippingCountries }
										input={ input?.shipping }
										handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
										isFetchingStates={ isFetchingShippingStates }
										isFetchingSuburb={ isFetchingShippingSuburb }
										isShipping
										isBillingOrShipping
									/>
								</div>
							) : null }
						</div>
						{/* Order & Payments*/ }
						<div className="your-orders">
							{/*	Order*/ }
							<h2 className="text-xl font-medium mb-4">Your Order</h2>
								<YourOrder cart={cart} shippingCost={shippingCost} discoutDis={discoutDis} cartSubTotalDiscount={cartSubTotalDiscount} totalPriceDis={totalPriceDis} notice={notice} postcodedis={postcodedis} coutData={coutData} discountBundleDis={discountBundleDis} />

							{createdOrderData?.allData?.payment_method == 'ppcp-gateway' && paypalButtonBisible ?<></>:
							<>
							{/*Payment*/ }
							<PaymentModes input={input}  handleOnChange={handleOnChange} paymentModes={paymentModes } totalPriceDis={totalPriceDis}/>
							
							{/* terms and conditions */ }
							<CheckboxField
								name="agreeTerms"
								type="checkbox"
								checked={ input?.agreeTerms }
								handleOnChange={ handleOnChange }
								label="I have read and agree to the website terms and conditions *"
								containerClassNames="mb-4 pt-4"
								errors = {input?.errors ? input.errors : null}
							/>
							</>}
							{input?.errors ?<div className="invalid-feedback d-block text-red-500">
								{ input?.errors['shippingCost'] } 
								{ input?.errors['rewardPoints'] }
								{ input?.errors['totalPriceDis'] }
							</div>:null}
							
							{createdOrderData?.allData?.payment_method == 'ppcp-gateway' && paypalButtonBisible ? <>
							<PaypalButtonCheckout 
								createdOrderData={createdOrderData} 
							/>
							<CancelOrderButton
								createdOrderData={createdOrderData}
							/>
							</>:
							<div id='checkoutbtn' className="woo-next-place-order-btn-wrap mt-5">
								<button
									disabled={ isOrderProcessing }
									className={ cx(
										'bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full',
										{ 'opacity-50': isOrderProcessing },
									) }
									type="submit"
								>
									Place Order
								</button>
							</div>
							}

							{/* Checkout Loading*/ }
							{ isOrderProcessing && <p>Processing Order...</p> }
							{ requestError && <p>Error : { requestError } :( Please try again</p> }
						</div>
					</div>
				</form>
				{!tokenValid?<LoginForm setTokenValid={setTokenValid} setCustomerData={setCustomerData}></LoginForm>:null}
				</div>
			) : <>
				{(() => {
						if (!WEB_DEVICE) { 
							return ('Pease wait..')
						}
				})()}  
			</>}
		</>
	);
};

export default CheckoutForm;
