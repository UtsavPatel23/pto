import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT} from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import Cookies from 'js-cookie';


import LoginForm from '../../src/components/my-account/login';
import RegisterForm from '../../src/components/my-account/register';
import Sidebar from '../../src/components/my-account/sidebar';
import { get_points } from '../../src/utils/customjs/custome';



export default function Login ({headerFooter}){
	
	//get token
	const [tokenValid,setTokenValid] = useState(0);
	const [customerData,setCustomerData] = useState(0);

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
        if(Cookies.get('token')) {
			setTokenValid(1)
        }
		if(Cookies.get('customerData')) {
			setCustomerData(JSON.parse(Cookies.get('customerData')));
		}
    }, []);

console.log('customerData',customerData);
	 // redeem point  
	 var rewardPoints = get_points(customerData);
	 

	if(tokenValid)
	{
		return(
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<div className='grid grid-cols-12 gap-4'>
				<div className="col-span-4">
				<Sidebar setTokenValid={setTokenValid}></Sidebar>
				</div>
				<div className="col-span-8 ">
					{customerData?.first_name?<p>User name: {customerData?.first_name}</p>:null }
					{rewardPoints>0?<p>Points: {rewardPoints}</p>:null }
				</div>
				</div>
			</Layout>
			)
	}else{
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<div className='grid grid-cols-12 gap-4'>
				<div className="col-span-12 ">
					<LoginForm setTokenValid={setTokenValid} setCustomerData={setCustomerData} tokenValid={tokenValid}></LoginForm>
					<RegisterForm></RegisterForm>
				</div>
				</div>
			</Layout>
			
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



