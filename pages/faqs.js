/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import { useEffect } from 'react';
import axios from 'axios';
import Layout from '../src/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import icon1 from '../public/assets/img/fq-order.png';
import icon2 from '../public/assets/img/fq-shopping.png';
import icon3 from '../public/assets/img/fq-return.png';
import icon4 from '../public/assets/img/fq-refunds.png';
import icon5 from '../public/assets/img/fq-product.png';
import shippingcost from '../public/assets/img/shipping-cost.webp';

import addtocart from '../public/assets/img/add-to-cart.webp';
import clicktocart from '../public/assets/img/click-to-cart.webp';
import clikccheckout from '../public/assets/img/click-checkout.webp';
import fillupdetail from '../public/assets/img/fillup-detail.webp';
import placeorder from '../public/assets/img/place-order.webp';
import viewcart from '../public/assets/img/click-viewcart.webp';
import clickx from '../public/assets/img/click-x.webp';
import rewardaccount from '../public/assets/img/rewards-point-account.webp';
import rewardpoint from '../public/assets/img/rewards-point.webp';


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
			question: "When will my order ship ?",
			answer: (
				<>
					<p>It generally takes 24-48 hrs (working days) for us to process and dispatch your order.</p>
				</>
			),
		},
		{
			question: "My order has not dispatched yet, what should I do ?",
			answer: (
				<>
					<p>Standard processing times for orders are within 24-48 hours (working days). If still it's not dispatched, then you can contact us and our team will provide you with the update.</p>
				</>
			),
		},
		{
			question: "When will my order arrive? / My estimated delivery time ?",
			answer: (
				<>
					<p>The usual delivery time for all the areas are as below :-</p>
					<ul class='liarrow'>
						<li>– In Victoria, approximately 8 – 13 working days</li>
						<li>– In NSW, SA, ACT, QLD, approximately 10 – 15 working days</li>
						<li>– In WA, NT and TAS, approximately 12 – 19 working days</li>
					</ul>
					<p>*If courier people are busy in particular route then could be further delays.</p>
				</>
			),
		},
		{
			question: "What hapens to delivery if I am not home ?",
			answer: (
				<>
					<p>We have an option to add Delivery Notes while placing the order. You can either provide a special instruction or mention the safe place/location to safely drop the order.</p>
				</>
			),
		},
		{
			question: "Change Delivery Address",
			answer: (
				<>
					<p>Once the order is dispatched, we cannot change or update the address.You need to carefully put & review your details while placing the order.</p>
				</>
			),
		},
		{
			question: "Can I add items or amend my order ?",
			answer: (
				<>
					<p>Sorry once the order is placed, we cannot amend or add new items to it. Unfortunately, we cannot add items, exchange or amend the orders.</p>
				</>
			),
		},
		{
			question: "I made a mistake while placing the order. How can I change it ?",
			answer: (
				<>
					<p>You need to contact us immediately via Live chat, Email or Whatsapp Messages. We will try our best to updates it, but due to auto sync system, we cant gurantee that we can change the order.</p>
				</>
			),
		},
		{
			question: "I haven't received my order yet?",
			answer: (
				<>
					<p>
						You can track your order through the tracking provided to you to check it's status. For more details, you may contact us at <a href='mailto: sales@pooltableoffers.com.au'>sales@pooltableoffers.com.au</a> and our team will
						respond you asap.
					</p>
				</>
			),
		},
		{
			question: "I only received partial delivery",
			answer: (
				<>
					<p>We dispatch the items simultaneously, but an individual parcels, so chances are there that they might get separated during transit. Please allow few more days to get other parcels delivered.</p>
				</>
			),
		},
		{
			question: "Wrong Order/ Item received",
			answer: (
				<>
					<p>If you have received wrong order then you can let us know by contacting us via Email, Live Chat, Whatsapp messages Or Facebook and our support team will immediately respond you and will help you resolve the issue asap.Also you need to provide the clear photos of the wrongly received product.</p>
				</>
			),
		},
		{
			question: "Do you do express shipping?",
			answer: (
				<>
					<p>Sorry, we do not have express shipping option yet. We have standard delivery time frame for different areas.</p>
				</>
			),
		},
		{
			question: "What Couriers do you use?",
			answer: (
				<>
					<p>We use multiple courier partners to deliver orders as efficiently and effectively as possible.</p>
					<p> CURRENT LIST OF COURIERS : -</p>
					<ul class='liarrow'>
						<li>Auspost - 03 8847 9045</li>
						<li>Aramex Australia (Fastway) - <Link target='_blank' href='https://www.aramex.com.au/courier-locator'>https://www.aramex.com.au/courier-locator/</Link></li>
						<li>Toll - 1300 865 547</li>
						<li>Direct Freight Express - 1300 347 397</li>
						<li>Courier Please - 1300 36 1000</li>
						<li>Allied Express - 13 13 73</li>
						<li>Hunter Express - 02 9780 4099</li>
						<li>4PX Express - <Link target='_blank' href='https://4pxexpress.com.au/#contact_sub'>https://4pxexpress.com.au/#contact_sub</Link></li>
					</ul>
				</>
			),
		},
		{
			question: "Can I cancel the order after it is placed?",
			answer: (
				<>
					<p>Sorry, once the order is placed, it cannot be cancelled as we do not take much time to process the order.</p>
					<p> If you still do not need the order then you can reject the delivery.If the item is delivered, and is not wanted, we can arrange return of the item also.Please check our returns policy.</p>
				</>
			),
		},
		{
			question: "Can I provide delivery instructions for my order?",
			answer: (
				<>
					<p>Yes, you can provide instructons for delivery in the delivery note while placing the order.</p>
				</>
			),
		},
		{
			question: "My tracking is not working/updating?",
			answer: (
				<>
					<p>You might see the order is dispatched from warehouse but the tracking still shows invalid or no results appear.</p>
					<p> We suggest you to please kindly wait for the below stated no.of days for your state: -</p>
					<ul class='liarrow'>
						<li>VIC - 1-2 business days</li>
						<li>NSW - 2-4 business days</li>
						<li>SA - 2-3 business days</li>
						<li>QLD: 2-4 business days</li>
						<li>WA: 4-6 business days</li>
						<li>TAS: 1-2 business days</li>
						<li>NT: 4-6 business days</li>
						<li>ACT: 2-3 business days</li>
					</ul>
				</>
			),
		},
		{
			question: "Can you place order on my behalf?",
			answer: (
				<>
					<p>Yes, we can place the order and send the invocie on your behalf if you want to pay via Bank Transfer payment option.</p>
				</>
			),
		},
		{
			question: "What if I got damaged products?",
			answer: (
				<>
					<p>If received damaged or faulty product then please do contact us immediately via Email, live chat, whatsapp messages & facebook etc.</p>
					<p> Please share the photos & small video of showing the issue as well & our support team will respond to you asap and will help you resolve the issue.</p>
				</>
			),
		},
		{
			question: "What is the shipping cost?",
			answer: (
				<>
					<p>To check the shipping cost, simply put your postcode on the product page and it will automatically calculate and show the shipping cost. You can also contact us with your postcode and product details and we will check and confirm you the shipping cost</p>
					<Image
						src={shippingcost}
						alt="What is the shipping cost"
						width={930}
						height={440}
						className='mx-auto'
					/>
				</>
			),
		},
		{
			question: "Why I did not receive order confirmation mail?",
			answer: (
				<>
					<p>The order confirmation is sent to you immediately after placing the order via auto-mail.</p>
					<p> Please check your email spam folder, you might found there or you might have enter wrong email ID.</p>
					<p>You can contact us with your Full name and address so we can confirm the order for you and resend the email with updated email ID.</p>
				</>
			),
		},
	];

	const faqtwo = [
		{
			question: "How can I place the order online?",
			answer: (
				<>
					<p>You just need to search the products you want, choose them, select the quantity and add them to cart.</p>
					<p> Once the items are added to cart, you can click on proceed to checkout and then choose the payment option acording to your convenience and proceed to pay.</p>
					<p>Voila! your order will be placed successfully. For Example:</p>
					<p class='text-center font-semibold text-xl mt-5 mb-3'>Step-1</p>
					<Image
						src={addtocart}
						alt='addtocart'
						width={930}
						height='auto'
						className='mx-auto shadow-[0_0_6px_1px_#ddd]'
					/>
					<p class='text-center font-semibold text-xl mt-5 mb-3'>Step-2</p>
					<Image
						src={clicktocart}
						alt='clicktocart'
						width={930}
						height='auto'
						className='mx-auto shadow-[0_0_6px_1px_#ddd]'
					/>
					<Image
						src={clikccheckout}
						alt='clikccheckout'
						width={930}
						height='auto'
						className='mx-auto shadow-[0_0_6px_1px_#ddd]'
					/>

					<p class='text-center font-semibold text-xl mt-5 mb-3'>Step-3</p>
					<Image
						src={fillupdetail}
						alt='fillupdetail'
						width={930}
						height='auto'
						className='mx-auto shadow-[0_0_6px_1px_#ddd]'
					/>
					<p class='text-center font-semibold text-xl mt-5 mb-3'>Step-4</p>
					<Image
						src={placeorder}
						alt='placeorder'
						width={930}
						height='auto'
						className='mx-auto shadow-[0_0_6px_1px_#ddd]'
					/>
				</>
			),
		},
		{
			question: "Can I arrange pickup of the item?",
			answer: (
				<>
					<p>Sorry, we are exclusively an online store and do not provide pickup facility.</p>
				</>
			),
		},
		{
			question: "How can I get an update of stock for sold out items?",
			answer: (
				<>
					<p>You can go to the product page and enroll yourself by putting your email id to waiting list to get new stock arrival notification via email.</p>
				</>
			),
		},
		{
			question: "Do you price match?",
			answer: (
				<>
					<p>As an Australian business, we do our very best to bring you the lowest possible prices and on occasion we do run further sales and promotions.</p>
					<p> We cant gurantee on price match, but there's no harm to check with us.</p>
				</>
			),
		},
		{
			question: "What are the payment options available?",
			answer: (
				<>
					<p>Buy Now Pay Later Options:- Afterpay, Humm, Zippay, Laybuy, Wizit (Wizpay), Klarna, Paypal</p>
					<p> Pay Now Option: - Bank Transfer, Stripe, Google pay, Apple Pay, Paypal, Helloclever.</p>
				</>
			),
		},
		{
			question: "Do you have Showroom?",
			answer: (
				<>
					<p>We are exclusively an online store and do not have a showroom to visit in person.</p>
				</>
			),
		},
		{
			question: "How do I remove items?",
			answer: (
				<>
					<p>Please go to cart page & click on 'X' button of the item you want to remove at the cart page and it will be removed from there.</p>

					<Image
						src={clicktocart}
						alt='clicktocart'
						width={930}
						height='auto'
						className='mx-auto mb-3 shadow-[0_0_6px_1px_#ddd]'
					/>
					<Image
						src={viewcart}
						alt='viewcart'
						width={930}
						height='auto'
						className='mx-auto mb-3 shadow-[0_0_6px_1px_#ddd]'
					/>
					<Image
						src={clickx}
						alt='clickx'
						width={930}
						height='auto'
						className='mx-auto mb-3 shadow-[0_0_6px_1px_#ddd]'
					/>
				</>
			),
		},
		{
			question: "Where & How can I use Live Chat?",
			answer: (
				<>
					<p>The live chat option is available at the bottom right corner of the page and is available during *Mon-Sat till 9:30 PM AEST.</p>
				</>
			),
		},
		{
			question: "Where Can I check my Rewards Point?",
			answer: (
				<>
					<p>You need to login to My Account and click on the reward points tab on the dashboard page and you will get the current status of your reward points.</p>

					<Image
						src={rewardaccount}
						alt='rewardaccount'
						width={930}
						height='auto'
						className='mx-auto'
					/>
				</>
			),
		},
		{
			question: "How can I redeem my rewards point?",
			answer: (
				<>
					<p> You will get the option for using it at the checkout.The minimum reward points should be 100 to use it.</p>

					<Image
						src={rewardpoint}
						alt='rewardpoint'
						width={930}
						height='auto'
						className='mx-auto'
					/>
				</>
			),
		},
		{
			question: "Pricing",
			answer: (
				<>
					<p>The price shown on our online store will be applicable and we do update the pricing regularly as per the specified ongoing sale, plus if it's updated by the supplier.</p>
				</>
			),
		},
		{
			question: "Can I use more than 1 discount code?",
			answer: (
				<>
					<p>No, you can only use 1 coupon code at a time.</p>
				</>
			),
		},
		{
			question: "I live outside of Australia, can I send a gift to someone in Australia?",
			answer: (
				<>
					<p>Of course yes, you just need to put the billing address as your's and the shipping address of the person you want to send gift.</p>
					<p> Also, we do not send any physical invoice with the product so you do not have to worry about it.</p>
				</>
			),
		},
		{
			question: " How do I assemble the product?",
			answer: (
				<>
					<p>The assembly manual is sent with the product itself. You can simply follow the instructions from it and get it installed. If you have any problem you can contact us, we will ask our supplier and simplify as much as we can and if any video available, we can also forward it to you</p>
				</>
			),
		},
		{
			question: "What if I experience an error while placing the order?",
			answer: (
				<>
					<p>If you face any kind of technical issue in placing the order, you can immediately contact us via live chat, email or whatsapp messages. Our team will look into it and will solve the issue asap. Also please send us the screenshot to understand it better, if possible.</p>
				</>
			),
		},
		{
			question: "How do I know if a product will fit into my house?",
			answer: (
				<>
					<p>For your ease and convenience, we have provided dimensions of every product which clearly specifies the length, width & height of the product. You can measure the space accordingly.</p>
				</>
			),
		},
		{
			question: "How can i know about ongoing & Upcoming Sales & promotions?",
			answer: (
				<>
					<p>You can subscribe to our newsletters which will keep you updated for the special sale & promotions on the products. Also follow us on our social media platforms.</p>
					".$social."
				</>
			),
		},
		{
			question: "Can I use my own delivery service?",
			answer: (
				<>
					<p>Sorry, we only deliver through our courier partners only and do not accept third party pickup at all.</p>
				</>
			),
		},
	];

	const faqthree = [
		{
			question: "Can I exchange the product with other item?",
			answer: (
				<> <p>We can arrange the return of the product, provided it must be in original packing.</p>
					<p> We will than provide you the store credit after returning the product back to us and then you can use it to make your next purchase.</p>
					<p>* Return charges will be incurred in case of change of mind <Link href='/warranty-return-policy/' class='alink-color'>(return policy)</Link>
					</p>
				</>
			),
		},
		{
			question: "How can I return the order?",
			answer: (
				<> <p>Yes you can. Product must be in original packing & you need to contact us via Email, Live Chat, whatsapp messages or Facebook and let us know you want to return the product along with the reason and photos of the product. Our support team will get back to you & help you out accordingly.</p>
					<p>* In case of change of mind, return charges will be incurred.</p>
				</>
			),
		},
		{
			question: "What is your return policy?",
			answer: (
				<> <p>We can arrange for the return but for return in case of change of mind, it will incur the return cost which will be calculated by the warehouse team in coordination with the courier company & will let you know.</p>
					<p> On approval from your end, we will send you the return postage stamp for returning the shipment back to our warehouse and also can send you the return address to post it back to us, if needed.</p>
					<p>Moreover, we equally need the confirmation from your end, that the product is still in the original packaging by sending a photograph of the same. On receiving the shipment back to the warehouse & inspected by team, we will initiate a refund by deducting the agreed return cost via the original payment made.</p>
				</>
			),
		},
	];

	const faqfour = [
		{
			question: "When will I get my refund?",
			answer: (
				<>
					<p>The refund normally takes 1-3 business days to process from the account team, once approved. It takes a few days to receive the refund to your account, depending on your bank.</p>
				</>
			),
		},
		{
			question: "Through which way I get my refund?",
			answer: (
				<>
					<p>The refund is always processed via the original mode of payment used to place the order in 1-3 business days, once approved.</p>
				</>
			),
		},
		{
			question: "If i pay via Afterpay or any other Buy Now Pay Later (BNPL) option than what happens?",
			answer: (
				<>
					<p>We will apply for a refund via original payment mode and you can login and check to your BNPL account and see the refund there. Your BNPL payment provider will refund your bank account, if any amount needs to be refunded to you.</p>
				</>
			),
		},
	];

	const faqfive = [
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

	useEffect(() => {
		const handleClick = (event) => {
			event.preventDefault();
			const targetHref = event.target.getAttribute('href');
			const targetId = targetHref.split('#')[1]; // Get the ID from the href
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				const targetOffset = targetElement.getBoundingClientRect().top;
				window.scrollTo({
					top: window.pageYOffset + targetOffset - 170,
					behavior: 'smooth',
				});
			}
		};

		if (document.getElementById('top_smooth').classList.contains('offset-top')) {
			document.querySelectorAll('.offset-top a[href*="#"]').forEach((link) => {
				link.addEventListener('click', handleClick);
			});
		}

		return () => {
			document.querySelectorAll('.offset-top a[href*="#"]').forEach((link) => {
				link.removeEventListener('click', handleClick);
			});
		};
	}, []);


	return (
		<Layout headerFooter={headerFooter || {}} seo={seo} >
			<section>
				<div className="max-w-[1320px] mx-auto space-y-5">
					<div className='flex gap-5 flex-wrap justify-center border-b border-victoria-800 pb-11 offset-top' id='top_smooth'>
						<div>
							<Link href='#faqone' className='w-96 flex items-center gap-3 p-2 shadow-full'>
								<Image
									src={icon1}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Orders, Shipping & Delivery
							</Link>
						</div>
						<div>
							<Link href='#faqtwo' className='w-96 flex items-center gap-3 p-2 shadow-full'>
								<Image
									src={icon2}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Shopping Online
							</Link>
						</div>
						<div>
							<Link href='#faqthree' className='w-96 flex items-center gap-3 p-2 shadow-full'>
								<Image
									src={icon3}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Return Or Exchange orders
							</Link>
						</div>
						<div>
							<Link href='#faqfour' className='w-96 flex items-center gap-3 p-2 shadow-full'>
								<Image
									src={icon4}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Refunds
							</Link>
						</div>
						<div>
							<Link href='#faqfive' className='w-96 flex items-center gap-3 p-2 shadow-full'>
								<Image
									src={icon5}
									alt="Orders, Shipping & Delivery"
									width={50}
									height={50}
								/>
								Products
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqone'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Find Orders, Shipping & Delivery</h2>
						{faqone.map((faq) => (
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
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqtwo'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Shopping Online</h2>
						{faqtwo.map((faq) => (
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
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqthree'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Return Or Exchange Orders</h2>
						{faqthree.map((faq) => (
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
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqfour'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Refunds</h2>
						{faqfour.map((faq) => (
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
					</div>
					<div className='grid grid-cols-1 gap-5' id='faqfive'>
						<h2 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 mt-5 title-border'>Products</h2>
						{faqfive.map((faq) => (
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