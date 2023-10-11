import { isEmpty } from 'lodash';
import Image from 'next/image';

const Review = ( { review } ) => {
	if ( isEmpty( review ) ) {
		return null;
	}
	const date = new Date(review.date_created); 
	const monthName =  date.toLocaleString('default', { month: 'long' });
	const day =  date.getDate();
	const year =  date.getFullYear();
	return (
		<div key={"comment-"+review.id} className="comment_container media">
							<Image
									src='https://secure.gravatar.com/avatar/?s=24&d=mm&r=g'
									alt={review.product_name}
									title={review.product_name}
									width="32"
									height="32"
								/>
							<div key="title" className="comment-text media-body">
											<span>{review.reviewer}</span>
											<p key="review-time"  className="meta">
												<em className="verified">(verified owner)</em> 
												<time> {monthName} {day}, {year}</time>
											</p>
												<div key="review-review"
													dangerouslySetInnerHTML={ {
														__html: review?.review ?? '',
													} }
													className="product-price mb-5"
												/> 
																		
							</div>
							
		</div>
	)
}

export default Review;
