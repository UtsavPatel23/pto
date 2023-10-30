export const paramsToObject = (params) => {
    const obj = {
		"attributes":{},
		"categories":[],
		"discount":[],
		"tags":[],
		"average_rating":[],
		"shipping":[],
		"availability":[],
		"productsearch":'',
	};
    const para = new URLSearchParams(params);
 
    for (const [key, value] of para) {
		var pre_key = key.substring(0, 5);
         //console.log('key',pre_key);
		 if(pre_key == 'attr_')
		 {
			var tmp_key = key.replace('attr_','');
			tmp_key = tmp_key.replace('[]','');
			//console.log('tmp_key',tmp_key);
			if (obj['attributes'].hasOwnProperty(tmp_key)) {
				if (Array.isArray(obj['attributes'][tmp_key])) {
					obj['attributes'][tmp_key].push(value);
				} else {
					obj['attributes'][tmp_key] = [obj['attributes'][tmp_key], value];
				}
			} else {
				obj['attributes'][tmp_key] = [value];
			}
		 }
		else if(pre_key == 'disco')
		 {
			if (obj['discount'].hasOwnProperty('discount')) {
				if (Array.isArray(obj['discount'])) {
					obj['discount'].push(value);
				} else {
					obj['discount'] = [obj['discount'], value];
				}
			} else {
				obj['discount'].push(value);
			}
		 }
		else if(pre_key == 'tags[')
		 {
			if (obj['tags'].hasOwnProperty('tags')) {
				if (Array.isArray(obj['tags'])) {
					obj['tags'].push(value);
				} else {
					obj['tags'] = [obj['tags'], value];
				}
			} else {
				obj['tags'].push(value);
			}
		 }
		else if(pre_key == 'cat_n')
		 {
			if(value != '')
			{
				var catarr = [];
				catarr[value] = '';

				if (obj['categories'].hasOwnProperty('categories')) {
					if (Array.isArray(obj['categories'])) {
						obj['categories'].push(catarr);
					} else {
						obj['categories'] = [obj['categories'], catarr];
					}
				} else {
					obj['categories'].push(catarr);
				}
			}
			
		 }
		else if(pre_key == 'avera')
		 {
			if (obj['average_rating'].hasOwnProperty('average_rating')) {
				if (Array.isArray(obj['average_rating'])) {
					obj['average_rating'].push(value);
				} else {
					obj['average_rating'] = [obj['average_rating'], value];
				}
			} else {
				obj['average_rating'].push(value);
			}
		 }
         else if(pre_key == 'shipp')
		 {
			if (obj['shipping'].hasOwnProperty('shipping')) {
				if (Array.isArray(obj['shipping'])) {
					obj['shipping'].push(value);
				} else {
					obj['shipping'] = [obj['shipping'], value];
				}
			} else {
				obj['shipping'].push(value);
			}
		 }
         else if(pre_key == 'avail')
		 {
			if (obj['availability'].hasOwnProperty('availability')) {
				if (Array.isArray(obj['availability'])) {
					obj['availability'].push(value);
				} else {
					obj['availability'] = [obj['availability'], value];
				}
			} else {
				obj['availability'].push(value);
			}
		 }
		 else if(pre_key == 'produ')
		 {
			if (obj['productsearch'].hasOwnProperty('productsearch')) {
				obj['productsearch'] = value;
			} else {
				obj['productsearch'] = value;
			}
		 }
		 
		 
        
    }
 
    return obj;
}