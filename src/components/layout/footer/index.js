/**
 * Internal Dependencies.
 */
import { getPathNameFromUrl, sanitize } from '../../../utils/miscellaneous';

/**
 * External Dependencies.
 */
import { isEmpty, isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import playstoreicon from '../../../../public/assets/img/google-play-store.svg';
import appstoreicon from '../../../../public/assets/img/app-store.svg';
import appbarcode from '../../../../public/assets/img/pto-app.png';

const Footer = ({ footer, header }) => {

	const { footerMenuItems, footerMenuItems2, footerMenuItems3, admin_email } = footer || {};
	const { social_media_list, payments, whatsapp_link, whatsapp, facebook_link, app_store_link, play_store_link } = footer?.options || {};
	const { siteTitle } = header || {};
	const [isMounted, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		function handleScroll() {
			setIsVisible(window.scrollY > 100); // Show the button when scrolled down by 100px
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}


	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [isOpen4, setIsOpen4] = useState(false);

	const toggleMenuFooter1 = () => {
		setIsOpen1(!isOpen1);
	};

	const toggleMenuFooter2 = () => {
		setIsOpen2(!isOpen2);
	};

	const toggleMenuFooter3 = () => {
		setIsOpen3(!isOpen3);
	};

	const toggleMenuFooter4 = () => {
		setIsOpen4(!isOpen4);
	};

	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const lastClosedTime = localStorage.getItem('popupLastClosedTime');
		const delayBeforePopupOpen = 24 * 60 * 60 * 1000; // 24 hours

		if (!lastClosedTime || (Date.now() - parseInt(lastClosedTime)) >= delayBeforePopupOpen) {
			const timer = setTimeout(() => {
				setModalOpen(true);
				localStorage.setItem('popupLastClosedTime', new Date().toString());
			}, 8000);

			return () => clearTimeout(timer);
		} else {
			setModalOpen(false);
		}

	}, []);

	const closeModal = () => {
		setModalOpen(false);
		localStorage.setItem('popupLastClosedTime', new Date().toString());
	};

	return (
		<>
			<div className="container mx-auto py-20">
				<button
					onClick={() => setModalOpen(true)}
					className="rounded-full bg-victoria-800 py-3 px-6 font-medium text-white"
				>
					Open Modal
				</button>
			</div>
			<footer className="footer bg-chelsea-50 font-inter pt-10 border-t-2 border-victoria-800">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden">
						<div className='md:bg-inherit bg-victoria-100 rounded'>
							<h2 onClick={toggleMenuFooter1} className="md:pointer-events-none relative md:text-2xl text-lg font-medium md:mb-5 md:text-chelsea-400 font-jost before:content-[''] md:before:w-12 before:h-[3px] before:absolute before:-bottom-1 before:left-0 before:bg-chelsea-400 before:rounded md:p-0 p-2">
								Company
								<i className={`md:hidden absolute right-2.5 top-3.5 transition-transform duration-300 transform fa-solid fa-chevron-down ${isOpen1 ? '-scale-100' : ''}`}></i>
							</h2>
							{!isEmpty(footerMenuItems) && isArray(footerMenuItems) ? (
								<ul className={`bottom-menu md:opacity-100 transition-all duration-500 ease-in-out opacity-${isOpen1 ? '100' : '0'} transform ${isOpen1 ? ' translate-y-0 border-t border-victoria-800 p-2' : '-translate-y-2'}`} style={{ maxHeight: isOpen1 ? '1000px' : '0' }}>
									{footerMenuItems.map(menuItem => (
										<li key={menuItem?.ID}>
											<Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'} dangerouslySetInnerHTML={{ __html: menuItem.title }} className='relative transition-all duration-500 ease hover:text-victoria-800 hover:pl-5 hover:font-medium before:content-["\f061"] before:left-[-15px] hover:before:left-0 before:absolute before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease' />
										</li>
									))}
								</ul>
							) : null}
						</div>
						<div className='md:bg-inherit bg-victoria-100 rounded'>
							<h2 onClick={toggleMenuFooter2} className="md:pointer-events-none relative md:text-2xl text-lg font-medium md:mb-5 md:text-chelsea-400 font-jost before:content-[''] md:before:w-12 before:h-[3px] before:absolute before:-bottom-1 before:left-0 before:bg-chelsea-400 before:rounded md:p-0 p-2">
								Popular Category
								<i className={`md:hidden absolute right-2.5 top-3.5 transition-transform duration-300 transform fa-solid fa-chevron-down ${isOpen2 ? '-scale-100' : ''}`}></i>
							</h2>
							{!isEmpty(footerMenuItems2) && isArray(footerMenuItems2) ? (
								<ul className={`bottom-menu md:opacity-100 transition-all duration-500 ease-in-out opacity-${isOpen2 ? '100' : '0'} transform ${isOpen2 ? ' translate-y-0 border-t border-victoria-800 p-2' : '-translate-y-2'}`} style={{ maxHeight: isOpen2 ? '1000px' : '0' }}>
									{footerMenuItems2.map(menuItem => (
										<li key={menuItem?.ID}>
											<Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'} dangerouslySetInnerHTML={{ __html: menuItem.title }} className='relative transition-all duration-500 ease hover:text-victoria-800 hover:pl-5 hover:font-medium before:content-["\f061"] before:left-[-15px] hover:before:left-0 before:absolute before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease' />
										</li>
									))}
								</ul>
							) : null}
						</div>
						<div className='md:bg-inherit bg-victoria-100 rounded'>
							<h2 onClick={toggleMenuFooter3} className="md:pointer-events-none relative md:text-2xl text-lg font-medium md:mb-5 md:text-chelsea-400 font-jost before:content-[''] md:before:w-12 before:h-[3px] before:absolute before:-bottom-1 before:left-0 before:bg-chelsea-400 before:rounded md:p-0 p-2">
								Customer Service
								<i className={`md:hidden absolute right-2.5 top-3.5 transition-transform duration-300 transform fa-solid fa-chevron-down ${isOpen3 ? '-scale-100' : ''}`}></i>
							</h2>
							{!isEmpty(footerMenuItems3) && isArray(footerMenuItems3) ? (
								<ul className={`bottom-menu md:opacity-100 transition-all duration-500 ease-in-out opacity-${isOpen3 ? '100' : '0'} transform ${isOpen3 ? ' translate-y-0 border-t border-victoria-800 p-2' : '-translate-y-2'}`} style={{ maxHeight: isOpen3 ? '1000px' : '0' }}>
									{footerMenuItems3.map(menuItem => (
										<li key={menuItem?.ID}>
											<Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'} dangerouslySetInnerHTML={{ __html: menuItem.title }} className='relative transition-all duration-500 ease hover:text-victoria-800 hover:pl-5 hover:font-medium before:content-["\f061"] before:left-[-15px] hover:before:left-0 before:absolute before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease' />
										</li>
									))}
								</ul>
							) : null}
						</div>
						<div className='md:bg-inherit bg-victoria-100 rounded'>
							<h2 onClick={toggleMenuFooter4} className="md:pointer-events-none relative md:text-2xl text-lg font-medium md:mb-5 md:text-chelsea-400 font-jost before:content-[''] md:before:w-12 before:h-[3px] before:absolute before:-bottom-1 before:left-0 before:bg-chelsea-400 before:rounded md:p-0 p-2">
								Contact Us
								<i className={`md:hidden absolute right-2.5 top-3.5 transition-transform duration-300 transform fa-solid fa-chevron-down ${isOpen4 ? '-scale-100' : ''}`}></i>
							</h2>
							<div className={`bottom-menu md:opacity-100 transition-all duration-500 ease-in-out opacity-${isOpen4 ? '100' : '0'} transform ${isOpen4 ? ' translate-y-0 border-t border-victoria-800 p-2 menuopen' : '-translate-y-2'}`} style={{ maxHeight: isOpen4 ? '1000px' : '0' }}>
								<ul className='break-all'>
									<li className='flex items-center mb-2'>
										<i className='fal fa-envelope fa-xl mr-2 w-6'></i>
										<Link href={`mailto:${admin_email}`} className='hover:text-victoria-800'>{admin_email}</Link>
									</li>
									<li className='flex items-center mb-2'>
										<i className='fa-sharp fa-light fa-location-dot fa-xl mr-2 w-6 text-center'></i>
										<p>Hazelwood Park, SA 5066</p>
									</li>
									<li className='flex items-center'>
										<i className='fa-light fa-star fa-xl mr-2 w-6'></i>
										<p>ABN : 32 261 654 431</p>
									</li>
								</ul>
								<div className='my-3'>
									<Link href={whatsapp_link} target='_blank' className='group bg-green-400 rounded flex items-center w-fit px-1 '>
										<span className='inline-block group-hover:origin-center group-hover:rotate-360 transition-all duration-500 ease'>
											<i className='fab fa-whatsapp fa-2xl text-white px-2'></i>
										</span>
										<p className='flex flex-col text-sm font-medium'>
											<span>Message Only</span>
											{whatsapp}
										</p>
									</Link>
								</div>
								{(() => {
									if (!isEmpty(social_media_list)) {
										if (social_media_list.length > 0) {
											return (
												<ul key="socialMedia_list" className='flex mb-3'>
													{
														social_media_list.map(socialMediaItem => {
															const bgcolor = 'bg-' + socialMediaItem.social_name;
															return (
																<li className='mr-2'>
																	<Link href={socialMediaItem.social_link} target="_blank" className={`w-10 h-10 inline-block text-center rounded ${bgcolor}`}>
																		<i className={`fab fa-${socialMediaItem.social_name} text-2xl text-white leading-10`}></i>
																	</Link>
																</li>
															)
														})
													}
												</ul>
											);
										}
									}
								})()}
								<div dangerouslySetInnerHTML={{ __html: facebook_link }} className=''></div>
								<h2 className="relative text-2xl font-medium mb-5 text-chelsea-400 font-jost before:content-[''] before:w-12 before:h-[3px] before:absolute before:-bottom-1 before:left-0 before:bg-chelsea-400 before:rounded">Get Our App</h2>

								<div className='flex items-center'>
									<Image
										src={appbarcode}
										alt="App Qr Code"
										width={70}
										height='auto'
										className='border shadow-lg'
									/>
									<Link href={app_store_link} target='_blank' className='ms-3'>
										<Image
											src={appstoreicon}
											alt="App Store Icon"
											width={50}
											height='auto'
											className='rounded-lg'
										/>
									</Link>
									<Link href={play_store_link} target='_blank' className='ms-3'>
										<Image
											src={playstoreicon}
											alt="Play Store Icon"
											width={55}
											height='auto'
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='pay-icon border-y border-victoria-800 p-2 mt-4'>
					{(() => {
						if (!isEmpty(payments)) {
							if (payments.length > 0) {
								return (
									<ul key="paymentOptions_list" className='flex justify-center flex-wrap gap-y-2'>
										{
											payments.map(payments => {
												if (payments.payment_url != '') {
													return (
														<li className='bg-white border mx-1 p-0.5'>
															<Link href={payments.payment_url} target='_blank'>
																<Image
																	src={payments.payment_logos}
																	alt={payments.payment_title}
																	width={90}
																	height={40}
																/>
															</Link>
														</li>
													)
												} else {
													return (
														<li className='bg-white border mx-1 p-0.5'>
															<Image
																src={payments.payment_logos}
																alt={payments.payment_title}
																width={90}
																height={40}
															/>
														</li>
													)
												}
											})
										}
									</ul>
								);
							}
						}
					})()}
				</div>
				<div className='copyright py-4 px-2 text-center'>
					<p>Copyright {new Date().getFullYear()} <Link href='/' className='underline underline-offset-4 font-semibold text-victoria-800'>{siteTitle}</Link> - © All rights reserved</p>
				</div>
			</footer>
			<button onClick={scrollToTop} className={`fixed right-5 w-10 h-10 rounded bg-victoria-800 text-white transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 bottom-5' : 'opacity-0 -bottom-5'}`}><i className='fa fa-arrow-up'></i> </button>
			<section className='home-auto-popup'>
				{modalOpen && (
					<div className="fixed z-20 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5">
						<div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px] relative">
							<button
								onClick={closeModal}
								className="absolute top-0 right-0 m-4 text-xl text-gray-500 hover:text-gray-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
								Your Message Sent Successfully
							</h3>
							<span className="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-victoria-800"></span>
							<p className="mb-10 text-base leading-relaxed text-body-color">
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
							</p>
							<div className="-mx-3 flex flex-wrap">
								<div className="w-1/2 px-3">
									<button
										onClick={closeModal}
										className="block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white"
									>
										Cancel
									</button>
								</div>
								<div className="w-1/2 px-3">
									<button
										className="block w-full rounded-lg border border-primary bg-victoria-800 p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
									>
										View Details
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default Footer;