import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loader from "./loader.gif";
import axios from 'axios';
import Router from 'next/router';
import { HEADER_FOOTER_ENDPOINT, USER_LOGIN } from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';
import Cookies from 'js-cookie';

export default function Login ({headerFooter}){
	

	const [ loginFields, setLoginFields ] = useState({
		username: '',
		password: '',
		userNiceName: '',
		userEmail: '',
		loading: false,
		error: ''
	});

	const createMarkup = ( data ) => ({
		__html: data
	});

	const onFormSubmit = ( event ) => {
		event.preventDefault();

		const loginData = {
			username: loginFields.username,
			password: loginFields.password,
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

				sessionStorage.setItem( 'user_lgdt', JSON.stringify(res.data));
				sessionStorage.setItem( 'token', token );
				sessionStorage.setItem( 'userName', user_nicename );

				setLoginFields( {
					...loginFields,
					loading: false,
					token: token,
					userNiceName: user_nicename,
					userEmail: user_email,
				} )
				//window.location.href = "/shop";
				//set token on localStorage
				Cookies.set('token',token);
				Cookies.set('user_lgdt',JSON.stringify(res.data));
				//redirect to dashboard
				Router.push('/');
			} )
			.catch( err => {
				setLoginFields( { ...loginFields, error: err.response.data.message, loading: false } );
			} )
	};

	const handleOnChange = ( event ) => {
		setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
	};
if(loginFields.username != '')
{
	sessionStorage.setItem( 'loginFields',JSON.stringify(loginFields));
}
	const { username, password, userNiceName, error, loading } = loginFields;

console.log('login loginFields',loginFields)

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
	console.log('headerFooter',headerFooter);
	//hook useEffect
    useEffect(() => {

        //check token
        if(Cookies.get('token')) {

            //redirect page dashboard
            Router.push('/');
        }
    }, []);
	
		return (
			<Layout headerFooter={ headerFooter || {} } seo={ seo }>
				<React.Fragment>
						<div style={{ height: '100vh', maxWidth: '400px', margin: '0 auto' }}>
							<h4 className="mb-4">Login</h4>
							{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( error ) }/> }
							<form onSubmit={ onFormSubmit }>
								<label className="form-group">
									Username: 
									<input
										type="text"
										className="form-control"
										name="username"
										value={ username }
										onChange={ handleOnChange }
									/>
								</label>
								<br/>
								<label className="form-group">
									Password:
									<input
										type="password"
										className="form-control"
										name="password"
										value={ password }
										onChange={ handleOnChange }
									/>
								</label>
								<br/>
								<button className="btn btn-primary mb-3" type="submit">Login</button>
								{ loading && <img className="loader" src={Loader} alt="Loader"/> }
							</form>
						</div>
					</React.Fragment>
			</Layout>
			
		)
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



