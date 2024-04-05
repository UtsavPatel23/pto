import React from 'react'
import { get_date_formate } from '../../utils/customjs/custome';
import Bag from '../icons/Bag';
function orderBasicDetails({ orderData, sessionData, viewOrderUse = false, paymentModes }) {
	var datedis = get_date_formate(orderData?.date_created);
	paymentModes = paymentModes.filter(obj => {
		if (obj.method_key == orderData?.payment_method_title) {
			return true;
		}
	});
	console.log('paymentModes', paymentModes);
	return (
		<>
			{viewOrderUse ?
				<p className='mb-3'>
					Order <b>#{orderData?.number}</b> was placed on <b>{datedis}</b> and is currently {orderData?.status.replaceAll('-', ' ')}.
				</p>
				:
				<>
					<h2 className="mb-6 text-xl">
						<Bag className="inline-block mr-1" /> <span>Thank you for placing the order.</span>
					</h2>
					<p>Your {orderData?.payment_method_title == 'bacs' ? 'order' : 'payment'} is successful and your order details are: </p>
				</>}
			<div className="relative overflow-x-auto my-5">
				<table className="border-collapse w-full border border-slate-300">
					<thead>
						<tr>
							<th className="border border-slate-300 p-2 text-left">Name</th>
							<th className="border border-slate-300 p-2 text-left">Details</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-slate-300 p-2">Order#</td>
							<td className="border border-slate-300 p-2">{orderData?.number}</td>
						</tr>
						<tr>
							<td className="border border-slate-300 p-2">Email</td>
							<td className="border border-slate-300 p-2">{sessionData?.customer_email ? <>{sessionData?.customer_email}</> : <>{orderData?.billing?.email ? <p>{orderData?.billing?.email} </p> : null}</>}</td>
						</tr>
						<tr>
							<td className="border border-slate-300 p-2">Total</td>
							<td className="border border-slate-300 p-2">{orderData?.currency_symbol} {orderData?.total}</td>
						</tr>
						<tr>
							<td className="border border-slate-300 p-2">PAYMENT METHOD</td>
							<td className="border border-slate-300 p-2">{paymentModes[0]?.method_title}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	)
}

export default orderBasicDetails
