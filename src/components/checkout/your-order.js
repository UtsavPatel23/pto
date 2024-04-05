

import { Fragment } from 'react';
import CheckoutCartItem from "./checkout-cart-item";

const YourOrder = ({ cart, shippingCost, discoutDis, cartSubTotalDiscount, totalPriceDis, notice, postcodedis, coutData, discountBundleDis }) => {
	//console.log('totalPriceDis',totalPriceDis);
	//console.log('shippingCost',shippingCost);
	console.log('cartSubTotalDiscount', cartSubTotalDiscount);
	return (
		<>
			{/*Product Listing*/}
			{cart ? (
				<div className="relative overflow-x-auto">
					<table className="border-collapse w-full border border-slate-300" id="yourorder_list">
						<thead>
							<tr>
								<th className="border border-slate-300 p-2 text-left" scope="col">Product</th>
								<th className="border border-slate-300 p-2 text-left" scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							{cart?.cartItems?.length && (
								cart.cartItems.map((item, index) => (
									<CheckoutCartItem
										key={item?.productId ?? index}
										item={item}
										notice={notice != '' ? notice.find((element) => element == item?.data?.sku) : null}
										postcodedis={postcodedis}
									/>
								))
							)}
							{/*Sub Total*/}
							<tr>
								<td className="border border-slate-300 p-2">Sub Total</td>
								<td className="border border-slate-300 p-2">{cart?.cartItems?.[0]?.currency ?? ''}{cart?.totalPrice.toFixed(2) ?? ''}</td>
							</tr>
							{ /*Print Bundle disount */}
							{(() => {
								if (discountBundleDis != 0) {
									return (
										<tr>
											<td className="border border-slate-300 p-2">Bundle Discount</td>
											<td className="border border-slate-300 p-2">-{cart?.cartItems?.[0]?.currency ?? ''}{discountBundleDis ?? ''}</td>
										</tr>
									);
								}
							})()}
							{/* DiscoutDis*/}
							{(() => {
								if (discoutDis != 0 && (undefined != discoutDis)) {
									return (
										<tr>
											<td className="border border-slate-300 p-2">Discount ({coutData?.CouponApply?.couponData?.code}) :</td>
											<td className="border border-slate-300 p-2">-{cart?.cartItems?.[0]?.currency ?? ''}{discoutDis ?? ''}</td>
										</tr>
									)
								}
							})()}
							{/* cart Sub Total Discount */}
							{(() => {
								if (cartSubTotalDiscount != undefined) {
									if (Object.keys(cartSubTotalDiscount).length > 0) {
										return (
											Object.keys(cartSubTotalDiscount).map(function (key) {
												console.log('key', cartSubTotalDiscount[key].name);
												if (cartSubTotalDiscount[key] != '' && cartSubTotalDiscount[key]?.discount != 0) {
													return (
														<tr className="">
															<td className="border border-slate-300 p-2">{cartSubTotalDiscount[key].name}</td>
															<td className="border border-slate-300 p-2">-{cart?.cartItems?.[0]?.currency ?? ''}{cartSubTotalDiscount[key].discount.toFixed(2) ?? ''}</td>
														</tr>
													)
												}
											})
										)
									}
								}
							})()}
							{/* Discout redeemPrice*/}
							{(() => {
								if (coutData.redeemPrice != undefined) {
									if (coutData?.redeemPrice > 0) {

										return (
											<tr className="">
												<td className="border border-slate-300 p-2">Redeem Points</td>
												<td className="border border-slate-300 p-2">-{cart?.cartItems?.[0]?.currency ?? ''}{coutData?.redeemPrice ?? ''}</td>
											</tr>
										)
									}
								}
							})()}
							{/* Shipping Cost */}
							{(() => {
								if (shippingCost >= 0 && (undefined != shippingCost)) {
									return (
										<tr className="">
											<td className="border border-slate-300 p-2">Shipping Cost</td>
											<td className="border border-slate-300 p-2">+{cart?.cartItems?.[0]?.currency ?? ''}{shippingCost ?? ''}</td>
										</tr>
									)
								}
							})()}
							{/*Total*/}
							<tr >
								<td className="border border-slate-300 p-2">Total</td>
								<td className="border border-slate-300 p-2">{cart?.cartItems?.[0]?.currency ?? ''}{parseFloat(totalPriceDis).toFixed(2) ?? ''} <b className='block'>(Includes GST)</b></td>
							</tr>
						</tbody>
					</table>
				</div>
			) : ''}
		</>
	)
};

export default YourOrder;
