import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import { WEB_DEVICE } from '../../utils/constants/endpoints';

const Category = ( { category } ) => {
	
	if ( isEmpty( category ) ) {
		return null;
	}
	
	var cat_slug = '/c/'+category?.term_link;
	if(!WEB_DEVICE)
    	{
			cat_slug = '/cat/?sname='+category?.slug;
		}
	return (
		<div key={'cat_li'+category?.id} className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
			<Link href={ `${ cat_slug }`} legacyBehavior>
				<a>
					<Image
						sourceUrl={ category.category_icon}
						altText={ category?.name ?? '' }
						title={ category?.name ?? '' }
						width="100"
						height="100"
					/>
					<h6 className="font-bold uppercase my-2 tracking-0.5px">{ category?.name ?? '' }</h6>
				</a>
			</Link>
		</div>
	)
}

export default Category;
