import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import ExternalLink from './external-link';
import { getMemberOnlyProduct, getNewProductTag } from '../../utils/customjs/custome';
import { get_coupon_box, get_custom_badge, get_gridtimer } from '../../utils/shop/shop-box';
import Gridtimer from './gridtimer';
import WishlistButton from '../wishlist/wishlistbutton'
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import { useState } from 'react';

const Product = ({ product, tokenValid, options, customerData, setCustomerData }) => {
	if (isEmpty(product)) {
		return null;
	}


	const img = product?.images?.[0] ?? {};
	const [hoverImg, setHoverImg] = useState(img?.src ?? '');

	const productType = product?.type ?? '';
	// member only  
	var Membersonly = '';
	if (tokenValid == 1 && options?.discount_type_3 == 1) {
		var messageText = options?.nj_display_box_member_only ?? '';
		Membersonly = getMemberOnlyProduct(options, product, messageText);
	}
	// Custom badge	
	var custom_badge = get_custom_badge(options, product.sku);

	// Coupon box
	var coupon_box = get_coupon_box(options, product.sku);

	// All skus grid timer
	var gridtimer = get_gridtimer(options, product);

	var p_slug = '/p/' + product?.slug;
	if (!WEB_DEVICE) {
		p_slug = '/product/?sname=' + product?.slug;
	}

	return (
		<div className='h-full shadow-full group relative pb-14'>
			{(() => {
				if ((product.type == 'simple') && (product.price > 0)) {
					var offpride = Math.round(((product.regular_price - product.price) * 100) / product.regular_price);
					if (offpride > 0) {
						return (
							<div className='offinfo absolute bg-victoria-800 text-white text-xs font-medium shadow-lg py-1 px-2 z-10 top-1.5 left-1.5'>
								{offpride}% Off
							</div>
						)
					}
				}
			})()}
			<Link href={`${p_slug}`} legacyBehavior>
				<a>
					<div className='p-2 relative overflow-hidden'>
						<Image
							sourceUrl={hoverImg}
							altText={img?.alt ?? ''}
							title={product?.name ?? ''}
							width="300"
							height="300"
							className="group-hover:scale-110 transition-all duration-500 ease mx-auto"
						/>
					</div>
					<div className='border-y p-2 border-slate-200'>
						<h6 className="font-medium line-clamp-2 group-hover:text-victoria-800">{product?.name ?? ''}</h6>
					</div>
				</a>
			</Link>
			<div className='p-2 space-y-2'>
				<div className='' dangerouslySetInnerHTML={{ __html: sanitize(product?.price_html ?? '') }} />

				{(() => {
					if (product.meta_data.short_description_badge != '' && product.meta_data.short_description_badge != 0 && product.meta_data.short_description_badge != undefined) {
						return (
							<p className={`px-2 text-white w-max ${product.meta_data.short_description_badge}`}>{product.meta_data.short_description_badge.replace('-', ' ')}</p>
						)
					}
				})()}

				{(() => {
					if (product.stock_quantity < 1) {
						return (
							<p className='bg-red-600 px-2 text-white w-max'>Sold Out!</p>
						)
					}
				})()}
				{(() => {
					if (custom_badge != '') {
						return (
							<div key='custom_badge'>{custom_badge}</div>
						);
					}
				})()}
				{(() => {
					if (coupon_box != '') {
						return (
							<div key='coupon_box'>{coupon_box?.multiple_sku_list_coupon_value} coupon inside</div>
						);
					}
				})()}
				{(() => {
					if (gridtimer != '') {
						return (
							<div key='gridtimer'>
								<Gridtimer imgurl={gridtimer}></Gridtimer>
							</div>
						);
					}
				})()}

				{(() => {
					if ((product.type == 'simple') && (product.meta_data.product_discount != '') && product.meta_data.product_discount != undefined) {
						const toDay = new Date();

						var product_start_date = product.meta_data.product_start_date;
						var product_end_date = product.meta_data.product_end_date;

						product_start_date = new Date(product_start_date + ' 00:00:00');
						product_end_date = new Date(product_end_date + ' 23:59:59');
						//console.log('toDay',toDay);
						//console.log('product_start_date',product_start_date);
						//console.log('product_end_date',product_end_date);
						if (product_start_date <= toDay && toDay <= product_end_date) {
							return (
								<div className='flex items-center gap-1 sm:gap-2 flex-wrap'>
									<p className='relative w-max text-center'><span className='prodsale-box w-max inline-block text-white px-2'>Price Drop</span></p>
									<p className='text-sm'>Extra Discount {product.meta_data.product_discount}% Off</p>
								</div>
							)
						}

					}
				})()}

				{getNewProductTag(product.date_created) == 1 ? <>New</> : null}
				{(() => {
					// Member only
					if (Membersonly != '') {
						return (
							<div
								key="Membersonly"
								className='memberinfo border-y-[1px] border-victoria-800 bg-victoria-200 p-1 text-center animate-pulse duration-200'
								dangerouslySetInnerHTML={{ __html: Membersonly ?? '', }}
							/>
						);
					}
				})()}
				{/*}<div>menu order : {product.menu_order}</div>
			<div>price : {product.price}</div>
			<div>date_created : {product.date_created}</div>
			<div>total_sales : {product.total_sales}</div>
			<div>average_rating : {product.average_rating}</div>
			<div>stock_quantity : {product.stock_quantity}</div>
			<div>short_description_badge : {product.meta_data.short_description_badge}</div>
			<div><b>Category</b> </div>
			{product.categories.map(element=>{
					//console.log('element',element.name);
					return (<li key={element.id}>{element.name}</li>)
				
			})}
			<div><b>Attributes</b> </div>
			{product.attributes.map(element=>{
					var attlist = '<p key='+element.id+'><b>'+element.name+'</b></p>';
					{ element.options.map(options_element=>{
							attlist +='<li key='+options_element+'>'+options_element+'</li>';
					})}
					return (
						<div dangerouslySetInnerHTML={{ __html: attlist }} />
					);
				
			})} 
			<div><b>Tags</b> </div>
			{product.tags.map(element=>{
					//console.log('element',element.name);
					return (<li key={element.id}>{element.name}</li>)
				
			})}

		{*/}
				{(() => {
					if (product?.type == 'variable' && product.attributes.length > 0) {
						return (
							<div className='flex items-center gap-1 flex-wrap'><b>Options :</b>
								{product.attributes.map(element => {
									var attlist = '<span key=' + element.id + '>' + element.name + '</span>';
									return (<p className='text-sm' dangerouslySetInnerHTML={{ __html: attlist }} />)
								})}
							</div>
						);
					}
				})()}

				{(() => {
					if (product?.type == 'variable' && product?.pa_color_arr_img != undefined && Object.keys(product?.pa_color_arr_img).length > 0) {
						return (
							<ul className='flex items-center gap-1'>
								{Object.keys(product?.pa_color_arr_img).map(element => {
									console.log('element', product?.pa_color_arr_img[element]);
									return (<>
										<li className='border border-victoria-800'>
											<Image
												sourceUrl={product?.pa_color_arr_img[element].thumbnail ?? ''}
												altText={element ?? ''}
												title={element ?? ''}
												width="50"
												height="50"
												data-variation-image={product?.pa_color_arr_img[element].large ?? ''}
												onMouseEnter={() => setHoverImg(product?.pa_color_arr_img[element].large)}
												onMouseLeave={() => setHoverImg(img?.src ?? '')}
											/>
										</li>
									</>)
								})}
							</ul>
						);
					}
				})()}

				<div className='addwish flex items-center justify-center absolute left-0 bottom-0 w-full p-2 border-t border-gray-200 gap-2'>
					{(() => {

						if ('variable' == productType) {
							return (
								<Link href={p_slug} className='sm:w-32 sm:p-2 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative'>
									<span className='hidden sm:inline-block'>Select options</span>
									<span className='sm:hidden size-10 bg-white grid place-content-center'>
										<i className="fa-sharp fa-light fa-cart-plus text-2xl text-victoria-700"></i>
									</span>
								</Link>
							);
						}
						else if (product.stock_quantity >= 1 && 'simple' == productType) {
							return (<AddToCart product={product} />)
						} else {
							return (<Link href={p_slug} className='sm:w-32 sm:p-2 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative'>
								<span className='hidden sm:inline-block'>Read more</span>
								<span className='sm:hidden size-10 bg-white grid place-content-center'>
									<i className="fa-regular fa-arrow-right text-2xl text-victoria-700"></i>
								</span>
							</Link>
							);
						}
					})()}
					<WishlistButton customerData={customerData} setCustomerData={setCustomerData} product={product} tokenValid={tokenValid} listing={false} />
				</div>

				{
					'external' === productType ?
						<ExternalLink
							url={product?.external_url ?? ''}
							text={product?.button_text ?? ''}
						/> : null
				}
			</div>
		</div>
	)
}

export default Product;
