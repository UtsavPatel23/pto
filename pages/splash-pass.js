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
import splashbanner from '../public/assets/img/splash-banner.webp';
import adduser from '../public/assets/img/add-user.png';
import onlineshop from '../public/assets/img/online-shopping.png';
import authenticity from '../public/assets/img/authenticity.png';
import bronze from '../public/assets/img/bronze.webp';
import silver from '../public/assets/img/silver.webp';
import gold from '../public/assets/img/gold.webp';
import platinum from '../public/assets/img/platinum.webp';
import user from '../public/assets/img/user.png';
import gift from '../public/assets/img/gift.png';
import rating from '../public/assets/img/rating.png';
import photo from '../public/assets/img/photo.png';
import video from '../public/assets/img/video.png';
import faqtrophy from '../public/assets/img/faqtrophy.png';


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

	const siteTitle = '';
	const faqData = [
		{
			id: 0,
			question: "What is the Splash Pass Reward Program, and how does it work?",
			answer: (
				<>
					<p>Our Splash Pass Reward Program is designed to reward our loyal customers with exclusive benefits based on their spending. There are four Splash Pass Reward types</p>
					<Image src={faqtrophy} alt="FAQ Trophy" width={884} height={168} className='mx-auto' />
					<p>As you spend more, you automatically move up to higher Splash Pass Reward tiers, unlocking greater rewards.</p>
				</>
			),
		},
		{
			id: 1,
			question: "How do I join the Splash Pass Reward Program?",
			answer: (
				<>
					<p>When you sign up & purchase at our store, you are automatically enrolled in our Splash Pass Reward Program. There are no additional sign-up fees, and it's free. Your total spending with us determines your Reward level.</p>
				</>
			),
		},
		{
			id: 2,
			question: "What are the benefits of the Splash Pass Bronze Reward?",
			answer: (
				<>
					<p>Customers who sign up will automatically qualify for Splash Pass Bronze Reward (Start From Sign & till $750 in purchases) enjoy the following perks</p>
					<div className="relative overflow-x-auto mt-3 md:w-8/12	mx-auto">
						<table className="border-collapse w-full border border-slate-300">
							<thead>
								<tr className='align-bottom'>
									<th className='border border-slate-300 p-2 text-left'>REWARDS</th>
									<th className='border border-slate-300 p-2'>
										<Image src={bronze} alt="Bronze Trophy" width={100} height={100} className='mx-auto mb-3' />
										$1-$750
									</th>
								</tr>
							</thead>
							<tbody className='border-t-2 border-black text-center'>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Early Sale Access</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Cashback As A Store Credit</td>
									<td className='border border-slate-300 p-2'>3%</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Monthly Vouchers</td>
									<td className='border border-slate-300 p-2'>$10</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Birthday Discount</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Level-UP Gifts</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Free Xmas Gift</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Surprise Rewards</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
							</tbody>
						</table>
					</div>
				</>
			),
		},
		{
			id: 3,
			question: "What additional perks come with the Splash Pass Silver Reward?",
			answer: (
				<>
					<div className="relative overflow-x-auto mt-3 md:w-8/12	mx-auto">
						<table className="border-collapse w-full border border-slate-300">
							<thead>
								<tr className='align-bottom'>
									<th className='border border-slate-300 p-2 text-left'>REWARDS</th>
									<th className='border border-slate-300 p-2'>
										<Image src={silver} alt="silver Trophy" width={100} height={100} className='mx-auto mb-3' />
										$751-$1750
									</th>
								</tr>
							</thead>
							<tbody className='border-t-2 border-black text-center'>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Early Sale Access</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Cashback As A Store Credit</td>
									<td className='border border-slate-300 p-2'>5%</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Monthly Vouchers</td>
									<td className='border border-slate-300 p-2'>$15</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Birthday Discount</td>
									<td className='border border-slate-300 p-2'>$20</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Level-UP Gifts</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Free Xmas Gift</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Surprise Rewards</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
							</tbody>
						</table>
					</div>
				</>
			),
		},
		{
			id: 4,
			question: "What advantages does the Splash Pass Gold Reward?",
			answer: (
				<>
					<div className="relative overflow-x-auto mt-3 md:w-8/12	mx-auto">
						<table className="border-collapse w-full border border-slate-300">
							<thead>
								<tr className='align-bottom'>
									<th className='border border-slate-300 p-2 text-left'>REWARDS</th>
									<th className='border border-slate-300 p-2'>
										<Image src={gold} alt="gold Trophy" width={100} height={100} className='mx-auto mb-3' />
										$1751-$5000
									</th>
								</tr>
							</thead>
							<tbody className='border-t-2 border-black text-center'>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Early Sale Access</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Cashback As A Store Credit</td>
									<td className='border border-slate-300 p-2'>7%</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Monthly Vouchers</td>
									<td className='border border-slate-300 p-2'>$20</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Birthday Discount</td>
									<td className='border border-slate-300 p-2'>$20</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Level-UP Gifts</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Free Xmas Gift</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Surprise Rewards</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
								</tr>
							</tbody>
						</table>
					</div>
				</>
			),
		},
		{
			id: 5,
			question: "What distinguishes the Splash Pass Platinum Reward?",
			answer: (
				<>
					<div className="relative overflow-x-auto mt-3 md:w-8/12	mx-auto">
						<table className="border-collapse w-full border border-slate-300">
							<thead>
								<tr className='align-bottom'>
									<th className='border border-slate-300 p-2 text-left'>REWARDS</th>
									<th className='border border-slate-300 p-2'>
										<Image src={platinum} alt="platinum Trophy" width={100} height={100} className='mx-auto mb-3' />
										$5k+
									</th>
								</tr>
							</thead>
							<tbody className='border-t-2 border-black text-center'>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Early Sale Access</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Cashback As A Store Credit</td>
									<td className='border border-slate-300 p-2'>10%</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Monthly Vouchers</td>
									<td className='border border-slate-300 p-2'>$25</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Birthday Discount</td>
									<td className='border border-slate-300 p-2'>$20</td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Level-UP Gifts</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Free Xmas Gift</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
								<tr>
									<td className='border border-slate-300 p-2 text-left'>Surprise Rewards</td>
									<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
								</tr>
							</tbody>
						</table>
					</div>
				</>
			),
		},
		{
			id: 6,
			question: "How do I track my Splash Pass Reward status?",
			answer: (
				<>
					<p>Your Splash Pass Reward status is automatically updated based on your total spending. You can view your current status and benefits in your account dashboard. And You get EMail from us as well.</p>
				</>
			),
		},
		{
			id: 7,
			question: "Can I downgrade my Splash Pass Reward type?",
			answer: (
				<>
					<p>No, the Splash Pass Reward Program is designed to reward you as you spend more, and downgrading is not an option. However, you can enjoy the benefits of your current tier and look forward to upgrading with future purchases.</p>
				</>
			),
		},
		{
			id: 8,
			question: "Do I need to manually renew my Splash Pass Reward?",
			answer: (
				<>
					<p>No, your Splash Pass Reward is renewed automatically based on your spending. As long as you meet the minimum spending requirement, you'll continue to enjoy the benefits of your current Splash Pass Reward type.</p>
				</>
			),
		},
		{
			id: 9,
			question: "What happens if I don't meet the minimum spending requirement?",
			answer: (
				<>
					<p>If your spending falls below the minimum requirement for your current tier, you will still retain the benefits of your existing tier for the next month. To unlock higher benefits, simply reach the required spending level.</p>
				</>
			),
		},
		{
			id: 10,
			question: "Can I share my Splash Pass Reward benefits with friends or family?",
			answer: (
				<>
					<p>No, Splash Pass Reward benefits are exclusive to the account holder and cannot be transferred. However, your friends and family can also enjoy these perks by creating their own accounts and participating in the Splash Pass Reward Program.</p>
				</>
			),
		},
		{
			id: 11,
			question: "How often are the Monthly Vouchers issued, and when do they expire?",
			answer: (
				<>
					<p>Monthly Vouchers are issued on a monthly basis and renew automatically, if needed to. They expire at the end of each month, so be sure to use them before the expiration date to maximise your savings.</p>
				</>
			),
		},
		{
			id: 12,
			question: "Can I combine multiple vouchers for a single purchase?",
			answer: (
				<>
					<p>No, only one voucher can be applied per purchase. However, you can save your vouchers for future transactions, allowing you to enjoy discounts over multiple shopping sessions.</p>
				</>
			),
		},
		{
			id: 13,
			question: " Is there a limit to the number of times I can use my Exclusive Splash Pass Reward Cashback?",
			answer: (
				<>
					<p>No, there is no limit to the number of times you can use your Exclusive Splash Pass Reward Cashback. Feel free to enjoy the cashback benefits on all eligible purchases.</p>
				</>
			),
		},
		{
			id: 14,
			question: "What type of surprises can Splash Pass Platinum members expect?",
			answer: (
				<>
					<p>The surprises for Platinum members vary and may include exclusive product releases, Personalised gifts. We aim to make your Splash Pass Platinum experience truly exceptional.</p>
				</>
			),
		},
		{
			id: 15,
			question: "Can I upgrade my Splash Pass Reward instantly if I make a large purchase?",
			answer: (
				<>
					<p>Yes, your Splash Pass Reward status is updated based on your total spending. If a single purchase brings you to the next spending tier, your Reward will be upgraded immediately.</p>
				</>
			),
		},
		{
			id: 16,
			question: "Can I see the history of my Splash Pass Reward status and benefits?",
			answer: (
				<>
					<p>Yes, you can view your Splash Pass Reward history, including status changes and benefit updates, in your account dashboard. This provides transparency and allows you to track your journey through our Splash Pass Reward Program.</p>
				</>
			),
		},
		{
			id: 17,
			question: "What happens if I return a purchase that contributed to my Splash Pass Reward spending?",
			answer: (
				<>
					<p>If you return a purchase, the corresponding spending amount will be deducted from your total. This may affect your Splash Pass Reward status, and you may move to a lower tier if the return drops your spending below the minimum requirement.</p>
				</>
			),
		},
		{
			id: 18,
			question: "Can I stack discounts and promotions with my Splash Pass Reward benefits?",
			answer: (
				<>
					<p>Splash Pass Reward benefits cannot be combined with other discounts or promotions unless explicitly stated. Check the terms and conditions of specific promotions for more details.</p>
				</>
			),
		},
		{
			id: 19,
			question: "Can I transfer my Splash Pass Reward to someone else?",
			answer: (
				<>
					<p>Splash Pass Rewards are non-transferable and tied to the account holder. They cannot be transferred or gifted to another account.</p>
				</>
			),
		},
		{
			id: 20,
			question: "What happens if I forget to use my Monthly Voucher before it expires?",
			answer: (
				<>
					<p>Unfortunately, expired Monthly Vouchers cannot be reinstated or used. We recommend keeping track of your vouchers and utilising them before the expiration date.</p>
				</>
			),
		},
		{
			id: 21,
			question: "How can I update my contact information associated with my Splash Pass Reward?",
			answer: (
				<>
					<p>You can update your contact information, including contact number and mailing address, in your account settings. Ensure your details are current to receive timely updates and offers.</p>
				</>
			),
		},
		{
			id: 22,
			question: "Can I redeem my Monthly Vouchers for cash or store credit?",
			answer: (
				<>
					<p>Monthly Vouchers hold no cash value and cannot be redeemed for cash or store credit. They  are intended for use toward future purchases.</p>
				</>
			),
		},
		{
			id: 23,
			question: "How is the Splash Pass Membership spending calculated?",
			answer: (
				<>
					<p>Your Splash Pass Membership spending is calculated based on the total order amount since you joined our Reward program. It accumulates over time, allowing you to progress through the Reward tiers without the need to start a new each month.  Spending will count the actual amount paid in the order. It excludes any kind of discount, rewards and credit used to place the order. <b>(For Example, you place order of $100 and used $10 discount and $20 from the previous rewards balance, than you paying $70 as a final payment in AUD. So the new spending will be consider $70 only and we will calculate that's the amount for the membership benefits)</b></p>
				</>
			),
		},
		{
			id: 24,
			question: "Is there a time limit for reaching the next spending tier?",
			answer: (
				<>
					<p>There is no time limit for reaching the next spending tier. Your Splash Pass Reward status is determined by the cumulative order amount, providing flexibility for you to progress at your own pace.</p>
				</>
			),
		},
		{
			id: 25,
			question: "How are shipping fees and taxes factored into Splash Pass Reward spending?",
			answer: (
				<>
					<p>Splash Pass Reward spending includes the total final amount paid in AUD for the order, including product prices, shipping fees, and applicable taxes. All these elements contribute to your overall spending and Splash Pass Reward tier.</p>
				</>
			),
		},
		{
			id: 26,
			question: "Is my Splash Pass Reward spending linked to a specific calendar month?",
			answer: (
				<>
					<p>No, your Splash Pass Reward spending is not tied to a specific calendar month. It accumulates continuously based on the total order amount since you joined the program, providing a seamless and ongoing experience.</p>
				</>
			),
		},
		{
			id: 27,
			question: (
				<>
					{siteTitle} Loyalty Program Key Points
				</>
			),
			answer: (
				<>
					<ul className='liarrow'>
						<li>Participation is automatic based on cumulative purchase amounts, qualifying for Bronze, Silver, Gold, or Platinum membership tiers.</li>
						<li>{siteTitle} reserves the right to modify, suspend, or terminate the Loyalty Program at any time without prior notice.</li><li>Changes to the program will be communicated through the {siteTitle} website, email or other official channels, where we feel more appropriate.</li>
						<li>In the event of discontinuation, {siteTitle} is not liable for any loss or inconvenience experienced by members.</li>
						<li>Monthly credit vouchers may have specific conditions, such as a minimum purchase requirement.</li>
						<li>Members can track their status and benefits in the Membership section of their {siteTitle} account.</li>
						<li>For Loyalty Program inquiries, members can contact customer support for assistance.</li>
						<li>Benefits, including cashback and discounts, are subject to the terms and conditions outlined by {siteTitle}.</li>
						<li>Members are encouraged to regularly review the program's terms and conditions for updates.</li>
						<li>Participation in the {siteTitle} Loyalty Program is free, offering rewards as a thank you for choosing {siteTitle}.</li>
					</ul>
				</>
			),
		},
	];

	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='grid grid-cols-1'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border'>Welcome To Celebrate Your Splash Pass Rewards</h2>
						<Image
							src={splashbanner}
							alt="Splash Banner"
							width={1320}
							height={450}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-10'>
						<div className='bg-black text-white p-3 text-center rounded-lg shadow-[8px_8px_10px_0px_#e53e3e]'>
							<Image
								src={adduser}
								alt="Create a free account"
								width={80}
								height={80}
								className='mx-auto'
							/>
							<h3 className='font-semibold text-xl'>Create a free account</h3>
							<p><Link className="underline underline-offset-4 font-semibold" href="https://pooltableoffers.com.au/my-account/" target="_blank">Create a free account</Link> or <Link className="underline underline-offset-4 font-semibold" href="https://pooltableoffers.com.au/my-account/" target="_blank">Login</Link> to Pool Table Offers</p>
						</div>
						<div className='bg-black text-white p-3 text-center rounded-lg shadow-[8px_8px_10px_0px_#e53e3e]'>
							<Image
								src={onlineshop}
								alt="Shop & collect Points"
								width={80}
								height={80}
								className='mx-auto'
							/>
							<h3 className='font-semibold text-xl'>Shop & collect Points</h3>
							<p>Collect Splash Pass Rewards Points for every* $1 you spend at the Pool Table Offers</p>
						</div>
						<div className='bg-black text-white p-3 text-center rounded-lg shadow-[8px_8px_10px_0px_#e53e3e]'>
							<Image
								src={authenticity}
								alt="Enjoy the benefits!"
								width={80}
								height={80}
								className='mx-auto'
							/>
							<h3 className='font-semibold text-xl'>Enjoy the benefits!</h3>
							<p>Each time you reach the next level, you’ll enjoy more benefits!</p>
						</div>
					</div>
					<div className='grid grid-cols-1 pt-10'>
						<div className="relative overflow-x-auto">
							<table className="border-collapse w-full border border-slate-300">
								<thead>
									<tr className='align-bottom'>
										<th className='border border-slate-300 p-2 text-left'>REWARDS</th>
										<th className='border border-slate-300 p-2'>
											<Image
												src={bronze}
												alt="Bronze Trophy"
												width={100}
												height={100}
												className='mx-auto mb-3'
											/>
											$1-$750
										</th>
										<th className='border border-slate-300 p-2'>
											<Image
												src={silver}
												alt="Silver Trophy"
												width={100}
												height={100}
												className='mx-auto mb-3'
											/>
											$751-$1750
										</th>
										<th className='border border-slate-300 p-2'>
											<Image
												src={gold}
												alt="Gold Trophy"
												width={100}
												height={100}
												className='mx-auto mb-3'
											/>
											$1751-$5000
										</th>
										<th className='border border-slate-300 p-2'>
											<Image
												src={platinum}
												alt="Platinum Trophy"
												width={100}
												height={100}
												className='mx-auto mb-3'
											/>
											$5k+
										</th>
									</tr>
								</thead>
								<tbody className='border-t-2 border-black text-center'>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Early Sale Access</td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Cashback As A Store Credit</td>
										<td className='border border-slate-300 p-2'>3%</td>
										<td className='border border-slate-300 p-2'>5%</td>
										<td className='border border-slate-300 p-2'>7%</td>
										<td className='border border-slate-300 p-2'>10%</td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Monthly Vouchers</td>
										<td className='border border-slate-300 p-2'>$10</td>
										<td className='border border-slate-300 p-2'>$15</td>
										<td className='border border-slate-300 p-2'>$20</td>
										<td className='border border-slate-300 p-2'>$25</td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Birthday Discount</td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'>$20</td>
										<td className='border border-slate-300 p-2'>$20</td>
										<td className='border border-slate-300 p-2'>$20</td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Level-UP Gifts</td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Free Xmas Gift</td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
									</tr>
									<tr>
										<td className='border border-slate-300 p-2 text-left'>Surprise Rewards</td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-times text-red-600 fa-xl"></i></td>
										<td className='border border-slate-300 p-2'><i className="fa fa-check text-green-600 fa-xl"></i></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className='text-center inline-block my-10'>
							<Link href="/my-account" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>
								Join Now
							</Link>
						</div>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={user}
										alt="Create Account"
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Create Account</h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>1000 Points</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={gift}
										alt="Signup Gift As a Coupon Code "
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Signup Gift As a Coupon Code </h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>$10</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={rating}
										alt="Leave A feedback"
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Leave A feedback at the end of checkout page once order placed successfully</h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>1000 Points</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={rating}
										alt="Leave A Products Review Only"
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Leave A Products Review Only</h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>1000 Points</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={photo}
										alt="Leave A Products Review + image"
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Leave A Products Review + image</h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>1500 Points</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
						<div className="group relative block h-72 cursor-pointer">
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex items-center justify-center h-full transform border border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" >
								<div className="p-2 transition-opacity group-hover:absolute group-hover:opacity-0 text-center">
									<Image
										src={video}
										alt="Leave A Products Review + Image + Video"
										width={100}
										height={100}
										className='mx-auto mb-3'
									/>
									<h3 className='font-semibold text-xl'>Leave A Products Review + Image + Video</h3>
									<p className='bg-red-600 text-white mt-2 py-1 px-3 w-fit mx-auto'>3000 Points</p>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 space-y-3">
									<Link href="/my-account" target="_blank" className='inline-block w-52 p-3 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700'>Sign Up</Link>
									<p>Already a member? <Link href="/my-account" className="alink-color">Log in</Link></p>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-red-600 py-10 my-10 grid grid-cols-1'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 title-border text-white'>Splash Pass Rewards</h2>
						<h3 className='text-center text-white text-2xl'>Every 100 Points = $1</h3>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-5 m-5 !mb-0'>
							<div className='bg-black rounded-lg text-white text-center py-5 px-2'>
								<h5 className='ftext-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>$10</h5>
								<p>1000 Points</p>
							</div>
							<div className='bg-black rounded-lg text-white text-center py-5 px-2'>
								<h5 className='ftext-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>$20</h5>
								<p>2000 Points</p>
							</div>
							<div className='bg-black rounded-lg text-white text-center py-5 px-2'>
								<h5 className='ftext-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>$30</h5>
								<p>3000 Points</p>
							</div>
							<div className='bg-black rounded-lg text-white text-center py-5 px-2'>
								<h5 className='ftext-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>$40</h5>
								<p>4000 Points</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-5'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Find The Answers To Your Questions</h2>
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