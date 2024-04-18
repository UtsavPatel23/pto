/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { getPage } from '../src/utils/blog';

export default function Home({ headerFooter ,pageData}) {
	return (
		<Layout headerFooter={headerFooter || {}} seo={pageData?.yoast_head_json ?? {}} >
			<section className='my-11'>
				<div className="mx-auto max-w-screen-xl px-2">
					<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border'>POOL TABLE OFFERS – Champions Are Made Not Born– AFTERPAY STORE | BUY NOW PAY LATER</h2>
					<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center mb-12">
						<div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
							<iframe width="100%" height="315" src="https://www.youtube.com/embed/lmfKI01S-ws?si=MrcBZ1VZ6rCBHiqq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
						</div>
						<div className="space-y-4">
							<p>
								Proudly owned and managed by Australians, exclusive online retail and wholesale business supply with many years of experience in the industry, PoolTable Offers dedicated to offering high-quality products at the most reasonable prices in the country.
							</p>

							<p>
								<b>Pooltableoffers</b> presents a unique Buy Now, Pay Later experience with the help of various payment options where you can check out the goods worth up to $1000 with having the ﬂexibility to pay off your purchasing periodically, with no interest.

							</p>
						</div>
					</div>
					<div>
						<h3 className='pb-2 font-jost text-2xl md:text-3xl font-semibold mb-3'>Why Pool Table Offers - Champions Are Made Not Born?</h3>
						<p>Our website has been designed streamline to the way our customers purchase their products online 24 X 7 at a ﬂexible time and place that is convenient for them. Our store provides our customers with detailed information and images with fully transparent pricing about our online products and shipping services in addition to the useful product information available as well. This, in turn, allows our customers to make fully informed purchases online without any hidden costs. We have also invested in protecting our customers’ security and privacy and have partnered with the most trustworthy and reputable ﬁnancial institution to achieve this.</p>

						<p>Pooltableoffers as one of the fast growing BUY NOW PAY LATER Afterpay store in Australia committed to providing a wide range of kids products across many categories like Pool tables, soccer tables, foosball tables, air hockey table, ping pong table on buy now, pay later method.</p>

						<h3 className='pb-2 font-jost text-2xl md:text-3xl font-semibold mb-3 mt-12'>Quick Customer & Delivery Service - Pool Table Offers Champions Are Made Not Born</h3>
						<p>The team at Pooltableoffers ensures that customers are delivered a ﬁrst grade shopping experience in every way. All are dedicated to quick, friendly and reliable service with a real passion for complete customer satisfaction. Our aim at PoolTable Offers is to create a strong kinship with all our customers and grow together with them now and into the future. We intend to achieve this by offering exceptional customer service and support, responding to enquiries in a timely manner, providing quality products at the best online prices, and by rendering fast & reliable delivery service. We value your review and feedback more than anything else, so never mind, if you any queries regarding products or anything, you are welcomed to contact us at any time.</p>

						<p>Pooltableoffers with its numerous products over the website in various categories gives you a pure sense of a departmental store at your place. Pick a favourite product and feel free to buy now and pay later with no interest at your convenience.</p>
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
