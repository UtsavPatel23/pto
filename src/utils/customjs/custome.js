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

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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