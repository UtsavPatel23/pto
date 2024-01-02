import React from 'react'
function orderDetails({orderData,subtotal,paymentModes}) {
	paymentModes = paymentModes.filter(obj => 
		{
		if (obj.method_key == orderData?.payment_method_title) {
			return true;
		}
	});
    return (
        <>
           <div key='Order-details'>
							
						Order details
						<table className="table-auto w-full text-left whitespace-no-wrap mb-8">
							<thead>
							<tr>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product</th>
								<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Total</th>
							</tr>
							</thead>
							<tbody>
							{ orderData?.line_items &&
								orderData?.line_items.map( ( item ) => (
								<tr>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">{orderData?.currency_symbol} { item.subtotal }</td>
								</tr>
							) ) }
							
							<tr>
								<td className="px-4 py-3">Subtotal</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { parseFloat(subtotal).toFixed(2) }</td>
							</tr>
							
							
							{ orderData?.fee_lines &&
								orderData?.fee_lines.map( ( item ) => {
									if(item.total != 0)
								return (
								<tr>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">{item.name == 'Shipping:'?'+':'-'}{orderData?.currency_symbol}{ item.total.replaceAll('-', '') }</td>
								</tr>
							)} ) }
							
							{orderData?.discount_total > 0? <tr>
								<td className="px-4 py-3">Discount:</td>
								<td className="px-4 py-3">-{orderData?.currency_symbol}{ orderData?.discount_total }</td>
							</tr>: null}

							<tr>
								<td className="px-4 py-3">Total</td>
								<td className="px-4 py-3">{orderData?.currency_symbol} { orderData?.total }</td>
							</tr>
							<tr>
								<td className="px-4 py-3">PAYMENT METHOD</td>
								<td className="px-4 py-3">{ paymentModes[0]?.method_title }</td>
							</tr>
							{orderData?.customer_note ? <tr>
								<td className="px-4 py-3">Note:</td>
								<td className="px-4 py-3">{ orderData?.customer_note }</td>
							</tr>: null}
							

							</tbody>
						</table>
						</div>
        </>
    )
}

export default orderDetails
