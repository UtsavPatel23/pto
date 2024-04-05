/**
 * Internal Dependencies.
 */

import Categories from '../../src/components/categories';
import { HEADER_FOOTER_ENDPOINT, SHOP_CATEGORIES } from '../../src/utils/constants/endpoints';
import { isEmpty } from 'lodash';
/**
 * External Dependencies.
 */
import axios from 'axios';
import Layout from '../../src/components/layout';

export default function categories({ headerFooter, categories }) {
    console.log('categories', categories);
    console.log('SHOP_CATEGORIES', SHOP_CATEGORIES);
    if (isEmpty(categories)) {
        return (
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    } else {
        return (
            <Layout headerFooter={headerFooter || {}}>
                <h1 className='relative pb-2 text-center font-jost text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 title-border'>Categories</h1>
                <Categories categories={categories || {}}></Categories>
            </Layout>
        )
    }

}

export async function getStaticProps() {

    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    const { data: CategoriesData } = await axios.post(SHOP_CATEGORIES);


    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
            categories: CategoriesData ?? {}
        },

        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */

    };
}