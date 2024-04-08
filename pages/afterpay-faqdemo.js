/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import icon1 from '../public/assets/img/fq-order.png';
import icon2 from '../public/assets/img/fq-shopping.png';
import icon3 from '../public/assets/img/fq-return.png';
import icon4 from '../public/assets/img/fq-refunds.png';
import icon5 from '../public/assets/img/fq-product.png';


export default function Home({ headerFooter }) {
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

	const siteTitle = 'Store Name';
	const faqData = [
		{
			question: "I am interested in the item, which is out of stock",
			answer: (
				<>
					<p>You can go to the product page and put your email id in the waiting list. Once the product comes back in stock, our automail system will notify you via automail.</p>
				</>
			),
		},
		{
			question: "What is your warranty for products?",
			answer: (
				<>
					<p>We have a 12 months warranty on all products and 3-6 months warranty on electronic parts.</p>
				</>
			),
		},
		{
			question: "How can I claim the warranty?",
			answer: (
				<>
					<p>You can claim the warranty anytime within warranty period. You just simply need to contact us via Email, Live chat, Whatsapp messages only or Facebook. Share the issue with the product, along with some photos & videos and support team will help you out to </p>
				</>
			),
		},
	];
	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='flex gap-5 flex-wrap justify-center border-b border-victoria-800 pb-11'>
						<div className='w-96 flex items-center gap-3 p-2 shadow-[0_0_6px_0_#ddd]'>
							<Link href='#faqone'>
								<Image
									src={icon1}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Orders, Shipping & Delivery
							</Link>
						</div>
						<div className='w-96 flex items-center gap-3 p-2 shadow-[0_0_6px_0_#ddd]'>
							<Image
								src={icon2}
								alt="Orders, Shipping & Delivery"
								width={50}
								height={50}
							/>
							Orders, Shipping & Delivery
						</div>
						<div className='w-96 flex items-center gap-3 p-2 shadow-[0_0_6px_0_#ddd]'>
							<Image
								src={icon3}
								alt="Orders, Shipping & Delivery"
								width={50}
								height={50}
							/>
							Orders, Shipping & Delivery
						</div>
						<div className='w-96 flex items-center gap-3 p-2 shadow-[0_0_6px_0_#ddd]'>
							<Image
								src={icon4}
								alt="Orders, Shipping & Delivery"
								width={50}
								height={50}
							/>
							Orders, Shipping & Delivery
						</div>
						<div className='w-96 flex items-center gap-3 p-2 shadow-[0_0_6px_0_#ddd]'>
							<Image
								src={icon5}
								alt="Orders, Shipping & Delivery"
								width={50}
								height={50}
							/>
							Orders, Shipping & Delivery
						</div>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Find Orders, Shipping & Delivery</h2>
						{faqData.map((faq) => (
							<details key={faq.id} className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5">
									<h2 className="font-medium">{faq.question}</h2>
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
									{faq.answer}
								</div>
							</details>
						))}
						<p className='mt-5'>At <Link href="/" target="_blank" className="alink-color">{siteTitle}</Link>, we're committed to making your shopping journey delightful and rewarding. The Splash Pass Rewards points are just the beginning of the incredible benefits you'll enjoy. Join now, claim your free Rewards, and unlock a world of savings, exclusive offers, and much more!</p>
					</div>
				</div>
			</section>
		</Layout>
	)
}
export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
	};
}