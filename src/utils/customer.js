import { createCustomers, getCustomers } from "./apiFun/customer";

/* Get customer data */
export const get_customer = async(arg_user_email,setCustomerData)=>
		{
			let responseCus = {
                success: false,
                customers: null,
                error: '',
            };
			const resultCus = await getCustomers(arg_user_email);
			console.log('======resultCus=====',resultCus);
			if(resultCus.success)
			{
				responseCus.success = true;
				if(resultCus.customers != undefined)
				{
					responseCus.customers = resultCus.customers[0];
					setCustomerData(resultCus.customers[0]);
					localStorage.setItem('customerData',JSON.stringify(resultCus.customers[0]));
				}
			}else{
				responseCus.error = resultCus.error;
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

			   const response = await createCustomers();
			   if(response.success)
			   {
				responseCus.success = true;
				responseCus.customers = response.data;
			   }else{
				responseCus.error = error.response.data.error;
			   }
			return responseCus;
}