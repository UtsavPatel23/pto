import axios from "axios";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_SITE_API_URL } from "./constants/endpoints";
/* Get customer data */
export const get_customer = async(arg_user_email,setCustomerData)=>
		{
			let responseCus = {
                success: false,
                customers: null,
                error: '',
            };
			try {
                const {data:resultCus} = await axios.get( NEXT_PUBLIC_SITE_API_URL +'/api/customer/get-customers?email='+arg_user_email);
                
                if ( resultCus.error ) {
                    responseCus.error = resultCus.error;
                }
               
				responseCus.success = true;
				console.log('resultCus',resultCus);
				if(resultCus.customers != undefined)
				{
					responseCus.customers = resultCus.customers[0];
					setCustomerData(resultCus.customers[0]);
					Cookies.set('customerData',JSON.stringify(resultCus.customers[0]));
				}
            } catch ( error ) {
                // @TODO to be handled later.
                console.warn( 'Handle create order error', error?.message );
            }
			//console.log('responseCus',loginFields.userEmail);
			console.log('responseCus',responseCus);
			return responseCus.customers;
		}

export const handleCreateCustomer = async(input) => {
			let responseCus = {
				success: false,
				customers: null,
				error: '',
			};
			var randumNo = Math.random().toFixed(3)*1000;
			var usernameCreate = input.billing.email.split("@", 3)[0]+randumNo;
			const userData = {
				email: input.billing.email,
				first_name: input.billing.firstName,
				last_name: input.billing.lastName,
				username: usernameCreate,
				password: input.createAccountPassword,
				billing: input.billing,
				shipping:input.shipping 
			  };
			  console.log('userData',userData);
			await axios.post(NEXT_PUBLIC_SITE_API_URL +'/api/customer/create-customers/',
			userData
			).then((response) => {
				console.log(response.data);
				responseCus.success = true;
				responseCus.customers = response.data;
				//res.json( responseCus );
			})
			.catch((error) => {
				console.log('Err',error.response.data);
				responseCus.error = error.response.data.error;
				//res.status( 500 ).json( responseCus  );
			});

			return responseCus;
}