import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loader from "./../../public/loader.gif";
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT, USER_LOGIN, USER_REGIS } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get_customer } from '../../src/utils/customer';



export default function Login ({headerFooter}){
	
	//get token
	const [tokenValid,setTokenValid] = useState(0);
	const createMarkup = ( data ) => ({
		__html: data
	});


	/*****************  LOGIN  ************************/
	const [ loginFields, setLoginFields ] = useState({
		username: '',
		password: '',
		userNiceName: '',
		userEmail: '',
		loading: false,
		error: ''
	});
	 // form validation rules 
	 const validationSchemaLogin = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
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
	const onFormSubmitLogin = async( event ) => {
	
			const loginData = {
				username: event.username,
				password: event.password,
			};
			setLoginFields( { ...loginFields, loading: true } );

			axios.post( USER_LOGIN, loginData )
				.then( res => {

					if ( undefined === res.data.token ) {
						setLoginFields( {
							...loginFields,
							error: res.data.message,
							loading: false }
							);
						return;
					}

					const { token, user_nicename, user_email,user_id } = res.data;

					setLoginFields( {
						...loginFields,
						loading: false,
						token: token,
						userNiceName: user_nicename,
						error: '',
						userEmail: user_email,
					} )
					//window.location.href = "/shop";
					//set token on localStorage
					Cookies.set('token',token);
					Cookies.set('user_lgdt',JSON.stringify(res.data));
					//redirect to dashboard
					get_customer(user_email);
					
					setTokenValid(1);
					reset_l();
					
				} )
				.catch( err => {
					setLoginFields( { ...loginFields, error: err.response.data.message, loading: false } );
				} )
		};

		const handleOnChange = ( event ) => {
			setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
		};
		const { username, password, userNiceName, error, loading } = loginFields;

		

	/*************** Regis ******************************/
	const [ regisFields, setRegisFields ] = useState({
		user_email: '',
		user_pass: '',
		regis_loading: false,
		regis_error: '',
		regis_success: ''
	});
	 // form validation rules 
	 const validationSchema = Yup.object().shape({
        user_email: Yup.string()
            .required('Email is required')
            .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Email is invalid custome')
            .email('Email is invalid'),
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

	const onFormSubmitRegister = ( event ) => {
		const regisData = {
			user_email: event.user_email,
			user_pass: event.password,
		};
		setRegisFields( { ...regisFields, regis_loading: true } );

		axios.post( USER_REGIS, regisData )
			.then( res => {
				if ( undefined === res.data.ID) {
					console.log('ID',res.data.ID);
					setRegisFields( {
						...regisFields,
						regis_error: res.data,
						regis_success: '',
						regis_loading: false }
						);
					return;
				}else{
					setRegisFields( {
						...regisFields,
						regis_error: '',
						regis_success: 'Registration successful',
						regis_loading: false }
						);
				}
				console.log('res',res);
				reset();
			} )
			.catch( err => {
				setRegisFields( { ...regisFields, regis_error: err.response.data, regis_loading: false } );
			} )
	};
	
	const regishandleOnChange = ( event ) => {
		setRegisFields( { ...regisFields, [event.target.name]: event.target.value } );
	};
	
	const { user_email, user_pass, regis_error,regis_success, regis_loading } = regisFields;

//console.log('loginFields',loginFields)
//console.log('regisFields',regisFields)

//console.log('userlogin',userlogin)

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
        if(Cookies.get('token')) {
			setTokenValid(1)
        }
    }, []);

	//function logout
	const logoutHanlder = async () => {
		//remove token from cookies
		Cookies.remove("token");
		Cookies.remove("user_lgdt");
		Cookies.remove('customerData');
		Cookies.remove('coutData');
		
		setTokenValid(0);
	};

	
	if(tokenValid)
	{
		return(
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				
				<div className="col-span-3 ">
					<button onClick={logoutHanlder}>logout</button>
				</div>
				<div className="col-span-9 ">
					User
				</div>
				
			</Layout>
			)
	}else{
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<div className="col-span-3 ">side</div>
				<div className="col-span-9 ">
					
					<React.Fragment>
						<div className='shadow-md p-4'>
							<h4 className="mb-4">Login</h4>
							{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( error ) }/> }
							<form onSubmit={handleSubmit_l(onFormSubmitLogin)   }>
								<label className="form-group">
									<div className="form-group col">
										<label>Username</label>
										<input name="username" type="text" {...register_l('username')} className={`form-control ${errorsLogin.username ? 'is-invalid' : ''} border border-sky-500`} />
										<div className="invalid-feedback d-block text-red-500">{errorsLogin.username?.message}</div>
									</div>
								</label>
								<br/>
								<label className="form-group">
									<div className="form-group col">
										<label>Password</label>
										<input name="password" type="password" {...register_l('password')} className={`form-control ${errorsLogin.password ? 'is-invalid' : ''} border border-sky-500`} />
										<div className="invalid-feedback d-block text-red-500">{errorsLogin.password?.message}</div>
									</div>
								</label>
								<br/>
								<button className=" mb-3 border bg-green-500" type="submit">Login</button>
								{ loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
						</div>
					</React.Fragment>
					<React.Fragment>
						<div className='shadow-md'>
							<h4 className="mb-4">Register</h4>
							{ regis_error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( regis_error ) }/> }
							{ regis_success && <div className="alert alert-success" dangerouslySetInnerHTML={ createMarkup( regis_success ) }/> }
							<form onSubmit={handleSubmit(onFormSubmitRegister)  }>
								<div className="form-group col">
									<label>Email</label>
									<input name="user_email" type="text" {...register('user_email')} className={`form-control ${errors.user_email ? 'is-invalid' : ''} border border-sky-500`} />
									<div className="invalid-feedback d-block text-red-500">{errors.user_email?.message}</div>
								</div>
								<br/>
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
								<button className="btn btn-primary mb-3 border bg-green-500" type="submit">Register</button>
								{ regis_loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
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
		revalidate: 1,
	};
}



