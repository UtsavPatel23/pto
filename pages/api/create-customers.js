const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export default async function handler(req, res) {
	
	const responseData = {
		success: false,
		customers: []
	}
	const { email } = req?.query ?? {};
	res.json( req?.query );
	if(email == undefined)
	{
		res.json( 'Error' );
	}
	const dataUser = {
		email: "john.doe2@example.com",
		first_name: "John",
		last_name: "Doe",
		username: "john.doe",
		password: "john.doe",
		billing: {
		  first_name: "John",
		  last_name: "Doe",
		  company: "",
		  address_1: "969 Market",
		  address_2: "",
		  city: "San Francisco",
		  state: "CA",
		  postcode: "94103",
		  country: "US",
		  email: "john.doe2@example.com",
		  phone: "(555) 555-5555"
		},
		shipping: {
		  first_name: "John",
		  last_name: "Doe",
		  company: "",
		  address_1: "969 Market",
		  address_2: "",
		  city: "San Francisco",
		  state: "CA",
		  postcode: "94103",
		  country: "US"
		}
	  };
		
			await api.post(
				'customers',
				dataUser
			).then((response) => {
				console.log(response.data);
				responseData.success = true;
				responseData.customers = response.data;
			
				res.json( responseData );
			  })
			  .catch((error) => {
				console.log(error.response.data);
				responseData.error = error.response.data;
				res.status( 500 ).json( responseData  );
			  });
			
		
	
}
