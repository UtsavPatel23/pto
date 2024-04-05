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
import topbanner from '../public/assets/img/bnpl/humm-banner.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import breeze from '../public/assets/img/bnpl/humm-breeze.webp';
import signup from '../public/assets/img/bnpl/signup.webp';
import shopnow from '../public/assets/img/bnpl/shop-now.webp';
import payslices from '../public/assets/img/bnpl/pay-slices.webp';
import hummdreams from '../public/assets/img/bnpl/humm-dreams.webp';
import littlething from '../public/assets/img/bnpl/little-thing.png';
import bigthing from '../public/assets/img/bnpl/big-thing.png';


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
			question: "WHAT IS HUMM?",
			answer: (
				<>
					<p>Humm helps everyday Australians Buy Now Pay Later. Their payment plans are great value because Humm customers pay no interest ever.</p>
				</>
			),
		},
		{
			question: "WHO CAN USE HUMM?",
			answer: (
				<>
					<p>Live in Australia</p>
					<p> Be at least 18 year old</p>
					<p>Have a valid email address and mobile number</p>
					<p>Own an Australian debit or credit card</p>
					<p>Have an Australian drivers licence, passport or Medicare card</p>
				</>
			),
		},
		{
			question: "WHY DO I HAVE TWO AMOUNTS - ONE FOR 'BIG THINGS' AND ONE FOR 'LITTLE THINGS'?",
			answer: (
				<>
					<p>Humm realise you have two different types of spending. First, there’s everyday spending – little amounts you want to pay back fast. Then, there’s big purchases, where you need more time to repay. With humm, you can handle both quickly, easily and from the same portal.</p>
				</>
			),
		},
		{
			question: "HOW DO I SHOP WITH HUMM?",
			answer: (
				<>
					<p>Humm is fast and simple to use no matter where you prefer to shop:</p>
					<p> Online, simply select humm at checkout and you will be taken through to humm to confirm your payment</p>
					<p> In store, log into the humm portal and generate a barcode. Simply take this to the checkout with your purchase and they will scan or input the code</p>
				</>
			),
		},
		{
			question: "ARE THERE EXCLUSIONS TO WHAT I CAN PURCHASE WITH HUMM?",
			answer: (
				<>
					<p>Yes, iPhone's and Samsung mobile phones cannot be purchased using Humm as a payment method. If you are purchasing an iPhone or Samsung phone please use one of payment methods available in the checkout.
					</p>
					<p>Please note that Humm 'Big Things' is not available to use on some products including but not limited to gift cards, iTunes cards, epay recharge, Asko, Dyson, Apple, Miele,
						Pro-forma brands products.</p>
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
							alt="Hummp"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
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
							src={breeze}
							alt="breeze"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
							<Image
								src={signup}
								alt="signup"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Sign Up</h4>
							<p>And Get Fast Approval</p>
						</Link>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
							<Image
								src={shopnow}
								alt="shopnow"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Shop Now</h4>
							<p>Check Out Online With HUMM</p>
						</Link>
						<Link href='#' className='bg-[#ff91004a] border border-[#ff6e00] text-center space-y-2 p-3 rounded group'>
							<Image
								src={payslices}
								alt="payslices"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Pay in Slices</h4>
							<p>And Pay Your Way!</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={hummdreams}
							alt="hummdreams"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-2 gap-10'>
						<div className='border border-[#ff6e00] p-5 sm:flex items-center gap-10'>
							<Image
								src={littlething}
								alt="littlething"
								width={195}
								height={100}
							/>
							<div>
								<h3 className='font-semibold'>Buy 'Little Things'</h3>
								<p>- Apply for up to $2000</p>
								<p>- Pay weekly or fortnightly in 5 or 10 slices</p>
							</div>
						</div>
						<div className='border border-[#ff6e00] p-5 sm:flex items-center gap-10'>
							<Image
								src={bigthing}
								alt="bigthing"
								width={125}
								height={100}
							/>
							<div>
								<h3 className='font-semibold'>Buy 'Big Things'</h3>
								<p>- Apply in store for up to $6000</p>
								<p>-  Repay over 6, 12 or 24 months</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#ff6e00]">What Is Humm?</h2>
						<p>Humm is one of Australia's leading "Buy Now Pay Later" payment providers. Previously trading as Ezi-Pay and Oxipay. They combined the two to become Humm, providing shoppers with a straight forward and simple way to BNPL without interest on purchases between $1 and $30,000.
						</p>
						<p>It can be used for shopping for clothing and shoes, electronics and tech, kids toys and games, furniture, beauty and makeup, home appliances and so much more. In fact, you can use Humm for just about anything you can think of.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#ff6e00]">Comparison Features </h2>
						<div class="relative overflow-x-auto pb-5">
							<table className="border-collapse w-full border border-slate-300">
								<thead>
									<tr>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Features</th>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Little Things</th>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Big Things</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'><p>Credit Limit</p></th>
										<td className='border border-slate-300 p-2'>Upto $2000</td>
										<td className='border border-slate-300 p-2'>Upto $6000</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'><p>Repayment</p></th>
										<td className='border border-slate-300 p-2'>Weekly or Fortnightly in 5 to 10 Slices</td>
										<td className='border border-slate-300 p-2'>6, 12 or 24 Months</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'><p>Monthly Fee</p></th>
										<td className='border border-slate-300 p-2'>$0 to $8 (Depend on Repayment)</td>
										<td className='border border-slate-300 p-2'>$8</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'><p>Repeat Purchase Fee</p></th>
										<td className='border border-slate-300 p-2'>$0</td>
										<td className='border border-slate-300 p-2'>$29</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'><p>Late Payment Fee</p></th>
										<td className='border border-slate-300 p-2'>$6</td>
										<td className='border border-slate-300 p-2'>$6</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#ff6e00]">Comparison Features</h2>
						<p>It works by simply breaking your purchase down into interest-free instalments. You simply find a retailer who has Humm as a payment option (use the search at the top of the screen to make this really easy), and then select Humm as the payment option during the checkout process. Then simply follow the prompts to either register a new account, or sign in to your existing account.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#ff6e00]">Who can use Humm?</h2>
						<p>Be an Australian citizen or permanent resident.<br />
							Must be 18 or older.<br />
							Have a valid debit card in your name.<br />
							Have never declared bankruptcy or insolvency.<br />
							Is there a minimum spend?<br />
							You can use Humm 'little things' for purchases between $1 and $2,000. For orders over $2,000 (and up to $30,000) <br />then it requires their product Humm 'Big Things'. </p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#ff6e00]">How many orders can I have?</h2>
						<p>With 'Little Things' (Up to $2k) you can place as many orders as your would like. With 'Big Things' ($2k to $30k) then there is a fee on any additional orders. We also recommend to check their Returns & Fee's page for Terms & Conditions.</p>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#ff6e00] before:bg-[#ff6e00] after:bg-[#ff6e00]'>Frequently Asked Questions</h2>
						{faqData.map((faq) => (
							<details key={faq.id} className="group border border-[#ff6e00] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#ff6e00] group-open:text-white group-hover:bg-[#ff6e00] group-hover:text-white">
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
								<div className="py-3 px-4 border-t border-[#ff6e00] leading-relaxed">
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