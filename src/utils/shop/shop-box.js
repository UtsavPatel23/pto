import { exclude_category_for } from "../customjs/custome";

// Custom badge
export function get_custom_badge(options,sku) {
    var custom_badge = '';
	if(options?.nj_custom_badge)
	{
		if(options?.multiple_sku_list_for_custom_badge != undefined && options?.multiple_sku_list_for_custom_badge.length > 0)
		{
			options?.multiple_sku_list_for_custom_badge.map(item => {
				if(item.multiple_sku_list_custom_badge != '')
				{
					const itemArr = item.multiple_sku_list_custom_badge.split(",");
					const found = itemArr.find((element) => element == sku);
					if(found != undefined)
					{
						custom_badge = item.multiple_sku_list_custom_badge_name;
					}
				}
			})
		}
	}
    return custom_badge;
}
// Custom badge
export function get_coupon_box(options,sku) {
    var coupon_box = '';
	if(options?.nj_coupon_box_on__off)
	{
		if(options?.multiple_sku_list_for_coupon_box != undefined && options?.multiple_sku_list_for_coupon_box.length > 0)
		{
			options?.multiple_sku_list_for_coupon_box.map(item => {
				if(item.multiple_sku_list_coupon_box != '')
				{
					const itemArr = item.multiple_sku_list_coupon_box.split(",");
					const found = itemArr.find((element) => element == sku);
					if(found != undefined)
					{
						coupon_box = item;
					}
				}
			})
		}
	}
    return coupon_box;
}
// grid timer
export function get_gridtimer(options,product) {
    var gridtimer = '';
	if(options?.all_skus_grid_timer)
	{
		
        var validProductDis = exclude_category_for(product,options.exclude_categories_from_grid_timer);
		if(!validProductDis)
        {
            gridtimer = options?.all_skus_grid_timer_img_url;
        }
	}else{
        if(options?.multiple_skus_grid_timer != undefined && options?.multiple_skus_grid_timer.length > 0)
		{
			options?.multiple_skus_grid_timer.map(item => {
				if(item.multiple_sku_list_for_grid_timer != '')
				{
					const itemArr = item.multiple_sku_list_for_grid_timer.split(",");
					const found = itemArr.find((element) => element == product.sku);
					if(found != undefined)
					{
						gridtimer = item.multiple_img_url_for_grid_timer;
					}
				}
			})
		}
    }
    return gridtimer;
}