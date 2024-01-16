import React from 'react'
import { useState } from 'react';
import Loader from "./../../../public/loader.gif";
import axios from 'axios';
import { USER_LOGINWITHPHONE } from '../../utils/constants/endpoints';
import { auth } from '../../utils/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { get_customer } from '../../utils/customer';
;


function LoginPhone({setTokenValid,tokenValid,setCustomerData}) {
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

	

	const loginwithphoneEvent = () => {
		const loginData = {
			countrycode: countrycode,
			phone: phone,
		};
		setRegisFields( { ...regisFields, regis_loading: true ,regis_error:'',regis_success:''} );

		axios.post( USER_LOGINWITHPHONE, loginData )
			.then( res => {
				if(res.data)
				{
					localStorage.setItem('token','loginphone');
					get_customer(res.data,setCustomerData);
					setTokenValid(1);
				}else{
					setRegisFields( { ...regisFields, regis_error: 'Phone no is not found', regis_loading: false } );
				}
				console.log('res',res);
			} )
			.catch( err => {
				setRegisFields( { ...regisFields, regis_error: err.response.data, regis_loading: false } );
			} )
	};
	
	
	const { regis_error,regis_success, regis_loading } = regisFields;

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
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha_login', {});
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
			if(phone == '' || (phone.match('[0-9]{10}') && phone.toString().length == 10))
			{
				setMessageOtp(messageDifine);
			}else {
                setMessageOtp( { ...messageOtp, error:true , success:false,message:'Please put 10 digit mobile number' } );
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
	  }
	const verifyOtp = (event) => {
		let otp = event.target.value;
		setOtp(otp);
	
		if (otp.length === 6) {
		  // verifu otp
		  let confirmationResult = window.confirmationResult;
		  confirmationResult.confirm(otp).then((result) => {
			// User signed in successfully.
			let user = result.user;
			console.log(user);
			//alert('User signed in successfully');
			loginwithphoneEvent();
			setVerifyPhone(true);
			setMessageOtp( { ...messageOtp, error:false , success:true,message:'Verify Otp successfully' } );
			// ...
		  }).catch((error) => {
			// User couldn't sign in (bad verification code?)
			// ...
			//alert('User couldn\'t sign in (bad verification code?)');
			setMessageOtp( { ...messageOtp, error:true , success:false,message:'Bad verification code' } );
		  });
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
							<h4 className="mb-4">Login With Phone</h4>
							{ regis_error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( regis_error ) }/> }
							{ regis_success && <div className="alert alert-success" dangerouslySetInnerHTML={ createMarkup( regis_success ) }/> }
								<div className="form-group col">
									{!hasFilled?
									<>
										<label>Phone</label>
										<select name='countrycode'   onChange={(event) => setCountrycode(event.target.value)} >
											<option value='+91'>IN +91</option>
										</select>
										<input name="phone" autoComplete='off' label='Phone Number'  className={`form-control border border-sky-500`} onChange={phoneChange} />
										<span onClick={handleSendOTP}>Send Code</span>
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
									<div id="recaptcha_login"></div>
									{messageOtp.error?<div className="invalid-feedback d-block text-red-500">{messageOtp.message}</div>:null}
									{messageOtp.success?<div className="invalid-feedback d-block text-green-500">{messageOtp.message}</div>:null}
								</div>
								{ regis_loading && <img className="loader" src={Loader.src} alt="Loader"/> }
						</div>
					</React.Fragment>
    )
}

export default LoginPhone
