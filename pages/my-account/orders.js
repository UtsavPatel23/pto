import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Loader from "../../src/components/loaderspin";
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { capitalizeFirstLetter, get_points } from '../../src/utils/customjs/custome';
import { create_invoice_pdf } from '../../src/utils/my-account/create-pdf-invoice'
import { getStates } from '../../src/utils/checkout';
import ButtonOrderTracking from '../../src/components/my-account/button-order-tracking';
import { get_orders, update_order } from '../../src/utils/apiFun/order';
import bronze from '../../public/assets/img/bronze.webp';
import silver from '../../public/assets/img/silver.webp';
import gold from '../../public/assets/img/gold.webp';
import platinum from '../../public/assets/img/platinum.webp';
import Image from 'next/image';
import MobileBtn from '../../src/components/my-account/My-Account-Mobile-btn';




export default function orders({ headerFooter, states }) {
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
	const [tokenValid, setTokenValid] = useState(0);
	const [customerData, setCustomerData] = useState(null);
	const [token, setToken] = useState('');
	const [userOrders, setUserOrders] = useState(null);
	const [rewardPoints, setRewardPoints] = useState(0);
	const [loading, setLoading] = useState(true);
	const [cancelStatus, setCancelStatus] = useState('');
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const { header } = headerFooter;
	const { options } = headerFooter?.footer;
	var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	const [isMyaccountOpen, setIsMyaccountOpen] = useState(false);
	const { membership_level } = customerData?.meta_data ?? '';

	// Cancel order by customer  
	const cancelOrderClick = async (orderid, number) => {
		setLoading(true);
		const newOrderData = {
			orderCancelledByCustomer: 1,
			orderId: orderid,
		};
		const updateOrder = await update_order(newOrderData);
		if (updateOrder.success) {
			get_orders_Data(customerData?.id);
			setCancelStatus({ 'yes': 'Your order has been cancelled : ' + number + '.' });
		} else {
			setCancelStatus({ no: 'Something went wrong!.' });
		}
	}
	// Get order by customer id 
	const confirmAlertClick = (orderid, number) => {
		confirmAlert({
			//  title: 'Cancel Order',
			message: 'Are you sure to do cancel order.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => cancelOrderClick(orderid, number)
				},
				{
					label: 'No',
					onClick: () => ''
				}
			]
		});
	};

	// Get order by customer id 
	const get_orders_Data = async (customer_id) => {
		if (customer_id) {
			const response = await get_orders(customer_id);
			if (response.success) {
				if (response?.data?.orderData != '') {
					setUserOrders(response?.data?.orderData);
				}
				setLoading(false);
			}
		}
	}

	// set defaulte user login data 
	useEffect(() => {
		if (tokenValid) {
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				//console.log('customerDataTMP',customerDataTMP);
				if (customerDataTMP?.id != '') {
					setRewardPoints(get_points(customerDataTMP));
					setCustomerData(customerDataTMP);
					get_orders_Data(customerDataTMP?.id);
				}

			}
		}

		//check token
		if (localStorage.getItem('token')) {
			setTokenValid(1)
			setToken(localStorage.getItem('token'));
		} else {
			Router.push("/my-account/");
		}

	}, [tokenValid]);
	//console.log('states',states);
	//console.log('userOrders',userOrders);
	if (tokenValid) {
		return (
			<>
				<Layout headerFooter={headerFooter || {}} seo={seo}>
					<div className='relative'>
						<h1 class="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 title-border">Order</h1>
						<MobileBtn setIsMyaccountOpen={setIsMyaccountOpen} isMyaccountOpen={isMyaccountOpen} />
					</div>
					<div className='grid md:grid-cols-3 gap-5'>
						<Sidebar setTokenValid={setTokenValid} setIsMyaccountOpen={setIsMyaccountOpen} isMyaccountOpen={isMyaccountOpen}></Sidebar>
						<div className="md:col-span-2">
							<div className="reward-account border border-gray-300 p-2">
								{rewardPoints != 0 ?
									<div className="earn-info flex items-center justify-between">
										<div className="earn-point">
											<h3 className="font-semibold font-jost text-3xl">${(rewardPoints / 100).toFixed(2)} </h3>
											<p className="mb-0">Total Point {rewardPoints}</p>
										</div>
										{membership_level == 'Bronze' || membership_level == null  || membership_level == '' ? <Image src={bronze} alt="Bronze Trophy" width={100} height={100} />:null}
										{membership_level == 'Silver' ? <Image src={silver} alt="Silver Trophy" width={100} height={100} />:null}
										{membership_level == 'Gold' ? <Image src={gold} alt="Gold Trophy" width={100} height={100} />:null}
										{membership_level == 'Platinum' ? <Image src={platinum} alt="Platinum Trophy" width={100} height={100} />:null}
									</div>
									: null
								}
								<div className="flex flex-wrap bg-slate-100 justify-between items-center py-1 px-2 mt-2">
									<p>Know More How Store Credit Works</p>
									<Link href="/rewards-program/" className='bg-victoria-700 text-white py-1 px-2'>
										Click Here
										<i className="fa fa-arrow-right ms-2"></i>
									</Link>
								</div>
							</div>
							{loading &&
								<div className='my-3 p-5'>
									<Loader />
								</div>
							}
							{cancelStatus?.yes && <div className=" text-green-700" >{cancelStatus?.yes}</div>}
							{cancelStatus?.no && <div className=" text-red-700">{cancelStatus?.no}</div>}
							{userOrders != null ?
								<div class="grid grid-cols-1 relative overflow-x-auto py-5">
									<table className="border-collapse w-full border border-slate-300">
										<thead>
											<tr>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Order</th>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Date</th>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Status</th>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Total</th>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Actions</th>
												<th scope="col" className='border border-slate-300 p-2 text-left'>Tracking</th>
											</tr>
										</thead>
										<tbody>
											{userOrders.map(function (userOrder) {
												var date_created = new Date(userOrder?.date_created);
												var datedis = months[date_created.getMonth()] + ' ' + date_created.getDate() + ', ' + date_created.getFullYear();
												var item = 0;
												userOrder?.line_items.map(function (line_item) {
													item += line_item?.quantity;
												});
												return (
													<tr>
														<td className="border border-slate-300 p-2">{userOrder?.number}</td>
														<td className="border border-slate-300 p-2">{datedis}</td>
														<td className={`border border-slate-300 p-2 text-center`}>
															<p className={`text-sm w-fit rounded border border-victoria-700 px-1  status-${(userOrder?.status)}`}>{capitalizeFirstLetter(userOrder?.status.replaceAll('-', ' '))}</p></td>
														<td className="border border-slate-300 p-2">
															{userOrder?.currency_symbol}
															{userOrder?.total} for {item} {item > 1 ? 'items' : 'item'}</td>
														<td className="border border-slate-300 p-2">
															<div className='flex flex-wrap gap-2'>
																{userOrder?.status == 'pending' ?
																	<Link href={`/checkout/order-pay?orderid=${userOrder?.id}&pay_for_order=true&key=${userOrder?.order_key}`} className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white'>
																		Pay
																	</Link>
																	: null}
																<Link href={`/my-account/view-order?orderid=${userOrder?.id}`} className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white'>
																	View
																</Link>
																{userOrder?.status == 'pending' ?
																	<button value={userOrder?.id} onClick={cancelOrder => {
																		confirmAlertClick(userOrder?.id, userOrder?.number);
																	}} className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white'>
																		Cancel
																	</button>
																	: null}
																{userOrder?.status == 'pending' || userOrder?.status == 'cancelled' ?
																	null
																	:
																	<Link href={`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&document_type=invoice&order_ids=${userOrder?.id}&access_key=${userOrder?.order_key}&my-account=true`} target="_blank" className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white'>Invoice</Link>

																}
																{/*} <button onClick={invoice_pdf => {
																	create_invoice_pdf(userOrder,header,states,paymentModes);
																}} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '}>
																		Invoice
															</button>{*/}
															</div>
														</td>
														<td className="border border-slate-300 p-2">
															<ButtonOrderTracking options={options} meta_data={userOrder?.meta_data} />
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								: null}
						</div>
					</div>
				</Layout>
			</>
		)
	}

};

export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
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



