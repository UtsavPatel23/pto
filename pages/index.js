/**
 * Internal Dependencies.
 */
import Products from '../src/components/products';
import { HEADER_FOOTER_ENDPOINT, WEB_DEVICE } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { getPage } from '../src/utils/blog';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Product from '../src/components/products/product';

import img1 from '../public/assets/img/home/sofas-sofa-bed.webp';

import img2 from '../public/assets/img/home/1.webp';
import img3 from '../public/assets/img/home/2.webp';
import img4 from '../public/assets/img/home/3.webp';
import img5 from '../public/assets/img/home/4.webp';
import img6 from '../public/assets/img/home/5.webp';
import img7 from '../public/assets/img/home/6.webp';

import img8 from '../public/assets/img/home/delivery-truck.png';
import img9 from '../public/assets/img/home/return.png';
import img10 from '../public/assets/img/home/rewards.png';
import img11 from '../public/assets/img/home/bnpl.png';
import img12 from '../public/assets/img/home/7.webp';
import img13 from '../public/assets/img/home/8.webp';

import img14 from '../public/assets/img/home/9.webp';
import img15 from '../public/assets/img/home/10.webp';
import img16 from '../public/assets/img/home/11.webp';
import img17 from '../public/assets/img/home/12.webp';
import img18 from '../public/assets/img/home/13.webp';
import img19 from '../public/assets/img/home/14.webp';
import img20 from '../public/assets/img/home/15.webp';
import img21 from '../public/assets/img/home/16.webp';
import img22 from '../public/assets/img/home/17.webp';
import img23 from '../public/assets/img/home/18.webp';
import img24 from '../public/assets/img/home/19.webp';
import img25 from '../public/assets/img/home/20.webp';

import img26 from '../public/assets/img/home/21.webp';
import img27 from '../public/assets/img/home/22.webp';
import img28 from '../public/assets/img/home/23.webp';
import img29 from '../public/assets/img/home/24.webp';
import { randomIntFromInterval, replace_wordpress_url } from '../src/utils/customjs/custome';

export default function Home({ headerFooter, pageData }) {
	console.log('pageData',pageData);
	const { slider_options } = pageData?.acf;
	const options = headerFooter?.footer?.options ?? '';
	const [sliderList, setSliderList] = useState(null);
	const [tokenValid, setTokenValid] = useState(0);
	const [customerData, setCustomerData] = useState(0);
	const [limitContent, setLimitContent] = useState(true);
	const [cat_slug, setCat_slug] = useState('/c');
	const seo = {
		title: 'Next JS WooCommerce REST API',
		description: 'Next JS WooCommerce Theme',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}

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
				<p onClick={onClick} className="size-10 bg-victoria-700 flex items-center justify-center">
					<i className="fa-light fa-arrow-right text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const heroslider = {
		arrow: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	useEffect(() => {
		var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		var d = new Date();
		var dayName = days[d.getDay()];
		if (slider_options.length > 0) {
			var slide_tmp = [];
			var i = 0;
			slider_options.map(function (slide) {
				const toDay = new Date();
				var slider_start_date = slide.slider_start_date;
				var slider_end_date = slide.slider_end_date;
				slider_start_date = new Date(slider_start_date);
				slider_end_date = new Date(slider_end_date);
				var dayValid = slide.day_select.find((element) => element == dayName);
				if (slide.slider_status == 'on' && slider_start_date <= toDay && toDay <= slider_end_date && (dayValid)) {
					slide_tmp[i] = slide;
					i++;
				}

			})
			if (!isEmpty(slide_tmp)) {
				setSliderList(slide_tmp);
			}
		}
	}, []);

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
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setTokenValid(1);
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				setCustomerData(customerDataTMP);
			}
		}
		if (!WEB_DEVICE) {
			setCat_slug('/cat?sname=');
		}
	}, []);
	console.log('pageData', pageData);
	return (
		<Layout headerFooter={headerFooter || {}} seo={ pageData?.yoast_head_json ?? {} } uri={''}>
			{sliderList ? <>
				<Slider {...heroslider}>
					{sliderList.map(function (slide) {
						return (
							<>
								<Image
									src={slide.slider_images_option[0]?.image_url}
									alt={slide.slider_images_option[0]?.slider_title}
									width={1920}
									height={650}
									className='mx-auto'
								/>
							</>
						);
					})}
				</Slider>
			</> : null}
			{(() => {
				/*return (slider_options.length ? <>
					<section className='top-banner w-full overflow-hidden'>
						<Slider {...heroslider}></Slider>
					</section>
				</> : null)*/
			})()}

			<section className='my-11 hidden'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">
						Title Title Title TitleTitle Title</h2>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self' >
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_self'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Elevate Your Game With Discounted Pool Tables!</h2>
					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
						<Link href='' target='_self'>
								<Image
									src={img2}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href='' target='_self'>
								<Image
									src={img3}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href='' target='_self'>
								<Image
									src={img4}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href='' target='_self'>
								<Image
									src={img5}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href='' target='_self'>
								<Image
									src={img6}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href='' target='_self'>
								<Image
									src={img7}
									alt="Category Image"
									width={440}
									height={330}
								/>
							</Link>
						</div>
					</div>
					<div className='text-center'>
						<Link href='/c' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
							View All
						</Link>
					</div>
				</div>
			</section>

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='border border-victoria-700 p-2 rounded flex gap-3 items-center group'>
							<Image
								src={img8}
								alt="Free Shipping"
								width={60}
								height={60}
								className='group-hover:rotate-360 transition-all duration-500 ease'
							/>
							<div>
								<h3 className="font-semibold">Free Shipping</h3>
								<p>For selected Products</p>
							</div>
						</div>
						<div className='border border-victoria-700 p-2 rounded'>
							<Link href='/warranty-return' className=' flex gap-3 items-center group'>
								<Image
									src={img9}
									alt="14 Days Return"
									width={60}
									height={60}
									className='group-hover:rotate-360 transition-all duration-500 ease'
								/>
								<div>
									<h3 className="font-semibold">14 Days Return</h3>
									<p>Please check our return policy</p>
								</div>
							</Link>
						</div>
						<div className='border border-victoria-700 p-2 rounded'>
							<Link href='/rewards-program' className=' flex gap-3 items-center group'>
								<Image
									src={img10}
									alt="Rewards Program"
									width={60}
									height={60}
									className='group-hover:rotate-360 transition-all duration-500 ease'
								/>
								<div>
									<h3 className="font-semibold">Rewards Program</h3>
									<p>Sign up to get Instant rewards</p>
								</div>
							</Link>
						</div>
						<div className='border border-victoria-700 p-2 rounded flex gap-3 items-center group'>
							<Image
								src={img11}
								alt="Multiple BNPL option"
								width={60}
								height={60}
								className='group-hover:rotate-360 transition-all duration-500 ease'
							/>
							<div>
								<h3 className="font-semibold">Multiple BNPL option</h3>
								<p>BNPL Payment Methods</p>
							</div>
						</div>
					</div>
				</div>
			</section>


			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Choose Your Preferred Style From Our Huge Varieties Of Bikes </h2>
					<div className='grid sm:grid-cols-2 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/dirt-bike/'}  target='_self'>
								<Image
									src={img12}
									alt="Category Image"
									width={660}
									height={450}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/quad-bike/'} target='_self'>
								<Image
									src={img13}
									alt="Category Image"
									width={660}
									height={450}
								/>
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-3 sm:gap-4 mt-10'>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/50cc/'} target='_self'>
								<Image
									src={img14}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/70cc-dirt-bike/'} target='_self'>
								<Image
									src={img15}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/90cc/'} target='_self'>
								<Image
									src={img16}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/dune-buggy/'} target='_self'>
								<Image
									src={img17}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/farm-quad-bikes/'} target='_self'>
								<Image
									src={img18}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/junior/'} target='_self'>
								<Image
									src={img19}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/125cc-dirt-bike/'} target='_self'>
								<Image
									src={img20}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/150cc-dirt-bike/'} target='_self'>
								<Image
									src={img21}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/dirt-bike/250cc-dirt-bike/'} target='_self'>
								<Image
									src={img22}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/mini/'} target='_self'>
								<Image
									src={img23}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/sports/'} target='_self'>
								<Image
									src={img24}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
						<div className='relative img-boxani'>
							<Link href={cat_slug + '/quad-bike/'} target='_self'>
								<Image
									src={img25}
									alt="Category Image"
									width={220}
									height={220}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Choose Your Discover More Categories</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/table-tennis/'} target='_self'>
								<Image
									src={img26}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/soccer-table/'} target='_self'>
								<Image
									src={img27}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/multi-game-table/'} target='_self'>
								<Image
									src={img28}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
						<div className='relative shadow-full img-boxani'>
							<Link href={cat_slug + '/poker-table/'} target='_self'>
								<Image
									src={img29}
									alt="Category Image"
									width={330}
									height={400}
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			{
				(() => {
					if (undefined != pageData.new_arrivals) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">New Arrivals Slider</h2>
									{pageData.new_arrivals.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.new_arrivals.map(productRel => {
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
									<div className='text-center'>
									<Link href='/shop?orderby=date_created' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
									
								</div>
							</section>
						)
					}
				})()
			}

			{
				(() => {
					if (undefined != pageData.free_shipping) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Free Shipping Slider</h2>
									{pageData.free_shipping.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.free_shipping.map(productRel => {
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
									<div className='text-center'>
									<Link href='/shop?shipping-multiple-=Free-Shipping' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
			}
			{
				(() => {
					if (undefined != pageData.shop_review) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Shop Reviews</h2>
									{pageData.shop_review.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.shop_review.map((review,i) => {
													var p_slug = '/p/' + replace_wordpress_url(review?.product_permalink);
													if (!WEB_DEVICE) {
														p_slug = '/product/?sname=' + replace_wordpress_url(review?.product_permalink);
													}
													return ( 
														<div className='p-2 '>
																<div className='h-full shadow-full relative rev-wapper'>
																			<div className="rating-info p-2">
																				<p className="feedback-star mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</p>
																				<p className="veri-info mb-0"> <i className="fa fa-check me-1"></i> Verified </p>
																			</div>
																			<div key={review}																			dangerouslySetInnerHTML={{
																				__html: review?.review ?? '',
																			}} className="line-clamp-2 feedback-content p-2"																				
																			/>
																			<p className="feedname mb-0 p-2"><b>
																					{review?.reviewer}
																			</b> <span>
																					{(i*2)+3} days ago
																				</span></p>
																</div>
															</div>
																	
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<div className="review-count d-block d-md-flex text-center">

										<div className="d-flex align-items-center justify-content-center">
											
											<b className='me-2 align-super'>Rated</b>

											<span className="feedback-star-total mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</span>
											<b  className='align-super'>	{pageData?.shop_reviewid_count} Number of product review by customer</b>
										</div>
										</div>
									<Link href='/all-reviews/' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
				
			}
			{
				(() => {
					if (undefined != pageData.products_review) {
						return (
							<section className='my-11'>
								<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
									<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Product Reviews</h2>
									{pageData.products_review.length ?
										<Slider {...prodslidesettings}>
											{
												pageData.products_review.map((review,i) => {
													var p_slug = '/p/' + replace_wordpress_url(review?.product_permalink);
													if (!WEB_DEVICE) {
														p_slug = '/product/?sname=' + replace_wordpress_url(review?.product_permalink);
													}
													return ( 
														<div className='p-2'>
																<div className='h-full shadow-full relative '>
																			<div className="rating-info p-2">
																				<p className="feedback-star mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</p>
																				<p className="veri-info mb-0"> <i className="fa fa-check me-1"></i> Verified </p>
																			</div>
																			<p className="title-link mb-0 p-2">
																				<Link href={`${p_slug}`} legacyBehavior>
																				<a key="review_title"
																					dangerouslySetInnerHTML={{
																						__html: review.product_name,
																					}}
																					className="line-clamp-1 font-medium group-hover:text-victoria-800"
																				/>
																				</Link>
																			</p>
																			<div key={review}																			dangerouslySetInnerHTML={{
																				__html: review?.review ?? '',
																			}} className="line-clamp-2 feedback-content p-2"																				
																			/>
																			<p className="feedname mb-0 p-2"><b>
																					{review?.reviewer}
																			</b> <span>
																			{(i*2)+3} days ago
																				</span></p>
																</div>
															</div>
																	
													)
												})
											}
										</Slider>
										: null
									}
									<div className='text-center'>
									<div className="review-count d-block d-md-flex text-center">

										<div className="d-flex align-items-center justify-content-center">
											
											<b className='me-2 align-super'>Rated</b>

											<span className="feedback-star-total mb-0 me-2">
																					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
																				</span>
											<b  className='align-super'>	{pageData?.products_review_count} Number of product review by customer</b>
										</div>
										</div>
									<Link href='/all-reviews/' className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
										View All
									</Link>
									</div>
								</div>
							</section>
						)
					}
				})()
				
			}
			<section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] hidden">
				<div className="container mx-auto">
					<div className="-mx-4 flex flex-wrap items-center justify-between">
						<div className="w-full px-4 lg:w-6/12">
							<div className="-mx-3 flex items-center sm:-mx-4">
								<div className="w-full px-3 sm:px-4 xl:w-1/2">
									<div className="py-3 sm:py-4">
										<Image
											src={img26}
											alt="Category Image"
											width={330}
											height={400}
											className="w-full rounded"
										/>
									</div>
									<div className="py-3 sm:py-4">
										<Image
											src={img26}
											alt="Category Image"
											width={330}
											height={400}
											className="w-full rounded"
										/>
									</div>
								</div>
								<div className="w-full px-3 sm:px-4 xl:w-1/2">
									<div className="relative z-10 my-4">
										<Image
											src={img26}
											alt="Category Image"
											width={330}
											height={400}
											className="w-full rounded"
										/>
										<span className="absolute -right-7 -bottom-7 z-[-1]">
											<svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)" fill="#3056D3" />
												<circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)" fill="#3056D3" />
												<circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="#3056D3" />
												<circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)" fill="#3056D3" />
												<circle cx="60.3334" cy="104" r="1.66667" transform="rotate(-90 60.3334 104)" fill="#3056D3" />
												<circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)" fill="#3056D3" />
												<circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)" fill="#3056D3" />
												<circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)" fill="#3056D3" />
												<circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="#3056D3" />
												<circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="#3056D3" />
												<circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)" fill="#3056D3" />
												<circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)" fill="#3056D3" />
												<circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)" fill="#3056D3" />
												<circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)" fill="#3056D3" />
												<circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)" fill="#3056D3" />
												<circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)" fill="#3056D3" />
												<circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)" fill="#3056D3" />
												<circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)" fill="#3056D3" />
												<circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)" fill="#3056D3" />
												<circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)" fill="#3056D3" />
												<circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)" fill="#3056D3" />
												<circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)" fill="#3056D3" />
												<circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)" fill="#3056D3" />
												<circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)" fill="#3056D3" />
												<circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)" fill="#3056D3" />
												<circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)" fill="#3056D3" />
												<circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)" fill="#3056D3" />
												<circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)" fill="#3056D3" />
												<circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)" fill="#3056D3" />
												<circle cx="60.3333" cy="30.9998" r="1.66667" transform="rotate(-90 60.3333 30.9998)" fill="#3056D3" />
												<circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)" fill="#3056D3" />
												<circle cx="88.6667" cy="30.9998" r="1.66667" transform="rotate(-90 88.6667 30.9998)" fill="#3056D3" />
												<circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)" fill="#3056D3" />
												<circle cx="117.667" cy="30.9998" r="1.66667" transform="rotate(-90 117.667 30.9998)" fill="#3056D3" />
												<circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)" fill="#3056D3" />
												<circle cx="74.6667" cy="30.9998" r="1.66667" transform="rotate(-90 74.6667 30.9998)" fill="#3056D3" />
												<circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)" fill="#3056D3" />
												<circle cx="103" cy="30.9998" r="1.66667" transform="rotate(-90 103 30.9998)" fill="#3056D3" />
												<circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)" fill="#3056D3" />
												<circle cx="132" cy="30.9998" r="1.66667" transform="rotate(-90 132 30.9998)" fill="#3056D3" />
												<circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)" fill="#3056D3" />
												<circle cx="1.66667" cy="16.3333" r="1.66667" transform="rotate(-90 1.66667 16.3333)" fill="#3056D3" />
												<circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)" fill="#3056D3" />
												<circle cx="16.3333" cy="16.3333" r="1.66667" transform="rotate(-90 16.3333 16.3333)" fill="#3056D3" />
												<circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)" fill="#3056D3" />
												<circle cx="31" cy="16.3333" r="1.66667" transform="rotate(-90 31 16.3333)" fill="#3056D3" />
												<circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)" fill="#3056D3" />
												<circle cx="45.6667" cy="16.3333" r="1.66667" transform="rotate(-90 45.6667 16.3333)" fill="#3056D3" />
												<circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)" fill="#3056D3" />
												<circle cx="60.3333" cy="16.3333" r="1.66667" transform="rotate(-90 60.3333 16.3333)" fill="#3056D3" />
												<circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)" fill="#3056D3" />
												<circle cx="88.6667" cy="16.3333" r="1.66667" transform="rotate(-90 88.6667 16.3333)" fill="#3056D3" />
												<circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)" fill="#3056D3" />
												<circle cx="117.667" cy="16.3333" r="1.66667" transform="rotate(-90 117.667 16.3333)" fill="#3056D3" />
												<circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)" fill="#3056D3" />
												<circle cx="74.6667" cy="16.3333" r="1.66667" transform="rotate(-90 74.6667 16.3333)" fill="#3056D3" />
												<circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)" fill="#3056D3" />
												<circle cx="103" cy="16.3333" r="1.66667" transform="rotate(-90 103 16.3333)" fill="#3056D3" />
												<circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)" fill="#3056D3" />
												<circle cx="132" cy="16.3333" r="1.66667" transform="rotate(-90 132 16.3333)" fill="#3056D3" />
												<circle cx="1.66667" cy="45.3333" r="1.66667" transform="rotate(-90 1.66667 45.3333)" fill="#3056D3" />
												<circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)" fill="#3056D3" />
												<circle cx="16.3333" cy="45.3333" r="1.66667" transform="rotate(-90 16.3333 45.3333)" fill="#3056D3" />
												<circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)" fill="#3056D3" />
												<circle cx="31" cy="45.3333" r="1.66667" transform="rotate(-90 31 45.3333)" fill="#3056D3" />
												<circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)" fill="#3056D3" />
												<circle cx="45.6667" cy="45.3333" r="1.66667" transform="rotate(-90 45.6667 45.3333)" fill="#3056D3" />
												<circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)" fill="#3056D3" />
												<circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)" fill="#3056D3" />
												<circle cx="60.3333" cy="1.66683" r="1.66667" transform="rotate(-90 60.3333 1.66683)" fill="#3056D3" />
												<circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)" fill="#3056D3" />
												<circle cx="88.6667" cy="1.66683" r="1.66667" transform="rotate(-90 88.6667 1.66683)" fill="#3056D3" />
												<circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)" fill="#3056D3" />
												<circle cx="117.667" cy="1.66683" r="1.66667" transform="rotate(-90 117.667 1.66683)" fill="#3056D3" />
												<circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)" fill="#3056D3" />
												<circle cx="74.6667" cy="1.66683" r="1.66667" transform="rotate(-90 74.6667 1.66683)" fill="#3056D3" />
												<circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)" fill="#3056D3" />
												<circle cx="103" cy="1.66683" r="1.66667" transform="rotate(-90 103 1.66683)" fill="#3056D3" />
												<circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)" fill="#3056D3" />
												<circle cx="132" cy="1.66683" r="1.66667" transform="rotate(-90 132 1.66683)" fill="#3056D3" />
											</svg>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full px-4 lg:w-1/2 xl:w-5/12">
							<div className="mt-10 lg:mt-0">
								<h2 className="mb-8 text-3xl font-bold text-dark sm:text-4xl">
									Make your customers happy by giving services.
								</h2>
								<p className="mb-8 text-base text-body-color">
									It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using Lorem Ipsum is that it has a more-or-less.
								</p>
								<p className="mb-12 text-base text-body-color">
									A domain name is one of the first steps to establishing your
									brand. Secure a consistent brand image with a domain name that
									matches your business.
								</p>
								<Link href="javascript:void(0)" className='mt-5 inline-block w-44 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
									View All
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='my-5 hidden'>
				<div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
					<div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
						<div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
							<h2 className="text-3xl font-bold sm:text-4xl">Find your career path</h2>

							<p className="mt-4 text-gray-600">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero aliquid sint distinctio
								iure ipsum cupiditate? Quis, odit assumenda? Deleniti quasi inventore, libero reiciendis
								minima aliquid tempora. Obcaecati, autem.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>

							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>

							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>

							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>

							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>

							<a
								className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
								href="#"
							>
								<span className="inline-block rounded-lg bg-gray-50 p-3">
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 14l9-5-9-5-9 5 9 5z"></path>
										<path
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										></path>
									</svg>
								</span>

								<h2 className="mt-2 font-bold">Accountant</h2>

								<p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
									Lorem ipsum dolor sit amet consectetur.
								</p>
							</a>
						</div>
					</div>
				</div>
			</section>
			<section className='my-11'>
				<div className='md:max-w-[760px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-3'>
					<h2 className="relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border">Versatile Pool Table For Sale with Exciting Deals </h2>
						<div className='border border-slate-300 p-2'>
							<p className="mb-8 text-base text-body-color">
								Pool Table Offers is a leading pool table supplier with an extensive range of pool table for sale to ship Australia-wide. Our pool tables are designed as to sturdier and durable with the 1-inch thickness of playing surface board and 150kg overall weight of the table. What sets us apart from other departmental stores as well as online stores is our premium quality tables and unique Buy Now, Pay Later payment service. Our pool table for sale range gives you numerous choices over features, size and price from which you can pull out the perfect piece on your preferences. Not only do we sell pool tables but make sure, when you are here at Pool Table Offers, you’ll have deals on soccer table, poker table, ping pong table and other best-selling items.
						</p>
						<p className="mb-8 text-base text-body-color">
							So, don’t wait to shoot the pool with your buddies. Order your table now, and we’ll deliver it to your doorsteps in a while, whether you’re located in Sydney, Melbourne, Brisbane, Adelaide or anywhere across Australia.
						</p>
						<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Buy Pool Table Now & Pay Later</h2>
						<p className="mb-8 text-base text-body-color"> The pool is one of the royal sports games, and it isn’t very affordable. Yet, we’ve exciting pool table offers for you, and our way to Buy-Now-Pay-Later is sure to impress your savings. No matter, if you’re low on budget or running dizzy on bank balance, our payment options will serve to break your pay-off into easy and interest-free instalments. So, don’t you worry, buy a pool table now, enjoy the real sporting experience and pay later with any of our best payment options such as Afterpay, Humm, Zippay and LayBuy.{ limitContent ? <span>...</span> : null}</p>
						{ !limitContent ? 
						<span>
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Grab an Accessory Kit</h2>
							<p className="mb-8 text-base text-body-color">You might be excited after ordering a pool table that you’re going to have it real nowhere but at your own home. But you didn’t expect the same pool table ruining your excitement when you find out the pool table set doesn’t have an accessory kit. Sounds lamb? Never mind, Pool Table Offers does provide a full accessory kit FREE worth $400. The free accessory kit includes not only primary pool associates but also additional billiards and supporting accessories are provided for a multiple of your snooker tricks.</p>
						
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>Authentic Sporting Experience With Our Exclusive Range of Games.</h2>
							<p className="mb-8 text-base text-body-color"> Pool Table Offers ensures authentic sporting experience with all our unique pool table for sale products. Our pool tables are designed with pub pool table standards, so you get the realistic and practical snooker experience. Not only billiard tables but all our different games are designed with practical features to give you the true sense of fun and recreation at your place.</p>
						
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>
									<Link href={cat_slug + '/pool-table/'}  className="alink-color"> Pool Table For Sale:
								</Link>
							</h2>
							<p className="mb-8 text-base text-body-color">Sturdier and durable tables as per standard pool table size with a free accessory kit will appear as to a grand sports game in your entertaining space. With high-speed wool felt playing surface, ball returning system and feet adjustment - the game will run even smoother and stimulate your exciting moments at the table.</p>
						
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>
									<Link href={cat_slug + '/multi-game-table/'}  className="alink-color"> 4-in-1 Versatile Pool Table :
								</Link>
							</h2>
							<p className="mb-8 text-base text-body-color">Make sure with a 4-in-1 versatile pool table from us; you don’t need to go out to find a collection of games to entertain your day. Our 4-in-1 fabulous pool table is all you need to turn your space into a recreation area. The versatile table can be modified into a range of games with different tabletops such as ping pong table, soccer table and air hockey table. With having this multiple of games, you can comfortably make use of any table without occupying space of your living area.</p>
							<p className="mb-8 text-base text-body-color">Also, accessories of such games are provided free, so you don’t need to peek into your bank balance for extra bucks.</p>
						
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>
								<Link href={cat_slug +'/soccer-table/'}  className="alink-color"> Soccer Table | Foosball Table:
								</Link>
							</h2>
							<p className="mb-8 text-base text-body-color">Soccer table, also known as a foosball table is a fun game, especially for those who love football. We have 4-ft foosball tables as well as 5-ft foosball tables much as the same you play in a pub and an entertainment centre. Features like anti-slip handles, durable ABS moulded players, convenient score counter and more make it an exciting game on occasions like family bonding, office parties and group entertainment.</p>
						
							<h2 className='relative pb-2 font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 '>
								<Link href={cat_slug +'/table-tennis/'}  className="alink-color"> Ping pong Table | Table Tennis Table: 
								</Link>
							</h2>
							<p className="mb-8 text-base text-body-color">Whether you’re a ping pong champion or enjoy the game with your partner, we have ping pong tables to suit every need. Our standard ping pong tables are best-selling with our brand’s popularity in the International Table Tennis Federation for its higher-quality boards with 25mm thickness that ensure a long lifespan of tables. With free accessory kit provided, classy features and portable design; a ping pong table is a sure-shot winner in terms of games.</p>
							<p className="mb-8 text-base text-body-color">Providing pool tables at affordable prices with the cheapest possible freight is indeed the job of ours. With our unique Buy Now, Pay Later service and great quality products, we’re working to reach up to every corner across the country. Grab Pool Table Offers now, enjoy your game and pay later in easy instalments.</p>
							</span> : null
							}
						{limitContent ?
							<button onClick={(e)=> setLimitContent(false)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 '>Read more</button>
							:
							<button onClick={(e)=> setLimitContent(true)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 '>Read less</button>
						}
						</div>
				</div>
			</section>

		</Layout>
	)
}

export async function getStaticProps({ params }) {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	const pageData = await getPage(params?.slug.pop() ?? 'home');


	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			pageData: pageData?.[0] ?? {}
		},

		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
	};
}
