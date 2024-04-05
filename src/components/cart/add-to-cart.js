import { isEmpty } from 'lodash';
import { addToCart } from '../../utils/cart';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Link from 'next/link';
import cx from 'classnames';

const AddToCart = ({ product, productCountQty, singleProduct = false }) => {

	const [cart, setCart] = useContext(AppContext);
	const [isAddedToCart, setIsAddedToCart] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addcartMsg, setAddcartMsg] = useState('');
	const [addClass, setClass] = useState('');
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
	useEffect(() => {
		if (singleProduct) {
			setClass('singleprod-btn');
		} else {
			setClass('grid-btn');
		}
	}, []);

	//console.log('singleProduct', singleProduct);
	return (
		<>
			{!(isAddedToCart && !loading && addcartMsg == '') ? (
				<button
					className={`text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative ${singleProduct ? 'w-28 sm:w-32 p-2' : 'sm:w-32 sm:p-2'} ${addClass}`}
					onClick={() => addToCart(product?.id ?? 0, productCountQty, setCart, setIsAddedToCart, setLoading, setAddcartMsg)}
					disabled={loading}
				>
					{loading ?
						<>
							<span className={`sm:bg-transparent grid place-content-center ${singleProduct ? 'size-full' : 'size-10 sm:size-full bg-white'}`}>
								<span className='wishloader mx-auto'></span>
							</span>
						</>
						:
						<>
							{(() => {
								if (singleProduct) {
									return (<div>
										<span className='inline-block'>Add to cart</span>
									</div>);
								} else {
									return (<div>
										<span className='hidden sm:inline-block'>Add to cart</span>
										<span className='sm:hidden size-10 inline-block bg-white grid place-content-center'>
											<i className="fa-sharp fa-light fa-cart-plus text-2xl text-victoria-700"></i>
										</span>
									</div>);
								}
							})()}
						</>
					}
				</button>
			) : null}
			{addcartMsg != '' ? <>{addcartMsg}</> : null}
			{
				isAddedToCart && !loading && addcartMsg == '' ? (
					<Link href="/cart" className={`text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative ${singleProduct ? 'w-32 p-2' : 'sm:w-32 sm:p-2'} ${addClass}`}>
						<span className={`${singleProduct ? 'size-full' : 'hidden sm:inline-block'}`}>View cart</span>
						<span className={`size-10 inline-block bg-victoria-700 grid place-content-center ${singleProduct ? 'hidden' : 'sm:hidden'}`}>
							<i className="fa-sharp fa-solid fa-cart-plus text-2xl text-white"></i>
						</span>
					</Link>
				) : null
			}
		</>
	);
};

export default AddToCart;
