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

const Product = ( { product , tokenValid ,options,customerData,setCustomerData} ) => {
	if ( isEmpty( product ) ) {
		return null;
	}
	
	
	const img = product?.images?.[0] ?? {};
	const productType = product?.type ?? '';
	// member only  
	var Membersonly  = '';
	if(tokenValid == 1 && options?.discount_type_3 == 1)
		{
			var messageText  = options?.nj_display_box_member_only ?? '';
			Membersonly = getMemberOnlyProduct(options,product,messageText);
		}
	// Custom badge	
	var custom_badge = get_custom_badge(options,product.sku);
	 
	// Coupon box
	var coupon_box = get_coupon_box(options,product.sku);

	// All skus grid timer
	var gridtimer = get_gridtimer(options, product);
	
	var p_slug = '/p/'+product?.slug;
	if(!WEB_DEVICE)
		{
			p_slug = '/product/?sname='+product?.slug;
		}

	return (
		<div className="h-fit">
			<Link href={ `${ p_slug }`} legacyBehavior>
				<a>
					<Image
						sourceUrl={ img?.src ?? '' }
						altText={ img?.alt ?? ''}
						title={ product?.name ?? '' }
						width="380"
						height="380"
					/>
					<h6 className="font-bold uppercase my-2 tracking-0.5px">{ product?.name ?? '' }</h6>
					<div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
				</a>
			</Link>
			<div> 
				{(() => {
					if (product.meta_data.short_description_badge != '' && product.meta_data.short_description_badge != 0 && product.meta_data.short_description_badge != undefined) 
					{
					return (
						<div>{product.meta_data.short_description_badge.replace('-',' ')}</div>
					)
					}
					})()}
			</div>
			<div>
			{(() => {
				if (product.stock_quantity < 1) 
				{
				return (
					<div>Sold Out!</div>
				)
				} 
			})()} 
			</div>
			{(() => {
				if(custom_badge != '')
				{
					return (
						<div key='custom_badge'>{custom_badge}</div>
					);
				}
			})()}
			{(() => {
				if(coupon_box != '')
				{
					return (
						<div key='coupon_box'>{coupon_box?.multiple_sku_list_coupon_value} coupon inside</div>
					);
				}
			})()}
			{(() => {
				if(gridtimer != '')
				{
					return (
						<div key='gridtimer'>
						<Gridtimer imgurl={gridtimer}></Gridtimer>
						</div>
					);
				}
			})()}
			<div>
			{(() => {
				if ((product.type == 'simple') && (product.meta_data.product_discount != '') && product.meta_data.product_discount != undefined) 
				{
					const toDay = new Date();
					
					var product_start_date = product.meta_data.product_start_date;
					var product_end_date = product.meta_data.product_end_date;
					
					product_start_date = new Date(product_start_date+' 00:00:00');
					product_end_date = new Date(product_end_date+' 23:59:59');
					//console.log('toDay',toDay);
					//console.log('product_start_date',product_start_date);
					//console.log('product_end_date',product_end_date);
					if (product_start_date <= toDay && toDay <= product_end_date) 
					{
						return (
							<>
							<div>Price Drop </div>
							<div>Extra Discount{product.meta_data.product_discount}%Off</div>
							</>
						)	
					}
				
				} 
			})()} 
			</div>
			<div> 
			{(() => {
				if ((product.type == 'simple') && (product.price > 0)) 
				{
					var offpride =  Math.round(((product.regular_price-product.price)*100)/product.regular_price) ;
					if(offpride > 0)
					{
						return (
							<>
							{
							offpride
							}%Off
							</>
						)
					}
				} 
			})()} 
			</div>
			{getNewProductTag(product.date_created) == 1 ? <>New</>:null}
			{(() =>{
				// Member only
				if(Membersonly != '')
				{
				return(
						<div key="Membersonly"
							dangerouslySetInnerHTML={ {
								__html: Membersonly ?? '',
							} }
							className="Membersonly"
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
				if (product.stock_quantity >= 1) 
				{
					return (
						<>{ 'simple' == productType ? <AddToCart product={product}/> : null }</>
						)
				} else {
					var p_slug = '/p/'+product?.slug;
					if(!WEB_DEVICE)
						{
							p_slug = '/product/?sname='+product?.slug;
						}
					return (<Link href={ `${ p_slug }`} legacyBehavior>
						Read more
					</Link>)
				} 
			})()} 

			<WishlistButton customerData={customerData} setCustomerData={setCustomerData} product={product} tokenValid={tokenValid}/>
			
			{
				'external' === productType ?
					<ExternalLink
						url={ product?.external_url ?? '' }
						text={ product?.button_text ?? '' }
					/> : null
			}
		</div>
	)
}

export default Product;
