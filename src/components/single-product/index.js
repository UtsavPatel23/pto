/**
 * Internal Dependencies.
 */
 import { useState } from 'react';
 import AddToCart from '../cart/add-to-cart';
 import ExternalLink from '../products/external-link';
 import ProductGallery from './product-gallery';
 import axios from 'axios';
 import Link from 'next/link';
 import jQuery, { queue } from "jquery";
import { useEffect } from 'react';
import Warranty_tab from './Warranty_tab';
import Shipping_guide_tab from './Shipping_guide_tab';
import Reward_points_tab from './Reward_points_tab';
import Product from '../products/product';
import Review from './../review/Review';
import { isEmpty } from 'lodash';
import { getMemberOnlyProduct, getNewProductTag, storeYourBrowsingHistory } from '../../utils/customjs/custome';
import BuyNow from '../cart/buy-now';
import InputQty from '../single-product/input-qty';
import $ from 'jquery';
import { get_coupon_box } from '../../utils/shop/shop-box';
import WishlistButton from '../wishlist/wishlistbutton'
import { SHOP_SHIPPING_SINGLE, WEB_DEVICE } from '../../utils/constants/endpoints';
import GroupProduct from './group-product';

const SingleProduct = ({ singleProduct, reviews, options }) => {
		const [product, setProduct] = useState(singleProduct);
		const {attributes_new} = singleProduct;
		 const paymentOptions = options?.payments;
		 const [timer,setTimer] = useState(0);
		 const [shippingCharge,setShippingCharge] = useState('<span>Calculate Shipping</span>');
		 const [inputshipdisabled,setInputshipdisabled] = useState(false);
		 const [yourBrowsingHistory,setYourBrowsingHistory] = useState('');

		 const [tokenValid,setTokenValid]=useState(0);
		 const [membersonly,setMembersonly]=useState('');
		 const [customerData,setCustomerData] = useState(0);

	const [productCountQty, setProductCountQty] = useState(1);
	const [att_selected, setAtt_selected] = useState('');

	
		 
 // ************* ********************************  ************************ 
 // ************* Shipping Calculation ************************************* 
 // ************* ********************************  ************************ 
		 const shippingCalculation = async(e) => {
			 const postcode = e.target.value;
			 const sku = e.target.getAttribute('data-inputsku');
			 const product_code = e.target.getAttribute('data-inputproduct_code');
			 if(postcode.length == 4)
			 {
				
				 setInputshipdisabled(true);

				// Local storage get
				var shippinLocalStorageKey = postcode+'_'+sku;
				 var shippingCharge_res = -2;
				 
				 var shipping_single = localStorage.getItem('sbhaduaud');
				 if(shipping_single != null && shipping_single != '')
				 {
					shipping_single = JSON.parse(shipping_single);
					shippingCharge_res = shipping_single[shippinLocalStorageKey];
				 }else{
					shipping_single = {};
				 }

				 if (product_code == 'LP') { 
					shippingCharge_res = 0;
			   		}
				else if(shippingCharge_res == undefined || shippingCharge_res == -2)
				 { 
					// API shipping get
					const payload = {postcode: postcode, sku: sku,product_code:product_code };
					const { data :ShippingData } = await axios.post( SHOP_SHIPPING_SINGLE,payload );
					shippingCharge_res = ShippingData.ShippingData;
				 }else{
					shippingCharge_res = parseFloat(atob(shippingCharge_res));
				 }
				 
				 // API shipping get
				 var shippingMessage = '';
				 if (shippingCharge_res < 0) {
					 shippingMessage = '<span "failed">Delivery Not Available to '+postcode+'</span>';
				 } else if (shippingCharge_res == 0) {
					 shippingMessage = '<span "success">Free Shipping to '+postcode+'</span>';
				 } else {
					 shippingMessage = '<span "success">$'+ shippingCharge_res + ' Shipping charge to '+postcode+'</span>';
				 }
				 if (product_code == 'LP') { 
					shippingMessage = '<span "success">This product will not be shipped.(Its for pick up only)</span>';
			   		}
				 setShippingCharge(shippingMessage);

				 // Local storage set
				 shipping_single[shippinLocalStorageKey] = btoa(shippingCharge_res);
				localStorage.setItem('sbhaduaud',JSON.stringify(shipping_single));

				 setInputshipdisabled(false);
			 }
		 }
		 // reward 
		 const [cashback,setCashback] = useState(Math.round(product.price)/10);
		 const [cashbackpoints,setCashbackpoints] = useState(Math.round(product.price)*10);
		 // Dicount timer
		 useEffect(()=>{
			if ((singleProduct.type == 'simple' || product.type == 'variation') && (product.meta_data.product_discount != '') && product.meta_data.product_discount != undefined) 
			{
				const toDay = new Date();
				var product_start_date = product.meta_data.product_start_date;
				var product_end_date = product.meta_data.product_end_date;
				product_start_date = new Date(product_start_date+' 00:00:00');
				product_end_date = new Date(product_end_date+' 23:59:59');
				if (product_start_date <= toDay && toDay <= product_end_date) {
					setTimer(1);
					var dis_price = ((product.price * product.meta_data.product_discount) / 100);
					setCashback((Math.round((product.price - dis_price)) / 10));
					setCashbackpoints((Math.round((product.price - dis_price)) * 10));
					var countDownDate = product_end_date.getTime();
					// Update the count down every 1 second
					var x = setInterval(function () {

						// Get todays date and time
						const now = new Date();
						var dayNum = now.getDay();

								
						var daysToFri = 5 - (dayNum < 5 ? dayNum : dayNum - 7);
						//console.log('daysToFri = ' + daysToFri);
						var fridayNoon = new Date(+now);
						fridayNoon.setDate(fridayNoon.getDate() + daysToFri);
						fridayNoon.setHours(24, 0, 0, 0);
								
						var ms = Math.ceil((fridayNoon - now) / 1000) * 1000;
								
						// Find the distance between now an the count down date
						var distance = countDownDate - now.getTime();
								
								
						// Time calculations for days, hours, minutes and seconds
						var days_weekday = Math.floor(ms / (1000 * 60 * 60 * 24));
						var days_end_date = Math.floor(distance % (1000 * 60 * 60 * 24 * 9) / (1000 * 60 * 60 * 24));
						days_end_date = days_end_date + 1
						var days = 0;
						if (days_weekday < days_end_date) {
							days = days_weekday;
						} else {
							days = days_end_date;
						}
						var hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						var minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
						var seconds = Math.floor((ms % (1000 * 60)) / 1000);

						if (days >= 0) {
							jQuery('#timer_count_down').html('<span class="days inline-block"><div  class="wrapper">' + days + 'd </div></span><span class="hours inline-block"><div class="wrapper"> ' + hours + 'h</div></span><span class="minutes inline-block"><div class="wrapper"> ' + minutes + 'm</div></span><span class="seconds inline-block"><div class="wrapper"> ' + seconds + 's</div></span>');
							//jQuery('.summary-inner h3.timer-heading').html('When Timer goes down, prices go up');
						}
						if (ms < 0) {
							clearInterval(x);
							//document.getElementById("timer_count_down").remove();
						}
								
					}, 1000);
				} else { 
					setTimer(0);
					setCashback((Math.round((product.price)) / 10));
					setCashbackpoints((Math.round((product.price)) * 10));
				}
			} else { 
				setTimer(0);
				setCashback((Math.round((product.price)) / 10));
					setCashbackpoints((Math.round((product.price)) * 10));
			}
			 setProductCountQty(1);
			 setShippingCharge('<span>Calculate Shipping</span>');
			 $('#shippingCalculation_input').val('');
			 
			},[product])
			useEffect(()=>{
				setYourBrowsingHistory(storeYourBrowsingHistory(product));
			},[product]);
			if(!isEmpty(reviews))
			{
				reviews.sort(function(a, b){
					return a.id - b.id;
				});      
		
			}
			
		useEffect(() => {
			if(localStorage.getItem('token')) {
				setTokenValid(1);
				if(localStorage.getItem('customerData')) {
				var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
				setCustomerData(customerDataTMP);
				}
			}
		}, []);
	
		// Members only
		useEffect(() => {
			if(tokenValid == 1 && options?.discount_type_3 == 1)
				{
					var messageText  = options?.nj_display_single_product_member_only ?? '';
					setMembersonly(getMemberOnlyProduct(options,product,messageText));
				}
		}, [tokenValid,product]);

		// Coupon box
	var coupon_box = get_coupon_box(options, product.sku);
	const attribut_drop = async() =>{
			var att_select = '';
			$(".attribut_drop").each(function () {
				if ($(this).val() != '')
				{
					att_select += $( this ).val()+'__';
				}
			});
			setAtt_selected(att_select);
			console.log('att_select = ',att_select);
			console.log('att_select',singleProduct.product_variations[att_select]);
			console.log('product_variations',singleProduct.product_variations);
			if ( !isEmpty( singleProduct.product_variations[att_select] ) ) {
				setProduct(singleProduct.product_variations[att_select]);
			}else{
				setProduct(singleProduct);
			}
	}
	const clear_drop = async() =>{
		$(".attribut_drop").each(function () {
			$(this).val('');
		});
		setProduct(singleProduct);
		setAtt_selected('');
		}
	console.log('variation product ',product);
	console.log('membersonly product ',membersonly);
	 return Object.keys( product ).length ? (
		 <div className="single-product container mx-auto my-32 px-4 xl:px-0">
			 <div key="section1" className="grid md:grid-cols-2 gap-4">
				 <div key="product-images" className="product-images">
					 { product.images.length ? (
						 <ProductGallery items={ product?.images }/>
					 ) : null }
					 {getNewProductTag(singleProduct.date_created) == 1 ? <>New</>:null}
				 </div>
				 <div  key="product_info" className="product-info">
					 <h4 key="product_title"
						dangerouslySetInnerHTML={ {
							__html: product.name,
						} }
						className="roducts-main-title text-2xl uppercase"
					/>
					 {singleProduct.average_rating > 1?
					 <div key="average_rating">
						{singleProduct.average_rating}
					 	(<span className="count">{reviews.length}</span> customer reviews)
					  </div>
					 :null}
					 
					<div key="product_info1"
						dangerouslySetInnerHTML={ {
							__html: product?.price_html ? product?.price_html : '$'+product?.price ,
						} }
						className="product-price mb-5"
					 /> 
					 {
						 product?.type == 'grouped' ?
							 <GroupProduct options={options} product={product} bundle_discount={options?.nj_bundle_discount}></GroupProduct> : null
					 }
					 {
					!isEmpty(attributes_new)?
							 attributes_new.map(per_page_no => {
								 if (per_page_no.variation)
								 {
									 return (
										<div key={per_page_no.id}>
										{per_page_no.name} :
										<>
											<select id={'id_att_' + per_page_no.name} className="attribut_drop" onChange={attribut_drop} name={'nm_att_' + per_page_no.name}>
												<option key={per_page_no.if} value=''>Choose an option</option>
												{per_page_no.options.map(attribut_val => (
													<option key={attribut_val.slug} value={attribut_val.slug}>{attribut_val.name}</option>
												))}
											</select>
										</>
									</div>
									)			 
								 }
						})
						:''
					 }
					 { att_selected != '' ? <><button onClick={clear_drop}>Clear</button></>: null}
					 <div key="product_info2">
						{timer != 0?<div id="timer_count_down"></div>:null}
						{timer != 0?<div>Extra Discount{product.meta_data.product_discount}%Off</div>:null}
					</div>
					 
					{(() => {
						if ((singleProduct.type == 'simple' || singleProduct.type == 'variable') && (product.price > 0)) 
						{
							var offpride = Math.round(((product.regular_price-product.price)*100)/product.regular_price);
							if(offpride > 0){
								return (
										<div key="product_info3">
											{offpride}%Off
										</div>
								)
							}
								
						} 
					})()} 
					
					{(() =>{
						// Member only
						if(membersonly != '')
						{
						return(
								<div key="membersonly"
									dangerouslySetInnerHTML={ {
										__html: membersonly ?? '',
									} }
									className="membersonly"
								/>
							);
						}
					})()}
					<div key="product_info4">
					{(() => {
							 if (product.type == 'simple' || product.type == 'variation') {
								 if (product.stock_quantity < 1) {
									 return (
										 <div>Sold Out!</div>
									 )
								 } else if (product.stock_quantity <= 20) {
									 return (
										 <div>Hurry Up, Limited Stock available !</div>
									 )
								 } else if (product.stock_quantity > 20) {
									 return (
										 <div>In stock</div>
									 )
								 }
							 }

					})()} 
					</div>
						{(() => {
							if (product.meta_data.short_description_badge != '' && product.meta_data.short_description_badge != 0 && product.meta_data.short_description_badge != undefined) 
							{
							return (
								<div key="product_info5">{product.meta_data.short_description_badge.replace('-',' ')}</div>
							)
							}
							})()}
					
						 {(product?.type == 'simple' || product?.type == 'variation') && product?.stock_quantity > 0 ?
						<div key="product_info6">
						<InputQty product={ product } productCountQty={productCountQty} setProductCountQty={setProductCountQty}/>
						<AddToCart product={ product } productCountQty={productCountQty}/>
						<BuyNow  product={ product } productCountQty={productCountQty}/>
						</div> : null }
					 
					 {(() => {
						 if (product?.type == 'simple' || product?.type == 'variation'  || product?.type == 'grouped') {
							 return (<>
								 <WishlistButton customerData={customerData} setCustomerData={setCustomerData} product={product} tokenValid={tokenValid} />
								 <div key="reward-wrapper">
								 <div key="reward-inner">
									 <div key="top_smooth" >
										 <p>Reward Points</p>
										 <Link href="#" >Know More</Link>
									 </div>
									 <div key="text">
										 <p>Buy &amp; Get 10% Cashback <b>{cashbackpoints}</b> Reward points Worth <b>${cashback}</b> </p>
									 </div>
								 </div>
								 <div key="co-tips">
									 <Link href="/my-account/rewards/">Manage</Link> Your Reward Points.
								 </div>
							 </div>
							 </>);
						  }
					 })()}
					 {(() => {
						 if (product?.type == 'simple' || product?.type == 'variation' ) {
							 return (<>
							<div key="product_info7">
								<input id="shippingCalculation_input" type="number" onKeyUp={shippingCalculation} data-inputsku={ product?.sku ?? '' } data-inputproduct_code={product.meta_data.product_code}   size="4"  name="product_code" placeholder="POSTCODE"  disabled={inputshipdisabled} /> 
								<span
									dangerouslySetInnerHTML={ {
										__html: shippingCharge ?? '',
									} }
									className="product-price mb-5"
								/>
							</div>
							 </>);
						  }
					})()}
					{(() => {
						if(coupon_box != '')
						{
							return (
								<div key='coupon_box'>Save {coupon_box?.multiple_sku_list_coupon_value} Use Code {coupon_box?.multiple_sku_list_coupon_name}</div>
							);
						}
					})()}
					<div key="estimated-time">
							<p>Estimated Dispatch*: Leaves warehouse in 1-2 business days</p>
							{product.meta_data.product_code == 'VX'?<>
								<p><span>FREE delivery*: </span>
								<b>In Sydney Metro, Melbourne Metro and Brisbane Metro</b></p>
								</>:null}
									
							
							
						</div>
					<div key="product_info8">
					{
						'external' === product?.type ?
							<ExternalLink
								url={ product?.external_url ?? '' }
								text={ product?.button_text ?? '' }
							/> : null
					}
					 </div>
				 </div>
				 </div>
				 <div key="section1" className="grid md:grid-cols-1 gap-8">
					 <div>
					{(() => {
						if(!isEmpty(paymentOptions))
						{
								if(paymentOptions.length > 0)
									{
										return(
											<div key="paymentOptions_list">
												{
														paymentOptions.map( paymentOption => {
																if(paymentOption.payment_class != 'payment-hide')
																{
																	if(paymentOption.payment_url != '')
																	{
																		return (
																			<Link className='inline-block'  href={paymentOption.payment_url}>
																			<img src={ paymentOption.payment_logos } alt={ `${ paymentOption.payment_title } logo` }
																				width="100"
																				height="40"/>
																			</Link>
																		)
																	}else{
																		return (
																			<img className='inline-block'  src={ paymentOption.payment_logos } alt={ `${ paymentOption.payment_title } logo` }
																				width="100"
																				height="40"/>
																		)
																	}
																	
																}
																
														})
												}
											</div>
										);
									}
						}
					 })()}
						
					<div key="product_info9"
						dangerouslySetInnerHTML={ {
							__html: product.description,
						} }
						className="product-description mb-5"
					/>
					
					{(() => {
						if(product.weight != '' && product.dimensions.length != '')
						{
							return(<div key='additional-information'>
								<div>Additional information</div>
							{product.weight? <><b>Weight</b> : {product.weight}</>:null}
							{product.dimensions.length? 
								<><b>Dimensions</b>
								{product.dimensions.length} X {product.dimensions.width} X {product.dimensions.height}
								</>
								:null}
							</div>
							);
						}
					})()}
					{product.meta_data.product_features ? <>{product.meta_data.product_features}</>:null}
					{product.meta_data.dimensions_and_specification ? <>{product.meta_data.dimensions_and_specification}</>:null}
					{product.meta_data.whats_included ? <>{product.meta_data.whats_included}</>:null}
					
					<Warranty_tab />
					<Shipping_guide_tab />
				<Reward_points_tab />
					{reviews.length?
					<div key="reviews_list">
						<p>{reviews.length} <span key="product_title"
						dangerouslySetInnerHTML={ {
							__html: product.name,
						} }
						className="text-2xl "
					/></p>
						<div>{product.average_rating} Based on {reviews.length} reviews</div>
						{
								reviews.map( review => {
									
										return (
											<Review key={review.id} review={review} />
										)
								})
						}
					</div>
					:null}
					<div key="brand-productcode">
					{product.meta_data.product_code ? <div key="product_code"><b>Product Code :</b>{product.meta_data.product_code}-{product.sku}</div>:null}
					{product.meta_data.custom_sku_code ? <div key="custom_sku_code"><b>SKU :</b>{product.meta_data.custom_sku_code}</div>:null}
					{product?.tags?.length ? <div key="tags"><b>Tags :</b>
									{
										product.tags.map( tag => {
											var tag_slug = tag?.slug;
											if(!WEB_DEVICE)
    											{
													tag_slug = '?sname='+tag_slug;
												}
												return (
													<Link href={'/product-tag/'+tag_slug}>{tag.name}</Link>
												)
										})
									}
							</div>:null}
					{product.meta_data.bulky_iteam ? <div key="bulky_iteam"><b>Bulky Item :</b>{product.meta_data.bulky_iteam}</div>:null}
					</div>
					{(() => {
						if(undefined != singleProduct.related_ids)
						{
							return (<div key="Related-Products">
								<b>Related Products</b>
								{	singleProduct.related_ids.length ? 
							
									<div className='grid grid-cols-4 gap-4'>
									{
										singleProduct.related_ids.map( productRel => {
											var Membersonly  = '';
												if(tokenValid == 1 && options?.discount_type_3 == 1)
													{
														var messageText  = options?.nj_display_box_member_only ?? '';
														Membersonly = getMemberOnlyProduct(options,productRel,messageText);
													}
												return (
													<Product key={ productRel?.id } product={productRel}  Membersonly={Membersonly}   tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData}/>
												)
										})
									}
									</div>
								: 
									null
								}
							</div>)
						
						}
						
					})()}
					{(() => {
						if(yourBrowsingHistory != '' && Object.keys(yourBrowsingHistory).length > 1)
						{
							var tmphistrydisData = yourBrowsingHistory;
							var ybhpID = Object.keys(tmphistrydisData).pop();
							return (<div key="yourBrowsingHistory-Products">
								<b>Your Browsing History</b>
								{	Object.keys(tmphistrydisData).length ? 
							
									<div className='grid grid-cols-4 gap-4'>
									{
										Object.keys(tmphistrydisData).map( key => {
											if(ybhpID != key)
											{
												var Membersonly  = '';
												if(tokenValid == 1 && options?.discount_type_3 == 1)
													{
														var messageText  = options?.nj_display_box_member_only ?? '';
														Membersonly = getMemberOnlyProduct(options,yourBrowsingHistory[key],messageText);
													}
												return (
													<Product key={ yourBrowsingHistory[key]?.id } product={yourBrowsingHistory[key]} Membersonly={Membersonly} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData}/>
												)
											}
										})
									}
									</div>
								: 
									null
								}
							</div>)
						
						}
						
					})()}	
						
				
				 </div>{/* end product_info */ }
			</div>
		 </div>
	 ) : null;
 };
 export default SingleProduct;
 