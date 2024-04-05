import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from "../../src/components/loaderspin";
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { get_points } from '../../src/utils/customjs/custome';
import Link from 'next/link';
import Bacs from '../../src/components/thank-you/bacs';
import OrderBasicDetails from '../../src/components/thank-you/order-basic-details';
import OrderDetails from '../../src/components/thank-you/order-details';
import OrderAddress from '../../src/components/thank-you/order-address';
import { getStates } from '../../src/utils/checkout';
import { get_order } from '../../src/utils/apiFun/order';
import MobileBtn from '../../src/components/my-account/My-Account-Mobile-btn';




export default function viewOrder({ headerFooter, states }) {
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
	const [rewardPoints, setRewardPoints] = useState(0);
	const [loading, setLoading] = useState(true);
	const [orderData, setOrderData] = useState(null);
	const [subtotal, setSubtotal] = useState(0);
	const orderid = process.browser ? Router.query.orderid : null;
	const paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
	const [isMyaccountOpen, setIsMyaccountOpen] = useState(false);


	// Get order 
	useEffect(() => {
		(async () => {
			if (orderid) {
				let data = '';
				var tmpsubtotal = 0;
				const response = await get_order(orderid);
				if (response.success) {

					setOrderData(response.data.orderData);
					if (response.data.orderData.line_items != undefined) {
						response.data.orderData?.line_items.map((item) => {
							tmpsubtotal = tmpsubtotal + parseFloat(item.subtotal);
						})
					}
					setSubtotal(tmpsubtotal);
					setLoading(false);
				}
			}
		})();
	}, [orderid]);

	// set defaulte user login data 
	useEffect(() => {
		if (tokenValid) {
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				console.log('customerDataTMP', customerDataTMP);
				if (customerDataTMP?.id != '') {
					setRewardPoints(get_points(customerDataTMP));
					setCustomerData(customerDataTMP);
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

	if (tokenValid) {
		return (
			<>
				<Layout headerFooter={headerFooter || {}} seo={seo}>
					<div className='relative'>
						<h1 class="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 title-border">View Order</h1>
						<MobileBtn setIsMyaccountOpen={setIsMyaccountOpen} isMyaccountOpen={isMyaccountOpen} />
					</div>
					<div className='grid md:grid-cols-3 gap-5'>
						<Sidebar setTokenValid={setTokenValid} setIsMyaccountOpen={setIsMyaccountOpen} isMyaccountOpen={isMyaccountOpen}></Sidebar>
						<div className="md:col-span-2">
							<div className='border border-gray-300 p-2'>
								{loading &&
									<div className='my-3 p-5'>
										<Loader />
									</div>
								}
								{orderData?.customer_id == customerData?.id ? <>
									<OrderBasicDetails orderData={orderData} sessionData={null} viewOrderUse={true} paymentModes={paymentModes} />

									{orderData?.payment_method_title == 'bacs' ? <>
										<Bacs paymentModes={paymentModes}></Bacs>
									</> : null}

									{orderData != undefined ?
										<OrderDetails orderData={orderData} subtotal={subtotal} paymentModes={paymentModes} />
										: null}
									<div className='text-center inline-block w-full mb-3'>
										<Link href="/shop/" className='inline-block border border-victoria-600 bg-victoria-700 text-white py-2 px-3 hover:bg-transparent hover:text-victoria-700'>Shop more</Link>
									</div>

									<OrderAddress orderData={orderData} states={states} />
								</> : null}
							</div>
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



