import { isArray, isEmpty } from 'lodash';
import Category from './category';
import styles from '@/styles/Home.module.css'

const Categories = ({ categories }) => {
	console.log(categories);
	if ( isEmpty( categories ) || !isArray( categories ) ) {
		return null;
	}
	
	return (
		<>
		<div className={styles.row}>
			<div className=" flex flex-wrap -mx-3 overflow-hidden product-filter-right ">
				
				{ categories.length ? categories.map( category => {
					return (
						<Category key={ category?.id } category={category} />
					)
				} ) : null }
			
			</div>
		</div>
		</>
	)
}

export default Categories;
