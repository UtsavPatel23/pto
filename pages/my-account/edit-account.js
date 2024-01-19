
import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
;
import { useState } from 'react';
import Link from 'next/link';
import Loader from "./../../public/loader.gif";
import validateAndSanitizeCheckoutFormCustomers from '../../src/validator/customers';
import cx from 'classnames';
import InputField from '../../src/components/checkout/form-elements/input-field';
import Datepicker from "react-tailwindcss-datepicker"; 
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { updateCustomers } from '../../src/utils/apiFun/customer';



export default function editAccount ({headerFooter,countriesData}){

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
        const [tokenValid,setTokenValid]=useState(0);

         const initialState = {
		   firstName:'',
           lastName:'',
           email:'',
           oldpassword:'',
           password:'',
           confirmPassword:'',
           customer_birthday:'',
        }; 
       
        
         const [ input, setInput ] = useState( initialState );
         const [loading, SetLoading] = useState(false);
		 const [message ,setMessage] = useState({
			 success: false,
			 message: '',
			 error: '',
			});
		const [token, setToken] = useState('');

        //  On change Input event 
         const handleOnChange = async ( event) => {
            const { target } = event || {};
			SetLoading(true);
			if(target != undefined)
			{
				const newState = { ...input, [ target.name ]: target.value  };
				setInput( newState );
			}else{
				const newState = { ...input, [ 'customer_birthday' ]: event  };
				setInput( newState );
			}
			
            SetLoading(false);
        };
        
       
    /**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		event.preventDefault();
		
		setMessage( {
			...message,
			regis_error: '',
			success: '',
			regis_loading: true }
			);
		/**
		 * Validate Billing and Shipping Details
		 *
		 * Note:
		 * 1. If billing is different than shipping address, only then validate billing.
		 * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
		 * the respective states should only be mandatory, if a country has states.
		 */
		// validation other fiield 
		const ValidationResult =  validateAndSanitizeCheckoutFormCustomers( input);
		console.log('ValidationResult',ValidationResult);
		// update error message
		setInput( {
			...input,
			errors: ValidationResult.errors
		} );

		// If there are any errors, return.
		if (!ValidationResult.isValid) {
			return null;
		}
		
		//password
        var userData = {
			first_name:input.firstName,
			last_name:input.lastName,
			id:input.id,
			meta_data:[             
				{    
					"key":"customer_birthday",
					"value":input.customer_birthday?.startDate
				}
			]};
			if(input.password != '')
			{
				userData = {...userData,password:input.password}
			}
		  console.log('userData 1',userData);
		
		  const response =  await updateCustomers(userData);
		  if(response?.success)
		  {
			setMessage( {
				...message,
				regis_error: '',
				success: true,
				regis_loading: false,
				message:"User update successfully"}
				);
			localStorage.setItem('customerData',JSON.stringify(response.data.customers));
			if(input.password != '')
			{
				localStorage.setItem('u8po1d',btoa(input.password));
				setInput( {
					...input,
					oldpassword:'',
					password:'',
					confirmPassword:'',
				} );
			}
		  }else{
			setMessage( {
				...message,
				regis_error: error.response.data.error,
				success: false,
				regis_loading: false,
				message:"Invalid data"
				}
				);
		  }
		
		
	};
console.log('message',message);
    // set defaulte user login data 
    useEffect(() => {
        if(localStorage.getItem('customerData')) {
			var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
			console.log('customerDataTMP',customerDataTMP);
			if(customerDataTMP != undefined && customerDataTMP != '')
			{
				
				setInput( {
					...input,
					firstName:customerDataTMP.first_name,
					lastName:customerDataTMP.last_name,
					email:customerDataTMP.email,
					id:customerDataTMP.id,
					customer_birthday:{
						startDate:customerDataTMP?.meta_data?.customer_birthday,
						endDate:customerDataTMP?.meta_data?.customer_birthday,
					},
				} );

				
			}
			
		}

		//check token
        if(localStorage.getItem('token')) {
			setTokenValid(1)
			setToken(localStorage.getItem('token'));
        }else{
			Router.push("/my-account/");
		}
	
	}, [tokenValid]);

        console.log('input',input);
        
        if(tokenValid)
        {
			const {errors} = input || {};
            return(
                <>
				<Layout headerFooter={ headerFooter || {} } seo={ seo }>
					<div className='grid grid-cols-12 gap-4'>
					<div className="col-span-4">
					<Sidebar setTokenValid={setTokenValid}></Sidebar>
					</div>
					
					<div className="col-span-8 ">
						{ loading && <img className="loader" src={Loader.src} alt="Loader" width={50}/> }
						<p>{message.success?<>{message.message}</>:null}</p>
                        <form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
							<InputField
								name="firstName"
								inputValue={input?.firstName}
								required
								handleOnChange={handleOnChange}
								label="First name"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
							/>
							<InputField
								name="lastName"
								inputValue={input?.lastName}
								required
								handleOnChange={handleOnChange}
								label="Last name"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
							/>
							<InputField
								name="email"
								inputValue={input?.email}
								required
								handleOnChange={handleOnChange}
								label="Email"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
								readonly = {1}
							/>
							{token != 'loginphone'?<InputField
								name="oldpassword"
								inputValue={input?.oldpassword}
								handleOnChange={handleOnChange}
								label="Old password"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
							/>:null}
							<InputField
								name="password"
								inputValue={input?.password}
								handleOnChange={handleOnChange}
								label="Password"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
							/>
							<InputField
								name="confirmPassword"
								inputValue={input?.confirmPassword}
								handleOnChange={handleOnChange}
								label="Confirm Password"
								errors={errors}
								containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
							/>
							<Datepicker 
							useRange={false} 
							asSingle={true} 
							value={input?.customer_birthday} 
							onChange={handleOnChange} 
							/> 
                        	<div className="woo-next-place-order-btn-wrap mt-5">
								<button
									disabled={ loading }
									className={ cx(
										'bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full',
										{ 'opacity-50': loading },
									) }
									type="submit"
								>
								Save
								</button>
							</div>
                        </form>
					</div>
					</div>
				</Layout>
                </>
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



