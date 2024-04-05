import React from 'react'
function orderDetails({ orderData, subtotal, paymentModes }) {
	paymentModes = paymentModes.filter(obj => {
		if (obj.method_key == orderData?.payment_method_title) {
			return true;
		}
	});
	return (
		<>
			<div key='Order-details'>
				<h3 className='text-center text-xl font-semibold mb-3'>Order details</h3>
				<div className="relative overflow-x-auto my-5">
					<table className="border-collapse w-full border border-slate-300">
						<thead>
							<tr>
								<th className="border border-slate-300 p-2 text-left">Product</th>
								<th className="border border-slate-300 p-2 text-left">Total</th>
							</tr>
						</thead>
						<tbody>
							{orderData?.line_items &&
								orderData?.line_items.map((item) => (
									<tr>
										<td className="border border-slate-300 p-2">{item.name}</td>
										<td className="border border-slate-300 p-2">{orderData?.currency_symbol} {item.subtotal}</td>
									</tr>
								))}

							<tr>
								<td className="border border-slate-300 p-2">Subtotal</td>
								<td className="border border-slate-300 p-2">{orderData?.currency_symbol} {parseFloat(subtotal).toFixed(2)}</td>
							</tr>
							{orderData?.fee_lines &&
								orderData?.fee_lines.map((item) => {
									if (item.total != 0)
										return (
											<tr>
												<td className="border border-slate-300 p-2">{item.name}</td>
												<td className="border border-slate-300 p-2">{item.name == 'Shipping:' ? '+' : '-'}{orderData?.currency_symbol}{item.total.replaceAll('-', '')}</td>
											</tr>
										)
								})}

							{orderData?.discount_total > 0 ? <tr>
								<td className="border border-slate-300 p-2">Discount:</td>
								<td className="border border-slate-300 p-2">-{orderData?.currency_symbol}{orderData?.discount_total}</td>
							</tr> : null}

							<tr>
								<td className="border border-slate-300 p-2">Total</td>
								<td className="border border-slate-300 p-2">{orderData?.currency_symbol} {orderData?.total}</td>
							</tr>
							<tr>
								<td className="border border-slate-300 p-2">PAYMENT METHOD</td>
								<td className="border border-slate-300 p-2">{paymentModes[0]?.method_title}</td>
							</tr>
							{orderData?.customer_note ? <tr>
								<td className="border border-slate-300 p-2">Note:</td>
								<td className="border border-slate-300 p-2">{orderData?.customer_note}</td>
							</tr> : null}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default orderDetails
