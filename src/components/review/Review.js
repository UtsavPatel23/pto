import { isEmpty } from 'lodash';
import Image from 'next/image';

const Review = ({ review }) => {
	if (isEmpty(review)) {
		return null;
	}
	const date = new Date(review.date_created);
	const monthName = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	const year = date.getFullYear();
	return (
		<div key={"comment-" + review.id} className="review-wrp flex items-start gap-2 mt-3">
			<Image
				src='https://secure.gravatar.com/avatar/?s=24&d=mm&r=g'
				alt={review.product_name}
				title={review.product_name}
				width="50"
				height="50"
			/>
			<div key="title" className="review-body border border-gray-200 p-2 w-full">
				<p className='font-semibold	text-lg'>{review.reviewer}</p>
				<p key="review-time" className="meta">
					<em className="verified">(verified owner)</em>
					<time> {monthName} {day}, {year}</time>
				</p>
				<div key="review-review"
					dangerouslySetInnerHTML={{
						__html: review?.review ?? '',
					}}
				/>
			</div>
		</div>
	)
}

export default Review;
