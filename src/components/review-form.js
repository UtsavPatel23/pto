import React, { useState } from 'react'
import Loaderspin from '../components/loaderspin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { CAPTCHA_SITE_KEY, REVIEW } from '../utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"
import { auth } from '../utils/firebase'
import { RecaptchaVerifier } from 'firebase/auth';

function reviewForm({ product, tokenValid ,customerData , orderData}) {
    
    if (!tokenValid) { 
        return '';
    }
    const createMarkup = (data) => ({
		__html: data
	});

	/*************** Regis ******************************/
	const [reviewFields, setReviewFields] = useState({
		post_id: '',
		order_number: '',
		order_id: '',
		c_email: '',
		cf_name: '',
		cl_name: '',
		c_review: '1',
		c_message: '',
		review_loading: false,
		review_error: '',
		review_success: '',
		captcha: '',
	});


	// form validation rules 
	const validationSchema = Yup.object().shape({
		c_review: Yup.string()
			.required('Review is required'),
        c_message: Yup.string()
			.required('Review is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

    const onFormSubmitreview = (event) => {
        const reviewData = {
            post_id : product?.id,
			order_number: orderData?.number,
			order_id: orderData?.id,
			c_email: customerData?.email,
			user_id: customerData?.id,
			cf_name: customerData?.first_name,
			cl_name: customerData?.last_name,
			c_review: reviewFields?.c_review,
			c_message: event?.c_message,
		};
        console.log('reviewData', reviewData);
		setReviewFields({ ...reviewFields, review_loading: true, review_error: '', review_success: '' });

		axios.post(REVIEW, reviewData)
			.then(res => {
				console.log('res', res);
				setReviewFields({
					...reviewFields,
					c_review: '1',
					review_error: '',
					review_success: 'Review Successfully Send',
					review_loading: false
				})
				reset();
			})
			.catch(err => {
				setReviewFields({ ...reviewFields, review_error: err.response.data, review_loading: false });
			})
	};

	const regishandleOnChange = (event) => {
		setReviewFields({ ...reviewFields, [event.target.name]: event.target.value });
	};

	const { review_error, review_success, review_loading } = reviewFields;
    
	// ReCaptcha 
	const onReCAPTCHAChange = async (captchaCode) => {
		if (!captchaCode) {
			return;
		}
		setReviewFields({ ...reviewFields, captcha: captchaCode });
	};
	console.log('reviewFields', reviewFields);


	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
	}


    console.log('product', product);
    return (
		<div>
			{product?.name ?
			<h4 key="product_title"
			dangerouslySetInnerHTML={{
				__html: product?.name,
			}}
			className="text-lg text-wrap font-semibold capitalize"
				/>
				:
				<>
				<h4 className="text-lg text-wrap font-semibold capitalize">Your feedback help us to improve.</h4>
				<h6 className="text-lg text-wrap font-semibold capitalize">Please let us know about your Order experience.</h6>
				</>
			}
            
            <React.Fragment>
                <div  className='border-t border-gray-200 pt-3 mt-3'>
                    <form onSubmit={handleSubmit(onFormSubmitreview)}>
					<div id="full-stars-example">
    					<div className="rating-group">
								<label aria-label="1 star" className="rating__label" for="rs0"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
								<input type="radio" className="rating__input" name="c_review" id="rs0" onClick={regishandleOnChange} {...register('c_review')} value={1} checked={reviewFields?.c_review == 1} />
								<label aria-label="1 star" className="rating__label" for="rs1"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
								<input type="radio" className="rating__input" name="c_review" id="rs1" onClick={regishandleOnChange} {...register('c_review')} value={2} checked={reviewFields?.c_review == 2} />
								<label aria-label="1 star" className="rating__label" for="rs2"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
								<input type="radio" className="rating__input" name="c_review" id="rs2" onClick={regishandleOnChange} {...register('c_review')} value={3} checked={reviewFields?.c_review == 3} />
								<label aria-label="1 star" className="rating__label" for="rs3"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
								<input type="radio" className="rating__input" name="c_review" id="rs3" onClick={regishandleOnChange} {...register('c_review')} value={4} checked={reviewFields?.c_review == 4} />
								<label aria-label="1 star" className="rating__label" for="rs4"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
								<input type="radio" className="rating__input" name="c_review" id="rs4" onClick={regishandleOnChange} {...register('c_review')} value={5} checked={reviewFields?.c_review == 5} />
						</div>
					</div>
                        <div className="d-block text-red-500">{errors.c_review?.message}</div>
                        <label className="block mb-4">
                            <span className='block text-base mb-1'>Review</span>
                            <textarea name="c_message" type="text" onClick={regishandleOnChange} {...register('c_message')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
                            <div className="d-block text-red-500">{errors.c_message?.message}</div>
                        </label>
                        <ReCAPTCHA
                            sitekey={CAPTCHA_SITE_KEY}
                            onChange={onReCAPTCHAChange}
                            theme="dark"
                        />
                        <div className='text-center mt-5 mb-2'>
                            <button className={`bg-victoria-800 inline-block px-2 py-3 text-white text-center w-60 text-lg cursor-pointer ${reviewFields.captcha === "" ? 'opacity-50' : ''}`} type="submit" disabled={reviewFields.captcha === ""}>
                                {review_loading ? <div className='py-[3px]'><Loaderspin /></div> : 'Send feedback'}
                            </button>
                        </div>
                    </form>
                    {review_error && <p className="bg-red-200 border border-red-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(review_error)} />}
                    {review_success && <p className="bg-green-200 border border-green-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(review_success)} />}
                </div>
            </React.Fragment>
		</div>
    )
}

export default reviewForm
