import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../src/components/layout';
import Loading from '../src/components/icons/Loading';
import { AppContext } from '../src/components/context';
import { HEADER_FOOTER_ENDPOINT, USER_LOGIN } from '../src/utils/constants/endpoints';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import Bacs from './../src/components/thank-you/bacs';
import OrderBasicDetails from './../src/components/thank-you/order-basic-details';
import OrderDetails from './../src/components/thank-you/order-details';
import OrderAddress from './../src/components/thank-you/order-address';
import { payment_capture } from '../src/utils/thank-you/afterpay-capture';


const ThankYouContent = ({headerFooter}) => {
	const [ cart, setCart ] = useContext( AppContext );
	const [ isSessionFetching, setSessionFetching ] = useState( false );
	const [ sessionData, setSessionData ] = useState( {} );
	const session_id = process.browser ? Router.query.session_id : null;
	const orderPostnb = process.browser ? Router.query.orderPostnb : null;
	const status = process.browser ? Router.query.status : null;
	const orderToken = process.browser ? Router.query.orderToken : null;
	const token = process.browser ? Router.query.token : null;
	const order_key = process.browser ? Router.query.key : null;
	const [ orderData, setOrderData ] = useState( {} );
	const [subtotal,setSubtotal] = useState(0);
	var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	
	// stripe
	useEffect( () => {
		setSessionFetching( true );
		if ( process.browser ) {
			localStorage.removeItem( 'woo-next-cart' );
			setCart( null );
			
			if ( session_id ) {
				axios.get( `/api/get-stripe-session/?session_id=${ session_id }` )
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
	const getOrderData = (id) => {
		let data = '';
		var tmpsubtotal = 0;
		let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: '/api/get-order?id='+id,
				headers: { },
				data : data
				};
		axios.request(config)
		.then((response) => {
			if(status != 'SUCCESS')
			{
					Router.push('/checkout/order-pay?orderid='+response.data.orderData?.id+'&key='+order_key);
					return '';
			}else{
				setOrderData(response.data.orderData);
				if(response.data.orderData.line_items != undefined)
				{
					response.data.orderData?.line_items.map( ( item ) => {
						tmpsubtotal =tmpsubtotal+parseFloat(item.subtotal);
					}) 
				}
				setSubtotal(tmpsubtotal);
			}
			
		})
		.catch((error) => {
		console.log(error);
		});
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
					payment_capture(orderToken,orderData);
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
				axios.post( '/api/update-order', newOrderData )
					.then( res => {
		
						console.log('res UPDATE DATA ORDER',res);
					} )
					.catch( err => {
						console.log('err UPDATE DATA ORDER',err);
					} )
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
				axios.post('/api/customer/update-customers/',
				userData
				).then((response) => {
					console.log(response.data);
					responseCus.success = true;
					responseCus.customers = response.data.customers;
					responseCus.message = "User update successfully";
					Cookies.set('customerData',JSON.stringify(responseCus.customers));
					//res.json( responseCus );
				})
				.catch((error) => {
					console.log('Err',error.response.data);
					responseCus.error = error.response.data.error;
					responseCus.message = "Invalid data";
					//res.status( 500 ).json( responseCus  );
				});
			}else{
				console.log('already user update redeem point');
			}
			}
		}
		
		

		
	},[orderData]);
	if(status != 'SUCCESS')
			{
				return (<></>);
			}
	return (
		<div className="h-almost-screen">
			<div className="w-600px mt-10 m-auto">
				{ isSessionFetching ? <Loading/> : (
					<>
						<OrderBasicDetails orderData={orderData} sessionData={sessionData} />
						
						{orderData?.payment_method_title == 'bacs'? <>
						<Bacs paymentModes={paymentModes}></Bacs>
						</> : null}

						{orderData != undefined?
						<OrderDetails orderData={orderData} subtotal={subtotal}/>
						:null}
						<Link href="/shop/">
							<div className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto">Shop more</div>
						</Link>
						<OrderAddress orderData={orderData}/>
					</>
				) }
			</div>
		</div>
	);
};

export default function ThankYou( { headerFooter } ) {
	return (
		<Layout headerFooter={ headerFooter || {} }>
			<ThankYouContent headerFooter={ headerFooter || {} }/>
		</Layout>
	);
};

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
		revalidate: 1,
	};
}
