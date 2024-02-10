import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
;
import { useState } from 'react';
import Link from 'next/link';
import Loader from "./../../public/loader.gif";
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { capitalizeFirstLetter, get_points } from '../../src/utils/customjs/custome';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {create_invoice_pdf} from '../../src/utils/my-account/create-pdf-invoice'
import { getStates } from '../../src/utils/checkout';
import ButtonOrderTracking from '../../src/components/my-account/button-order-tracking';
import { get_orders, update_order } from '../../src/utils/apiFun/order';




export default function orders ({headerFooter,states}){
        const seo = {
            title: 'Next JS WooCommerce REST API',
            description: 'Next JS WooCommerce Theme',
            og_image: [],
            og_site_name: 'React WooCommerce Theme',
            robots: {
                index: 'index',
                follow: 'follow',
            },
        }
        const [tokenValid,setTokenValid]=useState(0);
        const [customerData,setCustomerData]=useState(null);
        const [token, setToken] = useState('');
        const [userOrders, setUserOrders] = useState(null);
        const [rewardPoints, setRewardPoints] = useState(0);
        const [loading, setLoading] = useState(true);
        const [cancelStatus, setCancelStatus] = useState('');
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const {header} = headerFooter;
		const {options} = headerFooter?.footer;
		var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
        
    // Cancel order by customer  
	const	cancelOrderClick = async(orderid,number) =>  {
			setLoading(true);
			const newOrderData = {
				orderCancelledByCustomer : 1,
				orderId: orderid,
			};
			const updateOrder =  await update_order(newOrderData);
			if(updateOrder.success)
			{
				get_orders_Data(customerData?.id);
				setCancelStatus({'yes':'Your order has been cancelled : '+ number+'.'});
			}else{
				setCancelStatus({no:'Something went wrong!.'});
			}
		}
		// Get order by customer id 
		const confirmAlertClick = (orderid,number) => {
			confirmAlert({
			//  title: 'Cancel Order',
			  message: 'Are you sure to do cancel order.',
			  buttons: [
				{
				  label: 'Yes',
				  onClick: () => cancelOrderClick(orderid,number)
				},
				{
				  label: 'No',
				  onClick: () => ''
				}
			  ]
			});
		  };

	// Get order by customer id 
	const get_orders_Data = async(customer_id) => {
		if(customer_id)
		{
			const response =  await get_orders(customer_id);
			if(response.success)
			{
				if(response?.data?.orderData != '')
				{
					setUserOrders(response?.data?.orderData);
				}
				setLoading(false);
			}
		}
	}
		
    // set defaulte user login data 
    useEffect(() => {
		if(tokenValid)
		{
       		if(localStorage.getItem('customerData')) {
				var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
				//console.log('customerDataTMP',customerDataTMP);
				if(customerDataTMP?.id != '')
				{
					setRewardPoints(get_points(customerDataTMP));
					setCustomerData(customerDataTMP);
					get_orders_Data(customerDataTMP?.id);
				}
				
			}
		}

		//check token
        if(localStorage.getItem('token')) {
			setTokenValid(1)
			setToken(localStorage.getItem('token'));
        }else{
			Router.push("/my-account/");
		}
	
	}, [tokenValid]);
	//console.log('states',states);
	//console.log('userOrders',userOrders);
        if(tokenValid)
        {
			return(
                <>
				<Layout headerFooter={ headerFooter || {} } seo={ seo }>
					<div className='grid grid-cols-12 gap-4'>
					<div className="col-span-4">
					<Sidebar setTokenValid={setTokenValid}></Sidebar>
					</div>
					
						<div className="col-span-8 ">
							<div className="earn-reward-box">
								{rewardPoints != 0?
									<div className="earn-info">
										<div className="earn-point">
										<h3 className="mb-0">${(rewardPoints/100).toFixed(2)} </h3>
										<p className="mb-0">Total Point {rewardPoints}</p>
										</div>
									</div>
								:null}
								<div className="earn-link">
									<p className="mb-0">Know More How Store Credit Works</p>
									<Link href="/rewards-program/">Click Here<i className="fa fa-arrow-right"></i></Link>
								</div>
							{ loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							{ cancelStatus?.yes && <div className="alert text-green-700" >{cancelStatus?.yes}</div> }
							{ cancelStatus?.no && <div className="alert text-red-700">{cancelStatus?.no}</div> }
							</div>
							{userOrders != null?
							<table className="border-collapse border border-slate-500 ..." width='100%'>
								<thead>
									<tr className='bg-gray-400'>
									<th className="border border-slate-600 ">Order</th>
									<th className="border border-slate-600 ">Date </th>
									<th className="border border-slate-600 ">Status  </th>
									<th className="border border-slate-600 ">Total </th>
									<th className="border border-slate-600 ">Actions </th>
									<th className="border border-slate-600 ">Tracking </th>
									</tr>
								</thead>
								<tbody>
								{userOrders.map(function(userOrder){
									var date_created = new Date(userOrder?.date_created);
									var datedis = months[date_created.getMonth()]+' '+date_created.getDate()+', '+date_created.getFullYear();
									var item = 0;
									userOrder?.line_items.map(function(line_item){
										item +=line_item?.quantity;
									});
									return(
										<tr className='bg-gray-300'>
											<td className="border border-slate-700 ">{userOrder?.number}</td>
											<td className="border border-slate-700 ">{datedis}</td>
											<td className="border border-slate-700 ">{capitalizeFirstLetter(userOrder?.status.replaceAll('-', ' '))}</td>
											<td className="border border-slate-700 ">
												{userOrder?.currency_symbol}
												{userOrder?.total} for {item} {item>1?'items':'item'}</td>
											<td className="border border-slate-700 ">
											{userOrder?.status == 'pending'?
											<Link href={`/checkout/order-pay?orderid=${userOrder?.id}&pay_for_order=true&key=${userOrder?.order_key}`} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
													Pay
											</Link>
											:null}
											<Link href={`/my-account/view-order?orderid=${userOrder?.id}`} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
											View
											</Link>
											{userOrder?.status == 'pending'?
											<button value={userOrder?.id} onClick={cancelOrder => {
												confirmAlertClick(userOrder?.id,userOrder?.number);
											}} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
													Cancel
											</button>
											:null}
											{userOrder?.status == 'pending' || userOrder?.status == 'cancelled'?
											null
													:
													<Link href={ `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&document_type=invoice&order_ids=${ userOrder?.id }&access_key=${ userOrder?.order_key }&my-account=true`} target="_blank" className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>Invoice</Link>
													
												}
												{/*} <button onClick={invoice_pdf => {
												create_invoice_pdf(userOrder,header,states,paymentModes);
											}} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
													Invoice
										</button>{*/}
											</td>
											<td className="border border-slate-700 ">
												<ButtonOrderTracking options={options} meta_data={userOrder?.meta_data}/>
											</td>
										</tr>
									);
								})}
									
								</tbody>
								</table>
							:null}
						</div>
						
					</div>
				</Layout>
                </>
            )
        }
		
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



