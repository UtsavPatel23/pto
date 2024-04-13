/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT, REVIEWLIST, WCAPI_QUERY_PRM, WEB_DEVICE } from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';
import Loader from '../src/components/loaderspin';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import CanvasTxtToImage from '../src/components/canvas-txt-to-image';

export default function Product( { headerFooter } ) {
	//console.log('reviews',reviews);
	const router = useRouter();
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	const [reviews,setReviews] = useState({});
    const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [viewMore, setViewMore] = useState(true);
	const [average, setAverage] = useState(0);
	const [approve_review_count, setApprove_review_count] = useState(0);
	const seo = {
		title: 'Next JS WooCommerce REST API',
		description: 'Next JS WooCommerce Theme',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}
    useEffect(()=>{
		(async () => {

			if (page != undefined) 
			{ 
				setLoading(true);
				let config = {
					method: 'POST',
					maxBodyLength: Infinity,
					url: REVIEWLIST+'?page='+page,
				};
				await axios.request(config)	
					.then((response) => {
						if (response?.data?.reviewlist?.length < 10) { 
							setViewMore(false);
						}
						if (page == 1)
						{
							setReviews(response.data?.reviewlist);
							setAverage(response.data?.average)
							setApprove_review_count(response.data?.approve_review_count)
						} else {
							setReviews([...reviews,...response.data?.reviewlist]);
						}
				})
				.catch((error) => {
					console.log(error.response);
				});
				setLoading(false);
			}
			
    })();
	}, [page])
	
	if(loading && page == 1)
    {
         return(
            <Layout headerFooter={headerFooter || {}}>
                { loading && <Loader/> }
            </Layout>
        )
    }
	else {
		console.log('reviews', reviews);
		//console.log('average', average);
		//console.log('approve_review_count', approve_review_count);
		return (
			<Layout
				headerFooter={ headerFooter || {} }
				seo={seo}
				uri={ '/all-reviews/' }
			>
				<div className='text-center'>
				<span>{average} Based on {approve_review_count} reviews</span>
				</div>
				<div className='grid md:grid-cols-2 gap-4 mb-10'>
				{reviews.length ? reviews.map((review , i) => {
					const date = new Date(review.date_created);
					const monthName = date.toLocaleString('default', { month: 'long' });
					const day = date.getDate();
					const year = date.getFullYear();
					return (
						
						<div key={"comment-" + review.id} className="review-wrp flex items-start gap-2 mt-3">
						<CanvasTxtToImage authorname={review.reviewer}></CanvasTxtToImage>
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
									{
										review.replaycomment && review.replaycomment[0] ? 
										<div key={"comment-" + review.replaycomment[0].id} className="review-wrp flex items-start gap-2 mt-3">
											<CanvasTxtToImage  authorname={review.replaycomment[0].author_name}></CanvasTxtToImage>
											<div key="title" className="review-body border border-gray-200 p-2 w-full">
													<p className='font-semibold	text-lg'>{review.replaycomment[0].author_name}</p>
													<p key="review-time" className="meta">
														<em className="verified"> Store manager - </em>
														<time> {monthName} {day}, {year}</time>
													</p>
													<div key="review-review"
														dangerouslySetInnerHTML={{
															__html: review.replaycomment[0]?.content?.rendered ?? '',
														}}
													/>
												</div>
											</div>
										:null
									}
								
								</div>
							
						</div>
					)
				}):null}
				</div>
				{viewMore && !loading ?
					<div className='text-center'><button onClick={(e) => setPage(page + 1)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 mt-4'> Show more reviews </button></div>
					: null}
				{ loading && <div className='mt-5'><Loader/></div> }
			</Layout>
		);
	}
	
}
// getStaticProps // getServerSideProps
export async function getStaticProps() {
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
	};
}

