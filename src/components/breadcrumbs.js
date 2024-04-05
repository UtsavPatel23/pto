import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProductBreadcrumbs } from '../utils/customjs/custome';

const convertBreadcrumb = string => {
	return string
		.replace(/-/g, ' ')
		.replace(/oe/g, 'ö')
		.replace(/ae/g, 'ä')
		.replace(/ue/g, 'ü')
		.toUpperCase();
};

const Breadcrumbs = ({ pageData = '' }) => {
	const { categories } = pageData;
	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState(getSingleProductBreadcrumbs(categories));

	useEffect(() => {
		if (router && (pageData == '')) {
			const linkPath = router.asPath.split('/');
			linkPath.shift();
			const pathArray = linkPath.map((path, i) => {
				return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
			});
			if (pathArray[0]?.breadcrumb == 'c') { pathArray.splice(-1, 1) }
			setBreadcrumbs(pathArray);
		}
	}, [router]);

	if (!breadcrumbs) {
		return null;
	}

	if (breadcrumbs[0]?.breadcrumb != '') {
		return (
			<nav aria-label="Breadcrumb" className="flex justify-center py-2 border-b border-victoria-100 font-jost">
				<ol className="flex overflow-hidden rounded border border-gray-200 text-gray-600 bg-gray-50">
					<li className="relative flex items-center">
						<Link href="/" className="flex h-10 items-center gap-1.5 px-4 transition hover:text-victoria-800">
							<i className="fa-sharp fa-solid fa-house"></i>
							<span className="ms-1.5 text-base font-medium"> Home </span>
						</Link>
					</li>
					{breadcrumbs.map((breadcrumb, i) => {
						return (
							<li key={breadcrumb.href} className="relative flex items-center">
								<i className="fa-regular fa-angle-right text-xl"></i>
								<Link href={breadcrumb.href.split("?")[0]} className="flex h-10 items-center px-5 text-sm font-medium transition hover:text-victoria-800">
									{convertBreadcrumb(breadcrumb.breadcrumb.split("?")[0].split("#")[0])}
								</Link>
							</li>
						);
					})}
				</ol>
			</nav>
		);
	} else {
		return null;
	}

};

export default Breadcrumbs;