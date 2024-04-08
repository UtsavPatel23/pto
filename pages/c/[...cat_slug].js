/**
 * Internal Dependencies.
 */
//import Products from '../../src/components/products';
import { HEADER_FOOTER_ENDPOINT, SHOP_CATEGORIES_CAT_SLUG, SHOP_CATEGORIES_CAT_SLUG_CACHE, SHOP_PRODUCTLIST_BY_PARAMETER } from '../../src/utils/constants/endpoints';
import isEmpty from 'is-empty';
/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../../src/components/layout';
import Products from '../../src/components/products';
import Category from '../../src/components/categories/category';
import Image from 'next/image';
import Link from 'next/link';

export default function cat_slug({ headerFooter, categories, cacheValid }) {
    //console.log('params',params);
    //console.log('products',products);
    const { products } = categories;
    const { cat_list } = categories;
    const { cat_data } = categories;
    const { single_category_image, single_category_image_url } = headerFooter?.footer?.options ?? '';
    // Banner 
    const { category_image_select_category_section } = headerFooter?.footer?.options ?? '';
    console.log('categories', categories);
    console.log('cacheValid', cacheValid);
    console.log('headerFooter', single_category_image);
    console.log('category_image_select_category_section', category_image_select_category_section);
    //console.log('headerFooter',headerFooter?.footer?.options?.single_category_image_url);

    if (isEmpty(products)) {
        return (
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    } else {
        return (
            <Layout
                headerFooter={headerFooter || {}}
                seo={cat_data?.yoast_head_json ?? {}}
                uri={`/categories/${cat_data?.term_link ?? ''}`}
            >
                <div key={'cat_' + cat_list.length} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    {cat_list.length ? cat_list.map(category => {
                        return (
                            <Category key={category?.id} category={category} />
                        )
                    }) : null}
                </div>
                <div key='cat-banner' className='text-center my-5'>
                    {single_category_image !== undefined ?
                        <Link href={single_category_image_url}>
                            <Image
                                src={single_category_image}
                                alt="Category Banner"
                                width={1320}
                                height={300}
                                className='mx-auto'
                            />
                        </Link>
                        : null}
                    {(() => {
                        //console.log('index', category_image_select_category_section);
                        if (category_image_select_category_section?.length) {
                           return  category_image_select_category_section.map((val, index) => {
                                const toDay = new Date();
                                var start_date = new Date(val?.start_date);
                                var end_date = new Date(val?.end_date);
                                if (start_date <= toDay && toDay <= end_date) {
                                    const found = val?.select_category.find((element) => element == cat_data?.id);
                                    if (found) { 
                                        return (val?.category_image != '' ?
                                        <Link href={val?.category_url}>
                                            <Image
                                                src={val?.category_image}
                                                alt="Category Banner"
                                                width={1320}
                                                height={300}
                                                className='mx-auto'
                                            />
                                        </Link>
                                        : null)
                                    }
                                    
                                }
                            });
                            
                            
                        }
                    })()}
                </div>
                <Products products={products} />
            </Layout>
        )
    }

}

// getStaticProps // getServerSideProps
export async function getServerSideProps(context) {
    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    // const {data : res} = await axios.get(SHOP_PRODUCTLIST_BY_PARAMETER,context);
    const { params } = context;
    const { cat_slug } = params || {};
    var lastSlug = cat_slug[Object.keys(cat_slug)[Object.keys(cat_slug).length - 1]];
    let rsCat = null;
    let cacheValid = 0;
    const { data: res_cat_cache } = await axios.get(SHOP_CATEGORIES_CAT_SLUG_CACHE + 'product_cat_' + lastSlug + '.js');
    if (res_cat_cache?.products != undefined) {
        rsCat = res_cat_cache;
        cacheValid = 1;
    } else {
        const { data: res_cat } = await axios.get(SHOP_CATEGORIES_CAT_SLUG, context);
        rsCat = res_cat;
        cacheValid = 0;
    }

    // Return the ID to the component
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
            //products: res,
            categories: rsCat,
            cacheValid: cacheValid,
        },
    };
};

/*export async function getStaticPaths() {
   const { data: categories } = await getCategoryData();
	
   // Expected Data Shape: [{ params: { slug: 'pendant' } }, { params: { slug: 'shirt' } }],
   const pathsData = [];
	
   categories.length && categories.map( ( category ) => {
       if (!isEmpty(category.term_link)) {
           pathsData.push( { params: { cat_slug: category.term_link} } );
       }
   } );
	
   return {
       paths: pathsData,
       fallback: FALLBACK,
   };
}*/


