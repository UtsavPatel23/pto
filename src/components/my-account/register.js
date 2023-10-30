import React from 'react'
import { useState } from 'react';
import Loader from "./../../../public/loader.gif";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { USER_REGIS } from '../../utils/constants/endpoints';


function RegisterForm() {
    const createMarkup = ( data ) => ({
		__html: data
	});

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
    return (
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
    )
}

export default RegisterForm
