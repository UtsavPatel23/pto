import axios from "axios";
import Cookies from "js-cookie";

/* Get customer data */
export const get_customer = async(arg_user_email)=>
		{
			let responseCus = {
                success: false,
                customers: null,
                error: '',
            };
			try {
                const {data:resultCus} = await axios.get( '/api/get-customers?email='+arg_user_email);
                
                if ( resultCus.error ) {
                    responseCus.error = resultCus.error;
                }
               
				responseCus.success = true;
				console.log('resultCus',resultCus);
				if(resultCus.customers != undefined)
				{
					responseCus.customers = resultCus.customers[0];
					Cookies.set('customerData',JSON.stringify(resultCus.customers[0]));
				}
            } catch ( error ) {
                // @TODO to be handled later.
                console.warn( 'Handle create order error', error?.message );
            }
			//console.log('responseCus',loginFields.userEmail);
			console.log('responseCus',responseCus);
			
		}