import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../src/components/layout';
import Loading from '../src/components/icons/Loading';
import { AppContext } from '../src/components/context';
import { HEADER_FOOTER_ENDPOINT, NEXT_PUBLIC_SITE_API_URL, WEB_DEVICE } from '../src/utils/constants/endpoints';

import Bacs from './../src/components/thank-you/bacs';
import OrderBasicDetails from './../src/components/thank-you/order-basic-details';
import OrderDetails from './../src/components/thank-you/order-details';
import OrderAddress from './../src/components/thank-you/order-address';
import { payment_capture_afterpay } from '../src/utils/thank-you/afterpay-capture';
import { payment_capture_laybuy } from '../src/utils/thank-you/laybuy-capture';
import { getStates } from '../src/utils/checkout';
import { get_order, update_order } from '../src/utils/apiFun/order';
import { updateCustomers } from '../src/utils/apiFun/customer';


const ThankYouContent = ({headerFooter,states}) => {
	const [ cart, setCart ] = useContext( AppContext );
	const [ isSessionFetching, setSessionFetching ] = useState( false );
	const [ sessionData, setSessionData ] = useState( {} );
	const session_id = process.browser ? Router.query.session_id : null;
	const WEB_DEVICEQuery = process.browser ? Router.query.WEB_DEVICE : null;
	const orderPostnb = process.browser ? Router.query.orderPostnb : null;
	const status = process.browser ? Router.query.status : null;
	const orderToken = process.browser ? Router.query.orderToken : null;
	const token = process.browser ? Router.query.token : null;
	const order_key = process.browser ? Router.query.key : null;
	const [ orderData, setOrderData ] = useState( {} );
	const [subtotal,setSubtotal] = useState(0);
	const [updateweb_to_mobil,setUpdateweb_to_mobil] = useState(0);
	const paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	
	// stripe
	useEffect( () => {
		setSessionFetching( true );
		if ( process.browser ) {
			localStorage.removeItem( 'woo-next-cart' );
			setCart( null );
			
			if ( session_id ) {
				axios.get( NEXT_PUBLIC_SITE_API_URL + `/api/get-stripe-session/?session_id=${ session_id }` )
				.then( ( response ) => {
					setSessionData( response?.data ?? {} );
					getOrderData(response?.data?.metadata?.orderPostID);
					setSessionFetching( false );
				} )
				.catch( ( error ) => {
					console.log( 'error',error );
					setSessionFetching( false );
				} );
			}
			console.log('session_id',session_id);
		}
		
	}, [ session_id ] );

	// bank & afterpay
	useEffect( () => {
		setSessionFetching( true );
		if ( process.browser ) {
			localStorage.removeItem( 'woo-next-cart' );
			setCart( null );
			
			if ( orderPostnb ) {
				if(window.atob(orderPostnb))
				{
					console.log('orderPostnb consv',orderPostnb);
					getOrderData(window.atob(orderPostnb));
					setSessionFetching( false );
				 }
				 
			}
		}
	}, [ orderPostnb ] );
	console.log('orderPostnb',orderPostnb);
	/*useEffect( () => {
		getOrderData(586218);
		
	},[]);*/
console.log('sessionData',sessionData);
//console.log('Router',Router.asPath);
	const getOrderData = async(id) => {
		let data = '';
		var tmpsubtotal = 0;
		const response = await get_order(id);
		if(response.success)
		{
			var redirecturl = '';
			if(status != 'SUCCESS')
			{
				redirecturl =  '/checkout/order-pay?orderid=' + response.data.orderData?.id + '&key=' + order_key + '&status=CANCELLED&orderToken=' + token;
				if (WEB_DEVICEQuery == 'false' && (WEB_DEVICE)) {
					const newOrderData = {
						_web_to_mobil: redirecturl,
						orderId: response.data.orderData?.id,
						web_to_mobil: 1,
					};
					await update_order(newOrderData);
					setUpdateweb_to_mobil(1);
				} else {
					Router.push(redirecturl);
					return '';
				}
			} else {
				var redirectthanyouURL =  Router.asPath.replace("WEB_DEVICE=false", "WEB_DEVICE=true");
				if (WEB_DEVICEQuery == 'false' && (WEB_DEVICE) ) {
					const newOrderData = {
						_web_to_mobil: redirectthanyouURL,
						orderId: response.data.orderData?.id,
						web_to_mobil: 1,
					};
					await update_order(newOrderData);
					setUpdateweb_to_mobil(1);
				} else {
					setOrderData(response.data.orderData);
					if(response.data.orderData.line_items != undefined)
					{
						response.data.orderData?.line_items.map( ( item ) => {
							tmpsubtotal =tmpsubtotal+parseFloat(item.subtotal);
						}) 
					}
					setSubtotal(tmpsubtotal);
				}
				
			}
		}
			
	}
	console.log('orderData',orderData);
	console.log('orderToken',orderToken);
	 
	useEffect(()=>{
		if(orderData?.status != undefined)
		{
			if(status == 'SUCCESS' && (orderToken != '' || token != '') && orderData?.status == 'pending') 
			{
				
				if(orderData?.payment_method == 'afterpay')
				{
					payment_capture_afterpay(orderToken,orderData);
				}
				else if(orderData?.payment_method == 'laybuy')
				{
					console.log('laybuy payment');
					payment_capture_laybuy(token,orderData)
				}
				
			}
		}
		// Redeem process
		if(orderData?.id != undefined && orderData.fee_lines != undefined)
		{
			const findfee_linesData = orderData.fee_lines.find((element) => element.name == 'Redeem Price:');
			const findmeta_dataData = orderData.meta_data.find((element) => element.key == '_reward_points_used');
			const findMeta_dataUserReedemData = orderData.meta_data.find((element) => element.key == '_customer_after_reedem_reward_points');
			if(findfee_linesData != undefined)
			{
			if(findfee_linesData.total < 0 && (findmeta_dataData == undefined) && (findMeta_dataUserReedemData.value > 0))
			{

				const newOrderData = {
					_redeemed_reward_points: findfee_linesData.total*100,
					orderId: orderData?.id,
					redeem: 1,
				};
				update_order(newOrderData);
				//password
				var userRedeemPoint = parseInt(findMeta_dataUserReedemData.value) + parseInt(newOrderData._redeemed_reward_points) ;
				var userData = {
					id:orderData?.customer_id,
					meta_data:[             
						{    
							"key":"_customer_after_reedem_reward_points",
							"value":userRedeemPoint
						}
					]};
				
				let responseCus = {
					success: false,
					customers: null,
					message: '',
					error: '',
				};
				(async () => {
				const response =  await updateCustomers(userData);
				if(response?.success)
				{
					responseCus.success = true;
							responseCus.customers = response.data.customers;
							responseCus.message = "User update successfully";
							localStorage.setItem('customerData',JSON.stringify(responseCus.customers));
				}else{
					responseCus.error = error.response.data.error;
					responseCus.message = "Invalid data";
				}
				})();

			}else{
				console.log('already user update redeem point');
			}
			}
		}
		
		

		
	}, [orderData]);
	const closeWindow = () => { 
		window.close();
		console.log('clos');
	}
	console.log('updateweb_to_mobil', updateweb_to_mobil);
	if (updateweb_to_mobil == 1) {
		if (process.browser) {
			return(<button onClick={closeWindow} >Please window close to begin the process flow</button>)
			
		}
	}
	console.log('states',states);
	if (WEB_DEVICEQuery == 'false') { 
		return (<>Pament process ....</>);
	}else if (status != 'SUCCESS')
			{
				return (<></>);
	}
	
	return (
		<div className="h-almost-screen">
			<div className="w-600px mt-10 m-auto">
				{ isSessionFetching ? <Loading/> : (
					<>
						<OrderBasicDetails orderData={orderData} sessionData={sessionData} paymentModes={paymentModes}/>
						
						{orderData?.payment_method_title == 'bacs'? <>
						<Bacs paymentModes={paymentModes}></Bacs>
						</> : null}

						{orderData != undefined?
						<OrderDetails orderData={orderData} subtotal={subtotal} paymentModes={paymentModes}/>
						:null}
						<Link href="/shop/">
							<div className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto">Shop more</div>
						</Link>
						<OrderAddress orderData={orderData} states={states}/>
					</>
				) }
			</div>
		</div>
	);
};

export default function ThankYou( { headerFooter ,states} ) {
	return (
		<Layout headerFooter={ headerFooter || {} }>
			<ThankYouContent headerFooter={ headerFooter || {} } states={states}/>
		</Layout>
	);
};

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const states = await getStates('au');
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			states: states ?? {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		
	};
}
