import { isArray, isEmpty } from 'lodash';
import Category from './category';
const Categories = ({ categories }) => {
	console.log(categories);
	if ( isEmpty( categories ) || !isArray( categories ) ) {
		return null;
	}
	
	return (
			<div key={"cat_"+categories.length} className=" flex flex-wrap -mx-3 overflow-hidden product-filter-right ">
				
				{ categories.length ? categories.map( category => {
					return (
						<Category key={ category?.id } category={category} />
					)
				} ) : null }
			
			</div>
		)
}

export default Categories;
