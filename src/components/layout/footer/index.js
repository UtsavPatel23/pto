/**
 * Internal Dependencies.
 */
import { getPathNameFromUrl, sanitize } from '../../../utils/miscellaneous';
import { getIconComponentByName } from '../../../utils/icons-map';

/**
 * External Dependencies.
 */
import { isEmpty, isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = ( { footer , header} ) => {
	
	const { copyrightText, footerMenuItems, sidebarOne, sidebarTwo, socialLinks } = footer || {};
	const {siteTitle } = header || {};
	const [ isMounted, setMount ] = useState( false );
	const paymentOptions = footer?.options?.payments;
	
	useEffect( () => {
		setMount( true );
	}, [] );
	
	return (
		<footer className="footer bg-blue-500 p-6">
			<div className="container mx-auto">
				<div className="flex flex-wrap -mx-1 overflow-hidden text-white">
					
					{ isMounted ? (
						<>
							{/*Widget One*/ }
							<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
								<div dangerouslySetInnerHTML={ { __html: sanitize( sidebarOne ) } }/>
							</div>
							{/*Widget Two*/ }
							<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
								<div dangerouslySetInnerHTML={ { __html: sanitize( sidebarTwo ) } }/>
							</div>
						</>
					) : null }
					
					{/*	Footer Menus*/ }
					<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
						{ ! isEmpty( footerMenuItems ) && isArray( footerMenuItems ) ? (
							<ul>
								{ footerMenuItems.map( menuItem => (
									<li key={ menuItem?.ID }>
										<Link href={ getPathNameFromUrl( menuItem?.url ?? '' ) || '/' }>
											{ menuItem?.title }
										</Link>
									</li>
								) ) }
							</ul>
						) : null }
					</div>
				</div>
				<div className="mb-8 mt-8 w-full flex flex-wrap">
					{/*Copyright Text*/ }
					<div className="w-full md:w-1/2 lg:w-1/4 text-white">
						<p>Copyright {new Date().getFullYear()} <Link href='/'>{siteTitle}</Link> - © All rights reserved</p>
					</div>
					<div className="w-full lg:w-3/4 flex justify-end">
						{ ! isEmpty( socialLinks ) && isArray( socialLinks ) ? (
							<ul className="flex item-center mb-0">
								{ socialLinks.map( socialLink => (
									<li key={ socialLink?.iconName } className="no-dots-list mb-0 flex items-center">
										<Link href={ socialLink?.iconUrl || '/' } target="_blank"
										   title={ socialLink?.iconName } className="ml-2 inline-block">
											{ getIconComponentByName( socialLink?.iconName ) }
											<span className="sr-only">{ socialLink?.iconName }</span>
										</Link>
									</li>
								) ) }
							</ul>
						) : null }
					</div>
				</div>
				{(() => {
						if(!isEmpty(paymentOptions))
						{
								if(paymentOptions.length > 0)
									{
										return(
											<div key="paymentOptions_list">
												{
														paymentOptions.map( paymentOption => {
																	if(paymentOption.payment_url != '')
																	{
																		return (
																			<Link className='inline-block' href={paymentOption.payment_url}>
																			<img src={ paymentOption.payment_logos } alt={ `${ paymentOption.payment_title } logo` }
																				width="100"
																				height="40"/>
																			</Link>
																		)
																	}else{
																		return (
																			<img className='inline-block'  src={ paymentOption.payment_logos } alt={ `${ paymentOption.payment_title } logo` }
																				width="100"
																				height="40"/>
																		)
																	}
														})
												}
											</div>
										);
									}
						}
					})()}
			</div>
		</footer>
	);
};

export default Footer;
