import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
;


import LoginForm from '../../src/components/my-account/login';
import RegisterForm from '../../src/components/my-account/register';
import Sidebar from '../../src/components/my-account/sidebar';
import { get_points } from '../../src/utils/customjs/custome';
import LoginPhone from '../../src/components/my-account/login-phone';

import { useSession, signIn } from "next-auth/react"
import { get_customer } from '../../src/utils/customer';


export default function Login({ headerFooter }) {

	const { data: session } = useSession()


	//get token
	const [tokenValid, setTokenValid] = useState(0);
	const [customerData, setCustomerData] = useState(0);

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

	/**************  default *************** */
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

	// redeem point  
	var rewardPoints = get_points(customerData);
	useEffect(() => {
		if (session) {
			console.log('session', session);
			if (session.user.email && (tokenValid == 0)) {
				localStorage.setItem('token', 'logingoogle');
				get_customer(session.user.email, setCustomerData);
				setTokenValid(1);
			}
		}
	}, [session]);

	console.log('customerData', customerData);

	// Tab open close active
	const [activeTab, setActiveTab] = useState(0);
	const tabs = ['Login', 'Become a member'];
	const contents = [
		<div className='border border-gray-200 p-3 rounded'>
			<LoginForm setTokenValid={setTokenValid} setCustomerData={setCustomerData} tokenValid={tokenValid}></LoginForm>
			<LoginPhone setTokenValid={setTokenValid} setCustomerData={setCustomerData} tokenValid={tokenValid}></LoginPhone>
			{(() => {
				if (!session) {
					/*return <>
					  Signed in as {session.user.email} <br/>
					  <button onClick={() => signOut()}>Sign out</button>
					</>*/
					return <>
						Not signed in <br />
						<button onClick={() => signIn()}>Sign in</button>
						{/*}<iframe src="http://localhost:3000/api/auth/signin" frameborder="0"></iframe>{*/}
					</>
				}
			})()}
		</div>,
		<RegisterForm></RegisterForm>,
	];

	if (tokenValid) {
		return (
			<Layout headerFooter={headerFooter || {}} seo={seo}>
				<div className='grid grid-cols-12 gap-4'>
					<div className="col-span-4">
						<Sidebar setTokenValid={setTokenValid}></Sidebar>
					</div>
					<div className="col-span-8 ">
						{customerData?.first_name ? <p>User name: {customerData?.first_name}</p> : null}
						{rewardPoints > 0 ? <p>Points: {rewardPoints}</p> : null}
						{customerData?.meta_data?.membership_level ? <p>Membership Level: {customerData?.meta_data?.membership_level}</p> : null}

					</div>
				</div>
			</Layout>
		)
	} else {
		return (
			<Layout headerFooter={headerFooter || {}} seo={seo}>
				<div className="max-w-2xl mx-auto">
					<nav className="flex justify-center p-2 rounded bg-gray-200 border border-gray-200 mb-5" aria-label="Tabs">
						{tabs.map((tab, index) => (
							<button
								key={index}
								className={`${activeTab === index
									? ' bg-white rounded border border-victoria-800'
									: ' hover:text-victoria-800'
									} whitespace-nowrap p-3 px-5 sm:w-5/12 font-medium text-base -mb-0.5`}
								onClick={() => setActiveTab(index)}
								aria-current={activeTab === index ? 'page' : undefined}
							>
								{tab}
							</button>
						))}
					</nav>
					<div className="mt-2">
						{contents.map((content, index) => (
							<div
								key={index}
								className={activeTab === index ? 'block' : 'hidden'}
								role="tabpanel"
								aria-labelledby={`tab-${index}`}
							>
								{content}
							</div>
						))}
					</div>
				</div>
			</Layout>
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



