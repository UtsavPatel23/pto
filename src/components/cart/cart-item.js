import React, { useEffect, useState, useRef } from 'react';
import {isEmpty} from "lodash";
import Image from '../image';
import { deleteCartItem, updateCart } from '../../utils/cart';
import Link from 'next/link';
import { getPriceRemoveDiscount } from '../../utils/customjs/custome';
import { WEB_DEVICE } from '../../utils/constants/endpoints';

const CartItem = ( {
	                   item,
	                   products,
	                   setCart,
					   notice,
					   postcodedis,
					   cartNote
                   } ) => {
	const [productCount, setProductCount] = useState( item.quantity );
	const [updatingProduct, setUpdatingProduct] = useState( false );
	const [removingProduct, setRemovingProduct] = useState( false );
	const [localPickupMsg, setLocalPickupMsg] = useState( '' );
	const productImg = item?.data?.images?.[0] ?? '';
	//console.log('cartNote inc',cartNote);
	//console.log('item inc',item);
	var itemNote = '';
	if(cartNote != undefined)
	{
		itemNote  =cartNote.find(function (element) {
			if(item.key == element.key)
			{
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
	const isMounted = useRef( false );
	
	useEffect( () => {
		isMounted.current = true
		
		// When component is unmounted, set isMounted.current to false.
		return () => {
			isMounted.current = false
		}
	}, [] )
	
	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = ( event, cartKey ) => {
		event.stopPropagation();
		
		// If the component is unmounted, or still previous item update request is in process, then return.
		if ( !isMounted || updatingProduct ) {
			return;
		}
		
		deleteCartItem( cartKey, setCart, setRemovingProduct );
	};
	
	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = ( event, cartKey, type ) => {
		
		if ( process.browser ) {
			
			event.stopPropagation();
			let newQty;
			
			// If the previous cart request is still updatingProduct or removingProduct, then return.
			if ( updatingProduct || removingProduct || ( 'decrement' === type && 1 === productCount ) ) {
				return;
			}
			
			if ( !isEmpty( type ) ) {
				newQty = 'increment' === type ? productCount + 1 : productCount - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = ( event.target.value ) ? parseInt( event.target.value ) : 1;
			}
			
			// Set the new qty in state.
			setProductCount( newQty );
			
			if ( products.length ) {
				updateCart(item?.key, newQty, setCart, setUpdatingProduct);
			}
			
		}
	};
	var maxQty = true;
	if(item?.data?.stock_quantity > productCount)
	{
		maxQty = false;
	}
	const productPrice = getPriceRemoveDiscount(item?.data);
	var p_slug = '/p/'+item?.data?.slug;
	if(!WEB_DEVICE)
		{
			p_slug = '/product/?sname='+item?.data?.slug;
	}

	useEffect(() => { 
		if (!isEmpty(item.data?.meta_data) && (item.data?.meta_data != ''))
		{
			let found = item.data?.meta_data.find(function (metaitem) {
				return 'product_code' ==  metaitem?.key;
			});	
			console.log('found.value',found.value)
			if (found != undefined && found != '' && (!isEmpty(found)))
			{
				if (found.value == 'LP') {
					setLocalPickupMsg('This product will not be shipped.(Its for pick up only)');
				 }
			}
			
		}
	},[]);
	
	
	return (
		<div id={'pro_'+item?.product_id} className="cart-item-wrap grid grid-cols-3 gap-6 mb-5 border border-brand-bright-grey p-5">
			<div className="col-span-1 cart-left-col">
				<figure >
					<Image
						width="150"
						height="150"
						altText={productImg?.alt ?? ''}
						sourceUrl={! isEmpty( productImg?.src ) ? productImg?.src : ''} // use normal <img> attributes as props
					/>
				</figure>
			</div>
			
			<div className="col-span-2 cart-right-col ">
				<div className="flex justify-between flex-col h-full">
					<div className="cart-product-title-wrap relative">
					<Link href={p_slug}>
						<h5 className="cart-product-title text-brand-orange">{ item?.data?.name }</h5>
						</Link>	
						{localPickupMsg != '' ? <>{ localPickupMsg}</>:null}
					<span key='notefocus'>
							<input type='text' className='focusbox' readOnly="readOnly" id={'pro_'+item?.data?.sku?.replaceAll("-","_")}/>
						</span>
					{notice?
					<div key='notebox'>
						<span className='invalid-feedback d-block text-red-500'>Sorry please remove this product Undeliverable at {postcodedis}.</span>
					</div>
					:null}
					{itemNote != ''? 
					<div key="purchase_note"
						dangerouslySetInnerHTML={ {
							__html: itemNote?.purchase_note ?? '',
						} }
						className="purchase_note mb-5"
					/> 
					:null}
					{}
						{ 
						//item?.data?.description ? <p>{item?.data?.description}</p> : ''
						}
						<button className="cart-remove-item absolute right-0 top-0 px-4 py-2 flex items-center text-22px leading-22px bg-transparent border border-brand-bright-grey" onClick={ ( event ) => handleRemoveProductClick( event, item?.key ) }>&times;</button>
					</div>
					
					<footer className="cart-product-footer flex justify-between p-4 border-t border-brand-bright-grey">
						<div className="">
							<span className="cart-item-price">Price {item?.currency}{parseFloat(productPrice).toFixed(2)}</span>
							<span className="cart-total-price">Subtotal {item?.currency}{item?.line_subtotal.toFixed(2)}</span>
						</div>
						{ updatingProduct ? <img className="woo-next-cart-item-spinner" width="24" src="/cart-spinner.gif"  alt="spinner"/> : null }
						{/*Qty*/}
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<button className="decrement-btn text-24px" onClick={( event ) => handleQtyChange( event, item?.cartKey, 'decrement' )} >-</button>
							<input
								type="number"
								min="1"
								max={item?.data?.stock_quantity ?? 0}
								style={{ textAlign: 'center', width: '50px', paddingRight: '0' }}
								data-cart-key={ item?.data?.cartKey }
								className={ `woo-next-cart-qty-input ml-3 ${ updatingProduct ? 'disabled' : '' } ` }
								value={ productCount }
								onChange={ ( event ) => handleQtyChange( event, item?.cartKey, '' ) }
								readonly='readonly'
								id={'qty_pro_'+item?.product_id} 
							/>
							<button className={` increment-btn text-20px `} disabled={maxQty} onClick={( event ) => handleQtyChange( event, item?.cartKey, 'increment' )}>+</button>
						</div>
					</footer>
				</div>
			</div>
		</div>
	)
};

export default CartItem;
