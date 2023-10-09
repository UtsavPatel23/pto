import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';

const Category = ( { category } ) => {
	
	if ( isEmpty( category ) ) {
		return null;
	}
	
	
	return (
		<div className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
			<Link href={ `/categories/${ category?.slug }`} >
				<a>
					{/*}<Image
						sourceUrl={ category.image?.src }
						altText={ category?.name ?? '' }
						title={ category?.name ?? '' }
						width="380"
						height="380"
					/>{*/}
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
