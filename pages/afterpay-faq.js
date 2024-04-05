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
import afterpay from '../public/assets/img/bnpl/afterpay.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import afterpaygateway from '../public/assets/img/bnpl/afterpay-gateway.webp';
import spend from '../public/assets/img/bnpl/spend-imits.webp';
import widely from '../public/assets/img/bnpl/widely.webp';
import split from '../public/assets/img/bnpl/split.webp';
import afterpaydreams from '../public/assets/img/bnpl/afterpay-dreams.webp';


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
			question: "What is Afterpay?",
			answer: (
				<>
					<p>Afterpay is a service that allows us to offer our customers the ability to make purchases now and pay for them in four equal installments, made every 2 weeks, without any interest.</p>
				</>
			),
		},
		{
			question: "How do I use Afterpay?",
			answer: (
				<>
					<p>Just shop pooltableoffers.com.au and checkout as usual. At checkout, choose Afterpay as your payment method. You will be directed to the Afterpay website to register and provide payment details (Visa or Mastercard). If you’ve used Afterpay before, just log into your Afterpay account. Then complete your order -- it’s that easy</p>
					<p> Please note, all items in your shopping bag must be eligible for Afterpay, and the order value must be between $35 and $1000.</p>
				</>
			),
		},
		{
			question: "Are there extra fees when I use Afterpay?",
			answer: (
				<>
					<p>Afterpay is always zero interest. You pay nothing extra when you pay on time, according to your payment schedule. The only fees are late fees for missed payments.</p>
				</>
			),
		},
		{
			question: "Is there a minimum age requirement for using Afterpay?",
			answer: (
				<>
					<p>Afterpay is only offered to customers over the age of 18.</p>
				</>
			),
		},
		{
			question: "What products are not eligible for purchase using Afterpay?",
			answer: (
				<>
					<p>Afterpay is not available on purchases of gift cards or e-Gift cards and may be unavailable on additional products. If your order contains gift cards and other eligible products, you will need to purchase your gift cards separately.</p>
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
							src={afterpay}
							alt="Afterpay Banner"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
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
							src={afterpaygateway}
							alt="afterpaygateway"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
							<Image
								src={spend}
								alt="spend"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Spend limits start at around $600</h4>
							<p>We’re all about responsible spending; our smart spend limits increase with your on-time payments.</p>
						</Link>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
							<Image
								src={widely}
								alt="widely"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Widely accepted online and in-store.</h4>
							<p>Pay in 4 for fashion, travel, medical, automotive, entertainment and so much more by selecting Afterpay at checkout.</p>
						</Link>
						<Link href='#' className='bg-[#c4ffec] border border-[#74dfbd] text-center space-y-2 p-3 rounded group'>
							<Image
								src={split}
								alt="split"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Split the payments, zero interest.</h4>
							<p>When you use Afterpay, you’ll pay in 4 interest-free instalments, and there are no late fees when you pay on time.</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={afterpaydreams}
							alt="afterpaydreams"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#74dfbd]">What is Afterpay?</h2>
						<p>Buy-now, pay-later financing allows shoppers to make purchases and pay them off over time. Afterpay, which is now owned by payments technology company Block, is an Australian company that offers such consumer loans free of interest.
						</p>
						<p>Launched in 2015, the Afterpay platform now serves customers in Australia, New Zealand, the United States, and Canada. Additionally, it is available in the United Kingdom, France, and Spain, where it is known as Clearpay.</p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#74dfbd]">Features Of Afterpay</h2>
						<p><b>No interest: -</b> Working in a way similar to a no-interest loan, the only charges a customer will pay are their instalments every 2 weeks, and any applicable late fees.</p>
						<p><b>No advance sign-up for in-store purchases: -</b> Even if you don't have an account, you can still walk into a selected retailer and choose Afterpay. You'll just need to sign up later.</p>
						<p><b>Manage your account: -</b> Sign in to see your upcoming payments, orders and account information.</p>
						<p><b>Reminders: -</b> You'll be notified ahead of time when a payment is coming up and how much it is, so that you can make sure there's no overdrawing.</p>
						<p><b>Automatic deductions: -</b> Each quarter amount is automatically deducted from your chosen card to make sure you can keep up with your repayments, even if you're busy or you can't get online.</p>
						<p><b>Refunds and more: -</b> You can still get a refund for purchases you've made with Afterpay, in line with each store's refunds policy.</p>
						<p><b>Pay in advance: -</b> You can pay instalments ahead of time, penalty-free.</p>
						<p><b>Market-leading security: -</b> Afterpay is a PCI DSS Level 1 certified compliant Service Provider organisation. This is the highest level of payment security there is, for both your card details and your personal information.</p>
						<p><b>Earn rewards: -</b> Shopping through Afterpay and paying each of your instalments on time can earn you benefits through Afterpay's Pulse Rewards program. These rewards range from discounts at stores to being able to postpone your upfront quarter payment from checkout to 2 weeks after your purchase.</p>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#74dfbd] before:bg-[#74dfbd] after:bg-[#74dfbd]'>Frequently Asked Questions</h2>
						{faqData.map((faq) => (
							<details key={faq.id} className="group border border-[#74dfbd] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#74dfbd] group-hover:bg-[#74dfbd]">
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
								<div className="py-3 px-4 border-t border-[#74dfbd] leading-relaxed">
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