import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from "lodash";
import Image from '../image';
import { deleteCartItem, updateCart } from '../../utils/cart';
import Link from 'next/link';
import { getPriceRemoveDiscount, serialize } from '../../utils/customjs/custome';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Loaderspin from '../loaderspin';

const CartItem = ({
	item,
	products,
	setCart,
	notice,
	postcodedis,
	cartNote
}) => {
	const [productCount, setProductCount] = useState(item.quantity);
	const [updatingProduct, setUpdatingProduct] = useState(false);
	const [removingProduct, setRemovingProduct] = useState(false);
	const [localPickupMsg, setLocalPickupMsg] = useState('');
	const [deleteProcess, setDeleteProcess] = useState(false);
	const productImg = item?.data?.images?.[0] ?? '';
	//console.log('cartNote inc',cartNote);
	//console.log('item inc',item);
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

		var ss = await deleteCartItem(cartKey, setCart, setRemovingProduct);
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
	const productPrice = getPriceRemoveDiscount(item?.data);
	var p_slug = '/p/' + item?.data?.slug;
	if (item?.vp_url != undefined)
	{
		
		p_slug = '/p/' + item?.vp_url+'?'+serialize(item?.variation);
	}
	if (!WEB_DEVICE) {
		p_slug = '/product/?sname=' + item?.data?.slug;
		if (item?.vp_url != undefined)
			{
				p_slug = '/product/?sname=' + item?.vp_url+'&'+serialize(item?.variation);
			}
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
		<>

			<tr id={'pro_' + item?.product_id} className="cart-item-wrap">
				<td className='border border-slate-300 p-2' data-title="Product">
					<div className="sm:flex items-center gap-2 w-50 relative">
						<button className="size-8 cart-remove-item absolute right-0 top-0 sm:relative text-center border border-red-600 py-1 px-2 inline-block" onClick={(event) => handleRemoveProductClick(event, item?.key)}>
							{deleteProcess ?
								<Loaderspin /> : <i className="fa-solid fa-trash text-red-600"></i>
							}
						</button>
						<Image
							width="120"
							height="120"
							altText={productImg?.alt ?? ''}
							sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ''}
							className='mx-auto sm:m-0'
						/>
						<div className='text-left'>
							<Link href={p_slug}>
								<h5 className="font-medium">{item?.data?.name}</h5>
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
								<span key='notebox' className='text-red-500'>Sorry please remove this product Undeliverable at {postcodedis}.</span>
								: null}
							{itemNote != '' ?
								<div key="purchase_note"
									dangerouslySetInnerHTML={{
										__html: itemNote?.purchase_note ?? '',
									}}
									className="purchase_note mb-5"
								/>
								: null}
						</div>
					</div>
				</td>
				<td className='border border-slate-300 p-2' data-title="Price">
					<span className='item-price font-normal'>
						{item?.currency}{parseFloat(productPrice).toFixed(2)}
					</span>
				</td>
				<td className='border-x sm:border border-slate-300 p-2 relative' data-title="Quantity">
					{updatingProduct ?
						<div className='absolute left-0 right-0 mx-auto mt-2 bg-white w-fit rounded-3xl'>
							<Loaderspin />
						</div>
						: null
					}
					{/*Qty*/}
					<div className='bg-gray-200 p-1 flex w-fit ms-auto sm:mx-auto'>
						<button className="size-8 bg-white me-3" onClick={(event) => handleQtyChange(event, item?.cartKey, 'decrement')} >-</button>
						<input
							type="number"
							min="1"
							max={item?.data?.stock_quantity ?? 0}
							style={{ textAlign: 'center', width: '50px', paddingRight: '0' }}
							data-cart-key={item?.data?.cartKey}
							className={`bg-transparent w-14 text-center font-normal ${updatingProduct ? 'disabled' : ''}`}
							value={productCount}
							onChange={(event) => handleQtyChange(event, item?.cartKey, '')}
							readonly='readOnly'
							id={'qty_pro_' + item?.product_id}
						/>
						<button className="size-8 bg-white" disabled={maxQty} onClick={(event) => handleQtyChange(event, item?.cartKey, 'increment')}>+</button>
					</div>
				</td>
				<td className='border border-slate-300 p-2' data-title="Subtotal">
					<span className="item-subt font-normal">{item?.currency}{item?.line_subtotal.toFixed(2)}</span>
				</td>
			</tr>
		</>
	)
};

export default CartItem;
