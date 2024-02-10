import axios from "axios";
import { update_order, update_order_notes } from "../apiFun/order";
import { NEXT_PUBLIC_SITE_API_URL } from "../constants/endpoints";

export function payment_capture_afterpay(orderToken,orderData) {
    let afterpayCapture = JSON.stringify({
        "token":orderToken,
        "merchantReference":orderData?.number
    });
    const createCapture = {
        afterpay : 1,
        afterpayCapture: afterpayCapture,
    };
    //console.log('createCapture',createCapture)
    axios.post( NEXT_PUBLIC_SITE_API_URL +'/api/afterpay/payment-check', createCapture )
        .then( res => {
            console.log('res ',res);
            var data = res?.data;
            if(data?.status == 'APPROVED')
            {
                //console.log('APPROVED aaaa ',data?.status);
                const newOrderData = {
                    orderId: orderData?.id,
                    orderStausAfterpay: 1,
                    orderToken: orderToken,
                    payment_method : orderData?.payment_method,
                    orderno : data?.id,

                };
                update_order(newOrderData);
               
            }else{
                const newOrderNote = {
                    orderId: orderData?.id,
                    noteMessage: 'Error : ' + data?.status
                };
                update_order_notes(newOrderNote);
            }
        } )
        .catch( err => {
            console.log('err ',err);
        } )
    
}