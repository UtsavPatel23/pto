/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import Image from 'next/image';
/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../src/components/layout';
import { getPage } from '../src/utils/blog';
import Link from 'next/link';

export default function Home({ headerFooter, pageData }) {
	const { faqs } = pageData?.acf;
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

	console.log('pageData', pageData);
	console.log('faqs', faqs);
	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} uri={'FAQs'}>
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='flex gap-5 flex-wrap justify-center border-b border-victoria-800 pb-11 offset-top' id='top_smooth'>
						{(() => {
							return (
								faqs?.length ? faqs.map((faqsSection, i) => {
									return (
										<div>
											<Link href={'#faq_' + i} className='w-96 flex items-center gap-3 p-2 shadow-full'>
												<Image
													src={faqsSection.tab_icone_url}
													alt={faqsSection.tab_title}
													width={50}
													height={50}
												/>
												{faqsSection.tab_title}
											</Link>
										</div>
									)
								})
									:
									''
							)
						})()}


					</div>
					{(() => {
						return (
							faqs?.length ? faqs.map((faqsSection, i) => {
								return (
									<div className='grid grid-cols-1 gap-5' id={'faq_' + i}>
										<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>{faqsSection?.tab_title}</h2>
										{faqsSection?.faqs.length ? faqsSection?.faqs.map((faq, j) => (
											<details key={'faq_' + i} className="group shadow-[0_0_6px_1px_#ddd] [&_summary::-webkit-details-marker]:hidden">
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
												<div key="acf_ans"
													dangerouslySetInnerHTML={{
														__html: faq?.answer ?? '',
													}}
													className="py-3 px-4 border-t border-gray-200 leading-relaxed"
												/>
											</details>
										)) : ''}
									</div>
								)
							})
								:
								''
						)
					})()}


				</div>
			</section>

		</Layout>
	)
}

export async function getStaticProps({ params }) {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	const pageData = await getPage(params?.slug.pop() ?? 'faqs');


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
