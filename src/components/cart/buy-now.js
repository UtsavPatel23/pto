import { isEmpty } from 'lodash';
import { addToCart } from '../../utils/cart';
import { useContext, useState } from 'react';
import { AppContext } from '../context';
import Link from 'next/link';
import cx from 'classnames';
import Router from "next/router";

const BuyNow = ( { product } ) => {
	
	const [ cart, setCart ] = useContext( AppContext );
	const [ isAddedToCart, setIsAddedToCart ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const addToCartBtnClasses = cx(
		'duration-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
		{
			'bg-white hover:bg-gray-100': ! loading,
			'bg-gray-200': loading,
		},
	);
	
	if ( isEmpty( product ) ) {
		return null;
	}
	if(isAddedToCart && ! loading && cart?.totalQty > 0) 
	{ Router.push("/checkout/")}
		return (
			<>
				<button
					className={ addToCartBtnClasses }
					onClick={ () => addToCart( product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading ) }
					disabled={ loading }
				>
					{isAddedToCart? 'Adding...' : <>{ loading ? 'Adding...' : 'Buy Now' }</> }
				</button>
				
			</>
		);

};

export default BuyNow;
