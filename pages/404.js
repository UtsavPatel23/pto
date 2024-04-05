/**
 * External Link.
 */
import Link from 'next/link';
import axios from 'axios';

/**
 * Internal Link.
 */
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';

function Error404({ headerFooter }) {
	return (
		<Layout headerFooter={headerFooter || {}} seo={null}>
			<div class="w-9/12 m-auto py-10 flex items-center justify-center bg-gray-100">
				<div class="text-center">
					<h1 class="text-9xl font-bold text-victoria-700">404</h1>
					<h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
					<p class="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
					<Link href="/">
						<div className="bg-victoria-800 inline-block px-1 py-3 text-white text-center w-60 text-lg cursor-pointer">
							Back to Home
						</div>
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default Error404;

export async function getStaticProps() {

	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);

	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
	};
}
