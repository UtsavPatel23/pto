import { isArray, isEmpty } from 'lodash';
import { useState } from 'react';
import Link from 'next/link';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Category from './category';
import Image from 'next/image';
import placeholder from '../../../public/assets/img/placeholder-300.png'
const Categories = ({ categories }) => {
	if (isEmpty(categories) || !isArray(categories)) {
		return null;
	}

	const [visibleCategory, setVisibleCategory] = useState(null);
	const toggleSubcategories = (categoryId) => {
		setVisibleCategory(visibleCategory === categoryId ? null : categoryId);
	};

	// const categorylayout = 'categoryList';
	const categorylayout = 'categoryBox';

	const firstLevelCategories = categories.filter(function (element) { return element.parent == 0 })
	//console.log('firstLevelCategories',firstLevelCategories);
	return (
		<div key={"cat_" + firstLevelCategories.length} className={`all-category-wrapper grid  ${categorylayout === 'categoryBox' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5' : 'grid-cols-1 gap-3'}`}>
			{/*}<Category key={ category_inn3?.term_id } category={category_inn3} />{*/}
			{firstLevelCategories.length ? firstLevelCategories.map(category => {
				if (category.cat_count > 0) {
					var cat_slug = '/c/' + category?.term_link;
					if (!WEB_DEVICE) {
						cat_slug = '/cat/?sname=' + category?.slug;
					}
					return (
						<>
							<div
								key={'secondLevelCategories' + category?.term_id}
								className={`relative${categorylayout === 'categoryBox' ? ' border border-victoria-400 p-2 pb-0 hover:bg-chelsea-100' : ''}`}
							>
								<div className={`sub-category${categorylayout === 'categoryBox' ? '' : ' flex items-center gap-3'}`}>
									<div className={`sub-category${categorylayout === 'categoryBox' ? '' : ' rounded border border-violet-700 overflow-hidden mb-4'}`}>
										{category.category_thumb ? (
											<Link href={`${cat_slug}`}>
											<Image
												src={category.category_thumb}
												width={categorylayout === 'categoryBox' ? 290 : 80}
												height={categorylayout === 'categoryBox' ? 290 : 80}
												alt={category.name}
											/>
											</Link>
										) : (
											<Link href={`${cat_slug}`}>
											<Image
												src={placeholder}
												width={categorylayout === 'categoryBox' ? 290 : 80}
												height={categorylayout === 'categoryBox' ? 290 : 80}
												alt="Placeholder"
											/>
											</Link>
										)}
									</div>
									<h6 className='font-medium p-2 flex items-center justify-between'>
										<Link href={`${cat_slug}`}>
											{category?.name ?? ''} ({category?.cat_count})
										</Link>

										{categories.some(cat => cat.parent === category.term_id) && categorylayout === 'categoryBox' && ( // Check if subcategories exist
											<span onClick={() => toggleSubcategories(category.term_id)} className='cursor-pointer'>
												<i className="fa fa-plus"></i>
											</span>
										)}
									</h6>
								</div>

								{visibleCategory === category.term_id || categorylayout === 'categoryList' && categories.some(cat => cat.parent === category.term_id) ?
									<div className={`sub-category${categorylayout === 'categoryBox' ? ' shadow-full absolute bg-chelsea-200 w-full left-0 border border-gray-300 z-10 -mt-2 rounded p-2' : ''}`}>
										<ul className={`${categorylayout === 'categoryBox' ? '' : 'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}>
											{(() => {
												const secondLevelCategories = categories.filter(function (element) {
													return element.parent == category.term_id
												})
												//console.log('secondLevelCategories',secondLevelCategories);
												{
													return secondLevelCategories.length ? secondLevelCategories.map(category_inn => {
														if (category_inn.cat_count > 0) {
															var cat_slug = '/c/' + category_inn?.term_link;
															if (!WEB_DEVICE) {
																cat_slug = '/cat/?sname=' + category_inn?.slug;
															}
															return (
																<li key={'thirdLevelCategories' + category_inn?.term_id}
																	className={`${categorylayout === 'categoryBox' ? 'border border-victoria-700 mb-2 last:mb-0 rounded' : 'shadow-full p-2'}`}
																>
																	<Link href={`${cat_slug}`} className={`${categorylayout === 'categoryBox' ? 'py-1 px-2 inline-block w-full' : 'text-victoria-700 font-bold'}`}>
																		{category_inn?.name ?? ''}
																	</Link>
																	{(() => {
																		const thirdLevelCategories = categories.filter(function (element) {
																			return element.parent == category_inn.term_id
																		})
																		//console.log('thirdLevelCategories',thirdLevelCategories);
																		if (thirdLevelCategories.length > 0) {
																			{
																				return (
																					<ul className={`${categorylayout === 'categoryBox' ? 'border border-victoria-700 mx-2 rounded bg-chelsea-300 mb-1' : ''}`}
																					>
																						{thirdLevelCategories.length ? thirdLevelCategories.map(category_inn3 => {
																							if (category_inn3.cat_count > 0) {
																								var cat_slug = '/c/' + category_inn3?.term_link;
																								if (!WEB_DEVICE) {
																									cat_slug = '/cat/?sname=' + category_inn3?.slug;
																								}
																								return (<>
																									<li key={'category_inn3' + category_inn?.term_id}
																										className={`${categorylayout === 'categoryBox' ? 'border-b border-victoria-700 last:border-b-0' : ''}`}
																									>
																										<Link href={`${cat_slug}`} className={`${categorylayout === 'categoryBox' ? 'py-1 px-2 inline-block w-full' : 'space-x-1 hover:text-victoria-700'}`}>
																											{categorylayout === 'categoryList' ? (
																												<i className="fa-light fa-arrow-right"></i>
																											) : null}
																											<span>{category_inn3?.name ?? ''}</span>
																										</Link>
																									</li>
																								</>);
																							}
																						}) : null}
																					</ul>
																				)
																			}
																		}
																	})()}
																</li>
															);
														}
													}) : null
												}

											})()}
										</ul>
									</div>
									: null}
							</div>
						</>
					)
				}
			}) : null}
		</div>
	)
}

export default Categories;