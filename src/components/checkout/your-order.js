

import { Fragment } from 'react';
import CheckoutCartItem from "./checkout-cart-item";

const YourOrder = ( { cart,shippingCost,discoutDis,totalPriceDis } ) => {
	console.log('totalPriceDis',totalPriceDis);
	console.log('shippingCost',shippingCost);
	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
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
								<CheckoutCartItem key={ item?.productId ?? index } item={ item } />
							) )
						) }
						{/*Sub Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Sub Total</td>
							<td className="woo-next-checkout-total font-bold text-xl">{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ cart?.totalPrice ?? '' }</td>
						</tr>
						{/* DiscoutDis*/}
						{(() => {
							if(discoutDis != 0 && (undefined != discoutDis)) 
							{
								return (
									<tr className="">
										<td className=""/>
										<td className="woo-next-checkout-total font-normal text-xl">Discout</td>
										<td className="woo-next-checkout-total  text-xl">-{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ discoutDis ?? '' }</td>
									</tr>
									)	
							} 
						})()} 
						{/* Shipping Cost */}
						{(() => {
							if(shippingCost != 0 && (undefined != shippingCost)) 
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
							<td className="woo-next-checkout-total font-bold text-xl">{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ totalPriceDis ?? '' }</td>
						</tr>
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
