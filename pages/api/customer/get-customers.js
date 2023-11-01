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
	if(email == undefined)
	{
		res.json( 'Error' );
	}
		try {
			const { data } = await api.get(
				'customers',
				{
					email:email
				}
			);
			
			responseData.success = true;
			responseData.customers = data;
			
			res.json( responseData );
			
		} catch ( error ) {
			responseData.error = error.message;
			res.status( 500 ).json( responseData  );
		}
	
}
