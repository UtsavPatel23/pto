import { isEmpty } from 'lodash';
import React from 'react'
import { useState } from 'react';

function inputQtyGroup({ product }) {
	//console.log('product QTY ',product);
	const [productCountQty, setProductCountQty] = useState(1);
    const handleQtyChange = ( event,  type ) => {
		//console.log('event',event);
		if ( process.browser ) {
			
			event.stopPropagation();
			let newQty;
			
			if ( !isEmpty( type ) ) {
				newQty = 'increment' === type ? productCountQty + 1 : productCountQty - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = ( event.target.value ) ? parseInt( event.target.value ) : 1;
			}
			
            // Set the new qty in state.
			if(newQty >= 1)
            {
                setProductCountQty( newQty );
            }
		}
	};
    var maxQty = true;
	if(product?.stock_quantity > productCountQty)
	{
		maxQty = false;
	}
	var qtyName = "quantity[" + product?.id + "]";
    return (
            <div key='inputQty' style={{ display: 'flex', alignItems: 'center' }}>
				<span className="decrement-btn text-24px cursor-pointer" onClick={( event ) => handleQtyChange( event, 'decrement' )} >-</span>
				<input
				type="number"
				min="1"
				max={product?.stock_quantity ?? 0}
				style={{ textAlign: 'center', width: '50px', paddingRight: '0' }}
				className={`woo-next-cart-qty-input ml-3 groupqty `}
				value={productCountQty}
				onChange={(event) => handleQtyChange(event, '')}
				readonly='readonly'
				name={qtyName}
				
				/>
				<span className={` increment-btn text-20px cursor-pointer`} disabled={maxQty} onClick={( event ) => handleQtyChange( event, 'increment' )}>+</span>
			</div>
    )
}

export default inputQtyGroup
