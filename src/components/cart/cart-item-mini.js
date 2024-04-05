import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from "lodash";
import Image from '../image';
import { deleteCartItem, updateCart } from '../../utils/cart';
import Link from 'next/link';
import { getPriceRemoveDiscount } from '../../utils/customjs/custome';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Loaderspin from '../loaderspin';


const CartItem = ({
	item,
	products,
	setCart,
	notice,
	postcodedis,
	cartNote,
	miniCart = false
}) => {
	const [productCount, setProductCount] = useState(item.quantity);
	const [updatingProduct, setUpdatingProduct] = useState(false);
	const [removingProduct, setRemovingProduct] = useState(false);
	const [localPickupMsg, setLocalPickupMsg] = useState('');
	const productImg = item?.data?.images?.[0] ?? '';
	const [deleteProcess, setDeleteProcess] = useState(false);
	//console.log('cartNote inc',cartNote);
	//console.log('item inc',item);
	//console.log('miniCart inc',miniCart);
	var itemNote = '';
	if (cartNote != undefined) {
		itemNote = cartNote.find(function (element) {
			if (item.key == element.key) {
				return true;
			}
		});
	}

	//console.log('item itemNote',itemNote);
	/**
	 * Do not allow state update on an unmounted component.
	 *
	 * isMounted is used so that we can set it's value to false
	 * when the component is unmounted.
	 * This is done so that setState ( e.g setRemovingProduct ) in asynchronous calls
	 * such as axios.post, do not get executed when component leaves the DOM
	 * due to product/item deletion.
	 * If we do not do this as unsubscription, we will get
	 * "React memory leak warning- Can't perform a React state update on an unmounted component"
	 *
	 * @see https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
	 * @type {React.MutableRefObject<boolean>}
	 */
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true

		// When component is unmounted, set isMounted.current to false.
		return () => {
			isMounted.current = false
		}
	}, [])

	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = async (event, cartKey) => {
		setDeleteProcess(true);
		event.stopPropagation();

		// If the component is unmounted, or still previous item update request is in process, then return.
		if (!isMounted || updatingProduct) {
			return;
		}

		await deleteCartItem(cartKey, setCart, setRemovingProduct);
		setDeleteProcess(false);
	};

	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = (event, cartKey, type) => {

		if (process.browser) {

			event.stopPropagation();
			let newQty;

			// If the previous cart request is still updatingProduct or removingProduct, then return.
			if (updatingProduct || removingProduct || ('decrement' === type && 1 === productCount)) {
				return;
			}

			if (!isEmpty(type)) {
				newQty = 'increment' === type ? productCount + 1 : productCount - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = (event.target.value) ? parseInt(event.target.value) : 1;
			}

			// Set the new qty in state.
			setProductCount(newQty);

			if (products.length) {
				updateCart(item?.key, newQty, setCart, setUpdatingProduct);
			}

		}
	};
	var maxQty = true;
	if (item?.data?.stock_quantity > productCount) {
		maxQty = false;
	}
	console.log('item?.data', item?.data);
	const productPrice = getPriceRemoveDiscount(item?.data);
	var p_slug = '/p/' + item?.data?.slug;
	if (!WEB_DEVICE) {
		p_slug = '/product/?sname=' + item?.data?.slug;
	}

	useEffect(() => {
		if (!isEmpty(item.data?.meta_data) && (item.data?.meta_data != '')) {
			let found = item.data?.meta_data.find(function (metaitem) {
				return 'product_code' == metaitem?.key;
			});
			console.log('found.value', found.value)
			if (found != undefined && found != '' && (!isEmpty(found))) {
				if (found.value == 'LP') {
					setLocalPickupMsg('This product will not be shipped.(Its for pick up only)');
				}
			}

		}
	}, []);


	return (
		<div id={'pro_' + item?.product_id} className="mincart border border-gray-300 p-2 flex items-center gap-2 relative">
			<figure className='min-w-16'>
				<Image
					width="64"
					height="64"
					altText={productImg?.alt ?? ''}
					sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ''} // use normal <img> attributes as props
				/>
			</figure>
			<div className="flex flex-col justify-between items-start gap-1 pe-10">
				<Link href={p_slug}>
					<h5 className="cart-product-title text-brand-orange">{item?.data?.name}</h5>
				</Link>

				{localPickupMsg != '' ?
					<span className='text-red-600 text-sm'>
						{localPickupMsg}
					</span>
					: null
				}
				<span key='notefocus' className='hidden'>
					<input type='text' className='focusbox' readOnly="readOnly" id={'pro_' + item?.data?.sku?.replaceAll("-", "_")} />
				</span>
				{notice ?
					<div key='notebox'>
						<span className='invalid-feedback d-block text-red-500'>Sorry please remove this product Undeliverable at {postcodedis}.</span>
					</div>
					: null}
				{itemNote != '' ?
					<div key="purchase_note"
						dangerouslySetInnerHTML={{
							__html: itemNote?.purchase_note ?? '',
						}}
						className="purchase_note mb-5"
					/>
					: null}
				{ }
				{
					//item?.data?.description ? <p>{item?.data?.description}</p> : ''
				}
				<button className="cart-remove-item absolute text-center border border-red-600 size-8 right-2 top-2" onClick={(event) => handleRemoveProductClick(event, item?.key)}>
					{deleteProcess ?
						<Loaderspin /> : <i className="fa-solid fa-trash text-red-600"></i>
					}
				</button>
			</div>
		</div>
	)
};

export default CartItem;
