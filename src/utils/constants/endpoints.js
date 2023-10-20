export const HEADER_FOOTER_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const GET_POSTS_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/posts`;
export const GET_POST_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/posts`;
export const GET_PAGES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/pages`;
export const COMMENTS_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/comments`;

/**
 * Cart
 * @type {string}
 */
export const CART_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/cart/items/`;

// Countries and States
export const WOOCOMMERCE_COUNTRIES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/countries/`;
export const WOOCOMMERCE_STATES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/states`;


//Shipping shingle product API
export const SHOP_SHIPPING_SINGLE = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/shop-nj/v1/shipping_single`;
export const SHOP_SHIPPING_MULI = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/shop-nj/v1/shipping_muli`;

// AUS POST API
export const SUBURB_API_URL = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/shop-nj/v1/auspost`;

//Shop product API
export const SHOP_CATEGORIES = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/shop-nj/v1/categories`;
export const SHOP_CATEGORIES_CAT_SLUG = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/snv/api_json/categories/chield_cat_data.php`;
export const SHOP_PRODUCTLIST_BY_PARAMETER = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/snv/api_json/product/filter_data.php`;
export const SHOP_PRODUCTLIST = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/snv/api_json/product/products_data.js`;

//User API
export const USER_LOGIN = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/jwt-auth/v1/token`;
export const USER_REGIS = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/shop-nj/v1/registration`;

