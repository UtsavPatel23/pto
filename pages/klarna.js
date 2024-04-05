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
import topbanner from '../public/assets/img/bnpl/klarna-banner.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import klarnalending from '../public/assets/img/bnpl/klarna-the-lending.webp';
import payhow from '../public/assets/img/bnpl/pay-how.webp';
import interestfee from '../public/assets/img/bnpl/interest-fee.webp';
import creditimpact from '../public/assets/img/bnpl/credit-impact.webp';
import symphony from '../public/assets/img/bnpl/klarna-lending-symphony.webp';


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

	const faqData = [
		{
			question: "How does Klarna work as a payment option?",
			answer: (
				<>
					<p>Klarna offers a 'Buy Now, Pay Later' service, allowing you to make purchases and pay for them in installments. Simply select Klarna at checkout, provide some information, and enjoy your purchase while spreading the payments over time.</p>
				</>
			),
		},
		{
			question: "What are the benefits of using Klarna for payments?",
			answer: (
				<>
					<p>Klarna provides flexibility, convenience, and financial control. You can split payments into manageable installments, enjoy interest-free periods, and experience a seamless checkout process with Klarna's quick approval and minimal information required.</p>
				</>
			),
		},
		{
			question: "Are there any fees or interest charges with Klarna?",
			answer: (
				<>
					<p>Klarna offers interest-free installments, but late fees may apply if you miss a payment. It's important to review the terms and conditions for each purchase to understand the specific payment terms and potential fees.</p>
				</>
			),
		},
		{
			question: "Where can I use Klarna in Australia?",
			answer: (
				<>
					<p>Klarna is accepted by numerous online retailers across various industries in Australia. Look for the Klarna logo or payment option at the checkout page of participating merchants.</p>
				</>
			),
		},
		{
			question: "How do I manage my Klarna account and payments?",
			answer: (
				<>
					<p>You can easily manage your Klarna account through their app or website. Track your payments, view upcoming due dates, make additional payments, or update your payment method - all from the convenience of your device.</p>
				</>
			),
		},
		{
			question: "What happens if I want to return a product I purchased with Klarna?",
			answer: (
				<>
					<p>If you need to return an item, follow the merchant's return policy. Once the return is processed, Klarna will update your payment schedule accordingly and issue a refund if applicable.</p>
				</>
			),
		},
		{
			question: "Is Klarna safe to use for online payments?",
			answer: (
				<>
					<p>Klarna takes security seriously and employs robust measures to protect your personal and financial information. They utilize encryption, secure payment gateways, and comply with industry standards to ensure your transactions are secure.</p>
				</>
			),
		},
	];
	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='grid grid-cols-1'>
						<Image
							src={topbanner}
							alt="topbanner"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={soccer}
								alt="Soccer Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Soccer Table</h4>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={klarnalending}
							alt="klarnalending"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={payhow}
								alt="payhow"
								width={113}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Pay how you like</h4>
							<p>Enjoy the flexibility to get what you want and pay over time.</p>
						</Link>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={interestfee}
								alt="interestfee"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>4 interest-free payments</h4>
							<p>Pay in 4 with Klarna through our app, with integrated brands, or anywhere Visa is accepted.</p>
						</Link>
						<Link href='#' className='bg-[#d3baef] border border-[#492874] text-center space-y-2 p-3 rounded group'>
							<Image
								src={creditimpact}
								alt="creditimpact"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>No credit impact</h4>
							<p>Our instant approval process has zero impact on your credit score.</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={symphony}
							alt="symphony"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#492874]">What is Klarna?</h2>
						<p>Founded by three Swedish entrepreneurs from the Sweden School of Economics in 2005, they have built one of the countries largest fintech companies with over 4000 employees. They offer customers a simple and easy solution to Buy Now Pay Later payment services. Despite beginning their journey in Sweden, Klarna is now available in 17 locations throughout the globe including the US, Australia and the United Kingdom, and is said to have over 90 million active customers and 250k merchants. In Australia, Klarna works by splitting the cost into four interest-free payments (one every two weeks).</p>
						<p>Klarna is one of the world's leading BNPL (Buy Now Pay Later) providers, and is now available in Australia. Klarna provides a payment service that gives Australian shoppers the ability to Pay over time in 4 simple interest-free instalments.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#492874]">You shop, you choose how to pay.</h2>
						<h3 className="font-jost text-2xl font-semibold">4 interest-free installments</h3>

						<p>Split your purchase into 4 payments so you can spread the cost of your purchase over time. Enter the credit or debit card of your choice for automatic payments every two weeks. No interest or added fees when you pay on time!</p>

						<h3 className="font-jost text-2xl font-semibold">Pay later in 30 days</h3>

						<p>With Pay later in 30 days, you'll get a free payment delay that allows you to try before you buy. Pay for your purchase up to 30 days after it's been shipped. No upfront payment, no interest, and no fees when you pay on time.</p>

						<h3 className="font-jost text-2xl font-semibold">Making payments</h3>

						<p>Review your latest purchases and pay any open balances by logging into your Klarna account at https://app.klarna.com/login. You can also chat with Klarna Customer Service 24/7 in the Klarna App.</p>

						<h3 className="font-jost text-2xl font-semibold">Safe and secure</h3>

						<p>Klarna uses the latest safeguards and security to protect your information and prevent unauthorized purchases. You have zero fraud liability with Klarna's Buyer Protection policy.</p>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#492874] before:bg-[#492874] after:bg-[#492874]'>Frequently Asked Questions</h2>
						<p class="text-center">There Are Some Questions That Are Regularly Asked By Users. All The Questions and Their Answers You Can Find Below Which Are As Follows: - </p>
						{faqData.map((faq) => (
							<details key={faq.id} className="group border border-[#492874] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#492874] group-hover:bg-[#492874] group-hover:text-white group-open:text-white">
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
								<div className="py-3 px-4 border-t border-[#492874] leading-relaxed">
									{faq.answer}
								</div>
							</details>
						))}
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