/**
 * Internal Dependencies.
 */
import Products from '../src/components/products';
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

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

import img1 from '../public/assets/img/home/sofas-sofa-bed.webp';

export default function Home({ headerFooter, pageData }) {
	const { slider_options } = pageData?.acf;
	const [sliderList, setSliderList] = useState(null);
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
				<p onClick={onClick} className="size-10 bg-victoria-700 inline-block flex items-center justify-center">
					<i class="fa-light fa-arrow-left text-white fa-lg"></i>
				</p>
			</div>
		);
	};

	const NextArrow = (props) => {
		const { onClick } = props;
		return (
			<div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10">
				<p onClick={onClick} className="size-10 bg-victoria-700 inline-block flex items-center justify-center">
					<i class="fa-light fa-arrow-right text-white fa-lg"></i>
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

	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} uri={'home'}>
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
				return (slider_options.length ? <>
					<section className='top-banner w-full overflow-hidden'>
						<Slider {...heroslider}>

						</Slider>
					</section>
				</> : null)
			})()}

			<section className='my-11'>
				<div className='container'>
					<h2 className='top-title font-jost text-center text-4xl font-semibold mb-8'>Title Title Title TitleTitle Title</h2>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-2 gap-y-3 sm:gap-4'>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
								<Image
									src={img1}
									alt="Category Image"
									width={400}
									height={400}
								/>
							</Link>
						</div>
						<div className='hover:-translate-y-2 transition-all duration-200'>
							<Link href='' target='_blank'>
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

			<section className='my-5'>
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
