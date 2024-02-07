import { isEmpty } from 'lodash';
import { addToCart } from '../../utils/cart';
import { useContext, useState } from 'react';
import { AppContext } from '../context';
import Link from 'next/link';
import cx from 'classnames';
import jQuery from "jquery";
import { groupAddToCart } from '../../utils/cart/group-add-to-cart';

const GroupAddToCart = ({coutData,setCoutData,group_product_id}) => {
	
	const [ cart, setCart ] = useContext( AppContext );
	const [ isAddedToCart, setIsAddedToCart ] = useState( false );
	const [loading, setLoading] = useState(false);
	const [itemCount,setItemCount] = useState(0);  
	const [itemCountAdd, setItemCountAdd] = useState(0);  
	const [ addcartMsg, setAddcartMsg ] = useState( '' );
	const addToCartBtnClasses = cx(
		'duration-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
		{
			'bg-white hover:bg-gray-100': ! loading,
			'bg-gray-200': loading,
		},
	);
	
	const groupaddtocart = async() => { 
		var gpdata = jQuery('#formqtygp').serialize();
		var group_product_ids = [];
       // console.log('gpdata', gpdata)
        var pairs = gpdata.split('&');                  // split on ampersand
		var items = {};
		                     // declare object to store key/value pairs

        // Loop through pairs and extract the key and the value (and append them to the object)
        for (var i = 0; i < pairs.length; i++) {
            items[pairs[i].split('=')[0]] = pairs[i].split('=')[1];
        }
		if (!isEmpty(items))
		{
			
			setItemCount(Object.entries(items).length);
			if (Object.entries(items).length > 0)
			{
				var i = 1;
				for (const [key, value] of Object.entries(items)) {
					var keyTmp = key.replace(/quantity%5B/, "");
					var product_id = keyTmp.replace(/%5D/, "");
					group_product_ids[i-1] = product_id;
					var ViewCartaction = false;
					if (Object.entries(items).length == i)
					{
						ViewCartaction = true;
					}
					//console.log('ViewCartaction', ViewCartaction);
					await groupAddToCart(parseInt(product_id) ?? 0, parseInt(value), setCart, itemCountAdd, setItemCountAdd, setLoading, ViewCartaction, i,setAddcartMsg) 
					i++;
				}
			}
			
		}
		setCoutData( {
			...coutData,
			"bundle_discount": {...coutData?.bundle_discount, [group_product_id] : group_product_ids}
			}
			);
	}
	//console.log('itemCountAdd', itemCountAdd);
	//console.log('cart', cart);
	return (
		<>
			<button
				className={ addToCartBtnClasses }
				onClick={ groupaddtocart }
				disabled={ loading }
			>
			{addcartMsg != '' ? 'Add to cart' : <>{ loading  ? 'Adding...' : 'Add to cart' }</> }
			</button>
			{addcartMsg != '' ? <>{ addcartMsg}</>:null}
			{ (itemCountAdd == itemCount) && (itemCount > 0) && ! loading && addcartMsg == '' ? (
				<Link href="/cart" legacyBehavior>
					<a
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-11px px-4 border border-gray-400 rounded shadow"
					>
						View cart
					</a>
				</Link>
			) : null }
		</>
	);
};

export default GroupAddToCart;
