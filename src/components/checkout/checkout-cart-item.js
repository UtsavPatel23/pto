import Image from '../image';
import { isEmpty } from 'lodash';

const CheckoutCartItem = ({ item, notice, postcodedis }) => {

	const productImg = item?.data?.images?.[0] ?? '';

	return (
		<tr key={item?.productId ?? ''}>
			<td className='border border-slate-300 p-2'>
				<div className='flex gap-3 items-center'>

					<figure>
						<Image
							width="70"
							height="70"
							altText={productImg?.alt ?? ''}
							sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ''} // use normal <img> attributes as props
						/>
					</figure>
					{item?.data?.name ?? ''}
					{notice ? <span className='invalid-feedback d-block text-red-500'>Change postcode OR Sorry please remove this product Undeliverable at {postcodedis}.</span> : null}
				</div>
			</td>
			<td className='border border-slate-300 p-2'>{item?.currency ?? ''}{item?.line_subtotal.toFixed(2) ?? ''}</td>
		</tr>
	)
};

export default CheckoutCartItem;
