import React from 'react'
import { useState } from 'react';
import Loaderspin from '../components/loaderspin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { CAPTCHA_SITE_KEY, PRODUCT_ENQUIRY, WEB_DEVICE } from '../utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"
import { auth } from '../utils/firebase'
import { RecaptchaVerifier } from 'firebase/auth';


function enquiry({ product }) {
	const createMarkup = (data) => ({
		__html: data
	});

	/*************** Regis ******************************/
	const [enquiryFields, setEnquiryFields] = useState({
		user: '',
		email: '',
		subject: '',
		enquiry: '',
		product_title: '',
		product_id: '',
		product_sku: '',
		product_code: '',
		product_status: '',
		product_url: '',
		enquiry_loading: false,
		enquiry_error: '',
		enquiry_success: '',
		captcha: '',
	});


	// form validation rules 
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Email is invalid custome')
			.email('Email is invalid'),
		user: Yup.string()
			.required('Name is required'),
		enquiry: Yup.string()
			.required('Enquiry is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	const onFormSubmitenquiry = (event) => {
		var p_slug = process.env.NEXT_PUBLIC_SITE_URL + '/p/' + product?.slug;
		if (!WEB_DEVICE) {
			p_slug = process.env.NEXT_PUBLIC_SITE_URL + '/product/?sname=' + product?.slug;
		}

		const enquiryData = {
			user: event.user,
			email: event.email,
			subject: 'Product Enquiry : ' + product?.name,
			enquiry: event.enquiry,
			product_title: product?.name,
			product_id: product?.id,
			product_sku: product?.sku,
			product_code: product?.meta_data?.product_code,
			product_status: 'product_enquiry',
			product_url: p_slug,
		};

		setEnquiryFields({ ...enquiryFields, enquiry_loading: true, enquiry_error: '', enquiry_success: '' });

		axios.post(PRODUCT_ENQUIRY, enquiryData)
			.then(res => {

				console.log('res', res);
				setEnquiryFields({
					...enquiryFields,
					enquiry_error: '',
					enquiry_success: 'Enquiry Successfully Send',
					enquiry_loading: false
				})
				reset();
			})
			.catch(err => {
				setEnquiryFields({ ...enquiryFields, enquiry_error: err.response.data, enquiry_loading: false });
			})
	};

	const regishandleOnChange = (event) => {
		setEnquiryFields({ ...enquiryFields, [event.target.name]: event.target.value });
	};

	const { user_email, user_pass, enquiry_error, enquiry_success, enquiry_loading } = enquiryFields;
	// ReCaptcha 
	const onReCAPTCHAChange = async (captchaCode) => {
		if (!captchaCode) {
			return;
		}
		setEnquiryFields({ ...enquiryFields, captcha: captchaCode });
	};
	console.log('enquiryFields', enquiryFields);


	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
	}


	return (
		<React.Fragment>
			<div className='border-t border-gray-200 pt-3 mt-3'>
				<form onSubmit={handleSubmit(onFormSubmitenquiry)}>
					<label className="block mb-4">
						<span className='block text-base mb-1'>Name</span>
						<input name="user" type="text" {...register('user')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
						<div className="d-block text-red-500">{errors.user?.message}</div>
					</label>
					<label className="block mb-4">
						<span className='block text-base mb-1'>Email</span>
						<input name="email" type="text" {...register('email')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
						<div className="d-block text-red-500">{errors.email?.message}</div>
					</label>
					<label className="block mb-4">
						<span className='block text-base mb-1'>Enquiry</span>
						<textarea name="enquiry" type="text" {...register('enquiry')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
						<div className="d-block text-red-500">{errors.enquiry?.message}</div>
					</label>
					<ReCAPTCHA
						sitekey={CAPTCHA_SITE_KEY}
						onChange={onReCAPTCHAChange}
						theme="dark"
					/>
					<div className='text-center mt-5 mb-2'>
						<button className={`bg-victoria-800 inline-block px-2 py-3 text-white text-center w-60 text-lg cursor-pointer ${enquiryFields.captcha === "" ? 'opacity-50' : ''}`} type="submit" disabled={enquiryFields.captcha === ""}>
							{enquiry_loading ? <div className='py-[3px]'><Loaderspin /></div> : 'Send'}
						</button>
					</div>
				</form>
				{enquiry_error && <p className="bg-red-200 border border-red-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(enquiry_error)} />}
				{enquiry_success && <p className="bg-green-200 border border-green-600 rounded px-2 text-center w-full text-lg" dangerouslySetInnerHTML={createMarkup(enquiry_success)} />}
			</div>
		</React.Fragment>
	)
}

export default enquiry
