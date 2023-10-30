import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT} from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import Cookies from 'js-cookie';


import LoginForm from '../../src/components/my-account/login';
import RegisterForm from '../../src/components/my-account/register';



export default function Login ({headerFooter}){
	
	//get token
	const [tokenValid,setTokenValid] = useState(0);

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
    }, []);

	//function logout
	const logoutHanlder = async () => {
		//remove token from cookies
		Cookies.remove("token");
		Cookies.remove("user_lgdt");
		Cookies.remove('customerData');
		Cookies.remove('coutData');
		
		setTokenValid(0);
	};

	
	if(tokenValid)
	{
		return(
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				
				<div className="col-span-3 ">
					<button onClick={logoutHanlder}>logout</button>
				</div>
				<div className="col-span-9 ">
					User
				</div>
				
			</Layout>
			)
	}else{
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<div className="col-span-3 ">side</div>
				<div className="col-span-9 ">
					<LoginForm setTokenValid={setTokenValid} tokenValid={tokenValid}></LoginForm>
					<RegisterForm ></RegisterForm>
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



