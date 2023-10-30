import axios from 'axios';
import React from 'react'
import { HEADER_FOOTER_ENDPOINT, USER_ORDER_TRACKING } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useState } from 'react';
import $ from 'jquery';
import TrackOrder from '../../src/components/track-order';

const trackorder = ({ headerFooter }) => {
  const [trckorderid, setTrckOrderId] = useState('');
  const [trckemail, setTrckEmail] = useState('');
  const [orderTrack, setOrderTrack] = useState('');
  
  const handleSubmit = (e) => { 
    e.preventDefault();
    $(".lgn_submit_btn").text("Loading....");
    axios.post(USER_ORDER_TRACKING, {
        orderid: trckorderid,
        order_email: trckemail
    }).then((response) => {
        $(".lgn_submit_btn").text('Track')
        console.log("orderTracking", response.data);
         setOrderTrack(response.data)
        }).catch(error => {
          if (error) {
               console.log("error", error);
          }
    });
  } 
      return (
        <div>
          <Layout headerFooter={headerFooter || {}} >
            {
              orderTrack ? 
                <TrackOrder orderTrack={orderTrack} trckorderid={ trckorderid } />
              :
              <div className='container'>
                <div className='row'>
                  <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
              
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label for="orderid">Order ID</label>
                      <input className="input-text" type="text" name="orderid" id="orderid" value={trckorderid} placeholder="Found in your order confirmation email." onChange={(e) => setTrckOrderId(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label for="order_email">Billing email</label>
                      <input className="input-text" type="text" name="order_email" id="order_email" value={trckemail} placeholder="Email you used during checkout." onChange={(e) => setTrckEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary lgn_submit_btn">Track</button>
                  </form>
                </div>
              </div>
            } 
          </Layout>
            
        </div>
      )
    
}

export default trackorder

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