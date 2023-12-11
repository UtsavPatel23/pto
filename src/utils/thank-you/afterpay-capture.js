import axios from "axios";

export function payment_capture(orderToken,orderData) {
    let afterpayCapture = JSON.stringify({
        "token":orderToken,
        "merchantReference":orderData?.number
    });
    const createCapture = {
        afterpay : 1,
        afterpayCapture: afterpayCapture,
    };
    //console.log('createCapture',createCapture)
    axios.post( '/api/afterpay/payment-check', createCapture )
        .then( res => {
            //console.log('res ',res);
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
                axios.post( '/api/update-order', newOrderData )
                    .then( res => {
        
                        //console.log('res UPDATE DATA ORDER',res);
                    } )
                    .catch( err => {
                        console.log('err UPDATE DATA ORDER',err);
                    } )
            }
        } )
        .catch( err => {
            console.log('err ',err);
        } )
    
}