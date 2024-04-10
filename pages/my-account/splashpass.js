import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT, SPLASHPASS } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { get_points } from '../../src/utils/customjs/custome';
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import bronze from '../../public/assets/img/bronze.webp';
import silver from '../../public/assets/img/silver.webp';
import gold from '../../public/assets/img/gold.webp';
import platinum from '../../public/assets/img/platinum.webp';
import Image from 'next/image';



export default function splashpass({ headerFooter, countriesData }) {
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
	const [isMyaccountOpen, setIsMyaccountOpen] = useState(false);
	const [customerData, setCustomerData] = useState(0);
	const [rewardPoints, setRewardPoints] = useState(0);
	const { membership_level } = customerData?.meta_data ?? '';
	const [total_order_amount, setTotal_order_amount] = useState(null);
	const [reward_points_history, setReward_points_history] = useState('');
	const [order_reward_points, setOrder_reward_points] = useState('');
	const membership_levels = ['Bronze', 'Silver', 'Gold', 'Platinum'];

	/* cashback , lvl , voucher , milestone */
	const membership_benefits = [
		["3%", 'Bronze', '$10', 750],
		["5%", 'Silver', '$15', 1750],
		["7%", 'Gold', '$20', 5000],
		["10%", 'Platinum', '$25'],
	];
	const [mem_level, setMem_level] = useState(0);
	//hook useEffect
	useEffect(() => {
		//check token
		if (localStorage.getItem('token')) {
			setTokenValid(1)
		}
		if (localStorage.getItem('customerData')) {
			setCustomerData(JSON.parse(localStorage.getItem('customerData')));
		}

	}, []);
	// set defaulte user login data 
	useEffect(() => {
		setRewardPoints(get_points(customerData));
		membership_levels.map((level, i) => {
			if (level == membership_level) {
				setMem_level(i);
			}
		})
	}, [customerData]);
	useEffect(()=>{
		(async () => {
			if (customerData?.id != undefined) 
			{ 
					let config = {
						method: 'post',
						maxBodyLength: Infinity,
						url: SPLASHPASS,
						data: {
							user_id: customerData?.id,
						}
					  };
				  await axios.request(config)	
							.then((response) => {
								setTotal_order_amount(response?.data?.total_order_amount ?? '');
								setReward_points_history(response?.data?.reward_points_history ?? '');
								setOrder_reward_points(response?.data?.order_reward_points ?? '');
								console.log('response?.data', response?.data);
							  })
							  .catch((error) => {
								console.log('response eeeee',error.response.data);
							  });
			
			}
			
    })();
	}, [customerData])
	// set defaulte user login data 
	useEffect(() => {

		//check token
		if (localStorage.getItem('token')) {
			setTokenValid(1)
		} else {
			Router.push("/my-account/");
		}
	}, [tokenValid]);

	if (tokenValid) {
		return (
			<>

				<Layout headerFooter={headerFooter || {}} seo={seo}>
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
										{membership_level == 'Bronze' || membership_level == null  || membership_level == '' ? <Image src={bronze} alt="Bronze Trophy" width={100} height={100} /> : null}
										{membership_level == 'Silver' ? <Image src={silver} alt="Silver Trophy" width={100} height={100} /> : null}
										{membership_level == 'Gold' ? <Image src={gold} alt="Gold Trophy" width={100} height={100} /> : null}
										{membership_level == 'Platinum' ? <Image src={platinum} alt="Platinum Trophy" width={100} height={100} /> : null}
									</div>
									: null
								}
								<div className="flex flex-wrap bg-slate-100 justify-between items-center py-1 px-2 mt-2">
									<p>Know More How Store Credit Works</p>
									<Link href="/splash-pass/" className='bg-victoria-700 text-white py-1 px-2'>
										Click Here
										<i className="fa fa-arrow-right ms-2"></i>
									</Link>
								</div>
							</div>
							<div className="shadow-full border border-gray-300 p-2 mt-5">
								<h3 className='border-b border-gray-300 mb-3 pb-2 text-center font-semibold text-xl'>Your Membership level</h3>
								<div className='sm:text-center sm:flex items-center justify-around'>
									<div className={`sm:inline-block w-[2px] sm:min-w-6 lg:min-w-12 h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 0 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className='relative min-w-24 flex sm:block items-center gap-3'>
										<div className={`border-2 rounded-full p-3 bg-gray-100 ${mem_level >= 0 ? 'border-victoria-700' : ' border-gray-300'}`}>
											<Image src={bronze} alt="Bronze Trophy" width={65} height={65} />
										</div>
										<p className={`font-medium sm:absolute inset-x-0 sm:mx-auto sm:mt-2 ${mem_level >= 0 ? 'text-victoria-600' : ''}`}>Bronze</p>
									</div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 0 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 1 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className='relative min-w-24 flex sm:block items-center gap-3'>
										<div className={`border-2 rounded-full p-3 bg-gray-100 ${mem_level >= 1 ? 'border-victoria-700' : ' border-gray-300'}`}>
											<Image src={silver} alt="Silver Trophy" width={65} height={65} />
										</div>
										<p className={`font-medium sm:absolute inset-x-0 sm:mx-auto sm:mt-2 ${mem_level >= 1 ? 'text-victoria-600' : ''}`}>Silver</p>
									</div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 1 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 2 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className='relative min-w-24 flex sm:block items-center gap-3'>
										<div className={`border-2 rounded-full p-3 bg-gray-100 ${mem_level >= 2 ? 'border-victoria-700' : ' border-gray-300'}`}>
											<Image src={gold} alt="Gold Trophy" width={65} height={65} />
										</div>
										<p className={`font-medium sm:absolute inset-x-0 sm:mx-auto sm:mt-2 ${mem_level >= 2 ? 'text-victoria-600' : ''}`}>Gold</p>
									</div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 2 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className={`sm:inline-block w-[2px] sm:w-full h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 3 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
									<div className='relative min-w-24 flex sm:block items-center gap-3'>
										<div className={`border-2 rounded-full p-3 bg-gray-100 ${mem_level >= 3 ? 'border-victoria-700' : ' border-gray-300'}`}>
											<Image src={platinum} alt="Platinum Trophy" width={65} height={65} />
										</div>
										<p className={`font-medium sm:absolute inset-x-0 sm:mx-auto sm:mt-2 ${mem_level >= 3 ? 'text-victoria-600' : ''}`}>Platinum</p>
									</div>
									<div className={`sm:inline-block w-[2px] sm:min-w-6 lg:min-w-12 h-5 sm:h-0.5 ms-11 sm:ms-0 ${mem_level >= 3 ? 'bg-victoria-700' : 'bg-gray-300'}`}></div>
								</div>
								<div className='mt-12 mb-5 shadow-full p-2 sm:p-5 flex items-center justify-between border border-violet-700 bg-violet-100'>
									<div>
										<h3 className='font-semibold text-3xl text-victoria-700'>Save {membership_benefits[mem_level][2]}</h3>
										<p className='text-red-600'>*shipping cost excluded</p>
									</div>
									<div className='sm:flex items-center gap-3 text-center'>
										<p className='mb-2 sm:mb-0'>Use Code</p>
										<p className='border-2 border-dashed border-victoria-600 py-1 px-3 font-semibold text-lg'>
											{membership_benefits[mem_level][1]}
										</p>
									</div>
								</div>
								<div className='border border-gray-300 p-2'>
									<div className='md:flex items-center gap-5'>
										<div>
											<h4 className='font-semibold text-xl mb-5'>Benefits Of {membership_benefits[mem_level][1]} Tier</h4>
											<ul className='liarrow'>
												<li>Join the splash pass to earn rewards points and access exclusive member only benefits and offers.</li>
												<li>Earn 1 splash pass rewards points for every dollar spent, and receive {membership_benefits[mem_level][0]} Cashback As A Store Credit in rewards when you achieve a {membership_benefits[mem_level][1]} Membership</li>
												<li>Exclusive {membership_benefits[mem_level][1]} Members receives a Monthly {membership_benefits[mem_level][2]} Voucher.</li>
											</ul>
										</div>
										{membership_benefits[mem_level][3] ?
											<div className='bg-gray-300 min-w-56 p-3 lg:mx-10 text-center'>
												<h4 className='font-semibold text-xl'>Spend ${membership_benefits[mem_level][3] - total_order_amount}</h4>
												<p >To Reach Next Tier</p>
											</div>
											: ''
										}
									</div>
									<div className='text-center'>
										<Link href="/splash-pass/" target="_blank" class="mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700">Learn More</Link>
									</div>
								</div>
							</div>
							<div className="shadow-full border border-gray-300 p-2 mt-5">
								{reward_points_history != '' ? 
								<><h3 className='border-b border-gray-300 mb-3 pb-2 text-center font-semibold text-xl'>Additional Reward Points</h3>
								<div className="relative overflow-x-auto my-5">
									<table className="border-collapse w-full border border-slate-300">
										<thead>
											<tr>
												<th className="border border-slate-300 p-2 text-left">Date</th>
												<th className="border border-slate-300 p-2 text-left">Reason</th>
												<th className="border border-slate-300 p-2 text-left">Points</th>
											</tr>
										</thead>
										<tbody>
													{reward_points_history.length ? reward_points_history.map((history) => {
														return (<tr>
															<td className="border border-slate-300 p-2">{ history?.date}</td>
															<td className="border border-slate-300 p-2">{ history?.store_credit_reason}</td>
															<td className="border border-slate-300 p-2">{ history?.points}</td>
														</tr>)
														}
													) : null}			
											
										</tbody>
									</table>
								</div>
									</> : null}
								{order_reward_points != '' ? 
								<><h3 className='border-b border-gray-300 mb-3 pb-2 text-center font-semibold text-xl'>Order Reward Points</h3>
								<div className="relative overflow-x-auto my-5">
									<table className="border-collapse w-full border border-slate-300">
										<thead>
											<tr>
												<th className="border border-slate-300 p-2 text-left">Order</th>
												<th className="border border-slate-300 p-2 text-left">Earned</th>
												<th className="border border-slate-300 p-2 text-left">Redeemed</th>
											</tr>
										</thead>
										<tbody>
													{order_reward_points.length ? order_reward_points.map((points) => {
														return (<tr>
															<td className="border border-slate-300 p-2">{ points?.order_number}</td>
															<td className="border border-slate-300 p-2">{ points?._earned_reward_points}</td>
															<td className="border border-slate-300 p-2">{ points?._redeemed_reward_points}</td>
														</tr>)
														}
													) : null}			
											
										</tbody>
									</table>
								</div>
								</>: null}
							</div>
						</div>
					</div >
				</Layout >
			</>
		)
	}

};

export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);

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



