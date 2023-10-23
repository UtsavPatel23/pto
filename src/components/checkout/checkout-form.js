import { useState, useContext } from 'react';
import cx from 'classnames';

import YourOrder from './your-order';
import PaymentModes from './payment-modes';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import Address from './user-address';
import { AppContext } from '../context';
import CheckboxField from './form-elements/checkbox-field';
import {
	handleBillingDifferentThanShipping,
	handleCreateAccount, handleOtherPaymentMethodCheckout, handleStripeCheckout,
	setStatesForCountry,
} from '../../utils/checkout';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getShipping, get_stateList } from '../../utils/customjs/custome';
import Loader from "./../../../public/loader.gif";
import axios from 'axios';
import { SUBURB_API_URL } from '../../utils/constants/endpoints';
import { debounce } from 'lodash';

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

const CheckoutForm = ( { countriesData , paymentModes } ) => {

	
	const { billingCountries, shippingCountries } = countriesData || {};

	const initialState = {
		billing: {
			...defaultCustomerInfo,
		},
		shipping: {
			...defaultCustomerInfo,
		},
		createAccount: false,
		orderNotes: '',
		billingDifferentThanShipping: false,
		paymentMethod: 'cod',
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

	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		event.preventDefault();

		
		/**
		 * Validate Billing and Shipping Details
		 *
		 * Note:
		 * 1. If billing is different than shipping address, only then validate billing.
		 * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
		 * the respective states should only be mandatory, if a country has states.
		 */
		const billingValidationResult =  validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length );
		const shippingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length ) : {
			errors: null,
			isValid: true,
		};


		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid ) {
			return null;
		}
		
		if(notice.length > 0)
		{
			return null;
		}

		// For stripe payment mode, handle the strip payment and thank you.
		if ( 'stripe' === input.paymentMethod ) {
			const createdOrderData = await handleStripeCheckout( shippingCost,couponName,totalPriceDis,input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
			return null;
		}
		
		// For Any other payment mode, create the order and redirect the user to payment url.
		const createdOrderData = await handleOtherPaymentMethodCheckout(shippingCost,couponName,input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
		
		if ( createdOrderData.paymentUrl ) {
			window.location.href = createdOrderData.paymentUrl;
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
		if ( 'createAccount' === target.name ) {
			handleCreateAccount( input, setInput, target );
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
				//console.log('Shipping name',target.name);
				//console.log('Shipping value',target.value);
				await shippingCalculation(target.value);
			}else if(!input?.billingDifferentThanShipping){
				//console.log('billing name',target.name);
				//console.log('billing value',target.value);
				await shippingCalculation(target.value);
			}
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}
		SetLoading(false);
	};

	const handleShippingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
				getAuspost(target.value);
		}
		
		const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
		setInput( newState );
		//await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};

	const handleBillingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
				getAuspost(target.value);
		}
		const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
		setInput( newState );
		//await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};
	//console.log('input',input);
	useEffect(() => {
        if(Cookies.get('customerData')) {
			var customerDataTMP =  JSON.parse(Cookies.get('customerData'));
			//console.log('customerDataTMP',customerDataTMP);
			if(customerDataTMP != undefined && customerDataTMP != '')
			{
				// Shipping field
				customerDataTMP.shipping.firstName = customerDataTMP.shipping.first_name;
				customerDataTMP.shipping.lastName = customerDataTMP.shipping.last_name;
				customerDataTMP.shipping.address1 = customerDataTMP.shipping.address_1;
				customerDataTMP.shipping.address2 = customerDataTMP.shipping.address_2;

				// Billing field
				customerDataTMP.billing.firstName = customerDataTMP.billing.first_name;
				customerDataTMP.billing.lastName = customerDataTMP.billing.last_name;
				customerDataTMP.billing.address1 = customerDataTMP.billing.address_1;
				customerDataTMP.billing.address2 = customerDataTMP.billing.address_2;

				setInput( {
					...input,
					billing: customerDataTMP.billing,
					shipping: customerDataTMP.shipping,
				} );
			}
			
		}

		//hook useEffect variable data set
		if(Cookies.get('coutData')) {
			setCoutData(JSON.parse(Cookies.get('coutData')));
		}
	}, []);
	useEffect(() => {
    			if(input?.billingDifferentThanShipping)
				{
					console.log('yes sipping post code',input.shipping.postcode);
					 shippingCalculation(input.shipping.postcode);
				}else{
					console.log('yes billing post code',input.billing.postcode);
					 shippingCalculation(input.billing.postcode);
				}
				setOnloadShippingCal(false);
	}, [cart && onloadShippingCal]);
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
		
		setDiscoutDis(discount_cal);
		setTotalPriceDis(totalPriceSum);
		
    }, [totalPrice,shippingCost,coutData]);

	/******     *******/
	const getAuspost = debounce(async (postcode)=>{
		//console.log('postcode W',postcode)
		if(undefined != postcode)
		{
			var postcodeLength = postcode.length;
			if(postcodeLength >= 3 && postcodeLength <= 4)
			{
	
				console.log('postcode',postcode)
				var resDta = '';
				await axios.post(SUBURB_API_URL,{postcode:postcode})
				.then(res=> {
					//console.log(res);
					resDta = res.data;
				})
				.catch(err=> console.log(err))
				console.log('dataPost',resDta);
			}
			
		}
		
	},500);

	/** Shipping calculation  */
	const shippingCalculation = async(postcode) => {
		setPostcodedis(postcode);
		if(postcode.length == 4 && (cart?.cartItems.length > 0))
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
	return (
		<>
		{ loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
			{ cart ? (
				<form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						<div>
							{/*Billing Details*/ }
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Billing Details</h2>
									<Address
										states={ theBillingStates }
										countries={ billingCountries.length ? billingCountries: shippingCountries }
										input={ input?.billing }
										handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
										isFetchingStates={ isFetchingBillingStates }
										isShipping={ false }
										isBillingOrShipping
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
										states={ theShippingStates }
										countries={ shippingCountries }
										input={ input?.shipping }
										handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
										isFetchingStates={ isFetchingShippingStates }
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
							<YourOrder cart={ cart } shippingCost={shippingCost} discoutDis={discoutDis} totalPriceDis={totalPriceDis} notice={notice} postcodedis={postcodedis}/>

							{/*Payment*/ }
							<PaymentModes input={input}  handleOnChange={handleOnChange} paymentModes={paymentModes } />

							<div className="woo-next-place-order-btn-wrap mt-5">
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

							{/* Checkout Loading*/ }
							{ isOrderProcessing && <p>Processing Order...</p> }
							{ requestError && <p>Error : { requestError } :( Please try again</p> }
						</div>
					</div>
				</form>
			) : null }
		</>
	);
};

export default CheckoutForm;
