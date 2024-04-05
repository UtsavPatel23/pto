/**
 * External Dependencies.
 */
import Link from 'next/link';

/**
 * Internal Dependencies.
 */
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import PostMeta from '../post-meta';

/**
 * Post Component.
 *
 * @param {Object} post Post.
 */
const Post = ({ post }) => {
	return (
		<div className='h-full relative group'>
			<Link href={`/blog/${post?.slug}/`}>
				<figure className="overflow-hidden mb-4">
					<Image
						sourceUrl={post?.attachment_image?.img_src?.[0] ?? ''}
						title={post?.title ?? ''}
						width="380"
						height="225"
						className='mx-auto group-hover:scale-110 duration-300'
					/>
				</figure>
			</Link>
			<div className='p-3 border-t border-grey-200'>
				<PostMeta date={post?.date ?? ''} authorName={post?.meta?.author_name ?? ''} />
				<h2 className="font-semibold mb-3 text-lg hover:text-victoria-700">
					<Link href={`/blog/${post?.slug}/`} dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? '') }} />
				</h2>
				<p className='line-clamp-2' dangerouslySetInnerHTML={{ __html: sanitize(post?.excerpt ?? '') }} />
				<Link href={`/blog/${post?.slug}/`} className='mt-2 flex gap-2 items-center border-b border-victoria-700 w-fit hover:text-victoria-700 font-medium'>
					Read More <i className="far fa-chevron-double-right"></i>
				</Link>
			</div>
		</div>
	);
};

export default Post;
