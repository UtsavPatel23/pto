import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { SUBSCRIBE_EMAIL } from '../utils/constants/endpoints';

function subscribe_email() {
    const [subscribe_email, setSubscribe_email] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const createMarkup = (data) => ({
        __html: data
    });
    // Email validation 
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    // Submit email Id 
    const submitSubscribeEmail = async () => {
        setError('');
        setSuccess('');
        setLoading(true);
        const subscribeData = {
            subscribe_email: subscribe_email,
        };
        if (validateEmail(subscribe_email)) {
            await axios.post(SUBSCRIBE_EMAIL, subscribeData)
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.success) {
                        setSuccess(res.data.msg);
                        setSubscribe_email('');
                    } else {
                        setError(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log('err', err);
                })

        } else {
            if (subscribe_email == '') {
                setError('Email id required.');
                var  el =  document.getElementById("subscribe_email");
				if(el){el.focus();}
            } else {
                setError(subscribe_email +' is invalid.');
                var  el =  document.getElementById("subscribe_email");
				if(el){el.focus();}
            }
        }
        setLoading(false);
    }

    // Add input value
    const inputChangeEvent = (e) => {
        setSubscribe_email(e.target.value);
        //if (error != '') {
        if (!validateEmail(e.target.value)) {
                if (e.target.value == '')
                {
                setError('Email id required.'); 
                } else {
                setError(e.target.value +' is invalid.');
                    }
                var  el =  document.getElementById("subscribe_email");
                if (el) { el.focus(); }
                setSuccess('');
            } else {
                setError('');
                setSuccess(e.target.value +' is valid.');
            }
        //}
    }

    return (
        <div className='shadow-full'>
            <div>
                <div className='relative'>
                    <input
                        name="subscribe_email"
                        onChange={inputChangeEvent}
                        value={subscribe_email}
                        type={'text'}
                        className={`outline-none block w-full py-2 px-3 pe-20 text-base text-black border border-gray-300 focus:border-victoria-400`}
                        placeholder={'Enter your email'}
                        id='subscribe_email'
                    />
                    {error && <div className="absolute bg-white px-3 text-red-500" dangerouslySetInnerHTML={createMarkup(error)} />}
                    {success && <div className="absolute bg-white px-3  text-green-500" dangerouslySetInnerHTML={createMarkup(success)} />}
                    <button
                        onClick={submitSubscribeEmail}
                        disabled={loading}
                        className="absolute top-0 right-0 h-[42px] bg-victoria-800 inline-block px-4 text-white text-center cursor-pointer" >
                        {loading ?
                            <span className='size-10 sm:size-full bg-white sm:bg-transparent grid place-content-center'>
                                <span className='wishloader mx-auto'></span>
                            </span>
                            :
                            'Subscribe'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default subscribe_email