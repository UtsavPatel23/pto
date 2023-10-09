import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';
import { getUser_lgdt } from '../src/utils/customjs/custome';

export default function myaccount ({headerFooter}){
	
	const [ storetmp, setStoretmp ] = useReducer(true,[],()=>{
		if (typeof window !== 'undefined') {
		const locaData = sessionStorage.getItem( 'token');
		return locaData ? locaData : '';
		}
	});
	const [ user_lgdt, setUser_lgdt ] = useReducer(true,[],()=>{
		if (typeof window !== 'undefined') {
		const user_lgdt = getUser_lgdt();
		return user_lgdt ? user_lgdt : '';
		}
	});

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
	console.log('headerFooter',headerFooter);
	console.log('user_lgdt',user_lgdt);
	if ( storetmp ) {
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				My account
				User Name : {user_lgdt.user_display_name}
			</Layout>
		)
		
	} else {
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				Login 
				
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



