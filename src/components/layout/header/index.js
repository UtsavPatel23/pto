import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { AppContext } from '../../context';
import { getPathNameFromUrl } from '../../../utils/miscellaneous';
import Search from '../../search';
import { WEB_DEVICE } from '../../../utils/constants/endpoints';
import Image from 'next/image';
import menustyles from './topmenu.module.css';
import playstoreicon from '../../../../public/assets/img/google-play-store.svg';
import appstoreicon from '../../../../public/assets/img/app-store.svg';
import CartItem from '../../cart/cart-item-mini';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";
import Router from "next/router";

const Header = ({ header, footer }) => {

	const [cart, setCart] = useContext(AppContext);
	const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle, search, headerTopMenuItems } = header || {};
	const { social_media_list, app_store_link, play_store_link } = footer?.options || {};
	const { cartItems } = cart || {};
	const [notice, setNotice] = useState('');
	const [postcodedis, setPostcodedis] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const [tokenValid, setTokenValid] = useState(0);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
		document.body.style.overflow = 'hidden';
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
		document.body.style.overflow = 'auto';
	};

	const [resultsShow, setResultsShow] = useState(false);

	const router = useRouter();
	var pageslug = router.asPath.split('/').splice(-1, 1)[0];
	pageslug = '/' + pageslug;
	if (pageslug != '/') {
		pageslug = pageslug + '/';
	}

	//function logout
    const logoutHanlder = async () => {
        let tokenName = localStorage.getItem('token');
        //remove token from localstorage
        localStorage.setItem("token", '');
        localStorage.setItem("user_lgdt", '');
        localStorage.setItem('customerData', '');
        localStorage.setItem('coutData', '');
        if (tokenName == 'logingoogle') {
            await signOut();
        } else {
            setTokenValid(0);
		}
		toggleMenu();
		Router.push("/");
	};
	//hook useEffect
	useEffect(() => {
		//check token
		if (localStorage.getItem('token')) {
			setTokenValid(1)
		}
	}, []);
	//console.log('tokenValid', tokenValid)
	const tokenCheck = () => {
		if (localStorage.getItem('token')) {
			setTokenValid(1)
		}
	};
	return (
		<>
			<header className='header'>
				<div className='container mx-auto py-2'>
					<div className='flex items-center justify-between relative'>
						<div className='logo max-w-[130px] sm:max-w-full'>
							<Link className="block" href="/">
								{
									siteLogoUrl ? (
										<Image
											className=""
											src={siteLogoUrl}
											alt={siteTitle || 'Store Logo'}
											title={siteTitle || 'Store Logo'}
											width={200}
											height={98}
											priority
										/>
									) : (
										<Link href="/">
											<p className="font-semibold text-xl tracking-tight">
												{siteTitle || 'Logo'}
											</p>
											{siteDescription ? <p className="mb-0">{siteDescription}</p> : null}
										</Link>
									)
								}
							</Link>
						</div>
						<div className='pro-search w-1/2 ms-2'>
							<Search search={search} resultsShow={resultsShow} setResultsShow={setResultsShow} />
						</div>
						<div className='right-action font-cabin'>
							<ul className='list-none flex items-center'>
								<li className='list-none md:hidden block me-3 md:m-0'>

									<div className='icon size-11 sm:size-12 border border-victoria-800 rounded flex items-center justify-center hover:bg-victoria-800 hover:text-white'>
										<i onClick={() => setResultsShow(true)} className="fa-light fa-magnifying-glass text-2xl"></i>
									</div>

								</li>
								<li className='list-none mx-2 xl:m-0 md:block hidden'>
									<Link href="/wishlist" className='flex items-center hover:text-victoria-800'>
										<div className='icon size-11 sm:size-12 border border-victoria-800 rounded flex items-center justify-center  hover:bg-victoria-800 hover:text-white'>
											<i className="fa-light fa-heart text-2xl"></i>
										</div>
										<div className='details mx-2 xl:block hidden'>
											<p className='text-sm font-normal'>Wishlist</p>
											<p className='text-md font-medium'>My Items</p>
										</div>
									</Link>
								</li>
								<li className='list-none me-2 xl:m-0 md:block hidden'>
									<Link href="/my-account" className='flex items-center hover:text-victoria-800'>
										<div className='icon size-11 sm:size-12 border border-victoria-800 rounded flex items-center justify-center hover:bg-victoria-800 hover:text-white'>
											<i className="fa-light fa-user text-2xl"></i>
										</div>
										<div className='details mx-2 xl:block hidden'>
											<p className='text-sm font-normal'>{ tokenValid ?'Log Out':'Sign In'}</p>
											<p className='text-md font-medium'>Account</p>
										</div>
									</Link>
								</li>
								<li className='list-none relative me-3 xl:m-0'>
									<button onClick={toggleSidebar} className='flex items-center hover:text-victoria-800'>
										<div className='icon size-11 sm:size-12 border border-victoria-800 rounded flex items-center justify-center hover:bg-victoria-800 hover:text-white'>
											<i className="fa-light fa-cart-shopping text-2xl"></i>
										</div>
									</button>

									{
										cart?.totalQty ? (
											<span className="absolute top-[-10px] right-[-10px] bg-victoria-800 text-white w-5 h-5 rounded-full text-center text-sm">{cart?.totalQty ? `${cart?.totalQty}` : null}</span>
										) : (
											<span className="absolute top-[-10px] right-[-10px] bg-victoria-800 text-white w-5 h-5 rounded-full text-center text-sm">0</span>
										)
									}
									<div
										className={`fixed top-0 left-0 h-full w-full opacity-50 bg-black z-20 ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={closeSidebar}
									></div>
									<div className={`fixed top-0 h-full w-[300px] sm:w-[450px] font-inter bg-white z-20 shadow-lg transition-all duration-300 ${isSidebarOpen ? 'right-0' : '-right-full'}`}>
										<div className='flex justify-between items-center p-2 border-b border-slate-200'>
											<p className='font-semibold	text-2xl'>Cart review</p>
											<button
												className="focus:outline-none w-9 h-9 border border-slate-200 bg-slate-300 rounded"
												onClick={closeSidebar}
											>
												<i className="fa-light fa-xmark text-2xl"></i>
											</button>
										</div>
										<div className="h-[calc(100vh_-_140px)] overflow-y-auto scroll-smooth p-2 theme-scroll space-y-5">
											{
												!isEmpty(cartItems) && cartItems.length &&
												cartItems.map((item) => (
													<CartItem
														key={item.product_id}
														item={item}
														products={cartItems}
														setCart={setCart}
														notice={notice != '' ? notice.find((element) => element == item?.data?.sku) : null}
														postcodedis={postcodedis}
													//cartNote = {cartSubTotalDiscount?.discount_type_cart_quantity?.cartNote ?? null}
													/>
												))}
										</div>
										<div className="space-y-4 text-center sticky bottom-0 bg-white p-3 border-t border-slate-200">
											<div className='flex justify-between items-center space-x-4'>
												<Link
													href="/cart" onClick={closeSidebar}
													className="block rounded border border-victoria-800 p-3 text-base text-victoria-800 transition  hover:bg-victoria-800 hover:text-white w-full"
												>
													View Cart {cart?.totalQty ? `(${cart?.totalQty})` : null}
												</Link>

												<Link
													href="/checkout" onClick={closeSidebar}
													className="block rounded border border-victoria-800 p-3 text-base text-victoria-800 transition  hover:bg-victoria-800 hover:text-white w-full"
												>
													Checkout
												</Link>
											</div>
										</div>
									</div>
								</li>
								<li className='list-none relative md:hidden block '>
									<div className={menustyles.hamburger} onClick={toggleMenu}>
										<button  onClick={tokenCheck} className="flex flex-col justify-center items-center size-11 sm:size-12 border border-victoria-800 rounded">
											<span className={`bg-victoria-800 block transition-all duration-300 ease-out h-[3px] w-8 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} > </span>
											<span className={`bg-victoria-800 block transition-all duration-300 ease-out h-[3px] w-8 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} > </span>
											<span className={`bg-victoria-800 block transition-all duration-300 ease-out h-[3px] w-8 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} > </span>
										</button>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='topmenu bg-victoria-800 md:block hidden'>
					<div className='container mx-auto flex items-center justify-between text-white'>
						<ul className='lmenu'>
							{!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map(menuItem => {
								if (menuItem?.classes == 'external') {
									return (
										<li className='inline-block relative hover:before:content-[" "] hover:before:w-[80%] hover:before:h-[2px] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:mx-auto hover:before:bg-victoria-800'>
											<Link href={menuItem?.url ?? ''} target="_blank" className="inline-block py-3 px-4 font-medium font-jost hover:bg-chelsea-500" dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>

									)
								} else if (menuItem?.title == 'Categories') {
									var clsActive = '';
									if ('/cat?sname=all/' == pageslug || '/c/' == pageslug) {
										clsActive = 'bg-chelsea-500 before:content-[" "] before:w-[80%] before:h-[2px] before:absolute before:top-0 before:left-0 before:right-0 before:mx-auto before:bg-victoria-800';
									}
									return (
										<li className={'inline-block relative hover:before:content-[" "] hover:before:w-[80%] hover:before:h-[2px] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:mx-auto hover:before:bg-victoria-800 ' + clsActive} >
											<Link href={!WEB_DEVICE ? '/cat?sname=all' : '/c'} className="inline-block py-3 px-4 font-medium font-jost hover:bg-chelsea-500" dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>

									)
								} else {
									var menu_slug = getPathNameFromUrl(menuItem?.url ?? '') || '/';
									var clsActive = '';
									if (menu_slug == pageslug) {
										clsActive = 'bg-chelsea-500 before:content-[" "] before:w-[80%] before:h-[2px] before:absolute before:top-0 before:left-0 before:right-0 before:mx-auto before:bg-victoria-800';
									}
									return (
										<li className={'inline-block relative hover:before:content-[" "] hover:before:w-[80%] hover:before:h-[2px] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:mx-auto hover:before:bg-victoria-800 ' + clsActive}>
											<Link href={menu_slug} className="inline-block py-3 px-4 font-medium font-jost hover:bg-chelsea-500" dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>
									)
								}
							}
							) : null}
							<li className='inline-block relative hover:before:content-[" "] hover:before:w-[80%] hover:before:h-[2px] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:mx-auto hover:before:bg-victoria-800'>
								<Link href='/shop' className="inline-block py-3 px-4 font-medium font-jost hover:bg-chelsea-500">Shop</Link>
							</li>
						</ul>
						<div className='rmenu'>
							<ul>
								{!isEmpty(headerTopMenuItems) && headerTopMenuItems.length ? headerTopMenuItems.map(menuItem => {
									var menu_slug = getPathNameFromUrl(menuItem?.url ?? '') || '/';
									var clsActive = '';
									if (menu_slug == pageslug) {
										clsActive = 'bg-chelsea-500 before:content-[" "] before:w-[80%] before:h-[2px] before:absolute before:top-0 before:left-0 before:right-0 before:mx-auto before:bg-victoria-800';
									}
									return (
										<li className={'inline-block relative hover:before:content-[" "] hover:before:w-[80%] hover:before:h-[2px] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:right-0 hover:before:mx-auto hover:before:bg-victoria-800 ' + clsActive}>
											<Link href={menu_slug} className="inline-block py-3 px-4 font-medium font-jost hover:bg-chelsea-500" dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>
									)
								}
								) : null}
							</ul>
						</div>
					</div>
				</div>
				<div className='mobile-menu md:hidden block'>
					<div className={`w-80 z-[999] overflow-auto bg-white ${menustyles.menu} ${isMenuOpen ? menustyles.open : ''}`}>
						<div onClick={toggleMenu} className="absolute right-0 top-0 w-10 h-10 bg-victoria-800 text-white">
							{/* <i className="fa-regular fa-xmark text-4xl"></i> */}
							<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
						<ul className='mt-12 w-full'>
							{!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map(menuItem => {
								if (menuItem?.classes == 'external') {
									return (
										<li className='block border-b border-slate-200'>
											<Link href={menuItem?.url ?? ''} target="_blank"
												className={'block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white ' + clsActive}
												dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>

									)
								} else if (menuItem?.title == 'Categories') {
									var clsActive = '';
									if ('/cat?sname=all/' == pageslug || '/c/' == pageslug) {
										clsActive = 'bg-chelsea-500 text-white';
									}
									return (
										<li className='block border-b border-slate-200'>
											<Link href={!WEB_DEVICE ? '/cat?sname=all' : '/c'}
												className={'block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white ' + clsActive}
												dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>

									)
								} else {
									var menu_slug = getPathNameFromUrl(menuItem?.url ?? '') || '/';
									var clsActive = '';
									if (menu_slug == pageslug) {
										clsActive = 'bg-chelsea-500 text-white';
									}
									return (
										<li className='block border-b border-slate-200'>
											<Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'}
												className={'block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white ' + clsActive}
												dangerouslySetInnerHTML={{ __html: menuItem.title }} />
										</li>
									)
								}
							}
							) : null}
							<li className='block border-b border-slate-200'>
								<Link href='/shop' className="block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white">Shop</Link>
							</li>
							<li className='block border-b border-slate-200'>
								<Link href='/wishlist' className="block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white">Wishlist</Link>
							</li>
							<li className='block border-b border-slate-200'>
								<Link href='/my-account' className="block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white">My Account</Link>
							</li>
							<li className='block border-b border-slate-200'>
								{tokenValid
								 ?
									<button onClick={logoutHanlder} className="block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white">Logout</button>
									:
									<Link onClick={toggleMenu}  href='/my-account' className="block p-3 font-medium font-jost hover:bg-chelsea-500 hover:text-white">Login</Link>
									}
							</li>
						</ul>
						<div className='applink flex p-2 border-b border-slate-200'>
							<Link href={app_store_link} target='_blank'>
								<Image
									src={appstoreicon}
									alt="App Store Icon"
									width={50}
									height='auto'
									className='rounded-lg'
								/>
							</Link>
							<Link href={play_store_link} target='_blank' className='ms-4'>
								<Image
									src={playstoreicon}
									alt="Play Store Icon"
									width={55}
									height='auto'
								/>
							</Link>
						</div>
						<div className='sticky bottom-0 bg-white p-2'>
							{(() => {
								if (!isEmpty(social_media_list)) {
									if (social_media_list.length > 0) {
										return (
											<ul key="socialMedia_list" className='flex justify-between'>
												{
													social_media_list.map(socialMediaItem => {
														const bgcolor = 'bg-' + socialMediaItem.social_name;
														return (
															<li>
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
						</div>
					</div>
					<div onClick={toggleMenu} className={`${isMenuOpen ? menustyles.activemenu : ''}`}></div>
				</div>
			</header>
		</>
	);
};
export default Header;