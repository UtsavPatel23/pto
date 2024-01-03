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
import  Breadcrumbs  from './../breadcrumbs';
import { localstorage_cookiesClear } from '../../utils/customjs/custome';
import { useEffect } from 'react';



const Layout = ({children, headerFooter, seo, uri ,pageData = ''}) => {
	const { header, footer } = headerFooter || {};
	const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;
console.log('headerFooter',headerFooter);
	useEffect(()=>{
		localstorage_cookiesClear();
	}, [] )
	return (
		<AppProvider>
			<div>
				<Seo seo={ seo || {} } uri={ uri || '' }/>
				<Head>
					<link rel="shortcut icon" href={ header?.favicon ?? '/favicon.ico' }/>
					{
						yoastSchema ?
							( <script
								type="application/ld+json"
								className="yoast-schema-graph"
								key="yoastSchema"
								dangerouslySetInnerHTML={ { __html: sanitize( yoastSchema ) } }
							/> ) :
							<title>{ header?.siteTitle ?? 'Nexts WooCommerce' }</title>
					}
				</Head>
				<Header header={header}/>
				
				<main className="container mx-auto py-4 min-h-50vh">
				<Breadcrumbs pageData={pageData}></Breadcrumbs>
					{children}
				</main>
				<Footer footer={footer} header={header}/>
			</div>
		</AppProvider>
	)
}

export default Layout
