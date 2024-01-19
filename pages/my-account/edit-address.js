
import React from 'react';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT, SUBURB_API_URL } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import { useEffect } from 'react';
;
import { useState } from 'react';
import Link from 'next/link';
import Address from '../../src/components/checkout/user-address';
import { get_countries, get_stateList } from '../../src/utils/customjs/custome';
import { isEmpty } from 'lodash';
import Loader from "./../../public/loader.gif";
import validateAndSanitizeCheckoutForm from '../../src/validator/checkout';
import cx from 'classnames';
import Router from "next/router";
import Sidebar from '../../src/components/my-account/sidebar';
import { updateCustomers } from '../../src/utils/apiFun/customer';

const defaultCustomerInfo = {
	firstName: '',
	lastName: '',
	address1: '',
	address2: '',
	city: '',
	country: 'AU',
	state: '',
	postcode: '',
	email: '',
	phone: '',
	company: '',
	errors: null
}

export default function editAddress ({headerFooter,countriesData}){
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

         const stateList = get_stateList();
         const countries = get_countries();

         const initialState = {
				billing: {
					...defaultCustomerInfo,
				},
				shipping: {
					...defaultCustomerInfo,
				},
        	}; 

         const [theBillingsuburb, setTheBillingsuburb] = useState([]);
         const [theShippingsuburb, setTheShippingsuburb] = useState([]);

         const [isFetchingBillingSuburb, setIsFetchingBillingSuburb] = useState(false);
         const [isFetchingShippingSuburb, setIsFetchingShippingSuburb] = useState(false);

         const [ theBillingStates, setTheBillingStates ] = useState( stateList );
         const [ theShippingStates, setTheShippingStates ] = useState( stateList );

         const { billingCountries, shippingCountries } = countries || {};

         const [ isFetchingBillingStates, setIsFetchingBillingStates ] = useState( false );
         const [ isFetchingShippingStates, setIsFetchingShippingStates ] = useState( false );
        
         const [ input, setInput ] = useState( initialState );
         const [loading, SetLoading] = useState(false);
		 const [message ,setMessage] = useState({
										success: false,
										customers: null,
										message: '',
										error: '',
										loading: false,
									});

        //  On change Input event 
         const handleOnChange = async ( event, isShipping = false, isBillingOrShipping = false ) => {
            const { target } = event || {};
            SetLoading(true);
            if ( isBillingOrShipping ) {
                //console.log('post 11');
                if ( isShipping ) {
                    await handleShippingChange( target );
                } else {
                    await handleBillingChange( target );
                }
            } 
            SetLoading(false);
        };
        
		// Coppy billing detail to shipping detail
		const handleOnChangeCopy = (event) => {
			const { target } = event || {};
			if(target.checked)
			{
				setInput({ ...input, shipping:input.billing});
				
			}else{
				setInput({ ...input, shipping:{...defaultCustomerInfo}});
			}
		}

        /* change event for shipping  */
	const handleShippingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
		}
		
		
		if(target.name == 'city' && target.value != '')
		{
			const selectSuburb = theShippingsuburb.find((element) => element.location == target.value);
			if(selectSuburb.state != undefined)
			{
				const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value ,state:selectSuburb.state } };
				setInput( newState );
			}else{
				const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
				setInput( newState );
			}
			
		}else{
			const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
			setInput( newState );
		}

		if(target.name == 'postcode' && target.value != '')
		{
			getAuspost(target.value,false);
		}
		//await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};
	/* change event for billng  */
	const handleBillingChange = async ( target ) => {
		if(target.name == 'postcode' && target.value != '')
		{
			if(target.value.length > 4)
			{
				return '';
			}
			
		}
		if(target.name == 'city' && target.value != '')
		{
			const selectSuburb = theBillingsuburb.find((element) => element.location == target.value);
			if(selectSuburb.state != undefined)
			{
				const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value ,state:selectSuburb.state } };
				setInput( newState );
			}else{
				const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
				setInput( newState );
			}
			
		}else{
			const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
			setInput( newState );
		}
		if(target.name == 'postcode' && target.value != '')
		{
			getAuspost(target.value,true);
		}
		//await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};


    /******   getAuspost  *******/
	const getAuspost = async (postcode,isBilling = true)=>{
		//console.log('postcode W',postcode)
		if(undefined != postcode)
		{
			var postcodeLength = postcode.length;
			if(postcodeLength >= 3 && postcodeLength <= 4)
			{
				if(isBilling)
				{
					setIsFetchingBillingSuburb(true);
				}else{
					setIsFetchingShippingSuburb(true);
				}
	
				//.log('postcode suburb',postcode)
				var resDta = '';
				await axios.post(SUBURB_API_URL,{postcode:postcode})
				.then(res=> {
					//console.log(res);
					resDta = res.data;
				})
				.catch(err=> console.log(err))
				//console.log('dataPost',resDta);
				var errorsuburbRes = false;
				if(!isEmpty(resDta) && resDta != '' && resDta != undefined)
				{
					if(!isEmpty(resDta.localities) &&  resDta.localities != '' && resDta.localities != undefined)
					{
						if(isBilling)
						{
							setTheBillingsuburb(resDta.localities.locality);
							
						}else{
							setTheShippingsuburb(resDta.localities.locality);
							
						}
					}else{
						 errorsuburbRes = true;
					}
				}else{
					errorsuburbRes = true;
				}
				if(errorsuburbRes)
				{
					//errors[postcode] = 'In valid post code';
					if(isBilling)
					{
						setTheBillingsuburb({});
					}else{
						setTheShippingsuburb({});
					}
				}
				setIsFetchingBillingSuburb(false);
				setIsFetchingShippingSuburb(false);
			}
			
		}
		
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

		setMessage({
			...message,
			message: '',
			error: '',
			loading: true, 
			});
		/**
		 * Validate Billing and Shipping Details
		 *
		 * Note:
		 * 1. If billing is different than shipping address, only then validate billing.
		 * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
		 * the respective states should only be mandatory, if a country has states.
		 */
		// validation billing and shipping fileds
		const billingValidationResult =  validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length ,false);
		const shippingValidationResult = validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length ,true);
		// update error message
		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid) {
			return null;
		}

		//customerDataTMP.shipping.firstName = customerDataTMP.shipping.first_name;
		//		customerDataTMP.shipping.lastName = customerDataTMP.shipping.last_name;
		//		customerDataTMP.shipping.address1 = customerDataTMP.shipping.address_1;
		//		customerDataTMP.shipping.address2 = customerDataTMP.shipping.address_2;

        const userData = {...input,
			billing: { ...input.billing, 
				first_name:input.billing.firstName, 
				last_name:input.billing.lastName, 
				address_1:input.billing.address1,  
				address_2:input.billing.address2,  
			},
			shipping: { ...input.shipping, 
				first_name:input.shipping.firstName, 
				last_name:input.shipping.lastName, 
				address_1:input.shipping.address1,  
				address_2:input.shipping.address2,  
			},
			};
		  //console.log('userData 1',userData);
		const response =  await updateCustomers(userData);
		if(response?.success)
		{
			localStorage.setItem('customerData',JSON.stringify(response.data.customers));
			setMessage({
				...message,
				success:true,
				message: "User update successfully",
				loading: false, 
				});
		}else{
			setMessage({
				...message,
				success:false,
				error:response.data.error,
				message: "Invalid data",
				loading: false, 
				});
		}
		
		//console.log('responseCus',responseCus);
	};

    // set defaulte user login data 
    useEffect(() => {
        if(localStorage.getItem('customerData')) {
			var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
			//console.log('customerDataTMP',customerDataTMP);
			if(customerDataTMP != undefined && customerDataTMP != '')
			{
				// Shipping field
				customerDataTMP.shipping.firstName = customerDataTMP.shipping.first_name;
				customerDataTMP.shipping.lastName = customerDataTMP.shipping.last_name;
				customerDataTMP.shipping.address1 = customerDataTMP.shipping.address_1;
				customerDataTMP.shipping.address2 = customerDataTMP.shipping.address_2;
				setTheShippingsuburb([{
					"location":customerDataTMP.shipping.city,
					"state": customerDataTMP.shipping.state
				  },]);

				// Billing field
				customerDataTMP.billing.firstName = customerDataTMP.billing.first_name;
				customerDataTMP.billing.lastName = customerDataTMP.billing.last_name;
				customerDataTMP.billing.address1 = customerDataTMP.billing.address_1;
				customerDataTMP.billing.address2 = customerDataTMP.billing.address_2;
				setTheBillingsuburb([{
					"location":customerDataTMP.billing.city,
					"state": customerDataTMP.billing.state
				  },]);

				setInput( {
					...input,
					billing: customerDataTMP.billing,
					shipping: customerDataTMP.shipping,
					id:customerDataTMP.id,
				} );

				
			}
			
		}

		//check token
        if(localStorage.getItem('token')) {
			setTokenValid(1)
        }else{
			Router.push("/my-account/");
		}
	}, [tokenValid]);

        console.log('input',input);
       
        if(tokenValid)
        {
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
                        {/*Billing Details*/ }
						<div className="billing-details">
							<h2 className="text-xl font-medium mb-4">Billing Details</h2>
							<Address
								suburbs={ theBillingsuburb }
								states={ theBillingStates }
								countries={ billingCountries.length ? billingCountries: shippingCountries }
								input={ input?.billing }
								handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
								isFetchingStates={ isFetchingBillingStates }
								isFetchingSuburb={ isFetchingBillingSuburb }
								isShipping={ false }
								isBillingOrShipping
							/>
						</div>
						<input type="checkbox" id="copy_details" onClick={handleOnChangeCopy} name="copy_details" value={1}/>
					     <label for="copy_details">Fill  Billing Details to Shipping Ditails </label>
                        {/*Shipping Details*/ }
                        <div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Shipping Details</h2>
									<Address
										suburbs={ theShippingsuburb}
										states={ theShippingStates }
										countries={ shippingCountries }
										input={ input?.shipping }
										handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
										isFetchingStates={ isFetchingShippingStates }
										isFetchingSuburb={ isFetchingShippingSuburb }
										isShipping
										isBillingOrShipping
									/>
						</div>
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



