/**
 * External Dependencies.
 */
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData } from '../../src/utils/slug';
import { getFormattedDate, sanitize } from '../../src/utils/miscellaneous';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getComments, getPost, getPosts } from '../../src/utils/blog';
import Image from '../../src/components/image';
import PostMeta from '../../src/components/post-meta';
import Comments from '../../src/components/comments';
import placeholder from '../../public/assets/img/placeholder-300.png'
import Link from 'next/link';
import AuthorImage from '../../public/assets/img/Hitesh-Sir-min.jpg'


const Post = ({ headerFooter, postData, commentsData, postsData }) => {
	const router = useRouter();

	/**
	 * If the page is not yet generated, this will be displayed
	 * initially until getStaticProps() finishes running
	 */
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	console.log('postsData', postsData);
	return (
		<Layout headerFooter={headerFooter || {}} seo={postData?.yoast_head_json ?? {}}>
			<div className='grid md:grid-cols-4 gap-5'>
				<div className="md:col-span-3 blog-wrapper border border-gray-300">
					<figure className="overflow-hidden mb-4">
						<Image
							sourceUrl={postData?._embedded['wp:featuredmedia']?.[0]?.source_url ?? ''}
							title={postData?.title?.rendered ?? ''}
							width="1150"
							height="600"
						/>
					</figure>
					<div className='p-4'>
						<PostMeta date={getFormattedDate(postData?.date ?? '')} authorName={postData?._embedded?.author?.[0]?.name ?? ''} />
						<h1 className='font-semibold text-2xl mb-2' dangerouslySetInnerHTML={{ __html: sanitize(postData?.title?.rendered ?? '') }} />
						<div dangerouslySetInnerHTML={{ __html: sanitize(postData?.content?.rendered ?? '') }} />
						<Comments comments={commentsData} postId={postData?.id ?? ''} />
					</div>
				</div>
				<div className=''>
					<div className='border border-gray-300 bg-gray-100 p-3 rounded h-fit mb-5'>
					<h5 className='font-semibold text-lg border-b border-gray-300 pb-2 mb-5'>Latest Post</h5>
					<ul className='space-y-3'>
						{(() => {
							return postsData?.posts_data.map((post, index) => {
								return (
									<li key={`${post?.id ?? ''}-${index}` ?? ''}>
										<Link href={`/blog/${post?.slug}/`} className='flex gap-3 items-center'>
											<Image
												src={post?.attachment_image?.img_src?.[0] ?? placeholder}
												width={80}
												height={80}
												alt="Placeholder"
											/>
											<p className='line-clamp-2 hover:text-victoria-700' dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? '') }}></p>
										</Link>
									</li>
								);
							})
						})()}
					</ul>
					</div>
					<div className='border border-gray-300 bg-gray-100 p-3 rounded h-fit  mb-5'>
					<h5 className='font-semibold text-lg border-b border-gray-300 pb-2 mb-5'>About Author</h5>
					<div>
						<Image className={'rounded-3xl'} src={AuthorImage}>

						</Image>
						<h4>Pooltable Offers</h4>
					</div>
					</div>
				</div>
				
			</div>
		</Layout>
	);
};

export default Post;

export async function getStaticProps({ params }) {
	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
	const postData = await getPost(params?.slug ?? '');
	const commentsData = await getComments(postData?.[0]?.id ?? 0);
	const { data: postsData } = await getPosts(1);

	const defaultProps = {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			postData: postData?.[0] ?? {},
			postsData: postsData,
			commentsData: commentsData || []
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */

	};

	return handleRedirectsAndReturnData(defaultProps, postData);
}

/**
 * Since the page name 'does not' use catch-all routes,
 * for example [slug],
 * that's why params would contain just slug and not an array of slugs , unlike [...slug].
 * For example, If we need to have dynamic route '/foo/'
 * Then we would add paths: [ params: { slug: 'foo' } } ]
 * Here slug will be 'foo', then Next.js will statically generate the page at /foo/
 *
 * At build time next js will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const { data: postsData } = await getPosts();

	const pathsData = [];

	postsData?.posts_data.length && postsData?.posts_data.map(post => {
		if (!isEmpty(post?.slug)) {
			pathsData.push({ params: { slug: post?.slug } });
		}
	});

	return {
		paths: pathsData,
		fallback: FALLBACK,
	};
}
