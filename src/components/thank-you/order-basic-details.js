import React from 'react'
import {  get_date_formate } from '../../utils/customjs/custome';
import Bag from '../icons/Bag';
function orderBasicDetails({orderData,sessionData,viewOrderUse = false,paymentModes}) {
	var datedis = get_date_formate(orderData?.date_created);
	paymentModes = paymentModes.filter(obj => 
		{
		if (obj.method_key == orderData?.payment_method_title) {
			return true;
		}
	});
	console.log('paymentModes',paymentModes);
    return (
        <>		
						{viewOrderUse?
						<p>
							Order #{orderData?.number} was placed on {datedis} and is currently {orderData?.status.replaceAll('-', ' ')}.
						</p>
						:
						<>
            			<h2 className="mb-6 text-xl">
							<Bag className="inline-block mr-1"/> <span>Thank you for placing the order.</span>
						</h2>
						<p>Your {orderData?.payment_method_title == 'bacs'?'order':'payment'} is successful and your order details are: </p>
						</>}
						<table className="table-auto w-full text-left whitespace-no-wrap mb-8">
							<thead>
							<tr>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Details</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td className="px-4 py-3">Order#</td>
								<td className="px-4 py-3">{ orderData?.number }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">Email</td>
								<td className="px-4 py-3">{sessionData?.customer_email ? <>{sessionData?.customer_email}</>    : <>{orderData?.billing?.email ? <p>{orderData?.billing?.email} </p>:null}</>}</td>
							</tr>
							<tr>
								<td className="px-4 py-3">Total</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { orderData?.total }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">PAYMENT METHOD</td>
								<td className="px-4 py-3">{ paymentModes[0]?.method_title }</td>
							</tr>
							</tbody>
						</table>
        </>
    )
}

export default orderBasicDetails
