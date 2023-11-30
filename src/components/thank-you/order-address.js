import React from 'react'
function orderAddress({orderData}) {
   
    return (
        <>
          <div key='coustomer-details'>
								<h4>Billing address</h4>
								{orderData?.billing?.first_name ? <p>{orderData?.billing?.first_name} </p>:null}
								{orderData?.billing?.last_name ? <p>{orderData?.billing?.last_name}</p>:null}
								{orderData?.billing?.address_1 ? <p>{orderData?.billing?.address_1}</p>:null}
								{orderData?.billing?.address_2 ? <p>{orderData?.billing?.address_2}</p>:null}
								{orderData?.billing?.city ? <p>{orderData?.billing?.city} </p>:null}
								{orderData?.billing?.company ? <p>{orderData?.billing?.company} </p>:null}
								{orderData?.billing?.country ? <p>{orderData?.billing?.country} </p>:null}
								{orderData?.billing?.email ? <p>{orderData?.billing?.email} </p>:null}
								{orderData?.billing?.phone ? <p>{orderData?.billing?.phone} </p>:null}
								{orderData?.billing?.postcode ? <p>{orderData?.billing?.postcode} </p>:null}
								{orderData?.billing?.state ? <p>{orderData?.billing?.state} </p>:null}

								<h4>Sipping address</h4>
								{orderData?.shipping?.first_name ? <p>{orderData?.shipping?.first_name} </p>:null}
								{orderData?.shipping?.last_name ? <p>{orderData?.shipping?.last_name}</p>:null}
								{orderData?.shipping?.address_1 ? <p>{orderData?.shipping?.address_1}</p>:null}
								{orderData?.shipping?.address_2 ? <p>{orderData?.shipping?.address_2}</p>:null}
								{orderData?.shipping?.city ? <p>{orderData?.shipping?.city} </p>:null}
								{orderData?.shipping?.company ? <p>{orderData?.shipping?.company} </p>:null}
								{orderData?.shipping?.country ? <p>{orderData?.shipping?.country} </p>:null}
								{orderData?.shipping?.email ? <p>{orderData?.shipping?.email} </p>:null}
								{orderData?.shipping?.phone ? <p>{orderData?.shipping?.phone} </p>:null}
								{orderData?.shipping?.postcode ? <p>{orderData?.shipping?.postcode} </p>:null}
								{orderData?.shipping?.state ? <p>{orderData?.shipping?.state} </p>:null}
						</div>
        </>
    )
}

export default orderAddress
