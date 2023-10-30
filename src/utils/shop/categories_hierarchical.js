import { isEmpty } from "lodash";
import { element } from "prop-types";

export const get_categories_hierarchical  = ( categories = '') => 
{
  //console.log('categories',categories);
    if(!isEmpty(categories))
    {
      var result = unflatten(categories);
      return result;
    }
    
	
};


  function unflatten(items) {
    var tree = [],
        mappedArr = {}
        
    // Build a hash table and map items to objects
    items.forEach(function(item) {
      var id = item.term_id;
      if (!mappedArr.hasOwnProperty(id)) { // in case of duplicates
        mappedArr[id] = item; // the extracted id as key, and the item as value
        mappedArr[id].children = [];  // under each item, add a key "children" with an empty array as value
      }
    })
    
    // Loop over hash table
    for (var id in mappedArr) { 
      if (mappedArr.hasOwnProperty(id)) {
        var mappedElem = mappedArr[id];
        
        // If the element is not at the root level, add it to its parent array of children. Note this will continue till we have only root level elements left
        if (mappedElem.parent) { 
          var parentId = mappedElem.parent;
          if(mappedArr[parentId] == undefined)
          {
            tree.push(mappedElem);
          }else{
            mappedArr[parentId].children.push(mappedElem); 
          }
        }
        
        // If the element is at the root level, directly push to the tree
        else { 
          tree.push(mappedElem);
        } 
      }
    }
    
    return tree;
    
  }
  
  //console.log('Hr cat 1',JSON.stringify(result, null, " "));
  var tmp_cat_data = [];
  export const get_inner_category = ( categories = '',select_cat) => 
  {
    var data_tmp = find_chield(categories,select_cat);
    return tmp_cat_data;
  }

  function find_chield(categories,select_cat)
  {
    Object.keys(categories).map(key => {
      if(categories[key].slug != select_cat)
      {
          find_chield(categories[key]['children'],select_cat)
      }else{
        tmp_cat_data = categories[key];
        return categories[key];
        
      }
    });
  }