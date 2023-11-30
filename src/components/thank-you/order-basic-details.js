import React from 'react'
import Bag from '../icons/Bag';
function orderBasicDetails({orderData,sessionData}) {
   
    return (
        <>
            <h2 className="mb-6 text-xl"><Bag className="inline-block mr-1"/> <span>Thank you for placing the order.</span>
						</h2>
						<p>Your payment is successful and your order details are: </p>
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
								<td className="px-4 py-3">{ orderData?.payment_method_title }</td>
							</tr>
							</tbody>
						</table>
        </>
    )
}

export default orderBasicDetails