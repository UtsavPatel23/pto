import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../src/components/layout';
import Loading from '../src/components/icons/Loading';
import Bag from '../src/components/icons/Bag';
import { AppContext } from '../src/components/context';
import { HEADER_FOOTER_ENDPOINT, USER_LOGIN } from '../src/utils/constants/endpoints';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';

const ThankYouContent = () => {
	const [ cart, setCart ] = useContext( AppContext );
	const [ isSessionFetching, setSessionFetching ] = useState( false );
	const [ sessionData, setSessionData ] = useState( {} );
	const session_id = process.browser ? Router.query.session_id : null;
	const [ orderData, setOrderData ] = useState( {} );
	const [subtotal,setSubtotal] = useState(0);
	
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
						console.log( error );
						setSessionFetching( false );
					} );
			}
		}
		
	}, [ session_id ] );
	useEffect( () => {
		getOrderData(586218);
		
	},[]);
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
			setOrderData(response.data.orderData);
			if(response.data.orderData.line_items != undefined)
			{
				response.data.orderData?.line_items.map( ( item ) => {
					tmpsubtotal =tmpsubtotal+parseFloat(item.subtotal);
				}) 
			}
			setSubtotal(tmpsubtotal);
			//console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
		console.log(error);
		});
	}
	console.log('orderData',orderData);
	 
	useEffect(()=>{
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
		
	return (
		<div className="h-almost-screen">
			<div className="w-600px mt-10 m-auto">
				{ isSessionFetching ? <Loading/> : (
					<>
						<h2 className="mb-6 text-xl"><Bag className="inline-block mr-1"/> <span>Thank you for placing the order.</span>
						</h2>
						<p>Your payment is successful and your order details are: </p>
						<table className="table-auto w-full text-left whitespace-no-wrap mb-8">
							<thead>
							<tr>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Details</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td className="px-4 py-3">Order#</td>
								<td className="px-4 py-3">{ orderData?.number }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">Email</td>
								<td className="px-4 py-3">{ sessionData?.customer_email }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">Total</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { orderData?.total }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">PAYMENT METHOD</td>
								<td className="px-4 py-3">{ orderData?.payment_method_title }</td>
							</tr>
							</tbody>
						</table>
						{orderData != undefined?
						<div key='Order-details'>Order details
						<table className="table-auto w-full text-left whitespace-no-wrap mb-8">
							<thead>
							<tr>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Total</th>
							</tr>
							</thead>
							<tbody>
							{ orderData?.line_items &&
								orderData?.line_items.map( ( item ) => (
								<tr>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">{orderData?.currency_symbol} { item.subtotal }</td>
								</tr>
							) ) }
							
							<tr>
								<td className="px-4 py-3">Subtotal</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { parseFloat(subtotal).toFixed(2) }</td>
							</tr>
							
							{orderData?.discount_total > 0? <tr>
								<td className="px-4 py-3">Discount:</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { orderData?.discount_total }</td>
							</tr>: null}
							{ orderData?.fee_lines &&
								orderData?.fee_lines.map( ( item ) => (
								<tr>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">{orderData?.currency_symbol} { item.total }</td>
								</tr>
							) ) }
							<tr>
								<td className="px-4 py-3">Total</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { orderData?.total }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">PAYMENT METHOD</td>
								<td className="px-4 py-3">{ orderData?.payment_method_title }</td>
							</tr>
							{orderData?.customer_note ? <tr>
								<td className="px-4 py-3">Note:</td>
								<td className="px-4 py-3">{ orderData?.customer_note }</td>
							</tr>: null}
							

							</tbody>
						</table>
						</div>
						:null}
						<Link href="/">
							<div className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto">Shop more</div>
						</Link>
						<div key='coustomer-details'>
								<h4>Billing address</h4>
								{orderData?.billing?.first_name ? <p>{orderData?.billing?.first_name} </p>:null}
								{orderData?.billing?.last_name ? <p>{orderData?.billing?.last_name}</p>:null}
								{orderData?.billing?.address_1 ? <p>{orderData?.billing?.address_1}</p>:null}
								{orderData?.billing?.address_2 ? <p>{orderData?.billing?.address_2}</p>:null}
								{orderData?.billing?.city ? <p>{orderData?.billing?.city} </p>:null}
								{orderData?.billing?.company ? <p>{orderData?.billing?.company} </p>:null}
								{orderData?.billing?.country ? <p>{orderData?.billing?.country} </p>:null}
								{orderData?.billing?.email ? <p>{orderData?.billing?.email} </p>:null}
								{orderData?.billing?.phone ? <p>{orderData?.billing?.phone} </p>:null}
								{orderData?.billing?.postcode ? <p>{orderData?.billing?.postcode} </p>:null}
								{orderData?.billing?.state ? <p>{orderData?.billing?.state} </p>:null}

								<h4>Sipping address</h4>
								{orderData?.shipping?.first_name ? <p>{orderData?.shipping?.first_name} </p>:null}
								{orderData?.shipping?.last_name ? <p>{orderData?.shipping?.last_name}</p>:null}
								{orderData?.shipping?.address_1 ? <p>{orderData?.shipping?.address_1}</p>:null}
								{orderData?.shipping?.address_2 ? <p>{orderData?.shipping?.address_2}</p>:null}
								{orderData?.shipping?.city ? <p>{orderData?.shipping?.city} </p>:null}
								{orderData?.shipping?.company ? <p>{orderData?.shipping?.company} </p>:null}
								{orderData?.shipping?.country ? <p>{orderData?.shipping?.country} </p>:null}
								{orderData?.shipping?.email ? <p>{orderData?.shipping?.email} </p>:null}
								{orderData?.shipping?.phone ? <p>{orderData?.shipping?.phone} </p>:null}
								{orderData?.shipping?.postcode ? <p>{orderData?.shipping?.postcode} </p>:null}
								{orderData?.shipping?.state ? <p>{orderData?.shipping?.state} </p>:null}
						</div>
					</>
				) }
			</div>
		</div>
	);
};

export default function ThankYou( { headerFooter } ) {
	return (
		<Layout headerFooter={ headerFooter || {} }>
			<ThankYouContent/>
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
