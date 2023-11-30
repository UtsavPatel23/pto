import React from 'react'
import { useState } from 'react';
import Loader from "./../../../public/loader.gif";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { CAPTCHA_SITE_KEY, USER_REGIS } from '../../utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"
import { auth } from '../../utils/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


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
		regis_success: '',
		captcha: '',
	});
  let  messageDifine = {
	success :false,
	error : false,
	message : '',
  };
  const [phone, setPhone] = useState('');
  const [countrycode, setCountrycode] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [sendTime, setSendTime] = useState(0);
  const [resendOtp, setResendOtp] = useState('');
  const [messageOtp, setMessageOtp] = useState(messageDifine);

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
			countrycode: event.countrycode,
			phone: event.phone,
			phonedis: countrycode+phone,
			user_email: event.user_email,
			user_pass: event.password,
		};
		if(phone != '')
		{
			if(!verifyPhone)
			{
				setMessageOtp( { ...messageOtp, error:true ,message:'Please phone no verify' } );
				return '';
			}
		}

		setRegisFields( { ...regisFields, regis_loading: true ,regis_error:'',regis_success:''} );

		axios.post( USER_REGIS, regisData )
			.then( res => {
				if ( undefined === res.data.ID) {
					console.log('ID',res.data.ID);
					console.log('data',res.data);
					setRegisFields( {
						...regisFields,
						regis_error: res.data,
						regis_success: '',
						regis_loading: false }
						);
					if(res.data == 'Sorry, this phone number is already in use.Please login')
					{
						setPhone('');
						setOtp('');
						setHasFilled(false);
						setVerifyPhone(false);
						setMessageOtp(messageDifine);
					}
					return;
				}else{
					setRegisFields( {
						...regisFields,
						regis_error: '',
						regis_success: 'Registration successful',
						regis_loading: false }
						);
					setHasFilled(false);
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
	// ReCaptcha 
	const onReCAPTCHAChange = async (captchaCode) => {
		if (!captchaCode) {
		  return;
		}
		setRegisFields({ ...regisFields, captcha: captchaCode });
	  };
	console.log('regisFields',regisFields);

	// OTP send
	const phoneChange = (event) => {
		setPhone(event.target.value)
			if(event.target.value == '' || (event.target.value.match('[0-9]{10}') && event.target.value.toString().length == 10))
			{
				setMessageOtp(messageDifine);
			}else {
                //setMessageOtp( { ...messageOtp, error:true , success:false,message:'Please put 10 digit mobile number' } );
            }  
		}
	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
	  }
	  if(sendTime == 60)
	  {
		setSendTime(59)
		var count = sendTime;
		var x = setInterval(function() {
		  
				  if (count <= 0) {
					  clearInterval(x);
					  setSendTime(0)
					  setResendOtp('')
				  }else{
					  count--;
					  setResendOtp('Not received your code? Resend code ('+count+')');
				  }
		  }, 1000);
	  }
	  console.log('sendTime',sendTime);
	const handleSendOTP = (event) => {
		setRegisFields( { ...regisFields, regis_loading: true} );
			if(phone == '' || (phone.match('[0-9]{10}') && phone.toString().length == 10))
			{
				setMessageOtp(messageDifine);
			}else {
                setMessageOtp( { ...messageOtp, error:true , success:false,message:'Please put 10 digit mobile number' } );
				setRegisFields( { ...regisFields, regis_loading: false} );
				return '';
            }
		event.preventDefault();
		
		if(window.recaptchaVerifier == undefined)
		{
			generateRecaptcha();
		}
		let appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, countrycode+phone, appVerifier)
		  .then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			console.log('confirmationResult',confirmationResult);
			setHasFilled(true);
			setMessageOtp( { ...messageOtp, error:false , success:true,message:'SMS send successfully' } );
			setSendTime(60);
			window.confirmationResult = confirmationResult;
		  }).catch((error) => {
			// Error; SMS not sent
			setMessageOtp( { ...messageOtp, error:true ,message:'Invalid phone number' } );
			console.log('error',error);
		  });
		  setRegisFields( { ...regisFields, regis_loading: false} );
	  }
	const verifyOtp = (event) => {
		let otp = event.target.value;
		setOtp(otp);
	
		if (otp.length === 6) {
		 setRegisFields( { ...regisFields, regis_loading: true} );
		  // verifu otp
		  let confirmationResult = window.confirmationResult;
		  confirmationResult.confirm(otp).then((result) => {
			// User signed in successfully.
			let user = result.user;
			console.log(user);
			//alert('User signed in successfully');
			setVerifyPhone(true);
			setMessageOtp( { ...messageOtp, error:false , success:true,message:'Verify Otp successfully' } );
			// ...
		  }).catch((error) => {
			// User couldn't sign in (bad verification code?)
			// ...
			//alert('User couldn\'t sign in (bad verification code?)');
			setMessageOtp( { ...messageOtp, error:true , success:false,message:'Bad verification code' } );
		  });
		  setRegisFields( { ...regisFields, regis_loading: false} );
		}
	  }
	  const changePhoneNo = () => {
				setPhone('');
				setOtp('');
				setHasFilled(false);
				setVerifyPhone(false);
				setMessageOtp(messageDifine);
		};
	return (
        <React.Fragment>
						<div className='shadow-md'>
							<h4 className="mb-4">Register</h4>
							{ regis_error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( regis_error ) }/> }
							{ regis_success && <div className="alert alert-success" dangerouslySetInnerHTML={ createMarkup( regis_success ) }/> }
							<form onSubmit={handleSubmit(onFormSubmitRegister)  }>
								<div className="form-group col">
									{!hasFilled?
									<>
										<label>Phone</label>
										<select name='countrycode'   {...register('countrycode')}  onChange={(event) => setCountrycode(event.target.value)} >
											<option value='+91'>IN +91</option>
										</select>
										<input name="phone" autoComplete='off' label='Phone Number'  {...register('phone')}  className={`form-control ${errors.phone ? 'is-invalid' : ''} border border-sky-500`} onChange={phoneChange} />
										<span onClick={handleSendOTP}>Verify</span>
									</>	
									:
									<>
										<label>Phone no : { countrycode+phone}</label><br></br>
										<label>Enter the OTP</label>
										<input value={otp} onChange={verifyOtp} />
										{!verifyPhone ? <>{sendTime > 0 ? <>
										{resendOtp}
										</>:<>
										<span onClick={handleSendOTP}>Re Send Code</span>
										</>}</>:null}
										<br></br>
										<span onClick={changePhoneNo}>Change Phone no</span>
										
									  </>
									  }
									<div id="recaptcha"></div>
									{messageOtp.error?<div className="invalid-feedback d-block text-red-500">{messageOtp.message}</div>:null}
									{messageOtp.success?<div className="invalid-feedback d-block text-green-500">{messageOtp.message}</div>:null}
								</div>
								<br/>
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
								<ReCAPTCHA
								sitekey={CAPTCHA_SITE_KEY}
								onChange={onReCAPTCHAChange}
								theme="dark"
								/>
								<br/>
								<button className="btn btn-primary mb-3 border bg-green-500" type="submit" disabled={regisFields.captcha === ""}>Register</button>
								{ regis_loading && <img className="loader" src={Loader.src} alt="Loader"/> }
							</form>
						</div>
					</React.Fragment>
    )
}

export default RegisterForm
