import Layout from '/src/components/layout';
import cx from 'classnames';
import {HEADER_FOOTER_ENDPOINT} from '/src/utils/constants/endpoints';
import axios from 'axios';
import { useState } from 'react';
import CheckboxField from '../../../src/components/checkout/form-elements/checkbox-field';
import PaymentModes from '../../../src/components/checkout/payment-modes';
import validateAndSanitizeCheckoutForm from '../../../src/validator/checkout';
import { createCheckoutAfterpayAndRedirect, createCheckoutLaybuyAndRedirect, createCheckoutSessionAndRedirect, handleAgreeTerms, handleBacsCheckout } from '../../../src/utils/checkout';
import Router from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import OrderDetails from '../../../src/components/thank-you/order-details';
import PaypalButtonCheckout from '../../../src/components/checkout/paypal/paypal-button';
import { NEXT_PUBLIC_SITE_API_URL } from '../../../src/utils/constants/endpoints';
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

export default function Checkout({ headerFooter }) {
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
	const [ input, setInput ] = useState( initialState );
	const [ isOrderProcessing, setIsOrderProcessing ] = useState( false );
	const [ requestError, setRequestError ] = useState( null );
	const [loading, SetLoading] = useState(false);
	const orderid = process.browser ? Router.query.orderid : null;
	const wc_order_key = process.browser ? Router.query.key : null;
	const status = process.browser ? Router.query.status : null;
	const orderToken = process.browser ? Router.query.orderToken : null;
	const [ orderData, setOrderData ] = useState( {} );
	const [subtotal,setSubtotal] = useState(0);
	const [tokenValid,setTokenValid] = useState(0);
	const [totalPriceDis,setTotalPriceDis] = useState(0);
	const [checkOutOrderPay,setCheckOutOrderPay] = useState(0);
	
	// Paypal
	const [paypalButtonBisible,setPaypalButtonBisible] = useState(false);
	const [createdOrderData,setCreatedOrderData] = useState(null);
	
	

	var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	const options = headerFooter?.footer?.options;
	paymentModes = paymentModes.filter(obj => 
		{
		if (obj.method_enabled == true) {
			return true;
		}
	});

	//hook useEffect
    useEffect(() => {
        //check token
        if(Cookies.get('token')) {
			setTokenValid(1)
        }
	}, []);

	// Get Order
	useEffect( () => {
		if(orderid)
		{
			var tmpsubtotal = 0;
			let config = {
					method: 'post',
					maxBodyLength: Infinity,
					url: NEXT_PUBLIC_SITE_API_URL +'/api/order/get-order?id='+orderid,
					headers: { }
					};
			axios.request(config)
			.then((response) => {
				setOrderData(response.data.orderData);
				if(response.data.orderData.line_items != undefined)
					{
						response.data.orderData?.line_items.map( ( item ) => {
							tmpsubtotal =tmpsubtotal+parseFloat(item.subtotal);
						}) 
					}
					setSubtotal(tmpsubtotal);
					setTotalPriceDis(parseFloat(response.data.orderData.total));
					orderData.total
				setInput( {
					...input,
					billing: response.data.orderData.billing,
					shipping: response.data.orderData.shipping,
				} );
			})
			.catch((error) => {
				console.log(error);
			});
		}
		
	}, [ orderid ] );

	// Get Order
	useEffect( () => {
		if(orderData && status == 'CANCELLED')
		{
			const newOrderNote = {
				orderId: orderData?.id,
				noteMessage: 'PAYMENT STASUS CANCELLED Token : '+orderToken
			};
			axios.post( NEXT_PUBLIC_SITE_API_URL +'/api/order/update-order-notes', newOrderNote )
				.then( res => {
						console.log('res UPDATE DATA ORDER Note',res);
				} )
				.catch( err => {
					console.log('err UPDATE DATA ORDER Note ',err);
				} )
		}
		setCreatedOrderData({allData:orderData});
		
	}, [ orderData ] );
	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	 const handleFormSubmit = async ( event ) => {
		event.preventDefault();

		
		// validation other fiield 
		const ValidationResult =  validateAndSanitizeCheckoutForm( input);
		console.log('ValidationResult',ValidationResult);
		
		// update error message
		setInput( {
			...input,
			errors: ValidationResult.errors
		} );

		// If there are any errors, return.
		if ( !ValidationResult.isValid) {
			return null;
		}
		
		// For stripe payment mode, handle the strip payment and thank you.
		if ( 'stripe' === input.paymentMethod ) {
			setIsOrderProcessing( true );
			await paymentMethodUpdate( orderData?.id, input.paymentMethod);
			await createCheckoutSessionAndRedirect( 
					totalPriceDis,
					null, // products
					input, 
					orderData?.number, 
					orderData?.id,
					setIsOrderProcessing,
					orderData.order_key,
					checkOutOrderPay,
					null, //setRequestError
					null, // setCart
					null, // customerOrderData
				);
			return null;
		}

		// For bacs payment mode, handle the bacs payment and thank you.
		if ( 'bacs' === input.paymentMethod ) {
			setIsOrderProcessing( true );
			const newOrderData = {
				bacs : 1,
				orderId: orderData?.id,
			};
			   await	axios.post( NEXT_PUBLIC_SITE_API_URL +'/api/order/update-order', newOrderData )
				.then( res => {
					console.log('res UPDATE DATA ORDER',res);
				} )
				.catch( err => {
					console.log('err UPDATE DATA ORDER',err);
				} )
			await paymentMethodUpdate( orderData?.id, input.paymentMethod);
			//window.location.href = process.env.NEXT_PUBLIC_SITE_URL+'/thank-you/?orderPostnb='+window.btoa(orderData?.id)+'&orderId='+orderData?.number+'&status=SUCCESS';
			Router.push('/thank-you/?orderPostnb='+window.btoa(orderData?.id)+'&orderId='+orderData?.number+'&status=SUCCESS');
			return null;
		}

		// For Afterpay payment mode, handle the afterpay payment and thank you.
		if ( 'afterpay' === input.paymentMethod ) {
			setIsOrderProcessing( true );
			await paymentMethodUpdate( orderData?.id, input.paymentMethod);
			await createCheckoutAfterpayAndRedirect( 
					totalPriceDis,
					null, // products
					input, 
					orderData?.number, 
					orderData?.id,
					setIsOrderProcessing,
					orderData.order_key,
					checkOutOrderPay,
					null, //setRequestError
					null, // setCart
					null, // customerOrderData
				);
			return null;
		}

		// For Laybuy payment mode, handle the laybuy payment and thank you.
		if ( 'laybuy' === input.paymentMethod ) {
			setIsOrderProcessing( true );
			await paymentMethodUpdate( orderData?.id, input.paymentMethod);
			await createCheckoutLaybuyAndRedirect( 
					totalPriceDis,
					null, // products
					input, 
					orderData?.number, 
					orderData?.id,
					setIsOrderProcessing,
					orderData.order_key,
					checkOutOrderPay,
					null, //setRequestError
					null, // setCart
					null, // customerOrderData
				);
			return null;
		}

		// For Laybuy payment mode, handle the laybuy payment and thank you.
		if ( 'ppcp-gateway' === input.paymentMethod ) {
			//setIsOrderProcessing( true );
			await paymentMethodUpdate( orderData?.id, input.paymentMethod);
			setPaypalButtonBisible(true);
			return null;
		}
	};

	const paymentMethodUpdate = async ( orderId, paymentMethodName) =>
	{
		const newOrderData = {
			orderId: orderId,
			paymentMethodUpdate: 1,
			paymentMethodName: paymentMethodName,
		};
		axios.post( NEXT_PUBLIC_SITE_API_URL +'/api/order/update-order', newOrderData )
			.then( res => {

				console.log('res UPDATE DATA ORDER',res);
			} )
			.catch( err => {
				console.log('err UPDATE DATA ORDER',err);
			} )
	}

	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 * @param {bool} isShipping If this is false it means it is billing.
	 * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
	 *
	 * @return {void}
	 */
	const handleOnChange = async (event) => {
		const { target } = event || {};
		SetLoading(true);
		if ( 'agreeTerms' === target.name ) {
			handleAgreeTerms( input, setInput, target );
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}
		if(target.name == 'paymentMethod')
		{
			if(target.value == 'ppcp-gateway')
			{
				//setPaypalButtonBisible(true);
			}else{
				setPaypalButtonBisible(false);
			}
		}
		
		SetLoading(false);
	};
	console.log('input',input);
	console.log('orderData',orderData);
	console.log('wc_order_key',wc_order_key);
	console.log('createdOrderData',createdOrderData);
	if(orderData?.order_key == undefined)
	{
		return(<div>Loading...</div>);
	}
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1>Pay for order</h1>
			{wc_order_key == orderData.order_key  &&  orderData.status  == 'pending' ? 
			<>
			<div key="check-outform">
				<form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						{/* Order & Payments*/ }
						<div className="your-orders">
							{/*	Order*/ }
							<OrderDetails orderData={orderData} subtotal={subtotal} paymentModes={paymentModes}/>

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
							{input?.errors ?
							<div className="invalid-feedback d-block text-red-500">{ input?.errors['shippingCost'] }</div>:null}
							{paypalButtonBisible && createdOrderData != null?<>
								<PaypalButtonCheckout 
								createdOrderData={createdOrderData} 
								/>
							</>:
							<div id='checkoutbtn'  className="woo-next-place-order-btn-wrap mt-5">
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
				</div>
			</>
			:
			<>
				<div className="invalid-feedback d-block text-red-500">This order cannot be paid for. Please contact us if you need assistance.</div>
				 
			</>}
			
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		
	};
}
