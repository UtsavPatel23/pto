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
import topbanner from '../public/assets/img/bnpl/wizit-banner.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import grace from '../public/assets/img/bnpl/wizit-grace.webp';
import interest from '../public/assets/img/bnpl/interest-fee.webp';
import instalments from '../public/assets/img/bnpl/instalments.webp';
import amazing from '../public/assets/img/bnpl/amazing.webp';
import lending from '../public/assets/img/bnpl/wizit-lending.webp';
import wizitpay from '../public/assets/img/bnpl/wizit-pay.png';
import wizitcard from '../public/assets/img/bnpl/wizit-card.png';
import powerup from '../public/assets/img/bnpl/wizit-powerup.png';


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

	const faqone = [
		{
			question: "WizitPay (Wizit Pay)",
			answer: (
				<>
					<p>Wizit Pay is a Popular BNPL or Buy Now Pay Later Payment Option Which Allows Users To Shop Now Online & Pay Later in Four Easy Installments Over 6 Week Period Which is Like Wizpay.</p>
					<p>It Offers Up To $500 To Shop Online with its Online Retailers Across Australia with Zero Interest For Your 4 Fourtnighly Instalments. But Remember That If you didn't Repay the full balance before the end of the month then it Will Take around $5 as an Account Fee Per Month.</p>
				</>
			),
		},
		{
			question: " WizitCard (WizIt Card)",
			answer: (
				<>
					<p>Wizit Card is not a Usual Credit Card It is Credit Card But It Has Some Advance Features, it is a digital debit card so you can easily pay anywhere and anytime you want For Your Shopping or Purchases Through Online or Offline Stores.</p>

					<p>In Wizit Card The Spending Limit Is up to $1000 and the amazing thing is that it won't charge anything you spend or shop up to the limit of $1000. It's Only Charged $19 Monthly as Account Keeping Fee, While You Are Using The Card Or You Have An Pending Balance Otherwise It Won't Charge Anything.</p>

					<p>Also, If You Miss Out on The Repayment Dates Somehow, Then It Will be Charged $1.00 Per Day As a Late Fee for the past Day From You and Around 10 Days Grace Period Also Applies for This Amount, which is capped at $100 per rolling 12-month period.</p>

					<p>Even You Can Easily Use WizIt Card With Apple Pay & Google Pay To Hassle-free Pay at any offline store as well.</p>
				</>
			),
		},
		{
			question: "PowerUp (Power Up)",
			answer: (
				<>
					<p>When You Have PowerUp From WizIt, You Don't Need To Take A Loan From Bank Because PowerUp Has Come Up With The $30,00 Spending Limit with an interest Range From 19.9% to 47.8%.</p>

					<p>PowerUp Has The Capacity To Lend Up To $30,000 making it one of the most popular BNPL Service Providers in Australia.</p>

					<p>By Using PowerUp You Can Do Many Things Like With The Help Of PowerUp You Can Go On a Luxurious Holiday or You Can Buy The Expensive Things That You have Always Dreaming Of.</p>

					<p>You Can Use PowerUp To Charge Your WizIt Card OR You Can Directly Transfer The Money Into Your Bank Account.</p>
				</>
			),
		},
	];
	const faqtwo = [
		{
			question: "How Can You Apply For Wizit?",
			answer: (
				<>
					<p>For Applying Any Of The Products Of WizIt You Just Have To Simply Download The WizIt App And Select Product Which Is Suitable To You According to Your Budget like in WizIt Pay The Credit Limit is Upto $500, and In Wizit Card the limit is upto $1000 and same in Power up The Credit Limit Is Upto $30,000. After That Fill The Application And Complete The Process.</p>
				</>
			),
		},
		{
			question: "What Type Of Documents I Need To Apply For WizIt?",
			answer: (
				<>
					<p>You have to provide Some Personal Information & Identification like Driver's Licence, Passport, or Medicare Card along with Debit Card or Credit Card as A Funding Source. And The Best Thing is, It is totally handled Digitally so you don't need to do any type of printing or paperwork.</p>
				</>
			),
		},
		{
			question: "What Are The Eligibility Criteria to Open An Account in WizIt?",
			answer: (
				<>
					<p>To Open An Account in Wizit The Basic Requirement is Your age must be above 18 and must be an Australian citizen.</p>
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
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
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
							src={grace}
							alt="grace"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
							<Image
								src={interest}
								alt="interest"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Zero interest forever</h4>
							<p>Up To $500 To Shop Online with its Online Retailers Across Australia with Zero Interest</p>
						</Link>
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
							<Image
								src={instalments}
								alt="instalments"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>4 x fortnightly instalments</h4>
							<p>Allows Users To Shop Now Online & Pay Later in Four Easy Installments Over 6 Week Period</p>
						</Link>
						<Link href='#' className='bg-[#f1c1de] border border-[#e61996] text-center space-y-2 p-3 rounded group'>
							<Image
								src={amazing}
								alt="amazing"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Amazing Partner Stores</h4>
							<p>Hundreds of partner stores to choose from.</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={lending}
							alt="lending"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-5'>
						<div className='border border-[#e61996] p-5'>
							<Image
								src={wizitpay}
								alt="wizitpay"
								width={195}
								height={100}
								className='mx-auto mb-5'
							/>
							<div>
								<h3 className='font-semibold'>Buy Now, Pay It Later</h3>
								<p>Shop online and pay with wizitpay in 4 instalments over 6 weeks. Fees apply.</p>
							</div>
						</div>
						<div className='border border-[#e61996] p-5'>
							<Image
								src={wizitcard}
								alt="wizitcard"
								width={125}
								height={100}
								className='mx-auto mb-5'
							/>
							<div>
								<h3 className='font-semibold'>Shop Anywhere, Anytime</h3>
								<p>Interest free credit card up to a $1,000 limit with a simple $19 per month fee.</p>
							</div>
						</div>
						<div className='border border-[#e61996] p-5'>
							<Image
								src={powerup}
								alt="powerup"
								width={125}
								height={100}
								className='mx-auto mb-5'
							/>
							<div>
								<h3 className='font-semibold'>Power it up</h3>
								<p>A line of credit up to $30,000 with rates ranging from 19.9% to 47.8% p.a.</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#e61996]">What Is WizIt?</h2>
						<p>Wizit is Formerly known as "Wizpay - Best BNPL Service Provider". It is Founded By Credit Corp Financial Services Pty Limited which is also a member of AFCA. It is an innovative and responsible lender which offers customers to pay using three different ways, In which products include WizitPay, WizitCard & Powerup. They Consider Customers in Varying Situations and Promote Financial Inclusiveness wherever possible.
						</p>

						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#e61996] before:bg-[#e61996] after:bg-[#e61996]'>Wizit - The Three Ways To Pay Wherever You Want</h2>
						<p className='text-center'>As We Know, Both ZipPay Australia and ZipMoney are the popular digitals Payment Option in Australia which is operated by the Zip company, So Here are the features that ZipPay and ZipMoney Provide to their customers which are as follows</p>
						{faqone.map((faq) => (
							<details key={faq.id} className="group border border-[#e61996] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#e61996] group-open:text-white group-hover:bg-[#e61996] group-hover:text-white">
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
								<div className="py-3 px-4 border-t border-[#e61996] leading-relaxed">
									{faq.answer}
								</div>
							</details>
						))}
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#e61996] pt-3">Comparison Features</h2>
						<div class="relative overflow-x-auto pb-5">
							<table className="border-collapse w-full border border-slate-300">
								<thead>
									<tr>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Features</th>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Wizit Pay</th>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Wizit Card</th>
										<th scope="col" className='border border-slate-300 p-2 text-left'>Powerup</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>Monthly Account Fee</th>
										<td className='border border-slate-300 p-2'>$5 (Only when you are using account and you have a balance remaining at the end of the month.)	</td>
										<td className='border border-slate-300 p-2'>$19 (If You Have Used Card During The Month or If There is any outstanding balance at anytime within the Month)	</td>
										<td className='border border-slate-300 p-2'>-</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>Interest Rate</th>
										<td className='border border-slate-300 p-2'>0%</td>
										<td className='border border-slate-300 p-2'>0%</td>
										<td className='border border-slate-300 p-2'>19.9% to 47.8%</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#e61996]">5 Types Of PowerUp Funds</h2>
						<p>So, Overall There Are 5 Types Of PowerUp Funds Available that you can get from the WizIt PowerUp Services Which Are As Follows: - </p>
						<ul class="liarrow">
							<li><b>Diamond: -</b> It Is One Of The Highest Services That Allow You To Borrow Up To $30000 at an interest rate of 19.9% Per Annum.</li>
							<li><b>Platinum: -</b> It Is One Of The Second Highest Services in which you can borrow up to $20,000 at an interest rate of around 24.9% Per Annum.</li>
							<li><b>Gold: -</b> Gold Has An Borrowing Limit of Up To $15000, In which you have to pay up to 34.9% per annum Interest Rate.</li>
							<li><b>Silver: -</b> In Silver, You Have To Pay Up To 39.9% Per Annum with which the maximum limit being up to $10000.</li>
							<li><b>Bronze: -</b> In Bronze Plan, The Maximum Loan Amount You Can Get is Up To $5000 With An 47.8% Interest Rate.
							</li>
						</ul>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#e61996] before:bg-[#e61996] after:bg-[#e61996]'>Frequently Asked Questions By Wizpay Users</h2>
						<p className='text-center'>There Are Some Questions That Repeteadly Asked By WizIt, So We Thought To Give Their Answer, So Below You Can Find The Basic Questions & Their Answers As Well Which are as Follows: -</p>
						{faqtwo.map((faq) => (
							<details key={faq.id} className="group border border-[#e61996] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#e61996] group-open:text-white group-hover:bg-[#e61996] group-hover:text-white">
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
								<div className="py-3 px-4 border-t border-[#e61996] leading-relaxed">
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