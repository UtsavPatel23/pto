import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loader from "./../../public/loader.gif";
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT,  USER_CHANGEPASS,  USER_FORGOT,  USER_KEYVERI,  USER_REGIS } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
;

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import GotoLoginBtn from '../../src/components/cart/goto-login-btn';




export default function lostPassword ({headerFooter}){
	
	//set key
	const [lpKeyValid,setLpKeyValid] = useState(1);
	const createMarkup = ( data ) => ({
		__html: data
	});
	
	const router = useRouter();
	

	/*****************  Lost password  ************************/
	const [ loginFields, setLoginFields ] = useState({
		username: '',
		loading: false,
		error: ''
	});
	const [lostError,setLostError] = useState('');
	const [lostSuccess,setLostSuccess] = useState('');
	 // form validation rules 
	 const validationSchemaLogin = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
    });
    const formOptionsLogin = { resolver: yupResolver(validationSchemaLogin) };
	// get functions to build form with useForm() hook
    const action_Data = useForm(formOptionsLogin);
	const register_l = action_Data.register;
	const handleSubmit_l = action_Data.handleSubmit;
	const reset_l = action_Data.reset;
	const formState_l = action_Data.formState;
	const  errorsLogin  = formState_l.errors;
	//const { errorsLogin } = formState_l;

	// user login 
	const onFormSubmitLostPassword = async( event ) => {
	
			const loginData = {
				login: event.username,
			};
			setLoginFields( { ...loginFields, loading: true } );
				axios.post( USER_FORGOT, loginData )
				.then( res => {
					console.log('res',res.data);
					if(res.data.code == '200')
					{
						setLostSuccess('Password reset link has been sent to your registered email.');
						setLostError('');
					}else{
						setLostSuccess('');
						setLostError('User not found');
					}
				} )
				.catch( err => {
					console.log('err',err);
				} )
			setLoginFields( { ...loginFields, loading: false } );
			window.history.pushState('Details', "search title", window.location.pathname);
		};

		const handleOnChange = ( event ) => {
			setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
		};
		const { username, password, userNiceName, error, loading } = loginFields;

	/*************** Change Password ******************************/
	const [ regisFields, setRegisFields ] = useState({
		user_pass: '',
		regis_loading: false,
		regis_error: '',
		regis_success: ''
	});
	 // form validation rules 
	 const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
	// get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	const onFormSubmitForgot = ( event ) => {
		var  userData =  localStorage.getItem('lpKeyValid');
		if(userData != undefined)
		{
			userData = JSON.parse(userData);
		
			const userReqData = {
				id:userData.ID,
				user_pass: event.password,
			};
			console.log('user_pass',userReqData);
			
			
			setRegisFields( { ...regisFields, regis_loading: true } );

			
			axios.post( USER_CHANGEPASS, userReqData )
			.then( res => {
				console.log('res',res);
				if(res.data.code == '200')
				{
					localStorage.setItem("lpKeyValid",'');
					setRegisFields( {
						...regisFields,
						regis_error: '',
						regis_success: 'Password change Success.',
						regis_loading: false }
						);
				}else{
					
					setRegisFields( {
						...regisFields,
						regis_error: 'Invalid details.',
						regis_success: '',
						regis_loading: false }
						);
					
				}
			} )
			.catch( err => {
				console.log('err',err);
			} )
		}else{
			setRegisFields( {
				...regisFields,
				regis_error: 'Invalid details.',
				regis_success: '',
				regis_loading: false }
				);
		}
	};
	
	const regishandleOnChange = ( event ) => {
		setRegisFields( { ...regisFields, [event.target.name]: event.target.value } );
	};
	
	const { user_pass, regis_error,regis_success, regis_loading } = regisFields;
	
	
//console.log('loginFields',loginFields)

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
	
	/**************  default *************** */
	//hook useEffect
    useEffect(() => {
        //check token
		if(router.query.key != undefined)
		{
			if(localStorage.getItem('lpKeyValid')) {
				setLpKeyValid(1)
			}else{
				
					if(router.query.key != '' && router.query.id != '')
					{setLpKeyValid(1);
						const keyData = {
							key:router.query.key,
							id:router.query.id
						};
						 axios.post( USER_KEYVERI, keyData )
						.then( res => {
							console.log('res',res);
							if(res.data.code == '200')
							{
								
								localStorage.setItem('lpKeyValid',JSON.stringify(res.data.data))
								setRegisFields( {
									...regisFields,
									regis_error: '',
									regis_success: '',
									regis_loading: false }
									);
							}else{
								setLpKeyValid(0)
								setRegisFields( {
									...regisFields,
									regis_error: 'Invalid key.',
									regis_success: '',
									regis_loading: false }
									);
								setLostError('This password reset key is for a different. Please try again.');
								localStorage.setItem("lpKeyValid",'');
							}
						} )
						.catch( err => {
							console.log('err',err);
						} )
					}
				}
		}else{
			setLpKeyValid(0)
		}
		console.log('que',router.query.key);
		
    }, [router.query.key]);

	console.log(lpKeyValid);
	console.log('regisFields',regisFields.regis_error);
	
	if(!lpKeyValid)
	{
		return(
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				
				<div className="col-span-12 ">
				<React.Fragment>
						<div className='shadow-md p-4'>
							<h4 className="mb-4">Lost password</h4>
							{ lostError && <div className="alert alert-danger  d-block text-red-500" dangerouslySetInnerHTML={ createMarkup( lostError ) }/> }
							{ lostSuccess ? 
							<>
								<div className="alert alert-success" dangerouslySetInnerHTML={ createMarkup( lostSuccess ) }/> 
							</>: 
							<form onSubmit={handleSubmit_l(onFormSubmitLostPassword)   }>
								<label className="form-group">
									<div className="form-group col">
										<label>Username OR Email</label>
										<input name="username" type="text" {...register_l('username')} className={`form-control ${errorsLogin.username ? 'is-invalid' : ''} border border-sky-500`} />
										<div className="invalid-feedback d-block text-red-500">{errorsLogin.username?.message}</div>
									</div>
								</label>
								<button className=" mb-3 border bg-green-500" type="submit">Reset password</button>
								{ loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
							}
							
						</div>
					</React.Fragment>
				</div>
				
			</Layout>
			)
	}else{
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<div className="col-span-12 ">
					<React.Fragment>
						<div className='shadow-md'>
							<h4 className="mb-4">Enter a new password below.</h4>
							
							{ regisFields.regis_error && <div className="alert alert-danger d-block text-red-500" dangerouslySetInnerHTML={ createMarkup( regisFields.regis_error ) }/> }
							{ regisFields.regis_success ?
							<>
							 <div className="alert alert-success" dangerouslySetInnerHTML={ createMarkup( regisFields.regis_success ) }/> 
							 <GotoLoginBtn></GotoLoginBtn>
							</>
							:
							<form onSubmit={handleSubmit(onFormSubmitForgot)  }>
								<div className="form-row">
									<div className="form-group col">
										<label>Password</label>
										<input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''} border border-sky-500`} />
										<div className="invalid-feedback d-block text-red-500">{errors.password?.message}</div>
									</div>
									<div className="form-group col">
										<label>Confirm Password</label>
										<input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} border border-sky-500`} />
										<div className="invalid-feedback d-block text-red-500">{errors.confirmPassword?.message}</div>
									</div>
								</div>
								<br/>
								<button className="btn btn-primary mb-3 border bg-green-500" type="submit">Save</button>
								{ regis_loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
							}
						</div>
					</React.Fragment>
				</div>
			
			</Layout>
			
		)
	}
};

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		
	};
}



