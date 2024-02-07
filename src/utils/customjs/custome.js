import { SHOP_SHIPPING_MULI, WEB_DEVICE } from "../constants/endpoints";
import axios from 'axios';
;
import {  isEmpty } from "lodash";
import { clearCart } from "../cart";

export function go_to_main_filter()
{
const id = 'main_filter';
const yOffset = -20; 
const element = document.getElementById(id);
const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
if(element.getBoundingClientRect().top < -300)
{
    window.scrollTo({top: y, behavior: 'smooth'});
}
//console.log("Top : " +element.getBoundingClientRect().top + " Page Y offser :" + window.pageYOffset + " Set y: " +yOffset);
}

export function get_count_total_discount(filter_discount)
{
    var total = 0;
    Object.keys(filter_discount).map(function(key_inn) {
        total = total+filter_discount[key_inn].count;
    });
    return total; 
}


  export const getShipping = async(postcode,cartItems) => {
        var responce = {};
        var product_code_sku = {};
        var tmp_notice = [];
        var shippingTotal  = -2;

        var shippinLocalStorageKey = 'mul_'+postcode;
        cartItems.map((item)=>{
          //console.log('item',item.quantity);
          var sku = item.data.sku;
          shippinLocalStorageKey = shippinLocalStorageKey+'_'+sku+'_'+item.quantity;
          if(item.data.meta_data.length > 0)
          {
            var product_code = '';
            const meta_data_result = item.data.meta_data.find(({ key }) => key === "product_code");
            if(meta_data_result.value == 'SN')
            {
              product_code = 'DZ';
            }else{
              product_code = meta_data_result.value;
            }
            if(undefined == product_code_sku[product_code])
            {
              product_code_sku[product_code] = [sku];
            }else{
              product_code_sku[product_code].push(sku);
            }
            //console.log('result',product_code_sku);
          }
          
        });
       // console.log('shippinLocalStorageKey',shippinLocalStorageKey);

        var shipping_single = localStorage.getItem('sbhaduaud');
				 if(shipping_single != null && shipping_single != '')
				 {
					shipping_single = JSON.parse(shipping_single);
					shippingTotal = shipping_single[shippinLocalStorageKey];
				 }else{
					shipping_single = {};
				 }

         if(shippingTotal == undefined || shippingTotal == -2)
				 {
            shippingTotal = 0;
            const payload = {postcode: postcode, product_code_sku: product_code_sku};
            const {data : ShippingData} = await axios.post( SHOP_SHIPPING_MULI,payload );
            //console.log('ShippingData cusume',ShippingData);
            
            cartItems.map((item)=>{
              var sku = item.data.sku;
              if(undefined == ShippingData[sku] || ShippingData[sku] < 0)
              {
                tmp_notice.push(sku);
              }else{
                shippingTotal +=(parseFloat(ShippingData[sku])  * item.quantity);
              }
            });
        }else{
          if(Array.isArray(shippingTotal))
          {
            tmp_notice = shippingTotal;
            shippingTotal = -1;
          }else{
            shippingTotal = parseFloat(atob(shippingTotal));
          }
        }

         // Local storage set
         if(tmp_notice.length > 0)
         {
          shipping_single[shippinLocalStorageKey] = tmp_notice;
         }else{
          shipping_single[shippinLocalStorageKey] = btoa(shippingTotal);
         }
				 
         localStorage.setItem('sbhaduaud',JSON.stringify(shipping_single));

       responce['notice'] = tmp_notice;
       responce['shippingTotal'] = parseFloat(shippingTotal.toFixed(2));
      return responce;
  }

  export function get_countries()
  {
    return {
      "billingCountries": [
        {
          "countryCode": "AU",
          "countryName": "Australia"
        }
      ],
      "shippingCountries": [
        {
          "countryCode": "AU",
          "countryName": "Australia"
        }
      ]
    };
  }

  export function get_stateList()
  {
    return [
      {
        "stateCode": "ACT",
        "stateName": "Australian Capital Territory"
      },
      {
        "stateCode": "NSW",
        "stateName": "New South Wales"
      },
      {
        "stateCode": "NT",
        "stateName": "Northern Territory"
      },
      {
        "stateCode": "QLD",
        "stateName": "Queensland"
      },
      {
        "stateCode": "SA",
        "stateName": "South Australia"
      },
      {
        "stateCode": "TAS",
        "stateName": "Tasmania"
      },
      {
        "stateCode": "VIC",
        "stateName": "Victoria"
      },
      {
        "stateCode": "WA",
        "stateName": "Western Australia"
      }
    ];
  }

  export function getNewProductTag(productData)
  {
    const date1 = new Date(productData);
		const date2 = new Date();
		const diffTime = Math.abs(date2 - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
		//console.log(diffTime + " milliseconds");
		//console.log(diffDays + " days");
    if(diffDays < 8)
    {
      return '1';
    }
    return '0';
  }


  export function getSingleProductBreadcrumbs(categories)
  {
    if(categories == undefined){
      return null;
    }
    var breadcrumbs = [];
    var carRes = get_chield_by_parent_id(categories,0);
    
    while(carRes != undefined)
    {
      var cat_slug = '/c/'+carRes?.term_link;
      if(!WEB_DEVICE)
          {
          cat_slug = '/cat/?sname='+carRes?.slug;
        }
        breadcrumbs.push({'breadcrumb':carRes.name,'href': cat_slug });
        carRes = get_chield_by_parent_id(categories,carRes.id);
    }
      return breadcrumbs;
  }

  function get_chield_by_parent_id(categories,parent)
  {
    return  categories.find((element)=> element['parent'] == parent );
  }


export   function localstorage_cookiesClear(){
  setTimeout(function(){
      var hours = 20; // to clear the localStorage after 1 hour
                  // (if someone want to clear after 8hrs simply change hours=8)
      var now = new Date().getTime();
      var setupTime = localStorage.getItem('setupTime');
      if (setupTime == null) {
        localStorage.setItem('setupTime', now)
      } else {
        if(now-setupTime > hours*60*60*1000) {
          if(localStorage.getItem('token')) {
            //remove token from localStorage
            localStorage.setItem("token",'');
            localStorage.setItem("user_lgdt",'');
            localStorage.setItem('customerData','');
            localStorage.setItem('coutData','');
            clearCart(null,false);
            
          }
      localStorage.clear()
          localStorage.setItem('setupTime', now);
        }
      }
    },10000);
  }

export  function selectattributdefault(filter_attributes,filter_option)
{
  if(!isEmpty(filter_attributes) && (typeof window !== 'undefined'))
  {
    var sidebardata = localStorage.getItem('sidebardata');
    if(sidebardata == undefined)
    {
      localStorage.setItem('sidebardata',JSON.stringify(filter_attributes));
      //console.log('if ',sidebardata);
    }else{
      //console.log('else ',JSON.parse(sidebardata));
      const tmpsidebar =  JSON.parse(sidebardata);
      //console.log('filter_option select',filter_option['attributes']);
      if(isEmpty(filter_option['attributes']))
      {
        localStorage.setItem('sidebardata',JSON.stringify(filter_attributes));
      }else{

        if(Object.keys(filter_attributes).length > 0) 
        {
          Object.keys(filter_attributes).map(function(key) {
              filter_attributes[key] = tmpsidebar[key];
          });
        }
        
        
      }
    }
    //console.log('not empty ',filter_attributes);
    
   /* filter_attributes  = Object.keys(filter_attributes)
        .sort()
        .reduce((accumulator, key) => {
          accumulator[key] = filter_attributes[key];

          return accumulator;
        }, {});*/
  }
  return filter_attributes;
}

export function get_points(customerData)
{
  // redeem point  
  var rewardPointsString = customerData?.meta_data?._customer_after_reedem_reward_points;
  var rewardPoints = 0;
    
    if(rewardPointsString != undefined)
    {
      rewardPointsString = rewardPointsString.replaceAll("mulrp", "");
      rewardPoints = parseInt(rewardPointsString);
    }
    return rewardPoints;
}

// Change Images size
export function get_images_resize(url,size)
{
  var tmpImgUrl = url.split('.');
	tmpImgUrl.splice(2, 1, tmpImgUrl.slice(-2, -1)[0]+size);
	return tmpImgUrl.join('.');
}

// Set Your Browsing History
export const storeYourBrowsingHistory = ( product ) => {
	
	if ( isEmpty( product ) ) {
		return null;
	}
  var histryData = {};
  var stroageData =  localStorage.getItem( 'YourBrowsingHistory' );
  if(stroageData)
  {
    histryData = JSON.parse(stroageData);
  }
  histryData['p'+product.id]= product;
  //console.log('histryData a',Object.keys(histryData).length);
  var lenPro = 6;
  if(Object.keys(histryData).length > lenPro)
  {
    var tmphistryData = histryData;
    var resultLimit = {};
    tmphistryData =  Object.keys(tmphistryData).slice(-lenPro);
    //console.log('tmphistryData',tmphistryData);
    Object.keys(tmphistryData).map( historypro => {
      //console.log('historypro '+ tmphistryData[historypro] ,histryData[tmphistryData[historypro]]);
      resultLimit[tmphistryData[historypro]] = histryData[tmphistryData[historypro]];
   })
   histryData = resultLimit;
  }
  
  localStorage.setItem( 'YourBrowsingHistory', JSON.stringify(histryData));
  return histryData;
}


export function get_discount_type_cart(cartItems,options,setCartSubTotalDiscount,cartSubTotalDiscount,paymentMethodDiscount,totalPrice,tokenValid)
{
   if(cartItems == undefined || options == undefined)
   {
    return 0;
   }
   // Duscount cart quantity  
  var discount_type_cart_quantity_cal = 0
  var cartSubTotalDiscountTmp = {};
  if(options?.discount_type_cart_quantity == 1)
  {
    var cartNote = [];
    { cartItems.length &&
      cartItems.map( ( item ) => {
        //console.log('item',item);
        var purchase_note = '';
        var msgTmpDiscount = '';
        var tmpDiscount = 0;
        var arr_msg = [];
        { options.discount_rate_product_quantity_discount?.length &&
          options.discount_rate_product_quantity_discount.map( ( discount_item ) => {
            //console.log('discount_item',discount_item);
            if(item.quantity < discount_item.quantity)
            {
              var pro_price = item.data?.price ?? 0;
              pro_price = parseFloat(pro_price);
              var dis_price = ((pro_price * discount_item.quantity * discount_item.rate_percentage)/100);
              arr_msg.push("<span class='variation-Note'>Note: </span> Add "+(discount_item.quantity-item.quantity)+" more to get " +discount_item.rate_percentage+"% discount "+ cartItems?.[0]?.currency +dis_price.toFixed(2));
            }else{
              tmpDiscount = ((item.line_subtotal*discount_item.rate_percentage)/100);
              msgTmpDiscount = "<span class='variation-Note'>Discount: </span>  "+(discount_item.rate_percentage)+"% discount applied (" +((item.line_subtotal*discount_item.rate_percentage)/100).toFixed(2)+")";
            }
          }) 
        }
        discount_type_cart_quantity_cal +=tmpDiscount;
        if(msgTmpDiscount != '')
        {
          arr_msg.push(msgTmpDiscount);
        }
        if(!isEmpty(arr_msg))
        {
          purchase_note = arr_msg.join('<br>');
        }
        //console.log('arr_msg',arr_msg);
        //console.log('purchase_note',purchase_note);
        if(purchase_note != '')
        {
          cartNote.push({key:item.key,purchase_note:purchase_note});
        }
      }) 
    }
    cartSubTotalDiscountTmp.discount_type_cart_quantity = {name : 'Bulkbuy Discount', discount : discount_type_cart_quantity_cal,cartNote:cartNote};
  }else{
    cartSubTotalDiscountTmp.discount_type_cart_quantity = '';
  }

 // Duscount cart Product
 var discount_type_cart_product_cal = 0
 if(options?.discount_type_cart_product == 1)
 {
  var purchase_note = '';
  var cartNote = [];
  var arr_msg = [];
  var minPriceArr = [] ; 
   var discount_rate_multiple_product_in_cart_discount = options.discount_rate_multiple_product_in_cart_discount;
   { cartItems.length &&
      cartItems.map( ( item ) => {
        var priceTmp = item?.data?.price;
        if(priceTmp != undefined)
        {
          minPriceArr.push(parseFloat(priceTmp));
        }
        
      }) 
    }
    let minValuePrice = Math.min(...minPriceArr);
    //console.log('minPriceArr',minPriceArr);
    //console.log('minValuePrice',minValuePrice);
    //console.log('discount_rate_multiple_product_in_cart_discount',discount_rate_multiple_product_in_cart_discount);
    { discount_rate_multiple_product_in_cart_discount?.length &&
      discount_rate_multiple_product_in_cart_discount.map( ( item ) => {
      //    console.log('item',item);
      //    console.log('CL ',cartItems.length);
          if(cartItems.length < item.quantity)
          {
            arr_msg.push("Add "+(item.quantity - cartItems.length)+" more product to get "+item.rate_percentage+"% discount on min price product");
          }else{
            discount_type_cart_product_cal = ((minValuePrice * item.rate_percentage) / 100)
          }
      });
    }
    if(!isEmpty(arr_msg))
    {
      purchase_note = arr_msg.join('<br>');
    }
    if(purchase_note != '')
        {
          cartNote.push({purchase_note:purchase_note});
        }
   cartSubTotalDiscountTmp.discount_type_cart_product = {name : 'Super Saver Stockup', discount : discount_type_cart_product_cal,cartNote:cartNote};
 }else{
   cartSubTotalDiscountTmp.discount_type_cart_product = '';
 }

 //  paymentMethod Discount  // paymentMethodDiscount
  var paymentMethodDiscount_cal = 0;
  if(paymentMethodDiscount == 0 || paymentMethodDiscount == undefined)
  {
    cartSubTotalDiscountTmp.paymentMethodDiscount = '';
  }else{
    if(paymentMethodDiscount.length > 0)
    {
      var paymentMethodDisPer = 0;
      paymentMethodDiscount.map(function (discount) {
        if(discount.start_cart_total < totalPrice && totalPrice < discount.end_cart_total)
        {
          paymentMethodDisPer = discount.discount;
        }
      });
      paymentMethodDiscount_cal = ((totalPrice*parseFloat(paymentMethodDisPer))/100);
      cartSubTotalDiscountTmp.paymentMethodDiscount = {name : 'Payment Discount', discount : paymentMethodDiscount_cal};
    }
  }
  
  // Discount User login (Members only)
  var membersOnlyDiscount_cal = 0;
  if(tokenValid == 1 && options?.discount_type_3 == 1)
  {
    
    //console.log('date ',options.nj_set_date_range_for_discount_login_user);
    if(options?.nj_set_date_range_for_discount_login_user != undefined && (!isEmpty(options?.nj_set_date_range_for_discount_login_user)))
    {
      var validDateUserLoginDis = getvalidDateUserLoginDis(options);
      if(validDateUserLoginDis)
      {
        //console.log('cartItems',cartItems);
        //console.log('cat',options.exclude_category_for_discount_sku_list);
        var provalid = [];
        var line_subtotal = 0;
        { cartItems.length &&
          cartItems.map( ( item ) => {
            var validProductDis = Membersonlyptoduct(item.data,options);
            if(!validProductDis)
            {
              //console.log('product include Yes =======',item.data.name);
              provalid.push(item.data.name);
              if(item.line_subtotal != undefined)
              {
                line_subtotal +=item.line_subtotal;
              }
            }
          }) 
        }
        //console.log('provalid',provalid);
        //console.log('line_subtotal',line_subtotal);
        if(line_subtotal != 0)
        {
          membersOnlyDiscount_cal = ((line_subtotal * options.rate_percentage_login_user)/100);
        }
        cartSubTotalDiscountTmp.membersOnlyDiscount = {name : 'Members only discount', discount : membersOnlyDiscount_cal};;
      }else{
        //console.log('No s');
        cartSubTotalDiscountTmp.membersOnlyDiscount = '';
      }
    }
  }else{
    //console.log(' vv tokenValid discount NOT');
    cartSubTotalDiscountTmp.membersOnlyDiscount = '';
  }

  setCartSubTotalDiscount({ 
    ...cartSubTotalDiscount, 
    discount_type_cart_quantity : cartSubTotalDiscountTmp.discount_type_cart_quantity,
    discount_type_cart_product :  cartSubTotalDiscountTmp.discount_type_cart_product,
    paymentMethodDiscount :  cartSubTotalDiscountTmp.paymentMethodDiscount,
    membersOnlyDiscount :  cartSubTotalDiscountTmp.membersOnlyDiscount,
    } );
 
  return discount_type_cart_quantity_cal + discount_type_cart_product_cal + paymentMethodDiscount_cal + membersOnlyDiscount_cal;
}
// GEt valid product for members only
export function Membersonlyptoduct(data,options) {
  var validProductDis  = false;
  var proCatIDs = [];
   if(data?.category_ids != undefined)
   {
    proCatIDs = data?.category_ids;
   }else{
    proCatIDs = data.categories;
   }
   //console.log('proCatIDs',proCatIDs);
            if(proCatIDs != undefined && options?.exclude_category_for_discount_sku_list != undefined)
            {
              if(options.exclude_category_for_discount_sku_list.length > 0)
              {
                proCatIDs.map( ( proCatID ) => {
                   // console.log('proCatID',proCatID);
                    if(proCatID.id == undefined)
                    {
                      if(options.exclude_category_for_discount_sku_list.includes(proCatID) && (!validProductDis))
                      {
                        validProductDis = true;
                      }
                    }else{
                      if(options.exclude_category_for_discount_sku_list.includes(proCatID.id) && (!validProductDis))
                      {
                        validProductDis = true;
                      }
                    }
                    
                })
              }
              
            }
  return validProductDis;
}

export function getvalidDateUserLoginDis(options){
    var toDay = new Date();
    var validDateUserLoginDis = false;
    if(options?.nj_set_date_range_for_discount_login_user.length > 0)
    {
      options?.nj_set_date_range_for_discount_login_user.map(function (discount) 
      {
        var	multi_start_date = new Date(discount.multi_start_date+' 00:00:00');
        var	multi_end_date = new Date(discount.multi_end_date+' 23:59:59');
        if (multi_start_date <= toDay && toDay <= multi_end_date && (!validDateUserLoginDis)) {
          validDateUserLoginDis =  true;
        }
      });
    }
    return validDateUserLoginDis;
}

export function getMemberOnlyProduct(options,product,messageText) {
   var Membersonly  = '';
      if(options?.nj_set_date_range_for_discount_login_user != undefined && (!isEmpty(options?.nj_set_date_range_for_discount_login_user)))
									{
									var rate_percentage_login_user = options?.rate_percentage_login_user; 
									var validDateUserLoginDis = getvalidDateUserLoginDis(options);
									if(validDateUserLoginDis)
									{
										var validProductDis = Membersonlyptoduct(product,options,messageText);
											if(!validProductDis)
											{		var tmpProPrice = product.price;
													var toDay = new Date();
													var	product_start_date = new Date(product?.meta_data?.product_start_date+' 00:00:00');
													var	product_end_date = new Date(product?.meta_data?.product_end_date+' 23:59:59');
													var product_discount = product?.meta_data?.product_discount;
													if (product_start_date <= toDay && toDay <= product_end_date && product_discount > 0) {
														tmpProPrice = (tmpProPrice - ((tmpProPrice * product_discount)/100));
													}
												var memberPrice = (tmpProPrice - ((rate_percentage_login_user * tmpProPrice)/100));
                        memberPrice = memberPrice.toFixed(2);
                        if (product.type == 'simple' || product.type == 'variation') {
                          Membersonly = messageText.replace("NJSC_price", memberPrice);
                        } else { 
                          Membersonly = messageText.replace("NJSC_price", '');
                          Membersonly = Membersonly.replace("$", '');
                        }
											}
											
									}
									}
    return Membersonly;
}


// Get product id in exclude categry return true is in category 
export function exclude_category_for(data,exclude_category) {
  var validProductDis  = false;
  var proCatIDs = [];
   if(data?.category_ids != undefined)
   {
    proCatIDs = data?.category_ids;
   }else{
    proCatIDs = data.categories;
   }
   //console.log('proCatIDs',proCatIDs);
            if(proCatIDs != undefined && exclude_category != undefined)
            {
              if(exclude_category.length > 0)
              {
                proCatIDs.map( ( proCatID ) => {
                   // console.log('proCatID',proCatID);
                    if(proCatID.id == undefined)
                    {
                      if(exclude_category.includes(proCatID) && (!validProductDis))
                      {
                        validProductDis = true;
                      }
                    }else{
                      if(exclude_category.includes(proCatID.id) && (!validProductDis))
                      {
                        validProductDis = true;
                      }
                    }
                    
                })
              }
              
            }
  return validProductDis;
}

export function get_customer_id()
{
  var  customer_id = '';
  if(localStorage.getItem('customerData')) {
    var customerDataTMP =  JSON.parse(localStorage.getItem('customerData'));
    if(customerDataTMP != undefined && customerDataTMP != '')
    {
      customer_id = customerDataTMP.id;
    }
  }
  return customer_id;
}

export function get_stateFullName_by_short_name(state,states)
{
  if(states)
  {
    const result = states.find(({ stateCode }) => stateCode === state);
    return result?.stateName ?? null;
  }else{
    return null;
  }
}

export function get_date_formate(date)
{
  var date_created = new Date(date);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return  months[date_created.getMonth()]+' '+date_created.getDate()+', '+date_created.getFullYear();
  
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPriceRemoveDiscount(product)
{
  console.log(product.meta_data.product_discount);
  var product_discount =  product.meta_data.find((element) => element.key == 'product_discount')?.value || '';
  var product_start_date =  product.meta_data.find((element) => element.key == 'product_start_date')?.value || '';
  var product_end_date =  product.meta_data.find((element) => element.key == 'product_end_date')?.value || '';
  if(product_start_date.search("-") < 0 && product_start_date != '')
  {
    product_start_date = product_start_date.substring(0,4)+'-'+product_start_date.substring(4,6)+'-'+product_start_date.substring(6,8);
  }
  if(product_end_date.search("-") < 0 && product_end_date != '')
  {
    product_end_date = product_end_date.substring(0,4)+'-'+product_end_date.substring(4,6)+'-'+product_end_date.substring(6,8);
  }
  
  if ((product_discount != '') && product_discount != undefined) 
			{
				const toDay = new Date();
				product_start_date = new Date(product_start_date+' 00:00:00');
				product_end_date = new Date(product_end_date+' 23:59:59');
				if (product_start_date <= toDay && toDay <= product_end_date) 
				{
            return (product.price - (product_discount * product.price) / 100);
        }
      }
    return product.price;
}

export const serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export const get_discount_price = (product) => { 
  var p_price = product.price;
    const toDay = new Date();
    var product_start_date = product.meta_data.product_start_date;
    var product_end_date = product.meta_data.product_end_date;
    product_start_date = new Date(product_start_date+' 00:00:00');
    product_end_date = new Date(product_end_date+' 23:59:59');
    if (product_start_date <= toDay && toDay <= product_end_date) {
        p_price = (product.price -((product.price * product.meta_data.product_discount) / 100));
  }
  return p_price;
}

export function get_discount_bundle(cartItems, options, totalPrice, coutData) {
  const bundle_discount = coutData?.bundle_discount ?? {};
  const bundle_discount_percentage = options?.nj_bundle_discount ?? 0;
  var returnValue = 0;
  if (!isEmpty(bundle_discount) && !isEmpty(cartItems) && (bundle_discount_percentage > 0)) {
    //console.log('bundle_discount', Object.keys(bundle_discount).length)
    if (Object.keys(bundle_discount).length > 0)
    {
      for (const [key, value] of Object.entries(bundle_discount)) { 
        //console.log('key' + key + 'val', value);
        var flg = 1;
        var dis_proItem_price = 0;
        if (value.length > 0)
        {
          console.log('length', value.length); 
          value.map((pID) => { 
            console.log('pID', pID);
            console.log('cartItems', cartItems);
            let found = cartItems.find(function (cartItem) {
                return pID ==  cartItem?.product_id;
            });
            if (found == undefined) {
              flg = 0;
            } else { 
              dis_proItem_price += found?.line_subtotal;
            }

          });
        }
        if (flg == 1)
        {
          console.log('Bp d p', dis_proItem_price);
          returnValue += ((dis_proItem_price * bundle_discount_percentage) / 100);
        }

      }
    }
  } else { 
    returnValue = 0;
  }
  return parseFloat(returnValue).toFixed(2);;
}