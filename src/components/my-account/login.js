import React from 'react'
import { useState } from 'react';
import Loaderspin from "../loaderspin";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get_customer } from '../../utils/customer';
import axios from 'axios';
import { USER_LOGIN } from '../../utils/constants/endpoints';
import { Link } from '@mui/material';
import { CAPTCHA_SITE_KEY, USER_REGIS } from '../../utils/constants/endpoints';
import ReCAPTCHA from "react-google-recaptcha"


function LoginForm({ setTokenValid, tokenValid, setCustomerData }) {

    const createMarkup = (data) => ({
        __html: data
    });

    /*****************  LOGIN  ************************/
    const [loginFields, setLoginFields] = useState({
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
    const errorsLogin = formState_l.errors;
    //const { errorsLogin } = formState_l;
    // user login 
    const onFormSubmitLogin = async (event) => {

        const loginData = {
            username: event.username,
            password: event.password,
        };
        setLoginFields({ ...loginFields, loading: true });
        var userLlogin = 0;
        const loligRes = await axios.post(USER_LOGIN, loginData)
            .then(res => {

                if (undefined === res.data.token) {
                    setLoginFields({
                        ...loginFields,
                        error: res.data.message,
                        loading: false
                    }
                    );
                    return;
                }
                return res.data;
            })
            .catch(err => {
                console.log('err', err);
                setLoginFields({ ...loginFields, error: err?.response?.data?.message, loading: false });
            })
        if (loligRes != undefined) {
            const { token, user_nicename, user_email, user_id } = loligRes;

            //set token on localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('u8po1d', btoa(event.password));
            localStorage.setItem('user_lgdt', JSON.stringify(loligRes));
            //redirect to dashboard
            await get_customer(user_email, setCustomerData);
            setLoginFields({
                ...loginFields,
                loading: false,
                token: token,
                userNiceName: user_nicename,
                error: '',
                userEmail: user_email,
            })
            setTokenValid(1);
            reset_l();
        }


    };


    const handleOnChange = (event) => {
        setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
    };
    const { error, loading } = loginFields;



    // ReCaptcha 
    const onReCAPTCHAChange = async (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        setLoginFields({ ...loginFields, captcha: captchaCode });
    };
    console.log('loginFields', loginFields);

    return (
        <React.Fragment>
            <div className='mb-3'>
                {error && <div className="text-red-500" dangerouslySetInnerHTML={createMarkup(error)} />}
                <form onSubmit={handleSubmit_l(onFormSubmitLogin)}>
                    <label className="block mb-4">
                        <span className='block text-base mb-1'>Username</span>
                        <input name="username" type="text" {...register_l('username')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
                        <div className="d-block text-red-500">{errorsLogin.username?.message}</div>
                    </label>
                    <label className="block mb-4">
                        <span className='block text-base mb-1'>Password</span>
                        <input name="password" type="password" {...register_l('password')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
                        <div className="d-block text-red-500">{errorsLogin.password?.message}</div>
                    </label>
                    <ReCAPTCHA
                        sitekey={CAPTCHA_SITE_KEY}
                        onChange={onReCAPTCHAChange}
                        theme="dark"
                    />
                    <div className='text-center mt-5 mb-2'>
                        <button className={`bg-victoria-800 inline-block px-2 py-3 text-white text-center w-60 text-lg cursor-pointer ${loginFields.captcha === "" ? 'opacity-50' : ''}`} type="submit" disabled={loginFields.captcha === ""}>
                            {loading ? <div className='py-[3px]'><Loaderspin></Loaderspin></div> : 'Login'}
                        </button>
                    </div>
                </form>
                <Link href="/my-account/lost-password/" className='text-black hover:text-victoria-800'>Lost your password?</Link>
            </div>
        </React.Fragment>
    )
}

export default LoginForm
