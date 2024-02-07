import { isEmpty } from "lodash";

export const get_products_filtered_by_filter_option = (ProductsTmp,filter_option,setFilter_option,priceValue) => {
    // ************* ********************************  ************************ 
// ************* filter product object attributes  ************************ 
// ************* ********************************  ************************ 
        // Search data filter
        if(!isEmpty(filter_option['productsearch']))
        {
            var key = filter_option['productsearch'];
            var split_data = key.toLowerCase();
            var split_data = split_data.split(" ");  
            console.log('split_data',split_data);              
            let tempArr = ProductsTmp;    

            Object.keys(split_data).forEach(item => { 
                const result = tempArr.filter(x => x.content_word.find(a => a.toLowerCase() === split_data[item] || a.toLowerCase() === key.toLowerCase()) || x.name.toLowerCase().match(split_data[item])  || x.sku.toLowerCase().match(split_data[item]));
                if (result.length > 0) {
                    tempArr = result;
                } else { 
                    tempArr = result;
                }
            });

            ProductsTmp = tempArr;
        }
    
    if(!isEmpty(filter_option['attributes']))
    {
        const products_filtered_attr = ProductsTmp.filter(obj => {
        //console.log('***************************************i = '+i);i++;
        var attr_flg_arr = [];
                Object.keys(filter_option['attributes']).some(key => {
                    //console.log('j XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX= '+key+' j '+j);j++;
            var attr_inner_flg_arr = []; 
                    var attr_find_one = filter_option['attributes'][key].some(s => {
                        var attr_inner_flag = false;
                        if (!isEmpty(obj['attributes']) && (obj['attributes'] != ''))
                        {
                            var attr_r =  Object.keys(obj['attributes']).some(attk => {
                                // * attribut name 
                                if(obj['attributes'][attk].name == key)
                                {
                                    var found = obj['attributes'][attk]['options'].find(function (element) {
                                    if(s == element)
                                    {
                                        return true;
                                    }
                                    });
                                    if(found != undefined)
                                    {
                                    return true;
                                    }
                                }
                                })
                                attr_inner_flg_arr.push(attr_r);
                            if(attr_r)
                            {
                                attr_inner_flag = true;
                            }
                        }
                        
                    
                    });
            
                //	console.log('attr_inner_flg_arr',attr_inner_flg_arr);
            var or_condition  =attr_inner_flg_arr.find(function (element) {
                            if(true == element)
                            {
                                return true;
                            }
                            });
            // filter attr //console.log('or_condition',or_condition);
            if(or_condition == undefined)
            {
                attr_flg_arr.push(false);
            }else{
                attr_flg_arr.push(or_condition);
            }
                    return attr_find_one;
                
                })
            // filter attr //console.log('attr_flg_arr',attr_flg_arr);
            var and_condition  =attr_flg_arr.find(function (element) {
                            if(false == element)
                            {
                                return true;
                            }
                            });
            if(and_condition ==  undefined)
            {
            // filter attr //console.log('obj','True');
            return true;
            }else{
            // filter attr //console.log('obj','false');
            }
        
        });
        ProductsTmp = products_filtered_attr;
    }	
	//console.log('products_filtered attr ',ProductsTmp);

// ************* ********************************  ************************ 	
// ************* filter product object categories  ************************ 
// ************* ********************************  ************************ 
    if(!isEmpty(filter_option['categories']))
    { 
        //console.log('key',filter_option['categories']);
        if(filter_option['categories'].length > 0)
        {
        const products_filtered_cat = ProductsTmp.filter(obj => {
            //console.log('filter_option',filter_option['categories']);
            var cat_flg_arr = [];
            Object.keys(filter_option['categories']).some(key => {
                //console.log('key',key);
               // console.log('key',filter_option['categories'][key]);
                var comper_slug = '';
                Object.keys(filter_option['categories'][key]).some(key_cat => {
                    comper_slug = key_cat;
                });
                
                    var found_cat = obj['categories'].find(function (element) {
                       // console.log('element',element.slug);
                        if(comper_slug == element.slug)
                        {
                            return true;
                        }
                    });
                    if(found_cat != undefined)
                            {
                                cat_flg_arr.push(true);
                            }
                    
                    //console.log('found_cat',found_cat);
                });
                //console.log('cat_flg_arr',cat_flg_arr);
                return cat_flg_arr.find(function (element) {
                    if(true == element)
                    {
                    return true;
                    }
                });
            //console.log('or_condition_cat',or_condition_cat);
            //console.log('categories_tmp',);
        });
        ProductsTmp = products_filtered_cat;
        }
    }
//console.log('products_filtered cat ',ProductsTmp);

// ************* ********************************  ************************ 	
// ************* filter product object Tags  ************************ 
// ************* ********************************  ************************ 
if(!isEmpty(filter_option['discount']))
{
    const products_filtered_discount = ProductsTmp.filter(obj => {
        var discount_flg_arr = [];
        Object.keys(filter_option['discount']).some(key => {
            const range_discount = filter_option['discount'][key].split("to");
                if(parseInt(range_discount[0]) <= obj['meta_data']['product_discount'] && obj['meta_data']['product_discount'] <= parseInt(range_discount[1]))
                        {
                            discount_flg_arr.push(true);
                        }
            });
            return discount_flg_arr.find(function (element) {
                if(true == element)
                {
                return true;
                }
            });
    });
    ProductsTmp = products_filtered_discount;
    console.log('ProductsTmp discount ',products_filtered_discount);
}

// ************* ********************************  ************************ 	
// ************* filter product object Tags  ************************ 
// ************* ********************************  ************************ 
	if(!isEmpty(filter_option['tags']))
    {
        const products_filtered_tag = ProductsTmp.filter(obj => {
            //console.log('filter_option',filter_option['tags']);
            var tag_flg_arr = [];
            Object.keys(filter_option['tags']).some(key => {
                //console.log('key',filter_option['tags'][key]);
                if (obj['tags'] != undefined) { 
                    var found_tag = obj['tags'].find(function (element) {
                        //console.log('element',element.name);
                        if(filter_option['tags'][key] == element.name)
                        {
                            return true;
                        }
                    });
                }
                    
                    if(found_tag != undefined)
                            {
                                tag_flg_arr.push(true);
                            }
                    
                    //console.log('found_tag',found_tag);
                });
                //console.log('tag_flg_arr',tag_flg_arr);
                return tag_flg_arr.find(function (element) {
                    if(true == element)
                    {
                    return true;
                    }
                });
            //console.log('or_condition_cat',or_condition_cat);
            //console.log('categories_tmp',categories_tmp);
        });
        //console.log('products_filtered_tag ',products_filtered_tag);
        ProductsTmp = products_filtered_tag;
    }

// ************* ********************************  ************************ 	
// ************* filter product object Tags  ************************ 
// ************* ********************************  ************************ 
    if(!isEmpty(filter_option['average_rating']))
    {
        const products_filtered_average_rating = ProductsTmp.filter(obj => {
            var tag_flg_arr = [];
            Object.keys(filter_option['average_rating']).some(key => {
                //console.log('key',filter_option['average_rating'][key]);
                    if(obj['average_rating'] >= filter_option['average_rating'][key])
                            {
                                tag_flg_arr.push(true);
                            }
                });
                return tag_flg_arr.find(function (element) {
                    if(true == element)
                    {
                    return true;
                    }
                });
        });
        ProductsTmp = products_filtered_average_rating;
        //console.log('ProductsTmp av a ',products_filtered_average_rating);
    }

// ************* ********************************  ************************ 	
// ************* filter product object Tags  ************************ 
// ************* ********************************  ************************ 
if(!isEmpty(filter_option['shipping']))
{
    const products_filtered_shipping = ProductsTmp.filter(obj => {
        var shipping_flg_arr = [];
        Object.keys(filter_option['shipping']).some(key => {
            //console.log('key',filter_option['average_rating'][key]);
                if(obj['meta_data']['short_description_badge'] == filter_option['shipping'][key])
                        {
                            shipping_flg_arr.push(true);
                        }
            });
            return shipping_flg_arr.find(function (element) {
                if(true == element)
                {
                return true;
                }
            });
    });
    ProductsTmp = products_filtered_shipping;
    //console.log('ProductsTmp av a ',products_filtered_average_rating);
}


// ************* ********************************  ************************ 	
// ************* filter product object priceValue  ************************ 
// ************* ********************************  ************************ 
if(!isEmpty(priceValue))
{
    const products_filtered_price_range = ProductsTmp.filter(obj => {
        if((parseFloat(priceValue[0]) <= parseFloat(obj['price'])) && (parseFloat(obj['price']) <= parseFloat(priceValue[1])) )
        {
            return true;
        }
    });
    ProductsTmp = products_filtered_price_range;
    //console.log('ProductsTmp price range ',products_filtered_price_range);
}

// ************* ********************************  ************************ 	
// ************* filter product object availability  ************************ 
// ************* ********************************  ************************ 
//if(!isEmpty(filter_option['availability']))
//{
    const products_filtered_availability = ProductsTmp.filter(obj => {
        var tag_flg_arr = [];
        //Object.keys(filter_option['availability']).some(key => {
            //console.log('key',filter_option['average_rating'][key]);
            if(isEmpty(filter_option['availability']))
            {
                    if(obj['stock_quantity'] >= 1)
                        {
                            tag_flg_arr.push(true);
                        } 
            }else if('Include out of stock' == filter_option['availability'][0]){
                tag_flg_arr.push(true);
            }
                
        //});
            return tag_flg_arr.find(function (element) {
                if(true == element)
                {
                return true;
                }
            });
    });
    if(!isEmpty(products_filtered_availability))
    {
        ProductsTmp = products_filtered_availability;
    }
    //console.log('ProductsTmp av a ',products_filtered_availability);
//}

return ProductsTmp;
}