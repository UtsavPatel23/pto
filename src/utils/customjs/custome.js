import { SHOP_SHIPPING_MULI } from "../constants/endpoints";
import axios from 'axios';

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
        breadcrumbs.push({'breadcrumb':carRes.name,'href':'/categories/'+carRes.term_link });
        carRes = get_chield_by_parent_id(categories,carRes.id);
    }
      return breadcrumbs;
  }

  function get_chield_by_parent_id(categories,parent)
  {
    return  categories.find((element)=> element['parent'] == parent );
  }


export  function localstorage_cookiesClear(){
      var hours = 20; // to clear the localStorage after 1 hour
                // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
      localStorage.setItem('setupTime', now)
    } else {
      if(now-setupTime > hours*60*60*1000) {

        //remove token from cookies
        Cookies.remove("token");
        Cookies.remove("user_lgdt");
        Cookies.remove('customerData');
        Cookies.remove('coutData');

        localStorage.clear()
        localStorage.setItem('setupTime', now);
      }
    }
  }