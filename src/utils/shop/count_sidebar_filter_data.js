import { isEmpty } from "lodash";

export const get_attr_count_data_final_list = (ProductsTmp)=>{

    const attr_count_data_final_list = {
        "attributes":{},
        "categories":[],
        "discount":[
			{ name: "1to5",   count: 0 ,valueStart:1 ,valueEnd:5 },
			{ name: "6to10",  count: 0 ,valueStart:6,valueEnd:10},
			{ name: "11to15", count: 0 ,valueStart:11,valueEnd:15},
			{ name: "16to20", count: 0 ,valueStart:16,valueEnd:20},
			{ name: "21to25", count: 0 ,valueStart:21,valueEnd:25},
		  ],
        "tags":[],
        "average_rating":[],
        "shipping":[],
        "availability":['Include out of stock']
        };
    
    // ************* Create attribut filter object create ************************ 
	ProductsTmp.some(attr_obj => {
		if (attr_obj?.attributes != undefined)
		{
			attr_obj.attributes.forEach((element) => {
				if (isNaN(attr_count_data_final_list["attributes"][element.name]))
				{
					attr_count_data_final_list["attributes"][element.name] = {};
				}
			});
		}
		
	});
	ProductsTmp.some(obj => {
		//console.log('************************ Attribut '+obj['id']+' ******************************');
		if (obj['attributes'] != undefined)
		{
			obj['attributes'].some(attr_obj => {
				attr_obj.options.forEach((element) => {
					if (isNaN(attr_count_data_final_list['attributes'][attr_obj.name][element])) {
						attr_count_data_final_list['attributes'][attr_obj.name][element] = 0;
					}
					attr_count_data_final_list['attributes'][attr_obj.name][element] = 1 + attr_count_data_final_list['attributes'][attr_obj.name][element];
				});
			});
		}
		

		//console.log('************************ Categories '+obj['id']+' ******************************');
		obj['categories'].some(attr_obj => {
				if(!isEmpty(attr_count_data_final_list['categories']))
				{
					var objIndex  = attr_count_data_final_list['categories'].findIndex(function (element) {
						if(element['term_id'] == attr_obj.id)
						{
						return true;
						}
					});
					if(objIndex >= 0)
					{
						attr_count_data_final_list['categories'][objIndex]['cat_count'] = parseInt(attr_count_data_final_list['categories'][objIndex]['cat_count']) + 1;
					}else{
						var tmp_arry = [];
					tmp_arry['term_id'] = attr_obj.id;
					tmp_arry['name'] = attr_obj.name;
					tmp_arry['slug'] = attr_obj.slug;
					tmp_arry['parent'] = attr_obj.parent;
					tmp_arry['cat_count'] = 1;
					attr_count_data_final_list['categories'].push(tmp_arry);
					}
				}
				else
				{
					var tmp_arry = [];
					tmp_arry['term_id'] = attr_obj.id;
					tmp_arry['name'] = attr_obj.name;
					tmp_arry['slug'] = attr_obj.slug;
					tmp_arry['parent'] = attr_obj.parent;
					tmp_arry['cat_count'] = 1;
					attr_count_data_final_list['categories'].push(tmp_arry);
				}
				
		});

		//console.log('************************ discount '+obj['meta_data']['product_discount']+' ******************************');
        if(obj['meta_data']['product_discount'] != '' && (obj['meta_data']['product_discount'] != 0))
        {
            if(!isEmpty(attr_count_data_final_list['discount']))
            {
                var objIndex  = attr_count_data_final_list['discount'].findIndex(function (element) {
                    if(element['valueStart'] <= obj['meta_data']['product_discount'] && obj['meta_data']['product_discount'] <= element['valueEnd'])
                    {
                    return true;
                    }
                });
                if(objIndex >= 0)
                {
                    attr_count_data_final_list['discount'][objIndex]['count'] = parseInt(attr_count_data_final_list['discount'][objIndex]['count']) + 1;
                }
            }
        }

		//console.log('************************ tags '+obj['id']+' ******************************');
	obj['tags']?.some(tags_obj => {
				if(!isEmpty(attr_count_data_final_list['tags']))
				{
					var objIndex  = attr_count_data_final_list['tags'].findIndex(function (element) {
						if(element['term_id'] == tags_obj.id)
						{
						return true;
						}
					});
					if(objIndex >= 0)
					{
						attr_count_data_final_list['tags'][objIndex]['tag_count'] = parseInt(attr_count_data_final_list['tags'][objIndex]['tag_count']) + 1;
					}else{
						var tags_tmp_arry = [];
						tags_tmp_arry['term_id'] = tags_obj.id;
						tags_tmp_arry['name'] = tags_obj.name;
						tags_tmp_arry['slug'] = tags_obj.slug;
						tags_tmp_arry['tag_count'] = 1;
					attr_count_data_final_list['tags'].push(tags_tmp_arry);
					}
				}
				else
				{
					var tags_tmp_arry = [];
					tags_tmp_arry['term_id'] = tags_obj.id;
					tags_tmp_arry['name'] = tags_obj.name;
					tags_tmp_arry['slug'] = tags_obj.slug;
					tags_tmp_arry['tag_count'] = 1;
					attr_count_data_final_list['tags'].push(tags_tmp_arry);
				}
				
		});

        //console.log('************************ shipping '+obj['id']+' ******************************');
        if(obj['meta_data']['short_description_badge'] != '' && (obj['meta_data']['short_description_badge'] != 0))
        {
            if(!isEmpty(attr_count_data_final_list['shipping']))
            {
                var objIndex  = attr_count_data_final_list['shipping'].findIndex(function (element) {
                    if(element['name'] == obj['meta_data']['short_description_badge'])
                    {
                    return true;
                    }
                });
                if(objIndex >= 0)
                {
                    attr_count_data_final_list['shipping'][objIndex]['shipping_count'] = parseInt(attr_count_data_final_list['shipping'][objIndex]['shipping_count']) + 1;
                }else{
                    var shipping_tmp_arry = [];
                    shipping_tmp_arry['name'] = obj['meta_data']['short_description_badge'];
                    shipping_tmp_arry['shipping_count'] = 1;
                attr_count_data_final_list['shipping'].push(shipping_tmp_arry);
                }
            }
            else
            {
                var shipping_tmp_arry = [];
                shipping_tmp_arry['name'] = obj['meta_data']['short_description_badge'];
                shipping_tmp_arry['shipping_count'] = 1;
                attr_count_data_final_list['shipping'].push(shipping_tmp_arry);
            }
        }
        

		//  average_rating Count 
		if(obj['average_rating'] == 5)
		{
			if(isNaN(attr_count_data_final_list['average_rating'][5]))
			{
				attr_count_data_final_list['average_rating'][5] = 0 ;
			}
			attr_count_data_final_list['average_rating'][5] = attr_count_data_final_list['average_rating'][5] + 1;
		}
		if(obj['average_rating'] >= 4)
		{
			if(isNaN(attr_count_data_final_list['average_rating'][4]))
			{
				attr_count_data_final_list['average_rating'][4] = 0 ;
			}
			attr_count_data_final_list['average_rating'][4] = attr_count_data_final_list['average_rating'][4] + 1;
		}
		if(obj['average_rating'] >= 3)
		{
			if(isNaN(attr_count_data_final_list['average_rating'][3]))
			{
				attr_count_data_final_list['average_rating'][3] = 0 ;
			}
			attr_count_data_final_list['average_rating'][3] = attr_count_data_final_list['average_rating'][3] + 1;
		}
		if(obj['average_rating'] >= 1)
		{
			if(isNaN(attr_count_data_final_list['average_rating'][1]))
			{
				attr_count_data_final_list['average_rating'][1] = 0 ;
			}
			attr_count_data_final_list['average_rating'][1] = attr_count_data_final_list['average_rating'][1] + 1;
		}
    	
            

	});
    return attr_count_data_final_list;
}