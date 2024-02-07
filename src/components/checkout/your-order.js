

import { Fragment } from 'react';
import CheckoutCartItem from "./checkout-cart-item";

const YourOrder = ( { cart,shippingCost,discoutDis,cartSubTotalDiscount,totalPriceDis,notice,postcodedis ,coutData,discountBundleDis} ) => {
	//console.log('totalPriceDis',totalPriceDis);
	//console.log('shippingCost',shippingCost);
	console.log('cartSubTotalDiscount',cartSubTotalDiscount);
	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10" id="yourorder_list">
						<thead>
						<tr className="woo-next-cart-head-container text-left">
							<th className="woo-next-cart-heading-el" scope="col"/>
							<th className="woo-next-cart-heading-el" scope="col">Product</th>
							<th className="woo-next-cart-heading-el" scope="col">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart?.cartItems?.length && (
							cart.cartItems.map( ( item, index ) => (
								<CheckoutCartItem 
								key={ item?.productId ?? index } 
								item={ item } 
								notice={notice != ''?notice.find((element) => element == item?.data?.sku):null}
								postcodedis={postcodedis}
								/>
							) )
						) }
						{/*Sub Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Sub Total</td>
							<td className="woo-next-checkout-total font-bold text-xl">{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ cart?.totalPrice.toFixed(2) ?? '' }</td>
						</tr>
						{ /*Print Bundle disount */}
						{(() => {
								if (discountBundleDis != 0)
								{
									return (
										<tr className="">
											<td className=""/>
											<td className="woo-next-checkout-total font-normal text-xl">Bundle Discount</td>
											<td className="woo-next-checkout-total  text-xl">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ discountBundleDis ?? '' }</td>
										</tr>
									);
								}
						})()} 
						{/* DiscoutDis*/}
						{(() => {
							if(discoutDis != 0 && (undefined != discoutDis)) 
							{
								return (
									<tr className="">
										<td className=""/>
										<td className="woo-next-checkout-total font-normal text-xl">Discount ({coutData?.CouponApply?.couponData?.code}) :</td>
										<td className="woo-next-checkout-total  text-xl">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ discoutDis ?? '' }</td>
									</tr>
									)	
							} 
						})()} 
						{/* cart Sub Total Discount */}
						{(() => {
							if(cartSubTotalDiscount != undefined)
							{
							if(Object.keys(cartSubTotalDiscount).length > 0)
							{
								return (
									Object.keys(cartSubTotalDiscount).map(function(key) {
										console.log('key',cartSubTotalDiscount[key].name);
										if(cartSubTotalDiscount[key] != '' && cartSubTotalDiscount[key]?.discount != 0)
										{
											return (
												<tr className="">
													<td className=""/>
													<td className="woo-next-checkout-total font-normal text-xl">{cartSubTotalDiscount[key].name}</td>
													<td className="woo-next-checkout-total  text-xl">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{cartSubTotalDiscount[key].discount.toFixed(2) ?? ''}</td>
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
							if(coutData.redeemPrice != undefined)
							{
								if(coutData?.redeemPrice > 0)
								{
							
								return (
									<tr className="">
										<td className=""/>
										<td className="woo-next-checkout-total font-normal text-xl">Redeem Points</td>
										<td className="woo-next-checkout-total  text-xl">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ coutData?.redeemPrice ?? '' }</td>
									</tr>
									)	
								}
							} 
						})()} 
						{/* Shipping Cost */}
						{(() => {
							if(shippingCost >= 0 && (undefined != shippingCost)) 
							{
								return (
									<tr className="">
										<td className=""/>
										<td className="woo-next-checkout-total font-normal text-xl">Shipping Cost</td>
										<td className="woo-next-checkout-total  text-xl">+{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ shippingCost ?? '' }</td>
									</tr>
									)	
							} 
						})()} 
						{/*Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Total</td>
							<td className="woo-next-checkout-total font-bold text-xl">{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ parseFloat(totalPriceDis).toFixed(2) ?? '' } (Includes GST)</td>
						</tr>
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
