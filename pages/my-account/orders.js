import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Link from 'next/link';
import Loader from "./../../public/loader.gif";
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { get_points } from '../../src/utils/customjs/custome';




export default function orders ({headerFooter}){
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
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
    // Cancel order by customer  
	const	cancelOrderClick = async(orderid) =>  {
			setLoading(true);
			const newOrderData = {
				orderCancelledByCustomer : 1,
				orderId: orderid,
			};
			 await	axios.post( '/api/order/update-order', newOrderData )
				.then( res => {
					console.log('res UPDATE DATA ORDER',res);
					get_orders(customerData?.id);
				} )
				.catch( err => {
					console.log('err UPDATE DATA ORDER',err);
				} )
		}
	// Get order by customer id 
	function get_orders(customer_id)
	{
		if(customer_id)
		{
			const orderReq = {
				customer_id:customer_id,
			  };
			axios.post('/api/order/get-orders',
			 orderReq
			).then((response) => {
				console.log(response);
				if(response?.data?.orderData != '')
				{
					setUserOrders(response?.data?.orderData);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.log('Err',error.response);
				setLoading(false);
			});	
		}
	}
		
    // set defaulte user login data 
    useEffect(() => {
		if(tokenValid)
		{
       		if(Cookies.get('customerData')) {
				var customerDataTMP =  JSON.parse(Cookies.get('customerData'));
				console.log('customerDataTMP',customerDataTMP);
				if(customerDataTMP?.id != '')
				{
					setRewardPoints(get_points(customerDataTMP));
					setCustomerData(customerDataTMP);
					get_orders(customerDataTMP?.id);
				}
				
			}
		}

		//check token
        if(Cookies.get('token')) {
			setTokenValid(1)
			setToken(Cookies.get('token'));
        }else{
			Router.push("/my-account/");
		}
	
	}, [tokenValid]);
        
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
											<td className="border border-slate-700 ">{userOrder?.status}</td>
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
												cancelOrderClick(userOrder?.id);
											}} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
													Cancel
											</button>
											:null}
											</td>
											<td className="border border-slate-700 ">-</td>
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



