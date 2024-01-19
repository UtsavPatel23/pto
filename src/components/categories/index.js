import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Category from './category';
const Categories = ({ categories }) => {
	//console.log(categories);
	if ( isEmpty( categories ) || !isArray( categories ) ) {
		return null;
	}
	const firstLevelCategories = categories.filter(function (element){return element.parent == 0})
	//console.log('firstLevelCategories',firstLevelCategories);
	return (
			<div key={"cat_"+firstLevelCategories.length} className="">
				{/*}<Category key={ category_inn3?.term_id } category={category_inn3} />{*/}
				{ firstLevelCategories.length ? firstLevelCategories.map( category => {
					if(category.cat_count > 0)
					{
						var cat_slug = '/c/'+category?.term_link;
						if(!WEB_DEVICE)
							{
								cat_slug = '/cat/?sname='+category?.slug;
							}
					return (
							<div key={'secondLevelCategories'+category?.term_id}>
							<Link href={ `${ cat_slug }`} legacyBehavior>
								<a>
									<h6>{ category?.name ?? '' } ({category?.cat_count})</h6>
								</a> 
							</Link>
								{(()=>{
									const secondLevelCategories = categories.filter(function (element){return element.parent == category.term_id
									})
									//console.log('secondLevelCategories',secondLevelCategories);
									{ return secondLevelCategories.length ? secondLevelCategories.map( category_inn => {
										if(category_inn.cat_count > 0)
										{
											var cat_slug = '/c/'+category_inn?.term_link;
											if(!WEB_DEVICE)
												{
													cat_slug = '/cat/?sname='+category_inn?.slug;
												}
										return (
												<div key={'thirdLevelCategories'+category_inn?.term_id}>
												<Link href={ `${ cat_slug }`} legacyBehavior>
													<a>
														<h6>-- { category_inn?.name ?? '' }</h6>
													</a> 
												</Link>
													{(()=>{
														const thirdLevelCategories = categories.filter(function (element){return element.parent == category_inn.term_id
														})
														//console.log('thirdLevelCategories',thirdLevelCategories);
														if(thirdLevelCategories.length > 0)
														{ 
															{
																return (
																	<div key={'category_inn3'+category_inn?.term_id}>
																		{ thirdLevelCategories.length ? thirdLevelCategories.map( category_inn3 => {
																			if(category_inn3.cat_count > 0)
																			{
																				var cat_slug = '/c/'+category_inn3?.term_link;
																			if(!WEB_DEVICE)
																				{
																					cat_slug = '/cat/?sname='+category_inn3?.slug;
																				}
																			return (<>
																					<Link href={ `${ cat_slug }`} legacyBehavior>
																						<a>
																							<h6>---- { category_inn3?.name ?? '' }</h6>
																						</a> 
																					</Link>
																				</>);
																			}
																		} ) : null }
																	</div>
																)
															}
														}
														
														
													})()}
													
													
												</div>
											);
										}
									} ) : null }
									
								})()}
								
								
							</div>
					)
					}
				} ) : null }
			
			</div>
		)
}

export default Categories;
