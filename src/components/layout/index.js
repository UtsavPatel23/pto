/**
 * External Dependencies
 */

import Head from 'next/head';

/**
 * Internal Dependencies.
 */
import { AppProvider } from '../context';
import Header from './header';
import Footer from './footer';
import Seo from '../seo';
import { replaceBackendWithFrontendUrl, sanitize } from '../../utils/miscellaneous';
import Breadcrumbs from './../breadcrumbs';
import { localstorage_cookiesClear } from '../../utils/customjs/custome';
import { useEffect, useState } from 'react';
import { Rubik } from 'next/font/google';
import { usePathname } from 'next/navigation';


const rubik = Rubik({
	weight: ['300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
})

const Layout = ({ children, headerFooter, seo, uri, pageData = '' }) => {
	const { header, footer } = headerFooter || {};
	const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl(JSON.stringify(seo.schema)) : null;
	console.log('headerFooter', headerFooter);
	useEffect(() => {
		localstorage_cookiesClear();
	}, [])

	const exclude_Breadcrumbs = [
		'/c',
		'/blog',
		'/',
		'/my-account'];
	const pathname = usePathname()
	const [isBreadcrumbs, setIsBreadcrumbs] = useState(true);
	useEffect(() => {
		exclude_Breadcrumbs.map(exclude_BreadcrumbsItem => {
			if (exclude_BreadcrumbsItem == pathname) {
				setIsBreadcrumbs(false)
			}
		}
		)
	}, [])

	return (
		<AppProvider>
			<Seo seo={seo || {}} uri={uri || ''} />
			<Head>
				<link rel="shortcut icon" href={header?.favicon ?? '/favicon.ico'} />
				{
					yoastSchema ?
						(<script
							type="application/ld+json"
							className="yoast-schema-graph"
							key="yoastSchema"
							dangerouslySetInnerHTML={{ __html: sanitize(yoastSchema) }}
						/>) :
						<title>{header?.siteTitle ?? 'Nexts WooCommerce'}</title>
				}
			</Head>
			<Header header={header} footer={footer} />

			{isBreadcrumbs ? <Breadcrumbs pageData={pageData}></Breadcrumbs> : null}
			<main className={`font-inter ${uri != 'home' ? 'container  my-10' : ''} `}>
				{/* <main className={rubik.className + ' container py-2 font-inter'}> */}
				{children}
			</main>
			<Footer footer={footer} header={header} />
		</AppProvider>
	)
}

export default Layout
