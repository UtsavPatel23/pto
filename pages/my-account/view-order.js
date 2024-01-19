import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
;
import { useState } from 'react';
import Loader from "./../../public/loader.gif";
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




export default function viewOrder ({headerFooter,states}){
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
        const [rewardPoints, setRewardPoints] = useState(0);
        const [loading, setLoading] = useState(true);
        const [ orderData, setOrderData ] = useState(null);
		const [subtotal,setSubtotal] = useState(0);
		const orderid = process.browser ? Router.query.orderid : null;
		const paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
		
    
	// Get order 
	useEffect(() => {
		(async () => {
		if(orderid)
		{
			let data = '';
			var tmpsubtotal = 0;
			const response = await get_order(orderid);
              if(response.success)
              {

					setOrderData(response.data.orderData);
					if(response.data.orderData.line_items != undefined)
					{
						response.data.orderData?.line_items.map( ( item ) => {
							tmpsubtotal =tmpsubtotal+parseFloat(item.subtotal);
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
		if(tokenValid)
		{
       		if(localStorage.getItem('customerData')) {
				var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
				console.log('customerDataTMP',customerDataTMP);
				if(customerDataTMP?.id != '')
				{
					setRewardPoints(get_points(customerDataTMP));
					setCustomerData(customerDataTMP);
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
						{ loading && <img className="loader" src={Loader.src} alt="Loader"/> }
						{orderData?.customer_id == customerData?.id ?<>
							<OrderBasicDetails orderData={orderData} sessionData={null} viewOrderUse={true} paymentModes={paymentModes}/>
						
						{orderData?.payment_method_title == 'bacs'? <>
						<Bacs paymentModes={paymentModes}></Bacs>
						</> : null}

						{orderData != undefined?
						<OrderDetails orderData={orderData} subtotal={subtotal} paymentModes={paymentModes}/>
						:null}
						<Link href="/shop/">
							<div className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto">Shop more</div>
						</Link>
						<OrderAddress orderData={orderData} states={states}/>
						</>:null}	
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



