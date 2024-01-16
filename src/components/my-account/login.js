import React from 'react'
import { useState } from 'react';
import Loader from "./../../../public/loader.gif";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get_customer } from '../../utils/customer';
import axios from 'axios';
import { USER_LOGIN } from '../../utils/constants/endpoints';
;
import { Link } from '@mui/material';
import { CAPTCHA_SITE_KEY, USER_REGIS } from '../../utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"


function LoginForm({setTokenValid,tokenValid,setCustomerData}) {

    const createMarkup = ( data ) => ({
		__html: data
	});

    /*****************  LOGIN  ************************/
	const [ loginFields, setLoginFields ] = useState({
		username: '',
		password: '',
		userNiceName: '',
		userEmail: '',
		captcha: '',
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
        var userLlogin = 0;
        const loligRes = await axios.post( USER_LOGIN, loginData )
            .then( res => {

                if ( undefined === res.data.token ) {
                    setLoginFields( {
                        ...loginFields,
                        error: res.data.message,
                        loading: false }
                        );
                    return;
                }
                return res.data;
            } )
            .catch( err => {
                console.log('err',err);
                setLoginFields( { ...loginFields, error: err?.response?.data?.message, loading: false } );
            } )
        if(loligRes != undefined)
        {
            const { token, user_nicename, user_email,user_id } = loligRes;
            
            //set token on localStorage
            localStorage.setItem('token',token);
            localStorage.setItem('u8po1d',btoa(event.password));
            localStorage.setItem('user_lgdt',JSON.stringify(loligRes));
            //redirect to dashboard
            await get_customer(user_email,setCustomerData);
            setLoginFields( {
                ...loginFields,
                loading: false,
                token: token,
                userNiceName: user_nicename,
                error: '',
                userEmail: user_email,
            } )
            setTokenValid(1);
            reset_l();
        }
           

    };

    
    const handleOnChange = ( event ) => {
        setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
    };
    const { error, loading } = loginFields;

 
    
    // ReCaptcha 
	const onReCAPTCHAChange = async (captchaCode) => {
		if (!captchaCode) {
		  return;
		}
		setLoginFields({ ...loginFields, captcha: captchaCode });
	  };
	console.log('loginFields',loginFields);

    return (
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
                                <ReCAPTCHA
								sitekey={CAPTCHA_SITE_KEY}
								onChange={onReCAPTCHAChange}
								theme="dark"
								/>
								<br/>
								<button className=" mb-3 border bg-green-500" type="submit" disabled={loginFields.captcha === ""}>Login</button>
								{ loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
                            <Link href="/my-account/lost-password/">Lost your password?</Link>
						</div>
					</React.Fragment>
    )
}

export default LoginForm
