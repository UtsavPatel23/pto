import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import { WEB_DEVICE } from '../../utils/constants/endpoints';

const Category = ({ category }) => {

	console.log("Niks category", category);

	if (isEmpty(category)) {
		return null;
	}

	var cat_slug = '/c/' + category?.term_link;
	if (!WEB_DEVICE) {
		cat_slug = '/cat/?sname=' + category?.slug;
	}

	return (
		<div key={'cat_li' + category?.id} className="border border-victoria-700 text-center group">
			<Link href={`${cat_slug}`} >
				<Image
					sourceUrl={category.category_thumb}
					altText={category?.name ?? ''}
					title={category?.name ?? ''}
					width="200"
					height="200"
					className='mx-auto'
				/>
				<h6 className="font-bold py-2 border-t border-victoria-700 group-hover:text-white group-hover:bg-victoria-700">{category?.name ?? ''}</h6>
			</Link>
		</div>
	)
}

export default Category;
