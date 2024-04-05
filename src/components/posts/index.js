/**
 * External Dependencies.
 */
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';

/**
 * Internal Dependency.
 */
import Post from './post';


const Posts = ({ posts }) => {

	if (isEmpty(posts) && !isArray(posts)) {
		return null;
	}

	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:mx-28">
			{
				posts.map((post, index) => {
					return (
						<div key={`${post?.id ?? ''}-${index}` ?? ''} className="shadow-full"
						>
							<Post post={post} />
						</div>
					);
				})
			}
		</div>
	);
};

Posts.propTypes = {
	posts: PropTypes.array,
};

Posts.defaultProps = {
	posts: [],
};

export default Posts;
