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
import topbanner from '../public/assets/img/bnpl/zip-desktop.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import zipbanner from '../public/assets/img/bnpl/zip-banner.webp';
import reusable from '../public/assets/img/bnpl/reusable-account.webp';
import interest from '../public/assets/img/bnpl/interest-fee.webp';
import flexible from '../public/assets/img/bnpl/flexible-payments.webp';
import unlocking from '../public/assets/img/bnpl/unlocking.webp';
import zippay from '../public/assets/img/bnpl/zip-pay.webp';
import zipmoney from '../public/assets/img/bnpl/zip-money.webp';


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
			question: "ZipPay",
			answer: (
				<>
					<p><b>Buy Now, Pay Later:- </b> ZipPay Allows customers to Purchase The Products From Any Of ZipPay Stores Immediately and Pay For Them later in Easy Interest-Free Installments. It Also Offers A Flexible Payment Option which is to pay off their balance in full or Make Monthly Minimum Repayment.</p>

					<p><b>Instant Approval Process:- </b> They Provide a quick and very straightforward Application process to the user. So Anyone can apply for an account through the ZipPay Mobile App and Receive Instant decisions and the Status of their Application.</p>

					<p><b>Get Credit Limit:- </b> After Approval Of The Application, Customers Are Assigned a Credit Limit That is Specifically Defined as The Maximum amount The Can Spend Using ZipPay on Any Approved ZipPay Store in Australia. The Credit Limit Is Vary Based On Individual Circumstances and it is subject to change over time.</p>

					<p><b>Best Interest-Free Period:- </b> It's Offer There Customers an Interest-Free Period, Which Typically Ranging From 30 to 60 days, in which customers can easily pay off their purchase without incurring any type of interest charges.</p>

					<p><b>Secure Digital Wallet:- </b> They Provide An Amazing Digital Wallet Feature Which Allows Users To Securely Store Their Payment Details And Other Related Things. Because Of This Customers Easily Purchase The Products Using Their ZipPay Account.</p>

					<p><b>Accepted At Various Retailers Online & Offline:- </b> ZipPay is Accepted By a Huge Range of Retailers Across Australia in Online & Offline Stores. Customers Can Easily Use ZipPay To Buy Products and Participating Cheap ZipPay Stores, Including <Link className="alink-color" href="/pool-table/">Pool Table</Link>, <Link className="alink-color" href="/poker-table/">Poker table</Link>, <Link className="alink-color" href="/soccer-table/">Soccer Table</Link> ZipPay And More.</p>

					<p><b>Account Management Options:- </b> It Offers An Online Portal and Mobile Application To Manage The Account Efficiently. Even Users Can View Their Transactions, Check Their Balances, Make Repayments, Update Their Account Details, and many other things.</p>

					<div className="mt-4 text-center">
						<Link href="https://zip.co/au/create-an-account" target="_blank" className="w-52 bg-victoria-700 text-white p-3 inline-block hover:bg-white border border-victoria-700 hover:text-victoria-700">Sign Up</Link>
					</div>
				</>
			),
		},
		{
			question: "Zip Money",
			answer: (
				<>
					<p><b>Larger Shopping Easily:- </b> ZipMoney Is Specially Designed For Larger Purchased And Offer Higher Credit Limits to Accommodate More Significant Expenses like Furniture, Appliances, Travel Etc.</p>

					<p><b>Longer Interest-Free Periods:- </b> It Provide Longer and Interest-Free Periods Compared To ZipPay Which Allow Customers to Spread Out Their Payment Oven An Limited Extended Period without Incurring Interest Charges. Interest-Free Period Can Vary Which is Based on Individual Promotions and Agreements.</p>

					<p><b>Various Repayment Options:- </b> It Offers Amazing Various Repayment Options To Suit Individual Preferences, As Users Can Easily Choose To Pay Off Their Balance In Full At The End Of Each Billing Cycle By Selecting a Repayment Methods That Fits in Their Budget.</p>

					<p><b>Flexible & Best Interest Options:- </b> ZipMoney Provide Easy Flexibility To Their Customers to Choose Between Interest-Free Periods Or Interest-Bearing Options For Buy Huge Prices Products, It Also Allow Users To Tailor Their Repayment Plans Which Is Based On Their Financial Needs.</p>

					<p><b>Buyer Protection For Every Customer:- </b> It Also Offers Amazing Buyer Protection To Their Customers which ensures that they can easily dispute any unauthorized transaction. So It's By Default Peace Of Mind And Safeguards Customer's Interests.</p>

					<div className="text-center mt-4">
						<Link href="https://zip.co/au/create-an-account" target="_blank" className="w-52 bg-victoria-700 text-white p-3 inline-block hover:bg-white border border-victoria-700 hover:text-victoria-700">Sign Up</Link>
					</div>
				</>
			),
		},
	];

	const faqtwo = [
		{
			question: "ZipPay",
			answer: (
				<>
					<p><b>Buy Now, Pay Later:- </b> ZipPay Allows customers to Purchase The Products From Any Of ZipPay Stores Immediately and Pay For Them later in Easy Interest-Free Installments. It Also Offers A Flexible Payment Option which is to pay off their balance in full or Make Monthly Minimum Repayment.</p>
				</>
			),
		},
		{
			question: 'Can Anyone Apply For ZipPay?',
			answer: (
				<>
					<p>ZipPay has an application process in which individuals from different backgrounds can apply for ZIPPAY account. However, Approval For An Account is Subject To ZipPay's Eligibility Criteria.</p>
				</>
			),
		},
		{
			question: 'Are There Any Fees Associated With ZipPay?',
			answer: (
				<>
					<p>If you don't pay your Statement closing balance in full by the due date then ZipPay Charges a $7.95 Monthly Fee Otherwise ZipPay Does Not Charge Any Fees.</p>
				</>
			),
		},
		{
			question: 'Can I Increase The Credit Limit Of ZipPay Account?',
			answer: (
				<>
					<p>Yes, It's Provides an Option To Increase The Credit Limit Over Time, But its Increase Is Subject To Assessment And Approval by ZipPay.</p>
				</>
			),
		},
		{
			question: 'Can I Use ZipPay For Large Purchases?',
			answer: (
				<>
					<p>You Can Use ZipPay For Small & Larger Payment Purchases But It's Totally Depend On Your Approved Credit Limit. And If You Want to Purchase Above $1000 then you have to create an account in ZipMoney.</p>
				</>
			),
		},
		{
			question: 'Can I Use Multiple ZipPay Accounts in Australia?',
			answer: (
				<>
					<p>Individuals Are Only Allowed to have one ZipPay Account so Opening Multiple Accounts is Not Permitted.include </p>
					<p> ZIP Pay Australia: Your Gateway to Flexible Payments and Easy Shopping!</p>
					<p>Discover the convenience of Zip Pay in Australia at Pool Table Offers. Our platform offers a seamless shopping experience, allowing you to browse and buy a wide range of products. From zippay furniture to sex toys zippay, we have what you need to enhance your lifestyle. Experience a smarter way to shop with Zip Pay in Australia. Shop at Pool Table Offers today and indulge in the products you desire. Don't miss out on the opportunity to enjoy your purchases while managing your budget effectively.</p>
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
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
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
							src={zipbanner}
							alt="zipbanner"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
							<Image
								src={reusable}
								alt="reusable"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Reusable account</h4>
							<p>We give you one account with one monthly statement, no matter how many times you shop</p>
						</Link>
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
							<Image
								src={interest}
								alt="interest"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Interest-free</h4>
							<p>No interest, hidden fees or upfront payments</p>
						</Link>
						<Link href='#' className='bg-[#ede6ff] border border-[#aa8fff] text-center space-y-2 p-3 rounded group'>
							<Image
								src={flexible}
								alt="flexible"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Flexible payments</h4>
							<p>Choose repayments that suit your lifestyle – weekly, fortnightly, or monthly</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={unlocking}
							alt="unlocking"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-2 gap-10'>
						<div className='border border-[#aa8fff] p-5 sm:flex items-center gap-10'>
							<Image
								src={zippay}
								alt="zippay"
								width={200}
								height={59}
							/>
							<div>
								<h3 className='font-semibold'>Bigger purchases account.</h3>
								<p>Get a minimum of 3 months interest<br /> free on every purchase, always.</p>
							</div>
						</div>
						<div className='border border-[#aa8fff] p-5 sm:flex items-center gap-10'>
							<Image
								src={zipmoney}
								alt="zipmoney"
								width={200}
								height={59}
							/>
							<div>
								<h3 className='font-semibold'>Everyday account, interest free.</h3>
								<p>Enjoy $350–$1,000 to spend<br /> instantly once approved.</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff]">What Is Zippay?</h2>
						<p>ZipPay is an Australian Based Amazing Buy Now Pay Later (BNPL) Payment Services That Allow Customers to purchase the product and pay for them in easy installments over a time period.</p>
						<p>
							It provides a convenient and flexible alternative to traditional cards and personal loans. For Using A Zippay, Customers need to create an account and get approved for a credit limit.</p>
						<p>
							Zippay was founded in 2013 & Currently, it offers two services which are Zippay and Zipmoney in which zip pay is a buy now pay later service while zip money is a line of credit that can be used for larger purchases.
						</p>

						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#aa8fff] before:bg-[#aa8fff] after:bg-[#aa8fff]'>Features Of Zippay And Zipmoney</h2>
						<p className='text-center'>As We Know, Both ZipPay Australia and ZipMoney are the popular digitals Payment Option in Australia which is operated by the Zip company, So Here are the features that ZipPay and ZipMoney Provide to their customers which are as follows</p>
						{faqone.map((faq) => (
							<details key={faq.id} className="group border border-[#aa8fff] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#aa8fff] group-open:text-white group-hover:bg-[#aa8fff] group-hover:text-white">
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
								<div className="py-3 px-4 border-t border-[#aa8fff] leading-relaxed">
									{faq.answer}
								</div>
							</details>
						))}

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff] pt-4">Comparison Features </h2>
						<div className="relative overflow-x-auto pb-5">
							<table className="border-collapse w-full border border-slate-300">
								<thead>
									<tr>
										<th></th>
										<th scope="col" className='border border-slate-300 p-2'>
											<Image
												src={zippay}
												alt="zippay"
												width={200}
												height={59}
												className='mx-auto'
											/>
										</th>
										<th scope="col" className='border border-slate-300 p-2'>
											<Image
												src={zipmoney}
												alt="zipmoney"
												width={200}
												height={59}
												className='mx-auto'
											/>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p>Bundle purchases into weekly, fortnightly or monthly repayments</p>
										</th>
										<td className='border border-slate-300 p-2 text-center'>
											<i className="far fa-check text-[#aa8fff] fa-2xl"></i>
										</td>
										<td className='border border-slate-300 p-2 text-center'>
											<i className="far fa-check  text-[#aa8fff] fa-2xl"></i>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p>Tap to pay instore, everywhere Visa is accepted</p>
										</th>
										<td className='border border-slate-300 p-2 text-center'>
											<i className="far fa-check  text-[#aa8fff] fa-2xl"></i>
										</td>
										<td className='border border-slate-300 p-2 text-center'>
											<i className="far fa-times text-red-600 fa-2xl"></i>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p>Interest free period</p>
										</th>
										<td className='border border-slate-300 p-2'>
											<p>Interest Free Always</p>
										</td>
										<td className='border border-slate-300 p-2'>
											<p>3 Months to 5 Years</p>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>Credit Limit</th>
										<td className='border border-slate-300 p-2'>
											<p>350-$1000 (It Will Increase upto $2000 Based on Good Behaviour)</p>
										</td>
										<td className='border border-slate-300 p-2'>
											<p>$1000-$5000 (Apply Through Zip Merchants for Upto $50,000)</p>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p>Flexible Repayments</p>
										</th>
										<td className='border border-slate-300 p-2'>
											<p>From Just $10 A Week
												(Repay $10 Weekly, $20 Fortnightly, Or $40 Monthly)
											</p>
										</td>
										<td className='border border-slate-300 p-2'>
											<p>From $40/month or 3% of balance owing. Whichever is greater
												(Set a repayment schedule that suits you.)
											</p>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p> Establishment fee</p>
										</th>
										<td className='border border-slate-300 p-2'>
											<p>$0 </p>
										</td>
										<td className='border border-slate-300 p-2'>
											<p> $0-$99
												One off fee based on approved credit limit may apply.
											</p>
										</td>
									</tr>
									<tr>
										<th scope="row" className='border border-slate-300 p-2 text-left'>
											<p> Monthly account fee</p>
										</th>
										<td className='border border-slate-300 p-2'>
											<p>$7.95  Waived if you pay your statement closing balance in full by the due date.
											</p>
										</td>
										<td className='border border-slate-300 p-2'>
											<p> $7.95
												Waived if nothing owing.
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff]">How To Apply For A ZipPay Account In Australia?</h2>
						<p>Applying and Creating A ZipPay Account is very easy can be done easily. So Below Are The Steps To Create An ZipPay Account</p>

						<p><b>Creating A ZipPay Account:- </b> For Creating An Account Visit The ZipPay Website Click on The Sign-UP Or Get Started Button, And Register Yourself Through The Guided Registration Process, Where you have to provide your personal details like Name, E-Mail Address, Contact Information, Birthdate Etc.</p>

						<p><b>Eligibility For Applying and Verification Process For Application:- </b> Application Process of ZipPay Will Assess Your Eligibility Based On Certain Criteria, It may include factors such as your credit history and income & Once You Submit The Application, ZipPay Will Verify The Information Provided From Your End and Upon Approval, You Will Recieve Your ZipPay Account Details In Your Mailbox.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff]">Where I Can Use ZipPay Easily?</h2>
						<p>ZipPay is Almost Accepted In a Wide Range of Online Stores & Physical Stores All Over Australia. So Below Are The Two Specific Category Where You Can Easily Use ZipPay</p>

						<p><b>Online Stores:-</b> ZipPay is Accepted By Numerous Online ZipPay Retailers Like Us, Which Allow You To Shop A Variety of Products and Services. From ZipPay  You Can Easily Use ZipPay to Shop for Products conveniently Without The Need For Immediate Payment.</p>

						<p><b>Physical Store:- </b> It Is Accepted At Various Physical Retailers Including Furniture Stores, Gardening Stores, etc. So Simply Choose ZipPay As Your Payment Method While Checkout At the Store and Happily Enjoy The Flexibility Of Paying Later interest-free or with interest in easy installments.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff]">Tips For Using ZipPay Smoothly</h2>
						<ul class="liarrow">
							<li><b>Understand The T&Cs :- </b> Before Using ZipPay, Take The Time and Read & Understand Their Terms & Conditions. Also Familiarize Yourself With Their Fees, Repayment Schedule, and Other Related Information.</li>

							<li><b>Set A Specific Budget :- </b> Create a Budget & Decided How Much You Can Comfortably Afford To Easily Repay Each Repayment Period. This Will Help You To Avoid Overspending So Ensure That You Can Easily Make Timely Repayments.</li>

							<li><b>Use ZipPay Responsibly :- </b> ZipPay Offers The Convenience Of Deferred Payment, so It's Highly Important To Use It As Responsibly. So While Shopping Remember That Purchase Only That Product or Service You Truly Need And You Can Easily Afford To Repay.</li>

							<li><b>Timely Repay :- </b> Try To Make Your Repayment on Time To Avoid Late Fees, So Set Reminders and try to Automate Your Repayments To Ensure You Don't Miss Any Dates. It will Also help you to maintain a positive credit history.</li>

							<li><b>Monitor Your Spending Amount :- </b> Keep Track Your ZipPay Transaction and Regularly Review Your Account Balance. It Will Help You To Stay Aware Your Spending Habits And Also Ensure That You Are Within Your Budget.</li>
						</ul>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#aa8fff]">Easily Manage Your ZipPay Account</h2>
						<p>Managing Accounts is One Of The Important Task To Avoid Any Type Of Repayment or Interest Issue and Ensure The Smooth Transaction & Positive Payment Experience, So Below are some important Key Aspects to Consider For Managing a ZipPay or ZipMoney Account Which Are As Follows</p>

						<h3 class="font-jost text-xl font-semibold pt-3">Track Repayment and Due Dates</h3>

						<p>As We All Know It Is Very Important To Keep Track Repayment Schedule and Make Timely Payment is an Important Task to avoid the surcharge of any late fees or penalties. So Try To Set Reminders and Make Sure To Enable The Notification To Ensure You Never Miss a Repayment Date and Payment.</p>

						<h3 class="font-jost text-xl font-semibold pt-3">Easily Monitor Account Activity</h3>

						<p>Regularly Review Your ZipPay Account Activity Is Essential for staying informed about your purchases and payments. So Check your account statements and transaction history on a regular basis to ensure that all transactions are accurate and you are also aware of your outstanding balance.</p>

						<h3 class="font-jost text-xl font-semibold pt-3">Update Your Account Information</h3>

						<p>Ensure That Your Account Information is Updated. If there are any changes to your personal details such as your address or contact information Then make sure it is updated promptly in your account Which is ensure that you received important Notifications from ZipPay Without Any Type Of Delay.</p>

						<h3 class="font-jost text-xl font-semibold pt-3">Communicate with ZipPay Support For Help</h3>

						<p>If You Encounter Any Type of Issue or have questions Regarding Your Zippay Account, Then Don't Hesitate to reach out ZipPay Customer Support Team, So they can easily provide assistance and Clarify any concerns or guide you through the specific account management process.</p>

					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border text-[#aa8fff] before:bg-[#aa8fff] after:bg-[#aa8fff]'>Frequently Asked Question Related To ZipPay</h2>
						{faqtwo.map((faq) => (
							<details key={faq.id} className="group border border-[#aa8fff] [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex py-3 px-4 cursor-pointer items-center justify-between gap-1.5 group-open:bg-[#aa8fff] group-open:text-white group-hover:bg-[#aa8fff] group-hover:text-white">
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
								<div className="py-3 px-4 border-t border-[#aa8fff] leading-relaxed">
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