const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: 'wc/v3',
} );

/**
 * Get Products.
 *
 * @return {Promise<void>}
 */
export const getProductsData = async ( perPage = 50 ) => {
	return await api.get(
		'products',
		{
			per_page: perPage || 50,
			prodict_list : 1,
		},
	);
};

/**
 * Get Single Product By Slug.
 *
 * @return {Promise<void>}
 */
export const getProductBySlug = async ( productSlug = '' ) => {
	return await api.get(
		'products',
		{
			slug: productSlug,
			prodict_single: 1,
		},
	);
};

/**
 * Get Single Product By Slug.
 *
 * @return {Promise<void>}
 */
 export const getreviewsByProID = async ( productId = '' ) => {
	return await api.get(
		'products/reviews',
		{
			product: productId,
		},
	);
};

/**
 * Get Products.
 *
 * @return {Promise<void>}
 */
 export const getCategoryData = async ( perPage = 50 ) => {
	return await api.get(
		'products/categories',
		{
			per_page: perPage || 50,
			cat_list:1,
		},
	);
};
