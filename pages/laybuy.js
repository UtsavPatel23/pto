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
import laybuybanner from '../public/assets/img/bnpl/laybuy-banner.webp';
import pooltable from '../public/assets/img/bnpl/pool-table.png';
import pokertable from '../public/assets/img/bnpl/poker-table.png';
import soccer from '../public/assets/img/bnpl/soccer-table.png';
import laybuywishes from '../public/assets/img/bnpl/laybuy-wishes.webp';
import nofee from '../public/assets/img/bnpl/no-fee.webp';
import lbcard from '../public/assets/img/bnpl/laybuy-card.webp';
import boosspend from '../public/assets/img/bnpl/boos-your-spend.webp';
import desire from '../public/assets/img/bnpl/laybuy-desire.webp';


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

	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='grid grid-cols-1'>
						<Image
							src={laybuybanner}
							alt="Laybuy Banner"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pooltable}
								alt="Pool Table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Pool Table</h4>
						</Link>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
							<Image
								src={pokertable}
								alt="Poker table"
								width={120}
								height={120}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold'>Poker table</h4>
						</Link>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
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
							src={laybuywishes}
							alt="laybuywishes"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid md:grid-cols-3 gap-7'>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
							<Image
								src={nofee}
								alt="nofee"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>No interest, no fees</h4>
							<p>Experience fee freedom when you pay on time. Interest? Never</p>
						</Link>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
							<Image
								src={lbcard}
								alt="lbcard"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Laybuy Card</h4>
							<p>In-store shopping just got easier. Now you can tap to pay with Laybuy Card in Apple Wallet.</p>
						</Link>
						<Link href='#' className='bg-[#adb2f4] border border-[#7382d6] text-center space-y-2 p-3 rounded group'>
							<Image
								src={boosspend}
								alt="boosspend"
								width={150}
								height={150}
								className='mx-auto group-hover:scale-110 duration-300 ease-in-out'
							/>
							<h4 className='font-semibold text-xl'>Boost your spend</h4>
							<p>We created Boost so you can spend more than your Laybuy limit by paying the difference up front</p>
						</Link>
					</div>
					<div className='grid grid-cols-1'>
						<Image
							src={desire}
							alt="desire"
							width={1320}
							height={250}
						/>
					</div>
					<div className='grid grid-cols-1 space-y-3'>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6]">What is Laybuy?</h2>

						<p>Laybuy is one of Australia's most established payment platforms for enabling shoppers to order without having to pay in full right away. They provide the technology to break up the payment into 6 easy instalments over 6 weeks.</p>

						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4">How does it work?</h2>
						<p>To use Laybuy, simply choose it as a payment method when you checkout from an online retailer who provides it. You pay the first instalment at the time you place the order, and then there will be 5 following interest-free payments over the next 5 weeks.</p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4">Who can use Laybuy? </h2>
						<p>Be at least 18 years of age<br />
							Be a resident of Australia, New Zealand or the United Kingdom (excluding Ireland)<br />
							Have a valid email address and phone number<br />
							Have a valid drivers license<br />
							Have a valid credit card or debit card<br />
						</p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4">What does it cost? </h2>
						<p>Laybuy doesn't charge any Interest or upfront fees. However if you miss a payment, there may be a $10 late payment fee. </p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4"> What shops have Laybuy?</h2>
						<p> There are a range of shops that offer the payment platform. Pay it easy with leading online retailers who offer Laybuy. Simply use the search above to find a list of merchants. You'll find most types of products you are looking for can be found with a shop that has Laybuy. This payment method is also available in the United Kingdom. View a list of the Best Laybuy Shops in the UK.</p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4">How can I contact Laybuy support?</h2>
						<p> To get in touch with their customer service team, we recommend that you follow the steps at: <Link href="https://help.laybuy.com" class="alink-color">https://help.laybuy.com/</Link> </p>
						<h2 className="font-jost text-3xl font-semibold mt-5 text-[#7382d6] pt-4"> Shopping at Pool Table Offers just got easier</h2>
						<p>Don't you hate it when it's a few days before you get paid, you see an amazing price on an item you must have, but there's no money in your account? Don't let your dream item get away from you, use Laybuy to help transform the way you buy things online. Here at Pool Table Offers we love Laybuy as it allows our customers the freedom to have the products they want now, and pay in easy to manage instalments . You pay only the purchase price by choosing this method, and process couldn't be simpler or easier. Take advantage of Laybuy , all the great online shops are using it. Shop with Laybuy and get the products you want now!</p>

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