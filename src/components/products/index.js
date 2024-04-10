import { debounce, isArray, isEmpty } from 'lodash';
import Product from './product';
import { useState, useEffect } from 'react';
import jQuery from "jquery";
import ReactPaginate from 'react-paginate';
import { get_categories_hierarchical, get_inner_category } from '../../utils/shop/categories_hierarchical';
import { get_attr_count_data_final_list } from '../../utils/shop/count_sidebar_filter_data';
import { get_products_filtered_by_filter_option } from '../../utils/shop/filter_product_object';
import { paramsToObject } from '../../utils/shop/paramstoobject';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Router, { useRouter } from 'next/router';
import { get_count_total_discount, go_to_main_filter, selectattributdefault } from '../../utils/customjs/custome';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Image from 'next/image';
import Link from 'next/link';


const Products = ({ products, options, tokenValid }) => {


	// -----------------------------------
	var ProductsTmp = products;
	var banner_counter = 0;
	if (isEmpty(ProductsTmp) || !isArray(ProductsTmp)) {
		return null;
	}
	const router = useRouter()

	const [orderby, setOrderby] = useState('menu_order');
	const [cat_name, setCat_name] = useState('');
	const [itemOffset, setItemOffset] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(24)
	//console.log(`itemOffset ${itemOffset} to itemsPerPage ${itemsPerPage}`)
	const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
	//console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	//console.log(`itemsPerPage ${itemsPerPage} `);
	const [filter_option, setFilter_option] = useState(
		{
			"attributes": {},
			"categories": [],
			"discount": [],
			"tags": [],
			"average_rating": [],
			"shipping": [],
			"availability": [],
		}
	);

	const minPrice = Math.min(...ProductsTmp.map(item => item.price));
	const maxPrice = Math.max(...ProductsTmp.map(item => item.price));
	const [priceValue, setPriceValue] = React.useState([minPrice, maxPrice]);
	const [priceValueTMP, setPriceValueTMP] = React.useState([minPrice, maxPrice]);
	const [searchBoxText, setSearchBoxText] = useState('');
	const [customerData, setCustomerData] = useState(0);

	// Banner 
	const { product_sale_banner_in_gridview } = options ?? '';


	useEffect(() => {
		if (localStorage.getItem('token')) {
			if (localStorage.getItem('customerData')) {
				var customerDataTMP = JSON.parse(localStorage.getItem('customerData'));
				setCustomerData(customerDataTMP);
			}
		}
	}, []);

	useEffect(() => {
		if (router.query.productsearch) {
			setSearchBoxText(router.query.productsearch);
			setFilter_option({ ...filter_option, productsearch: router.query.productsearch });
		}
		if (router.query.minPrice && router.query.maxPrice) {
			var tmp_priceValue = [router.query.minPrice, router.query.maxPrice]
			setPriceValue(tmp_priceValue);
			setPriceValueTMP(tmp_priceValue);
		} else if (router.query.minPrice) {
			var tmp_priceValue = [router.query.minPrice, priceValue[1]]
			setPriceValue(tmp_priceValue);
			setPriceValueTMP(tmp_priceValue);
		} else if (router.query.maxPrice) {
			var tmp_priceValue = [priceValue[0], router.query.maxPrice]
			setPriceValue(tmp_priceValue);
			setPriceValueTMP(tmp_priceValue);
		}
		if (router.query.cat_name) {
			setCat_name(router.query.cat_name);
		}
		if (router.query.itemsPerPage) {
			setItemsPerPage(router.query.itemsPerPage);
		}
		if (router.query.orderby) {
			setOrderby(router.query.orderby);
		}
		var otherPara = router.asPath.split("?");
		if (otherPara[1]) {
			var otherPata_clean = otherPara[1].replaceAll("-multiple-", "%5B%5D");
			setFilter_option(paramsToObject(otherPata_clean));
		}
	}, [router.query]);

	console.log('filter_option', filter_option);

	// 88888888888 ******************************* 888888888888888888888
	// Remove select box 
	// 88888888888 ******************************* 888888888888888888888
	const remove_minprice_selected = (selected) => {
		var tmp_priceValue = [minPrice, priceValue[1]]
		setPriceValue(tmp_priceValue);
		setPriceValueTMP(tmp_priceValue);
		setItemOffset(0);
	};
	const remove_maxprice_selected = (selected) => {
		var tmp_priceValue = [priceValue[0], maxPrice]
		setPriceValue(tmp_priceValue);
		setPriceValueTMP(tmp_priceValue);
		setItemOffset(0);
	};
	const remove_discount_selected = (selected) => {
		const filtered_discount_select = filter_option['discount'].filter(e => e !== selected.target.value)
		setFilter_option({ ...filter_option, discount: filtered_discount_select });
		setItemOffset(0);
	};

	const remove_tags_selected = (selected) => {
		const filtered_tags_select = filter_option['tags'].filter(e => e !== selected.target.value)
		setFilter_option({ ...filter_option, tags: filtered_tags_select, });
		setItemOffset(0);
	};

	const remove_attributes_selected = (selected) => {
		var remove_attr_name = selected.target.getAttribute("data-attr_name");
		var remove_attr_arr = filter_option['attributes'];
		const idxObj_att_name = filter_option['attributes'][remove_attr_name]?.findIndex(object => {
			return object == selected.target.value;
		});
		remove_attr_arr[remove_attr_name]?.splice(idxObj_att_name, 1);

		if (isEmpty(remove_attr_arr[remove_attr_name])) {
			delete remove_attr_arr[remove_attr_name];
		}

		setFilter_option({ ...filter_option, attributes: remove_attr_arr, });
		setItemOffset(0);
	};
	const remove_average_rating_selected = (selected) => {
		const filtered_average_rating_select = filter_option['average_rating'].filter(e => e !== selected.target.value)
		setFilter_option({ ...filter_option, average_rating: filtered_average_rating_select, });
		setItemOffset(0);
	};

	const remove_shipping_selected = (selected) => {
		const filtered_shipping_select = filter_option['shipping'].filter(e => e !== selected.target.value)
		setFilter_option({ ...filter_option, shipping: filtered_shipping_select, });
		setItemOffset(0);
	};
	const remove_availability_selected = (selected) => {
		const filtered_availability_select = filter_option['availability'].filter(e => e !== selected.target.value)
		setFilter_option({ ...filter_option, availability: filtered_availability_select, });
		setItemOffset(0);
	};

	// ********************** Clear All event *******************************
	const clearallClick = (event) => {
		setFilter_option({
			"attributes": {},
			"categories": [],
			"discount": [],
			"tags": [],
			"average_rating": [],
			"shipping": [],
			"availability": [],
			"productsearch": '',
		});
		setOrderby('menu_order');
		setItemsPerPage(24);
		setCat_name('');
		setItemOffset(0);
		setPriceValue([minPrice, maxPrice]);
		setPriceValueTMP([minPrice, maxPrice]);
		setSearchBoxText('');
		//console.log('router', router?.asPath);
		Router.push(router?.asPath);
	};

	// ********************** Pagination event *******************************
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % ProductsTmp.length;
		setItemOffset(newOffset);
	};
	// ***************** Order by list product  *****************************
	ProductsTmp = ProductsTmp.sort((a, b) => {
		if (orderby == 'price-desc') {
			return b.price - a.price;
		} else if (orderby == 'price') {
			return a.price - b.price;
		}
		else if (orderby == 'average_rating') {
			return b.average_rating - a.average_rating;
		}
		else if (orderby == 'total_sales') {
			return b.total_sales - a.total_sales;
		} else if (orderby == 'date_created') {
			let da = new Date(a.date_created),
				db = new Date(b.date_created);
			return db - da;
		} else if (orderby == 'menu_order') {
			if (a[orderby] < b[orderby]) {
				return -1;
			}
		}
		else {
			if (a[orderby] < b[orderby]) {
				return -1;
			}
		}

	});
	const options_orderby = [
		{ value: "menu_order", label: "Default sorting" },
		{ value: "total_sales", label: "Sort by popularity" },
		{ value: "average_rating", label: "Sort by average rating" },
		{ value: "date_created", label: "Sort by latest" },
		{ value: "price", label: "Sort by price: low to high" },
		{ value: "price-desc", label: "Sort by price: high to low" },
	];
	const orderbyChange = (selectedOption) => {
		setOrderby(selectedOption.target.value);
	};

	const options_itemsPerPage = [
		{ 'value': "24", 'label': "24 Per page" },
		{ 'value': "36", 'label': "36 Per page" },
		{ 'value': "48", 'label': "48 Per page" },

	];
	const itemsPerPageChange = (selectedOption) => {
		setItemOffset(0);
		setItemsPerPage(selectedOption.target.value);
	};

	// ************* Create attribut filter object  Box  search ************************ 
	const formEventChange = (event) => {
		var form_sidebar_filter = jQuery('#form_sidebar_filter').serialize();
		//console.log('form_sidebar_filter form',form_sidebar_filter); 
		//console.log('form_sidebar_filter array',paramsToObject(form_sidebar_filter)); 
		setFilter_option(paramsToObject(form_sidebar_filter));
		setItemOffset(0);
	};

	const handleChangePriceRange = (event, newValue) => {
		setPriceValueTMP(newValue);
	};

	const handleFilterPrice = () => {
		setPriceValue(priceValueTMP);
	};

	// Search event  	
	const handleSearchBoxBtn = () => {
		const productsearch = jQuery('#productsearch').val();
		setFilter_option({ ...filter_option, productsearch: productsearch });
	}

	const handleSearchBox = (event) => {
		setSearchBoxText(event.target.value);
	}

	// ************* ********************************  ************************ 
	// ************* Side var li search ************************************* 
	// ************* ********************************  ************************ 
	const side_bar_li_search = (e) => {
		const searchValue = e.target.value;
		const childen_class = e.target.getAttribute('data-inputulclass');
		jQuery('.' + childen_class + ' li').each(function () {
			if (jQuery(this).text().search(new RegExp(searchValue, "i")) < 0) {
				jQuery(this).hide();
			} else {
				jQuery(this).show()
			}
		});

	};

	// ************* ********************************  ************************ 
	// ************* filter product object ************************************* 
	// ************* ********************************  ************************ 
	ProductsTmp = get_products_filtered_by_filter_option(ProductsTmp, filter_option, setFilter_option, priceValue);

	// ************* *******************************************  ************************ 
	// ************* Create filter object sidebar count(*) list  ************************ 
	// ************* *******************************************  ************************ 
	const attr_count_data_final_list = get_attr_count_data_final_list(ProductsTmp);


	// ************* *******************************************  ************************ 
	// ************* Get categories hierarchical  **************************************** 
	// ************* *******************************************  ************************ 
	var cat_data = {};
	if (cat_name != '') {
		cat_data = get_categories_hierarchical(attr_count_data_final_list['categories']);
		//console.log('cat_data 1 ',cat_data);
		cat_data = [get_inner_category(cat_data, cat_name)];
		//console.log('cat_data 2 ',cat_data);
	} else {
		cat_data = get_categories_hierarchical(attr_count_data_final_list['categories']);

	}

	console.log('filter sidebar', attr_count_data_final_list);
	var filter_attributestmp = attr_count_data_final_list['attributes'];
	var filter_discount = attr_count_data_final_list['discount'];
	var count_total_discount = get_count_total_discount(filter_discount);
	var filter_tags = attr_count_data_final_list['tags'];
	var filter_average_rating = attr_count_data_final_list['average_rating'];
	var filter_shipping = attr_count_data_final_list['shipping'];
	var filter_availability = attr_count_data_final_list['availability'];

	const filter_attributes = selectattributdefault(filter_attributestmp, filter_option);


	//console.log('categories',attr_count_data_final_list['categories']);
	//console.log('cat_data',cat_data);

	const max_num_pages = Math.ceil(ProductsTmp.length / itemsPerPage);


	// ************* ********************************  ************************ 	
	// ********************* Print categories  ***************************** 
	// ************* ********************************  ************************ 
	const get_categories_dis = (cat_data) => {
		{
			if (!isEmpty(cat_data)) {
				return (
					Object.keys(cat_data).length ?
						<>
							<ul className='li_search_res_cat space-y-1'>
								{
									Object.keys(cat_data).map(function (key) {
										return (
											<>
												{cat_data[key].cat_count != 0 ?
													<>
														<li key={cat_data[key].term_id} className='relative'>
															<span
																htmlFor={cat_data[key].name}
																data-cat_slug={cat_data[key].slug}
																className='cursor-pointer'
																onClick={(e) => {
																	var catarr = [];
																	catarr[e.target.getAttribute("data-cat_slug")] = e.target.htmlFor;
																	setCat_name(e.target.getAttribute("data-cat_slug"));
																	setFilter_option({ ...filter_option, categories: [catarr] });
																	setItemOffset(0);
																}}
															>
																{cat_data[key].name}
															</span>
															<span className='absolute top-0 right-0'>({cat_data[key].cat_count})</span>
															{get_categories_dis(cat_data[key]['children'])}
														</li>
													</>
													: null
												}
											</>
										);
									})
								}
							</ul>
						</>
						:
						null
				);
			}
		}
	}


	const currentProduct = ProductsTmp.slice(itemOffset, endOffset);
	console.log('currentProduct', currentProduct);
	console.log('customerData', customerData);
	// ************* ********************************  ************************ 
	// ************* Set url with parameter ************************************* 
	// ************* ********************************  ************************ 
	const encodeDataToURL = (data) => {
		return Object
			.keys(data)
			.map(value => `${value}=${encodeURIComponent(data[value])}`)
			.join('&');
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			var newLocation = "";
			const extraPara = {};
			var newQuery = jQuery('#form_sidebar_filter').serialize();
			if (cat_name == '') {
				newQuery = newQuery.replaceAll("cat_name=&", "");
				newQuery = newQuery.replaceAll("cat_name=", "");
			}
			if (searchBoxText == '') {
				newQuery = newQuery.replaceAll("productsearch=&", "");
				newQuery = newQuery.replaceAll("productsearch=", "");
			}
			if (newQuery != '') {
				newQuery = '?' + newQuery;
			}

			if (minPrice != priceValue[0]) {
				extraPara.minPrice = priceValue[0];
			}
			if (maxPrice != priceValue[1]) {
				extraPara.maxPrice = priceValue[1];
			}
			if (itemsPerPage != 24) {
				extraPara.itemsPerPage = itemsPerPage;
			}
			if (orderby != 'menu_order') {
				extraPara.orderby = orderby;
			}
			if (Object.keys(extraPara).length > 0) {
				if (newQuery == '') {
					newQuery = '?' + encodeDataToURL(extraPara);
				} else {
					newQuery = newQuery + '&' + encodeDataToURL(extraPara);
				}
			}
			newLocation += window.location.pathname + newQuery;
			newLocation = newLocation.replaceAll("%5B%5D", "-multiple-");
			console.log('newLocation', newLocation);
			if (newLocation != '/shop') {
				if (WEB_DEVICE) {
					window.history.pushState('Details', "search title", newLocation);
				}
			}
			//Router.push(newLocation);
		}


		go_to_main_filter();
	}, [currentProduct]); // <- add empty brackets here

	var i = 0;
	const perChunk = 3 // items per chunk    
	var BoxBanner = false;
	var productBoxs = null;
	if (product_sale_banner_in_gridview?.length) {
		const toDay = new Date();
		var start_date = new Date(product_sale_banner_in_gridview[0]?.start_date);
		var end_date = new Date(product_sale_banner_in_gridview[0]?.end_date);
		if (start_date <= toDay && toDay <= end_date) {
			BoxBanner = true;
			productBoxs = currentProduct.reduce((resultArray, item, index) => {
				const chunkIndex = Math.floor(index / perChunk)
				if (!resultArray[chunkIndex]) {
					resultArray[chunkIndex] = [] // start a new chunk
				}
				resultArray[chunkIndex].push(item)
				return resultArray
			}, [])
		}
	}

	


	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
		document.body.style.overflow = 'hidden';
	};
	const closeFilter = () => {
		setIsFilterOpen(false);
		document.body.style.overflow = 'auto';
	};

	return (
		<>
			<div id="main_filter">
				<div className='flex justify-end mb-5 gap-2'>
					<div onClick={toggleFilter} className='md:hidden bg-white border border-victoria-800 px-3 flex items-center justify-center gap-2 cursor-pointer'>
						<i className="fa-light fa-filter fa-xl"></i> Filter
					</div>
					{options_itemsPerPage.length ?
						<div className="relative hidden md:block">
							<select value={itemsPerPage} onChange={itemsPerPageChange}
								className="cursor-pointer block appearance-none w-full bg-white border border-victoria-800 px-2 py-2 pr-6 shadow leading-tight focus:outline-none transition-all duration-300" >
								{Object.keys(options_itemsPerPage).map(function (key) {
									return (<option value={options_itemsPerPage[key].value}>{options_itemsPerPage[key].label}</option>);
								})}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
								<i className="fa-solid fa-caret-down fa-lg"></i>
							</div>
						</div>
						: null}
					{options_orderby.length ?
						<div className="relative">
							<select value={orderby} onChange={orderbyChange}
								className="cursor-pointer block appearance-none w-full bg-white border border-victoria-800 px-2 py-2 pr-6 shadow leading-tight focus:outline-none transition-all duration-300" >
								{Object.keys(options_orderby).map(function (key) {
									return (<option value={options_orderby[key].value}>{options_orderby[key].label}</option>);
								})}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
								<i className="fa-solid fa-caret-down fa-lg"></i>
							</div>
						</div>
						: null}
				</div>

				<div className='grid md:grid-cols-12 gap-4'>
					<div
						className={`fixed top-0 left-0 h-full w-full opacity-50 bg-black z-10 ${isFilterOpen ? 'block' : 'hidden'}`} onClick={closeFilter}
					></div>
					<div id='mobfilter-wrp' className={`md:col-span-4 lg:col-span-3 bg-white ${isFilterOpen ? 'right-0' : '-right-full'}`}>
						<div className='shadow-full p-3 relative profilter overflow-y-auto scroll-smooth theme-scroll'>
							<div className='flex justify-between items-center pb-2 mb-2 border-b border-slate-200'>
								<span className='text-xl font-medium'>Filter</span>
								<div className='flex items-center'>
									<button className='bg-slate-200 hover:bg-victoria-800 hover:text-white py-1 px-2' onClick={clearallClick}>Clear All</button>
									<button
										className="focus:outline-none bg-slate-200 hover:bg-victoria-800 hover:text-white size-8 ms-2 md:hidden"
										onClick={closeFilter}
									>
										<i className="fa-light fa-xmark text-2xl"></i>
									</button>
								</div>
							</div>
							<div className='pb-2 mb-2 border-b border-slate-200'>
								<p>{ProductsTmp.length > 1 ? <>{ProductsTmp.length} Results</> : <>{ProductsTmp.length} Result</>}</p>
								{
									// Price selected box min 
									priceValue[0] > minPrice ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Min Price :
											{
												<>
													<button className='mx-1 bg-slate-200 border hover:border-red-600 hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={priceValue[0]} onClick={remove_minprice_selected}>
														Price {priceValue[0]}
													</button>
												</>

											}
										</div> : null
								}
								{
									// Price selected box min 
									priceValue[1] < maxPrice ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Max Price :
											{
												<>
													<button className='mx-1 bg-slate-200 border hover:border-red-600 hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={priceValue[1]} onClick={remove_maxprice_selected}> Price {priceValue[1]}
													</button>
												</>
											}

										</div> : null
								}
								{
									// Category selected box
									cat_name != '' ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Category :  <button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' onClick={(e) => {
												setCat_name('');
												setFilter_option({ ...filter_option, categories: [] });
											}}>{cat_name}</button>
										</div> : null
								}

								{
									// Discount selected box
									Object.keys(filter_option['discount']).length ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Discount :
											{filter_option['discount'].map(function (discount) {
												return (
													<>
														<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={discount} onClick={remove_discount_selected}> {discount.split("to")[1]}%
														</button>
													</>
												);
											})}

										</div> : null
								}
								{
									// Attributs selected box
									Object.keys(filter_option['attributes']).length ?
										<div className='attlist'>
											{Object.keys(filter_option['attributes']).map(function (attribut) {
												return (<>
													<div className='gap-1 flex flex-wrap items-center mb-2'>
														{attribut} :
														{
															Object.keys(filter_option['attributes'][attribut]).length ?
																Object.keys(filter_option['attributes'][attribut]).map(function (attr_key) {
																	return (
																		<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' data-attr_name={attribut} value={filter_option['attributes'][attribut][attr_key]} onClick={remove_attributes_selected}>
																			{filter_option['attributes'][attribut][attr_key]}
																		</button>
																	);
																})
																: null
														}
													</div>
												</>);
											})}

										</div> : null
								}
								{
									// Tags selected box
									Object.keys(filter_option['tags']).length ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Tag :
											{filter_option['tags'].map(function (tag) {
												return (
													<>
														<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={tag} onClick={remove_tags_selected}> {tag}

														</button>
													</>
												);
											})}

										</div> : null
								}

								{
									// average_rating selected box
									Object.keys(filter_option['average_rating']).length ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Averaged :
											{filter_option['average_rating'].map(function (average_rating) {
												return (
													<>
														<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={average_rating} onClick={remove_average_rating_selected}> {average_rating}
														</button>
													</>
												);
											})}

										</div> : null
								}
								{
									// shipping selected box
									Object.keys(filter_option['shipping']).length ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Shipping :
											{filter_option['shipping'].map(function (shipping) {
												return (
													<>
														<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={shipping} onClick={remove_shipping_selected}> {shipping.replace('-', ' ')}
														</button>
													</>
												);
											})}

										</div> : null
								}
								{
									// availability selected box
									Object.keys(filter_option['availability']).length ?
										<div className='gap-1 flex flex-wrap items-center mb-1'>
											Averaged :
											{filter_option['availability'].map(function (availability) {
												return (
													<>
														<button className='mx-1 bg-slate-200 border hover:border-red-600  hover:text-red-600 py-1 px-2 rounded relative filter-remove' value={availability} onClick={remove_availability_selected}> {availability}
														</button>
													</>
												);
											})}

										</div> : null
								}
							</div>
							<form method='' name='form_sidebar_filter' id='form_sidebar_filter'>
								<div className='pb-2 mb-2 border-b border-slate-200'>
									<input type="hidden" seturl="yes" name="cat_name" value={cat_name} default_cat_id="" id="cat_name"></input>
									<input type='text' onChange={handleSearchBox} name="productsearch" id='productsearch' value={searchBoxText} placeholder="Search Product" className='outline-none block w-full py-2 px-3 text-base text-gray-900 border border-gray-300  focus:border-victoria-400'></input>
									<div onClick={handleSearchBoxBtn} className='bg-victoria-800 text-base text-white px-3 py-2 text-center mt-2 cursor-pointer'> Search</div>
								</div>

								{ /* *************** Price range  ************** */}
								{products.length > 20 ?
									<details key={'price-' + priceValue} className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
									>
										<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
										>
											<span className="text-base font-semibold"> Price Range </span>
											<span className="transition group-open:-rotate-180">
												<i className="fa-light fa-angle-down fa-lg"></i>
											</span>
										</summary>

										<div className="border-t border-gray-200 pb-2">
											<div className='p-4'>
												<Slider
													getAriaLabel={() => 'Temperature range'}
													value={priceValueTMP}
													onChange={handleChangePriceRange}
													valueLabelDisplay="auto"
													max={maxPrice}
													min={minPrice}
													step={10}
												/>
											</div>
											<div onClick={handleFilterPrice} className='border border-gray-200 bg-white text-center p-2 mx-3 cursor-pointer'>Filter</div>
										</div>
									</details> : null
								}

								{ /* *************** Category ************** */}
								<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
								>
									<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
									>
										<span className="text-base font-semibold"> Categories </span>
										<span className="transition group-open:-rotate-180">
											<i className="fa-light fa-angle-down fa-lg"></i>
										</span>
									</summary>

									<div className="border-t border-gray-200 px-3 py-2">
										{Object.keys(attr_count_data_final_list['categories']).length > 5 ?
											<>
												<input type="text" placeholder="Search Category" onKeyUp={side_bar_li_search} data-inputulclassName="li_search_res_cat" className='outline-none block w-full py-2 px-3 text-base text-gray-900 border border-gray-300 focus:border-victoria-400 mb-3' />
											</> : null
										}
										{
											cat_data != undefined ?
												get_categories_dis(cat_data) : null
										}
									</div>
								</details>

								{ /* *************** Discount ************** */}
								{
									count_total_discount > 0 ?
										<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
										>
											<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
											>
												<span className="text-base font-semibold"> Discount </span>
												<span className="transition group-open:-rotate-180">
													<i className="fa-light fa-angle-down fa-lg"></i>
												</span>
											</summary>

											<div className="border-t border-gray-200 px-3 py-2">
												<ul className='space-y-1'>
													{
														Object.keys(filter_discount).map(function (key_inn) {
															let checked = '';
															if (!isEmpty(filter_option['discount'])) {
																if (filter_option['discount'] != undefined) {
																	if (jQuery.inArray(filter_discount[key_inn].name, filter_option['discount']) >= 0) {
																		checked = 'checked';
																	}
																}
															}
															if (filter_discount[key_inn].count > 0) {
																return (
																	<li key={filter_discount[key_inn].name} className='flex items-center justify-between'>
																		<label htmlFor={filter_discount[key_inn].name} className='flex items-center gap-2'>
																			<input
																				checked={checked}
																				onChange={formEventChange}
																				className="shop_filter_ajax_click_fun size-4"
																				name="discount[]"
																				type="checkbox"
																				id={filter_discount[key_inn].name}
																				value={filter_discount[key_inn].name}>
																			</input>
																			<span>
																				{filter_discount[key_inn].valueEnd}%
																			</span>
																		</label>
																		<span>
																			({filter_discount[key_inn].count})
																		</span>
																	</li>
																);
															}
														})
													}
												</ul>
											</div>
										</details> :
										null
								}

								{ /* *************** Attributes ************** */}
								{
									Object.keys(filter_attributes).length ?
										Object.keys(filter_attributes).map(function (key) {
											var tmp_key = key.replace(' ', '_');
											return (
												<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
												>
													<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
													>
														<span className="text-base font-semibold capitalize" dangerouslySetInnerHTML={{ __html: key }}></span>
														<span className="transition group-open:-rotate-180">
															<i className="fa-light fa-angle-down fa-lg"></i>
														</span>
													</summary>
													<div className="border-t border-gray-200 px-3 py-2">
														{
															Object?.keys(filter_attributes[key]).length > 5 ?
																<>
																	<input
																		type="text"
																		placeholder="Search"
																		onKeyUp={side_bar_li_search}
																		data-inputulclass={"li_search_res_attr_" + tmp_key}
																		className='outline-none block w-full py-2 px-3 text-base text-gray-900 border border-gray-300  focus:border-victoria-400 mb-2'
																	/>
																</> : null
														}
														<ul key={key + '-attr'} className={"li_search_res_attr_" + tmp_key}>
															{
																Object.keys(filter_attributes[key]).length ?
																	Object.keys(filter_attributes[key]).map(function (key_inn) {
																		var tmp_id = key + '_' + key_inn;
																		tmp_id = tmp_id.replace(/^\s+|\s+$/gm, '');
																		tmp_id = tmp_id.replaceAll(' ', 'XXX');
																		let checked = '';
																		if (!isEmpty(filter_option['attributes'])) {
																			if (filter_option['attributes'][key] != undefined) {
																				if (jQuery.inArray(key_inn, filter_option['attributes'][key]) >= 0) {
																					checked = 'checked';
																				}
																			}
																		}

																		return (
																			<li key={tmp_id} className='flex items-center justify-between'>
																				<label htmlFor={tmp_id} className='flex items-center gap-2'>
																					<input
																						checked={checked}
																						onChange={formEventChange} className="shop_filter_ajax_click_fun size-4"
																						name={"attr_" + key + "[]"}
																						type="checkbox"
																						id={tmp_id}
																						value={key_inn}>
																					</input>
																					<span dangerouslySetInnerHTML={{ __html: key_inn }}>
																					</span>
																				</label>
																				<span>
																					({filter_attributes[key][key_inn]})
																				</span>
																			</li>
																		);
																	})
																	:
																	null
															}
														</ul>
													</div>
												</details>
											);
										})
										:
										null
								}

								{ /* *************** Tags ************** */}

								{
									Object.keys(filter_tags).length ?
										<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
										>
											<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
											>
												<span className="text-base font-semibold"> Tags </span>
												<span className="transition group-open:-rotate-180">
													<i className="fa-light fa-angle-down fa-lg"></i>
												</span>
											</summary>

											<div className="border-t border-gray-200 px-3 py-2">
												{Object.keys(filter_tags).length > 5 ?
													<>
														<input
															type="text"
															placeholder="Search Tag"
															onKeyUp={side_bar_li_search}
															data-inputulclassName="li_search_res_tag"
															className='outline-none block w-full py-2 px-3 text-base text-gray-900 border border-gray-300  focus:border-victoria-400 mb-2'
														/>
													</> : null
												}

												<ul className='li_search_res_tag'>
													{
														Object.keys(filter_tags).map(function (key_inn) {
															let checked = '';
															if (!isEmpty(filter_option['tags'])) {
																if (filter_option['tags'] != undefined) {
																	if (jQuery.inArray(filter_tags[key_inn].name, filter_option['tags']) >= 0) {
																		checked = 'checked';
																	}
																}
															}
															return (
																<li key={filter_tags[key_inn].term_id} className='flex items-center justify-between'>
																	<label htmlFor={filter_tags[key_inn].term_id} className='flex items-center gap-2'>
																		<input
																			checked={checked}
																			onChange={formEventChange}
																			className="shop_filter_ajax_click_fun size-4"
																			name="tags[]" type="checkbox"
																			id={filter_tags[key_inn].term_id}
																			value={filter_tags[key_inn].name}>
																		</input>
																		<span dangerouslySetInnerHTML={{ __html: filter_tags[key_inn].name }}>
																		</span>
																	</label>
																	<span>({filter_tags[key_inn].tag_count})</span>
																</li>
															);
														})
													}
												</ul>
											</div>
										</details>
										:
										null
								}

								{ /* *************** Review ************** */}
								{
									Object.keys(filter_average_rating).length ?
										<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
										>
											<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
											>
												<span className="text-base font-semibold"> Review </span>
												<span className="transition group-open:-rotate-180">
													<i className="fa-light fa-angle-down fa-lg"></i>
												</span>
											</summary>

											<div className="border-t border-gray-200 px-3 py-2">
												<ul>
													{
														Object.keys(filter_average_rating).map(function (key_inn) {
															let checked = '';
															if (!isEmpty(filter_option['average_rating'])) {
																if (filter_option['average_rating'] != undefined) {
																	var key_select_tmp = key_inn.toString();
																	if (jQuery.inArray(key_select_tmp, filter_option['average_rating']) >= 0) {
																		checked = 'checked';
																	}
																}
															}
															return (
																<li key={'average_rating_' + key_inn} className='flex items-center justify-between'>
																	<label htmlFor={'average_rating_' + key_inn} className='flex items-center gap-2'>
																		<input
																			checked={checked}
																			onChange={formEventChange}
																			className="shop_filter_ajax_click_fun size-4"
																			name="average_rating[]"
																			type="checkbox"
																			id={'average_rating_' + key_inn}
																			value={key_inn}>
																		</input>
																		<span>{key_inn}</span>
																	</label>
																	<span>({filter_average_rating[key_inn]})</span>
																</li>
															);
														})
													}
												</ul>
											</div>
										</details>
										:
										null
								}

								{ /* *************** shipping ************** */}
								{
									Object.keys(filter_shipping).length ?
										<details className="group mb-2 overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
											<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition">
												<span className="text-base font-semibold"> Shipping </span>
												<span className="transition group-open:-rotate-180">
													<i className="fa-light fa-angle-down fa-lg"></i>
												</span>
											</summary>
											<div className="border-t border-gray-200 px-3 py-2">
												<ul>
													{
														Object.keys(filter_shipping).map(function (key_inn) {
															if (filter_shipping[key_inn].name != undefined) {
																let checked = '';
																if (!isEmpty(filter_option['shipping'])) {
																	if (filter_option['shipping'] != undefined) {
																		if (jQuery.inArray(filter_shipping[key_inn].name, filter_option['shipping']) >= 0) {
																			checked = 'checked';
																		}
																	}
																}
																return (
																	<li key={'shipping' + key_inn} className='flex items-center justify-between'>
																		<label htmlFor={'shipping' + key_inn} className='flex items-center gap-2'>
																			<input
																				checked={checked}
																				onChange={formEventChange}
																				className="shop_filter_ajax_click_fun size-4"
																				name="shipping[]"
																				type="checkbox"
																				id={'shipping' + key_inn}
																				value={filter_shipping[key_inn].name}>
																			</input>
																			<span> {filter_shipping[key_inn].name.replace('-', ' ')}</span>
																		</label>
																		<span>({filter_shipping[key_inn].shipping_count})</span>
																	</li>
																);
															}
														})
													}
												</ul>
											</div>
										</details> :
										null
								}

								{ /* *************** Availability ************** */}
								{
									Object.keys(filter_availability).length ?
										<details className="group overflow-hidden border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
											<summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition">
												<span className="text-base font-semibold"> Availability </span>
												<span className="transition group-open:-rotate-180">
													<i className="fa-light fa-angle-down fa-lg"></i>
												</span>
											</summary>
											<div className="border-t border-gray-200 px-3 py-2">
												<ul>
													{
														Object.keys(filter_availability).map(function (key_inn) {
															let checked = '';
															if (!isEmpty(filter_option['availability'])) {
																if (filter_option['availability'] != undefined) {
																	var key_select_tmp = filter_availability[key_inn];
																	if (jQuery.inArray(key_select_tmp, filter_option['availability']) >= 0) {
																		checked = 'checked';
																	}
																}
															}
															return (
																<li key={'availability_' + key_inn} className='flex items-center justify-between'>
																	<label htmlFor={'availability_' + key_inn} className='flex items-center gap-2'>
																		<input
																			checked={checked}
																			onChange={formEventChange}
																			className="shop_filter_ajax_click_fun size-4"
																			name="availability[]"
																			type="checkbox"
																			id={'availability_' + key_inn}
																			value={filter_availability[key_inn]}>
																		</input>
																		<span>{filter_availability[key_inn]}</span>
																	</label>
																</li>
															);
														})
													}
												</ul>
											</div>
										</details> :
										null
								}
							</form>
						</div>
					</div>
					<div className="md:col-span-8 lg:col-span-9">
						{
							currentProduct.length ? null :
								<div className='grid gap-4'>
									<p>No products were found matching your selection.</p>
								</div>
						}
						{
							currentProduct.length && !BoxBanner ?
								<>
									<div className='grid grid-cols-2 lg:grid-cols-3 gap-2 gap-y-3 sm:gap-4 lg:ms-7'>
										{
											currentProduct.map(product => {
												return (
													<Product key={product?.id} product={product} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
												)
											})
										}
									</div>
								</>
								:
								null
						}

						{
							currentProduct.length && BoxBanner ?
								<>

									{
										productBoxs.length ?
											productBoxs.map(productBox => {

												return (
													<>
														{(() => {
															if (i == (product_sale_banner_in_gridview[0]?.please_select_the_row_number / 3)) {
																i = 1;
																banner_counter++;
																if (banner_counter > product_sale_banner_in_gridview.length) { 
																	banner_counter = 1;
																}
																return (
																	<div className='grid md:grid-cols-1 gap-4'>
																		<Link href={product_sale_banner_in_gridview[banner_counter-1]?.category_url}>
																			<Image
																				src={product_sale_banner_in_gridview[banner_counter-1]?.category_image}
																				alt="Top banner"
																				width={1320}
																				height={300}
																				className='mx-auto'
																			/>
																		</Link>
																	</div>
																);
															}
															i++
														})()}
														<div className='grid md:grid-cols-3 gap-4'>
															{
																productBox.map(product => {
																	return (
																		<Product key={product?.id} product={product} tokenValid={tokenValid} options={options} customerData={customerData} setCustomerData={setCustomerData} />
																	)
																})
															}
														</div>
													</>

												)
											})
											: null
									}

								</>
								:
								null
						}

						<div className="rpagination">
							{max_num_pages != 1 ? <>
								{itemOffset == 0 ?
									<ReactPaginate
										breakLabel="..."
										onPageChange={handlePageClick}
										pageRangeDisplayed={0}
										marginPagesDisplayed={1}
										pageCount={max_num_pages}
										renderOnZeroPageCount={null}
										forcePage={itemOffset}
										previousLabel={<i className="fa-sharp fa-solid fa-chevron-left"></i>}
										nextLabel={<i className="fa-sharp fa-solid fa-chevron-right"></i>}
										className='flex justify-center items-center gap-2 text-md font-medium my-5'
										pageLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										activeLinkClassName='border-victoria-800 bg-victoria-800 text-white'
										nextLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										previousLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										disabledLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800 opacity-50 pointer-events-none'
									/>
									:
									<ReactPaginate
										breakLabel="..."
										onPageChange={handlePageClick}
										pageRangeDisplayed={0}
										marginPagesDisplayed={1}
										pageCount={max_num_pages}
										renderOnZeroPageCount={null}
										previousLabel={<i className="fa-sharp fa-solid fa-chevron-left"></i>}
										nextLabel={<i className="fa-sharp fa-solid fa-chevron-right"></i>}
										className='flex justify-center items-center gap-2 text-md font-medium my-5'
										pageLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										activeLinkClassName='border-victoria-800 bg-victoria-800 text-white'
										nextLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										previousLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800'
										disabledLinkClassName='inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800 opacity-50 pointer-events-none'
									/>
								} </> : ''
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Products;