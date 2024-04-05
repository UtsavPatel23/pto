import { isEmpty } from 'lodash';
import { addToCart } from '../../utils/cart';
import { useContext, useState } from 'react';
import { AppContext } from '../context';
import Link from 'next/link';
import cx from 'classnames';
import Router from "next/router";

const BuyNow = ({ product, productCountQty }) => {

	const [cart, setCart] = useContext(AppContext);
	const [isAddedToCart, setIsAddedToCart] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addcartMsg, setAddcartMsg] = useState('');
	const addToCartBtnClasses = cx(
		'duration-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
		{
			'bg-white hover:bg-gray-100': !loading,
			'bg-gray-200': loading,
		},
	);

	if (isEmpty(product)) {
		return null;
	}
	if (isAddedToCart && !loading && addcartMsg == '') { Router.push("/checkout/") }
	return (
		<>
			<button
				className='w-28 sm:w-32 p-2 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative'
				onClick={() => addToCart(product?.id ?? 0, productCountQty, setCart, setIsAddedToCart, setLoading, setAddcartMsg)}
				disabled={loading}
			>
				{loading ?
					<>
						<span className='size-10 sm:size-full bg-white sm:bg-transparent grid place-content-center'>
							<span className='wishloader mx-auto'></span>
						</span>
					</>
					:
					<>
						<span className=''>Buy Now</span>
					</>
				}
			</button>
			{addcartMsg != '' ? <>{addcartMsg}</> : null}

		</>
	);

};

export default BuyNow;
