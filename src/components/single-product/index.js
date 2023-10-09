/**
 * Internal Dependencies.
 */

 import { useState } from 'react';
 import AddToCart from '../cart/add-to-cart';
 import ExternalLink from '../products/external-link';
 import ProductGallery from './product-gallery';
 import axios from 'axios';
 import { SHOP_SHIPPING_SINGLE } from '../../utils/constants/endpoints';
 import Link from 'next/link';
 import jQuery from "jquery";
 
 const SingleProduct = ( { product ,your_browsing_history} ) => {
		 //console.log('in product',product);
		 const [timer,setTimer] = useState(0);
		 const [shippingCharge,setShippingCharge] = useState('<span>Calculate Shipping</span>');
		 const [inputshipdisabled,setInputshipdisabled] = useState(false);
			  
 // ************* ********************************  ************************ 
 // ************* Shipping Calculation ************************************* 
 // ************* ********************************  ************************ 
		 const shippingCalculation = async(e) => {
			 const postcode = e.target.value;
			 const sku = e.target.getAttribute('data-inputsku');
			 const product_code = e.target.getAttribute('data-inputproduct_code');
			 //console.log('postcode',postcode);
			 //console.log('postcode le',postcode.length);
			 //console.log('sku',sku);
			 //console.log('product_code',product_code);
			 if(postcode.length == 4)
			 {
				 setInputshipdisabled(true);
				 const payload = {postcode: postcode, sku: sku,product_code:product_code };
				 const { data :ShippingData } = await axios.post( SHOP_SHIPPING_SINGLE,payload );
				 console.log('ShippingData',ShippingData);
				 var shippingCharge_res = ShippingData.ShippingData;
				 var shippingMessage = '';
				 if (shippingCharge_res < 0) {
					 shippingMessage = '<span "failed">Delivery Not Available to '+postcode+'</span>';
				 } else if (shippingCharge_res == 0) {
					 shippingMessage = '<span "success">Free Shipping to '+postcode+'</span>';
				 } else {
					 shippingMessage = '<span "success">$'+ shippingCharge_res + ' Shipping charge to '+postcode+'</span>';
				 }
				 setShippingCharge(shippingMessage);
				 setInputshipdisabled(false);
			 }
		 }
		  if ((product.type == 'simple') && (product.meta_data.product_discount != '') && product.meta_data.product_discount != undefined) 
		  {
			  const toDay = new Date();
			  
			  var product_start_date = product.meta_data.product_start_date;
			  var product_end_date = product.meta_data.product_end_date;
			  
			  product_start_date = new Date(product_start_date+' 00:00:00');
			  product_end_date = new Date(product_end_date+' 23:59:59');
			  if (product_start_date <= toDay && toDay <= product_end_date) 
			  {
				 var countDownDate = product_end_date.getTime();
  
				  // Update the count down every 1 second
				  var x = setInterval(function() {
				  
				  var now = new Date().getTime();
					  
				  var distance = countDownDate - now;
				 //console.log('distance',distance);
				  if (distance < 0) {
					  clearInterval(x);
				  }else{
					 var days = Math.floor(distance / (1000 * 60 * 60 * 24));
					 var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					 var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					 var seconds = Math.floor((distance % (1000 * 60)) / 1000);
						 
					 var count_down_time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
					 jQuery('#timer_count_down').html(count_down_time);
					  //setTimer(count_down_time)
				  }
				  }, 1000);
			  }
		  
		  } 
		  
 
	 return Object.keys( product ).length ? (
		 <div className="single-product container mx-auto my-32 px-4 xl:px-0">
			 <div key="section1" className="grid md:grid-cols-2 gap-4">
				 <div key="product-images" className="product-images">
					 
					 { product.images.length ? (
						 <ProductGallery items={ product?.images }/>
					 ) : null }
				 </div>
				 <div  key="product_info" className="product-info">
				 	<h4 className="products-main-title text-2xl uppercase">{ product.name }</h4>
					<div key="product_info1"
						
						dangerouslySetInnerHTML={ {
							__html: product?.price_html ?? '',
						} }
						className="product-price mb-5"
					/> 
					 <div key="product_info2">
						{
						//timer != 0?<div id="timer_count_down">{timer}</div>:null
						}
						<div id="timer_count_down"></div>
						{timer != 0?<div>Extra Discount{product.meta_data.product_discount}%Off</div>:null}
					</div>
					<div key="product_info3"> 
					{(() => {
						if ((product.type == 'simple') && (product.price > 0)) 
						{
							return (
									<>
									{
									Math.round(((product.regular_price-product.price)*100)/product.regular_price)
									}%Off
									</>
								)	
						} 
					})()} 
					</div>
					<div key="product_info4">
					{(() => {
						if (product.stock_quantity < 1) 
						{
						return (
							<div>Sold Out!</div>
						)
						}else if(product.stock_quantity <= 20) 
						{
							return (
								<div>Hurry Up, Limited Stock available !</div>
							)	
						}
					})()} 
					</div>
					<div key="product_info5"> 
						{(() => {
							if (product.meta_data.short_description_badge != '' && product.meta_data.short_description_badge != 0 && product.meta_data.short_description_badge != undefined) 
							{
							return (
								<div>{product.meta_data.short_description_badge.replace('-',' ')}</div>
							)
							}
							})()}
					</div>
					<div key="product_info6">
					{ 'simple' === product?.type ? <AddToCart product={ product }/> : null }
					</div>
					<div key="product_info7">
						<input type="number" onKeyUp={shippingCalculation} data-inputsku={ product?.sku ?? '' } data-inputproduct_code={product.meta_data.product_code}   size="4"  name="product_code" placeholder="POSTCODE"  disabled={inputshipdisabled} /> 
						<span
							
							dangerouslySetInnerHTML={ {
								__html: shippingCharge ?? '',
							} }
							className="product-price mb-5"
						/>
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
					<div key="product_info9"
						
						dangerouslySetInnerHTML={ {
							__html: product.description,
						} }
						className="product-description mb-5"
					/>
					
				 </div>{/* end product_info */ }
				 
			</div>	
			<div key="section2">
					{(() => {
					if(your_browsing_history != '')
					{
						//your_browsing_history = JSON.parse(your_browsing_history);
						//console.log('your_browsing_history2',your_browsing_history);
						return Object.keys(your_browsing_history).map(function(key) {
							//console.log('key',your_browsing_history[key].id);
							return(
							<div key={'your_browsing_history'+key}>
								<Link href={ `/product/${ your_browsing_history[key]?.slug }`} >
									
									{your_browsing_history[key].name}
									
								</Link>
							</div>
							);
						});
					}		
					})()}
			</div>		
		 </div>
	 ) : null;
	 
 };
 
 export default SingleProduct;
 