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
import { isEmpty } from 'lodash';

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
		//console.log('reviews', reviews);
		//console.log('average', average);
		//console.log('approve_review_count', approve_review_count);
		return (
			<Layout
				headerFooter={ headerFooter || {} }
				seo={seo}
				uri={ '/all-reviews/' }
			>
				{average > 0 ? <div>Average :{ average}</div> : null}
				{approve_review_count > 0 ? <div>Count : { approve_review_count}</div> : null}
				{reviews.length ? reviews.map((review , i) => {
					return (
						<div>
							<h3>{review?.reviewer}</h3>
							{review?.replaycomment && !isEmpty(review?.replaycomment) ?
								<>
									Replay : { review?.replaycomment[0]?.author_name}
								</>
								: null}
						</div>
					)
				}):null}
				{viewMore && !loading ?
					<button onClick={(e) => setPage(page + 1)} className='text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700 relative inline-block py-2 px-5 mt-4'> Show more reviews </button>
					: null}
				{ loading && <Loader/> }
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

