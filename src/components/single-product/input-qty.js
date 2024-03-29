import { isEmpty } from 'lodash';
import React from 'react'

function inputQty({ product, productCountQty, setProductCountQty }) {
	const handleQtyChange = (event, type) => {

		if (process.browser) {

			event.stopPropagation();
			let newQty;

			if (!isEmpty(type)) {
				newQty = 'increment' === type ? productCountQty + 1 : productCountQty - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = (event.target.value) ? parseInt(event.target.value) : 1;
			}

			// Set the new qty in state.
			if (newQty >= 1) {
				setProductCountQty(newQty);
			}
		}
	};
	var maxQty = true;
	if (product?.stock_quantity > productCountQty) {
		maxQty = false;
	}
	return (
		<div key='inputQty' className='bg-gray-200 p-1 flex'>
			<button className="size-8 bg-white me-3" onClick={(event) => handleQtyChange(event, 'decrement')} >-</button>
			<input
				type="number"
				min="1"
				max={product?.stock_quantity ?? 0}
				className='bg-transparent w-14 text-center'
				value={productCountQty}
				onChange={(event) => handleQtyChange(event, '')}
				readonly='readonly'
			/>
			<button className='size-8 bg-white' disabled={maxQty} onClick={(event) => handleQtyChange(event, 'increment')}>+</button>
		</div>
	)
}

export default inputQty
