/**
 * Internal Dependencies.
 */
import { useState } from 'react';
import AddToCart from '../cart/add-to-cart';
import ExternalLink from '../products/external-link';
import ProductGallery from './product-gallery';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
import Warranty_tab from './Warranty_tab';
import Shipping_guide_tab from './Shipping_guide_tab';
import Reward_points_tab from './Reward_points_tab';
import Product from '../products/product';
import Review from './../review/Review';
import { isEmpty } from 'lodash';
import { getMemberOnlyProduct, getNewProductTag, replace_wordpress_url, storeYourBrowsingHistory } from '../../utils/customjs/custome';
import BuyNow from '../cart/buy-now';
import InputQty from '../single-product/input-qty';
import $ from 'jquery';
import { get_coupon_box } from '../../utils/shop/shop-box';
import WishlistButton from '../wishlist/wishlistbutton'
import { SHOP_SHIPPING_SINGLE, WEB_DEVICE } from '../../utils/constants/endpoints';
import GroupProduct from './group-product';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import splashlogo from '../../../public/assets/img/logo-splash.webp';
import { useRouter } from 'next/router';
import Enquiry from '../enquiry'
import ReviewPopup from '../review-popup'
import Loaderspin from "../loaderspin";

import bronze from '../../../public/assets/img/bronze.webp';
import silver from '../../../public/assets/img/silver.webp';
import gold from '../../../public/assets/img/gold.webp';
import platinum from '../../../public/assets/img/platinum.webp';



const SingleProduct = ({ singleProduct, reviews, options }) => {
	const [product, setProduct] = useState(singleProduct);
	const { attributes_new } = singleProduct;
	const paymentOptions = options?.payments;
	const { top_banner, footer_banner } = options ?? '';
	const [timer, setTimer] = useState(0);
	const [shippingCharge, setShippingCharge] = useState('<span>Calculate Shipping</span>');
	const [inputshipdisabled, setInputshipdisabled] = useState(false);
	const [yourBrowsingHistory, setYourBrowsingHistory] = useState('');

	const [tokenValid, setTokenValid] = useState(0);
	const [membersonly, setMembersonly] = useState('');
	const [customerData, setCustomerData] = useState(0);

	const [productCountQty, setProductCountQty] = useState(1);
	const [att_selected, setAtt_selected] = useState('');

	const [isEnquiryOpen, setEnquiryOpen] = useState(false);
	const [default_attr_val, setDefault_attr_val] = useState(null);

	const { membership_level } = customerData?.meta_data ?? '';

	const openEnquiry = () => {
		setEnquiryOpen(true);
	};

	const closeEnquiry = () => {
		setEnquiryOpen(false);
	};

	const router = useRouter();
	//console.log('router',router);
	//console.log('le ',Object.keys(router.query).length);


	useEffect(() => {
		// Disable body scrolling when the popup is open
		if (isEnquiryOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}

		// Clean up the effect
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [isEnquiryOpen]);

	useEffect(() => {
		setProduct(singleProduct)
	}, [singleProduct]);
	// ************* ********************************  ************************ 
	// ************* Shipping Calculation ************************************* 
	// ************* ********************************  ************************ 
	const shippingCalculation = async (e) => {
		const postcode = e.target.value;
		const sku = e.target.getAttribute('data-inputsku');
		const product_code = e.target.getAttribute('data-inputproduct_code');
		if (postcode.length == 4) {

			setInputshipdisabled(true);

			// Local storage get
			var shippinLocalStorageKey = postcode + '_' + sku;
			var shippingCharge_res = -2;

			var shipping_single = localStorage.getItem('sbhaduaud');
			if (shipping_single != null && shipping_single != '') {
				shipping_single = JSON.parse(shipping_single);
				shippingCharge_res = shipping_single[shippinLocalStorageKey];
			} else {
				shipping_single = {};
			}

			if (product_code == 'LP') {
				shippingCharge_res = 0;
			}
			else if (shippingCharge_res == undefined || shippingCharge_res == -2) {
				// API shipping get
				const payload = { postcode: postcode, sku: sku, product_code: product_code };
				const { data: ShippingData } = await axios.post(SHOP_SHIPPING_SINGLE, payload);
				shippingCharge_res = ShippingData.ShippingData;
			} else {
				shippingCharge_res = parseFloat(atob(shippingCharge_res));
			}

			// API shipping get
			var shippingMessage = '';
			if (shippingCharge_res < 0) {
				shippingMessage = '<span "failed">Delivery Not Available to ' + postcode + '</span>';
			} else if (shippingCharge_res == 0) {
				shippingMessage = '<span "success">Free Shipping to ' + postcode + '</span>';
			} else {
				shippingMessage = '<span "success">$' + shippingCharge_res + ' Shipping charge to ' + postcode + '</span>';
			}
			if (product_code == 'LP') {
				shippingMessage = '<span "success">This product will not be shipped.(Its for pick up only)</span>';
			}
			setShippingCharge(shippingMessage);

			// Local storage set
			shipping_single[shippinLocalStorageKey] = btoa(shippingCharge_res);
			localStorage.setItem('sbhaduaud', JSON.stringify(shipping_single));

			setInputshipdisabled(false);
		}
	}
	// reward 
	const [cashback, setCashback] = useState(Math.round(product.price) / 3);
	const [cashbackpoints, setCashbackpoints] = useState(Math.round(product.price) * 3);

	const membership_levels = ['Bronze', 'Silver', 'Gold', 'Platinum'];

	/* cashback , lvl , voucher , milestone */
	const membership_benefits = [
		["3", 'Bronze', '$10', 750],
		["5", 'Silver', '$15', 1750],
		["7", 'Gold', '$20', 5000],
		["10", 'Platinum', '$25'],
	];
	const [mem_level, setMem_level] = useState(0);
	// set defaulte user login data 
	useEffect(() => {
		membership_levels.map((level, i) => {
			if (level == membership_level) {
				setMem_level(i);
			}
		})
	}, [customerData]);
	console.log('mem_level', mem_level);
	// Dicount timer
	useEffect(() => {
		if ((singleProduct.type == 'simple' || product.type == 'variation') && (product.meta_data.product_discount != '') && product.meta_data.product_discount != undefined) {
			const toDay = new Date();
			var product_start_date = product.meta_data.product_start_date;
			var product_end_date = product.meta_data.product_end_date;
			product_start_date = new Date(product_start_date + ' 00:00:00');
			product_end_date = new Date(product_end_date + ' 23:59:59');
			if (product_start_date <= toDay && toDay <= product_end_date) {
				/*setTimer(1);
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
						jQuery('#timer_count_down').html('<span className="days inline-block"><div  className="wrapper">' + days + 'd </div></span><span className="hours inline-block"><div className="wrapper"> ' + hours + 'h</div></span><span className="minutes inline-block"><div className="wrapper"> ' + minutes + 'm</div></span><span className="seconds inline-block"><div className="wrapper"> ' + seconds + 's</div></span>');
						//jQuery('.summary-inner h3.timer-heading').html('When Timer goes down, prices go up');
					}
					if (ms < 0) {
						clearInterval(x);
						//document.getElementById("timer_count_down").remove();
					}

				}, 1000);*/
			} else {
				setTimer(0);
				setCashback((Math.round((product.price)) / membership_benefits[mem_level][0]));
				setCashbackpoints((Math.round((product.price)) * membership_benefits[mem_level][0]));
			}
		} else {
			setTimer(0);
			setCashback((Math.round((product.price)) / membership_benefits[mem_level][0]));
			setCashbackpoints((Math.round((product.price)) * membership_benefits[mem_level][0]));
		}
		setProductCountQty(1);
		setShippingCharge('<span>Calculate Shipping</span>');
		$('#shippingCalculation_input').val('');

	}, [product])
	useEffect(() => {
		setYourBrowsingHistory(storeYourBrowsingHistory(product));
	}, [product]);
	if (!isEmpty(reviews)) {
		reviews.sort(function (a, b) {
			return a.id - b.id;
		});

	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setTokenValid(1);
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				setCustomerData(customerDataTMP);
			}
		}
	}, []);

	// Members only
	useEffect(() => {
		if (tokenValid == 1 && options?.discount_type_3 == 1) {
			var messageText = options?.nj_display_single_product_member_only ?? '';
			setMembersonly(getMemberOnlyProduct(options, product, messageText));
		}
	}, [tokenValid, product]);

	// Coupon box
	var coupon_box = get_coupon_box(options, product.sku);
	const attribut_drop = async () => {
		var att_select = '';
		$(".attribut_drop").each(function () {
			if ($(this).val() != '') {
				att_select += $(this).val() + '__';
			}
		});
		setAtt_selected(att_select);
		//console.log('att_select = ', att_select);
		//console.log('att_select', singleProduct.product_variations[att_select]);
		//console.log('product_variations', singleProduct.product_variations);
		if (!isEmpty(singleProduct)) {
			if (!isEmpty(singleProduct?.product_variations[att_select])) {
				setProduct(singleProduct?.product_variations[att_select]);
			} else {
				setProduct(singleProduct);
			}
		}

	}
	const clear_drop = async () => {
		$(".attribut_drop").each(function () {
			$(this).val('');
		});
		setProduct(singleProduct);
		setAtt_selected('');
	}
	console.log('variation product ', product);
	console.log('membersonly product ', membersonly);

	// Nested Accordion
	const [accordionOpen, setAccordionOpen] = useState([]);
	const toggleAccordion = (index) => {
		const isOpen = [...accordionOpen];
		isOpen[index] = !isOpen[index];
		setAccordionOpen(isOpen);
	};

	// Slider Setting
	const PrevArrow = (props) => {
		const { onClick } = props;
		return (
			<div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10">
				<p onClick={onClick} className="size-10 bg-victoria-700 flex items-center justify-center">
					<i className="fa-light fa-arrow-left text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const NextArrow = (props) => {
		const { onClick } = props;
		return (
			<div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10">
				<p onClick={onClick} className="size-10 bg-victoria-700  flex items-center justify-center">
					<i className="fa-light fa-arrow-right text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const prodslidesettings = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		centerMode: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		],
	};
	if (typeof window !== "undefined") {
		useEffect(() => {
			if (singleProduct.type == 'variable') { attribut_drop(); }
		}, [Object.keys(router.query).length > 1]);
	}
	return Object.keys(product).length ? (
		<div className="single-product container mx-auto my-10 p-0">
			<div key='top-banner' className='text-center my-5'>
				{top_banner?.length ?
					top_banner?.map(banner => {
						if (banner.status == 'on' && banner.banner_image != '') {
							const toDay = new Date();
							var start_date = new Date(banner.start_date);
							var end_date = new Date(banner.end_date);
							if (start_date <= toDay && toDay <= end_date) {
								return (<Image
									src={banner.banner_image}
									alt="Top banner"
									width={1320}
									height={300}
									className='mx-auto'
								/>)
							}

						}
					})
					: null}
			</div>
			<div key="product-top" className="grid md:grid-cols-2 gap-4 mb-10">
				<div key="product-images" className="product-images">
					<div className='relative grid grid-cols-1'>
						{(() => {
							if ((singleProduct.type == 'simple' || singleProduct.type == 'variable') && (product.price > 0)) {
								var offpride = Math.round(((product.regular_price - product.price) * 100) / product.regular_price);
								if (offpride > 0) {
									return (
										<div key="product_info3" className='offinfo absolute bg-victoria-800 text-white text-xs font-medium shadow-lg py-1 px-2 z-10 top-1.5 left-1.5'>
											{offpride}%Off
										</div>
									)
								}

							}
						})()}
						{product.images.length ? (

							<ProductGallery items={product?.images} />
						) : null}
						{getNewProductTag(singleProduct.date_created) == 1 ? <>New</> : null}
					</div>
				</div>
				<div key="product-info" className="product-info space-y-2 md:ms-10">
					<h4 key="product_title"
						dangerouslySetInnerHTML={{
							__html: product.name,
						}}
						className="text-xl text-wrap sm:text-3xl font-semibold capitalize"
					/>
					{singleProduct.average_rating > 1 ?
						<div key="average_rating">
							{singleProduct.average_rating}
							(<span className="count">{reviews.length}</span> customer reviews)
						</div>
						: null}

					<div key="product_info1"
						dangerouslySetInnerHTML={{
							__html: product?.price_html ? product?.price_html : '$' + product?.price,
						}}
						className="product-price bg-victoria-700 text-white text-xl font-semibold w-fit	p-3 pe-10 priceclip-path"
					/>
					{
						product?.type == 'grouped' ?
							<GroupProduct options={options} product={product} bundle_discount={options?.nj_bundle_discount}></GroupProduct> : null
					}
					{!isEmpty(attributes_new) ?
						<>
							<div className='border border-dashed border-victoria-700 relative p-2 space-y-2'>
								{
									!isEmpty(attributes_new) ?
										attributes_new.map(per_page_no => {
											if (per_page_no.variation) {
												//console.log('per_page_no', per_page_no);
												var default_att_val = '';
												Object.keys(router.query).map(function (key) {
													if (key == 'attribute_' + per_page_no?.slug) {
														default_att_val = router.query[key];
													}
												})
												return (
													<div key={per_page_no.id} className='flex gap-2 items-center'>
														<span className='min-w-28'> {per_page_no.name} : </span>
														<>
															<div className="relative w-full inline-block">
																<select id={'id_att_' + per_page_no.name}
																	className='attribut_drop cursor-pointer block appearance-none w-full bg-white border border-victoria-800 px-2 py-2 pr-6 shadow leading-tight focus:outline-none transition-all duration-300'
																	onChange={attribut_drop}
																	name={'nm_att_' + per_page_no.name}
																>
																	<option key={per_page_no.if} value=''>Choose an option</option>
																	{per_page_no.options.map(attribut_val => {
																		if (default_att_val != '' && default_att_val == attribut_val.slug) {
																			return (<option selected key={attribut_val.slug} value={attribut_val.slug}>{attribut_val.name}</option>)
																		} else {
																			return (<option key={attribut_val.slug} value={attribut_val.slug}>{attribut_val.name}</option>)
																		}
																	}
																	)}
																</select>
																<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
																	<i className="fa-solid fa-caret-down fa-lg"></i>
																</div>
															</div>
														</>
													</div>
												)
											}
										})
										: ''
								}
								{
									att_selected != '' ? <>
										<button onClick={clear_drop} className='absolute right-2 -top-6 bg-slate-200 text-red-600 px-2 text-sm hover:bg-red-600 hover:text-white'>Clear</button>
									</>
										: null
								}
							</div>
						</> : null}
					<div key="product_info2">
						{timer != 0 ? <div id="timer_count_down"></div> : null}
						{timer != 0 ? <div>Extra Discount{product.meta_data.product_discount}%Off</div> : null}
					</div>

					{(() => {
						// Member only
						if (membersonly != '') {
							return (
								<div key="membersonly"
									dangerouslySetInnerHTML={{
										__html: membersonly ?? '',
									}}
									className="membersonly"
								/>
							);
						}
					})()}
					{(() => {
						if (product.type == 'simple' || product.type == 'variation') {
							if (product.stock_quantity < 1) {
								return (
									<div>
										<p className='text-red-600 mb-3'>Get an alert when the product is in stock:</p>
										<div className='relative mb-3'>
											<input
												type="text"
												placeholder="Enter Email"
												className='outline-none block w-full py-2 px-3 pr-28 text-base text-gray-900 border border-gray-300  focus:border-victoria-400'
											/>
											<button className='bg-red-600 text-base text-white p-2 text-center cursor-pointer absolute top-0 right-0 h-[42px]'>Get an alert</button>
										</div>
									</div>
								)
							}
						}
					})()}
					<div key="product_info4" className='flex gap-3 items-center py-2 flex-wrap'>
						{(() => {
							if (product.meta_data.short_description_badge != '' && product.meta_data.short_description_badge != 0 && product.meta_data.short_description_badge != undefined) {
								return (
									<div key="product_info5"
										className={`single-badge border-b border-current font-medium text-green-600 w-max !bg-transparent ${product.meta_data.short_description_badge}`}>
										{product.meta_data.short_description_badge.replace('-', ' ')}
									</div>
								)
							}
						})()}
						{(() => {
							if (product.type == 'simple' || product.type == 'variation') {
								if (product.stock_quantity < 1) {
									return (
										<div className='text-red-500 text-base font-semibold border-b border-red-500 w-fit'>
											<i className="fa-solid fa-xmark fa-xl me-2"></i>
											Sold Out!
										</div>
									)
								} else if (product.stock_quantity <= 20) {
									return (
										<div className='text-red-500 text-base font-mediam border-b border-red-500 w-fit font-medium limited-stock'>
											Hurry Up, Limited Stock available!
										</div>
									)
								}
								{/* else if (product.stock_quantity > 20) {
									return (
										<div>In stock</div>
									)
								} */}
							}
						})()}
					</div>
					{(() => {
						if (product?.type == 'simple' || product?.type == 'variation' || product?.type == 'grouped') {
							return (
								<div className='flex gap-2 flex-wrap'>
									{(product?.type == 'simple' || product?.type == 'variation') && product?.stock_quantity > 0 ?
										<>
											<InputQty product={product} productCountQty={productCountQty} setProductCountQty={setProductCountQty} />
										</>
										: null
									}
									<div key="product_info6" className='flex gap-2 items-center'>
										{(product?.type == 'simple' || product?.type == 'variation') && product?.stock_quantity > 0 ?
											<>
												<AddToCart product={product} productCountQty={productCountQty} singleProduct={true} />
												<BuyNow product={product} productCountQty={productCountQty} />
											</>
											: null
										}
										<WishlistButton customerData={customerData} setCustomerData={setCustomerData} product={product} tokenValid={tokenValid} listing={false} />
									</div>
								</div>
							);
						}
					})()}


					{(() => {
						if (product?.type == 'simple' || product?.type == 'variation' || product?.type == 'grouped') {
							return (<>
								<div key="reward-wrapper" className='border-2 border-victoria-800'>
									<div key="reward-inner" className='flex items-center p-1'>
										{membership_level == 'Bronze' || membership_level == null || membership_level == '' ? <Image src={bronze} alt="Bronze Trophy" width={100} height='auto' className='mx-2' /> : null}
										{membership_level == 'Silver' ? <Image src={silver} alt="Silver Trophy" width={100} height='auto' className='mx-2' /> : null}
										{membership_level == 'Gold' ? <Image src={gold} alt="Gold Trophy" width={100} height='auto' className='mx-2' /> : null}
										{membership_level == 'Platinum' ? <Image src={platinum} alt="Platinum Trophy" width={100} height='auto' className='mx-2' /> : null}
										<div key="co-tips">
											<p>Buy &amp; Get {membership_benefits[mem_level][0]}% Cashback <b>{cashbackpoints}</b> Reward points Worth <b>${cashback.toFixed(2)}</b> </p>
											<Link href="/my-account/splashpass" className='text-victoria-700 underline underline-offset-4'>Manage</Link> Your Rewards. <Link href="/splash-pass" className='text-victoria-700 underline underline-offset-4'> Know More</Link>
										</div>
									</div>
									<div className='bg-black p-1'>
										<Image
											src={splashlogo}
											alt="Splash Logo"
											width={200}
											height='auto'
											className='mx-auto'
										/>
									</div>
								</div>
							</>);
						}
					})()}
					{(() => {
						if (product?.type == 'simple' || product?.type == 'variation') {
							return (<>
								<div key="product_info7" className='border border-gray-300 p-1 flex flex-wrap items-center gap-3 relative'>
									<input
										id="shippingCalculation_input"
										type="number"
										onKeyUp={shippingCalculation}
										data-inputsku={product?.sku ?? ''}
										data-inputproduct_code={product.meta_data.product_code}
										size="4"
										name="product_code"
										placeholder="Enter Postcode"
										className='w-36 outline-none py-1 px-2 text-sm border border-gray-300  focus:border-victoria-400'
										disabled={inputshipdisabled}
									/>
									{inputshipdisabled ?
										<>
											<div className='absolute inset-x-0 mx-auto'>
												<Loaderspin></Loaderspin>
											</div>
										</> :
										<span
											dangerouslySetInnerHTML={{
												__html: shippingCharge ?? '',
											}}
											className="product-price"
										/>}
								</div>
							</>);
						}
					})()}
					{(() => {
						if (coupon_box != '') {
							return (
								<div key='coupon_box'>Save {coupon_box?.multiple_sku_list_coupon_value} Use Code {coupon_box?.multiple_sku_list_coupon_name}</div>
							);
						}
					})()}
					<div key="estimated-time">
						<p>Estimated Dispatch*: Leaves warehouse in 1-2 business days</p>
						{product.meta_data.product_code == 'VX' ? <>
							<p><span>FREE delivery*: </span>
								<b>In Sydney Metro, Melbourne Metro and Brisbane Metro</b></p>
						</> : null}
					</div>
					<div key="product_info8">
						{
							'external' === product?.type ?
								<ExternalLink
									url={product?.external_url ?? ''}
									text={product?.button_text ?? ''}
								/> : null
						}
					</div>
					<div
						onClick={openEnquiry}
						className='border border-victoria-700 bg-victoria-800 inline-block p-2 px-3 text-white text-lg cursor-pointer hover:text-victoria-800 hover:bg-transparent'>
						Product Enquiry
					</div>
					{isEnquiryOpen && (
						<section className='enquiry-popup fixed z-20 top-0 left-0 flex h-full w-full min-h-screen items-center justify-center'>
							<div onClick={closeEnquiry} className="fixed z-20 top-0 left-0 flex h-full min-h-screen w-full bg-black bg-opacity-90 close-cursor"></div>
							<div className="z-30 w-full mx-3 sm:max-w-[570px] bg-white p-5 relative ">
								<span onClick={closeEnquiry} className="flex items-center justify-center absolute -top-3 -right-2 size-8 bg-red-600 text-xl cursor-pointer"
								>
									<i class="fa-light fa-xmark text-2xl text-white"></i>
								</span>
								<h4 key="product_title"
									dangerouslySetInnerHTML={{
										__html: product.name,
									}}
									className="text-lg text-wrap font-semibold capitalize"
								/>
								<Enquiry product={product}></Enquiry>
							</div>
						</section>
					)}
					<ReviewPopup product={product} tokenValid={tokenValid} customerData={customerData}></ReviewPopup>
				</div>
			</div>
			
			<div key="product-top" className="grid grid-cols-1 gap-8">
				{(() => {
					if (!isEmpty(paymentOptions)) {
						if (paymentOptions.length > 0) {
							return (
								<div className=' overflow-hidden'>
									<ul key="paymentOptions_list" className='grid grid-rows-1 grid-flow-col gap-4 payment-logo'>
										{
											paymentOptions.map(paymentOption => {
												if (paymentOption.payment_class != 'payment-hide') {
													if (paymentOption.payment_url != '') {
														return (
															<li className='border border-gray-300 p-1 text-center m-1 flex items-center justify-center'>
																<Link className='inline-block' href={replace_wordpress_url(paymentOption.payment_url)}>
																	<img src={paymentOption.payment_logos} alt={`${paymentOption.payment_title} logo`}
																		width="100"
																		height="40" />
																</Link>
															</li>
														)
													} else {
														return (
															<li className='border border-gray-300 p-1 text-center m-1 flex items-center justify-center'>
																<img className='inline-block' src={paymentOption.payment_logos} alt={`${paymentOption.payment_title} logo`}
																	width="100"
																	height="40" />
															</li>
														)
													}
												}
											})
										}
									</ul>
								</div>
							);
						}
					}
				})()}
				<div className="space-y-4">
					<details className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden" open>
						<summary className="py-3 px-4 flex cursor-pointer items-center justify-between gap-1.5">
							<h2 className="font-medium">Description</h2>
							<span className="relative size-5 shrink-0">
								<svg
									className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</summary>
						<div
							key="product_info9"
							dangerouslySetInnerHTML={{
								__html: product.description,
							}}
							className="py-3 px-4 border-t border-gray-200 leading-relaxed product-description"
						/>
						<div className="space-y-4 p-4">
							{/*Accordion 1 */}
							{product.meta_data.product_features ?
								<div className="border border-gray-300 shadow-[0_0_6px_1px_#ddd]">
									<button
										className="focus:outline-none  py-3 px-4 flex justify-between items-center w-full"
										onClick={() => toggleAccordion(0)}
									>
										<h3 className="font-medium">Features</h3>
										<svg
											class={`size-5 shrink-0 transition duration-300 ${accordionOpen[0] ? '-rotate-180' : ''}`}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									<div className={`py-3 px-4 border-t border-gray-200 ${accordionOpen[0] ? '' : 'hidden'}`} dangerouslySetInnerHTML={{ __html: product.meta_data.product_features }} />
								</div>
								: null
							}
							{/*Accordion 2 */}
							{product.meta_data.dimensions_and_specification ?
								<div className="border border-gray-300 shadow-[0_0_6px_1px_#ddd]">
									<button
										className="focus:outline-none py-3 px-4  flex justify-between items-center w-full"
										onClick={() => toggleAccordion(1)}
									>
										<h3 className="font-medium">Specifications</h3>
										<svg
											class={`size-5 shrink-0 transition duration-300 ${accordionOpen[1] ? '-rotate-180' : ''}`}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									<div className={`py-3 px-4 border-t border-gray-200 ${accordionOpen[1] ? '' : 'hidden'}`} dangerouslySetInnerHTML={{ __html: product.meta_data.dimensions_and_specification }} />
								</div>
								: null
							}
							{/*Accordion 3 */}
							{product.meta_data.whats_included ?
								<div className="border border-gray-300 shadow-[0_0_6px_1px_#ddd]">
									<button
										className="focus:outline-none py-3 px-4 flex justify-between items-center w-full"
										onClick={() => toggleAccordion(2)}
									>
										<h3 className="font-medium">What's Included</h3>
										<svg
											class={`size-5 shrink-0 transition duration-300 ${accordionOpen[2] ? '-rotate-180' : ''}`}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									<div className={`py-3 px-4 border-t border-gray-200 ${accordionOpen[2] ? '' : 'hidden'}`} dangerouslySetInnerHTML={{ __html: product.meta_data.whats_included }} />
								</div>
								: null
							}
						</div>
					</details>
					{(() => {
						if (product.weight != '' && product.dimensions.length != '') {
							return (
								<details key='additional-information' className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
									<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
										<h2 className="font-medium">Additional information</h2>
										<span className="relative size-5 shrink-0">
											<svg
												className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
											</svg>
										</span>
									</summary>
									<div className="py-3 px-4 border-t border-gray-200 leading-relaxed">
										{product.weight ? <><b>Weight</b> : {product.weight}</> : null}
										{product.dimensions.length ?
											<><b>Dimensions</b>
												{product.dimensions.length} X {product.dimensions.width} X {product.dimensions.height}
											</>
											: null}
									</div>
								</details>
							);
						}
					})()}
					{reviews.length ?
						<details key="reviews_list" className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
							<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
								<h2 className="font-medium">Review ({reviews.length})</h2>
								<span className="relative size-5 shrink-0">
									<svg
										className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
									</svg>
								</span>
							</summary>
							<div className="py-3 px-4 border-t border-gray-200 leading-relaxed">
								<h3
									key="product_title"
									className="text-2xl mb-4"
									dangerouslySetInnerHTML={{
										__html: product.name,
									}}
								/>
								<span>{product.average_rating} Based on {reviews.length} reviews</span>
								{
									reviews.map(review => {
										return (
											<Review key={review.id} review={review} />
										)
									})
								}

							</div>
						</details>
						: null
					}
					<details className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
							<h2 className="font-medium">Splash Pass Rewards</h2>
							<span className="relative size-5 shrink-0">
								<svg
									className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</summary>
						<div className="py-3 px-4 border-t border-gray-200 leading-relaxed">
							<Reward_points_tab />
						</div>
					</details>
					<details className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
							<h2 className="font-medium">Warranty & Return Policy</h2>
							<span className="relative size-5 shrink-0">
								<svg
									className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</summary>
						<div className="py-3 px-4 border-t border-gray-200 leading-relaxed">
							<Warranty_tab />
						</div>
					</details>
					<details className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
							<h2 className="font-medium">Shipping Guide</h2>
							<span className="relative size-5 shrink-0">
								<svg
									className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</summary>

						<div className="py-3 px-4 border-t border-gray-200 leading-relaxed">
							<Shipping_guide_tab />
						</div>
					</details>
				</div>

				<div key="brand-productcode" className='mb-5'>
					{product.meta_data.product_code ? <div key="product_code" className='text-white'><b>Product Code :</b>{product.meta_data.product_code}-{product.sku}</div> : null}
					{product.meta_data.custom_sku_code ? <div key="custom_sku_code"><b>SKU :</b>{product.meta_data.custom_sku_code}</div> : null}
					{product?.tags?.length ? <div key="tags"><b>Tags :</b>
						{
							product.tags.map(tag => {
								var tag_slug = tag?.slug;
								if (!WEB_DEVICE) {
									tag_slug = '?sname=' + tag_slug;
								}
								return (
									<Link href={'/product-tag/' + tag_slug}>{tag.name}</Link>
								)
							})
						}
					</div> : null}
					{product.meta_data.bulky_iteam ? <div key="bulky_iteam"><b>Bulky Item :</b>{product.meta_data.bulky_iteam}</div> : null}
				</div>

				{
					(() => {
						if (undefined != singleProduct.related_ids) {
							return (
								<div key="Related-Products" className='mb-5 grid grid-cols-1'>
									<h3 className='relative pb-2 text-center font-jost text-4xl font-semibold mb-5 top-title before:content-[""] before:w-7 before:h-1 before:absolute before:bottom-0 before:inset-x-0 before:mx-auto before:bg-victoria-800  after:content-[""] after:w-40 after:h-px after:absolute after:bottom-px after:inset-x-0 after:mx-auto  after:bg-victoria-800'>Related Products</h3>
									{singleProduct.related_ids.length ?
										<Slider {...prodslidesettings}>
											{
												singleProduct.related_ids.map(productRel => {
													var Membersonly = '';
													if (tokenValid == 1 && options?.discount_type_3 == 1) {
														var messageText = options?.nj_display_box_member_only ?? '';
														Membersonly = getMemberOnlyProduct(options, productRel, messageText);
													}
													return (
														<div className='p-2'>
															<Product key={productRel?.id} product={productRel} Membersonly={Membersonly} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
														</div>
													)
												})
											}
										</Slider>
										: null
									}
								</div>
							)
						}
					})()
				}
				{
					(() => {
						if (yourBrowsingHistory != '' && Object.keys(yourBrowsingHistory).length > 1) {
							var tmphistrydisData = yourBrowsingHistory;
							var ybhpID = Object.keys(tmphistrydisData).pop();
							return (
								<div key="yourBrowsingHistory-Products" className='mb-5 grid grid-cols-1 mt-14'>
									<h3 className='relative pb-2 text-center font-jost text-4xl font-semibold mb-5 top-title before:content-[""] before:w-7 before:h-1 before:absolute before:bottom-0 before:inset-x-0 before:mx-auto before:bg-victoria-800  after:content-[""] after:w-40 after:h-px after:absolute after:bottom-px after:inset-x-0 after:mx-auto  after:bg-victoria-800'>Your Browsing History</h3>
									{Object.keys(tmphistrydisData).length ?

										<Slider {...prodslidesettings}>
											{
												Object.keys(tmphistrydisData).map(key => {
													if (ybhpID != key) {
														var Membersonly = '';
														if (tokenValid == 1 && options?.discount_type_3 == 1) {
															var messageText = options?.nj_display_box_member_only ?? '';
															Membersonly = getMemberOnlyProduct(options, yourBrowsingHistory[key], messageText);
														}
														return (
															<div className='p-2'>
																<Product key={yourBrowsingHistory[key]?.id} product={yourBrowsingHistory[key]} Membersonly={Membersonly} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
															</div>
														)
													}
												})
											}
										</Slider>
										:
										null
									}
								</div>)
						}
					})()
				}
			</div>
			<div key='footer-banner' className='text-center my-5'>
				{footer_banner?.length ?
					footer_banner?.map(banner => {
						if (banner.footer_status == 'on' && banner.footer_banner_image != '') {
							const toDay = new Date();
							var start_date = new Date(banner.footer_start_date);
							var end_date = new Date(banner.footer_end_date);
							if (start_date <= toDay && toDay <= end_date) {
								return (<Image
									src={banner.footer_banner_image}
									alt="Footer banner"
									width={1320}
									height={300}
									className='mx-auto'
								/>)
							}

						}
					})
					: null}

			</div>
		</div >
	) : null;
};
export default SingleProduct;