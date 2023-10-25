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
	const dataUser = req?.body ?? {};
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
