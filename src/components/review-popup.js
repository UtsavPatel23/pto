import React from 'react'
import { useState } from 'react';
import ReviewForm from '../components/review-form'

function reviewPopup({ product, tokenValid ,customerData}) {
    if (!tokenValid) { 
        return '';
    }
    const [isReviewOpen, setReviewOpen] = useState(false);

    const openReview = () => {setReviewOpen(true);};
    const closeReview = () => { setReviewOpen(false); };
    return (
        <div>
                    <div
						onClick={openReview}
						className='border border-victoria-700 bg-victoria-800 inline-block p-2 px-3 text-white text-lg cursor-pointer hover:text-victoria-800 hover:bg-transparent'>
						Product Reviews
					</div>
					{isReviewOpen && (
						<section className='review-popup fixed z-20 top-0 left-0 flex h-full w-full min-h-screen items-center justify-center'>
							<div onClick={closeReview} className="fixed z-20 top-0 left-0 flex h-full min-h-screen w-full bg-black bg-opacity-90 close-cursor"></div>
							<div className="z-30 w-full mx-3 sm:max-w-[570px] bg-white p-5 relative ">
								<span onClick={closeReview} className="flex items-center justify-center absolute -top-3 -right-2 size-8 bg-red-600 text-xl cursor-pointer"
								>
									<i class="fa-light fa-xmark text-2xl text-white"></i>
								</span>
								<ReviewForm product={product} tokenValid={tokenValid} customerData={customerData}></ReviewForm>
                        
							</div>
						</section>
					)}
        </div>
    )
}

export default reviewPopup
