import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { clearCart } from "../../../utils/cart";
import { NEXT_PUBLIC_SITE_API_URL } from "../../../utils/constants/endpoints";
import Router from 'next/router';
import { update_order } from "../../../utils/apiFun/order";
// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaypalButtonCheckout({createdOrderData}) {
  const initialOptions = {
    "client-id": "test",
    //"enable-funding": "paylater,venmo,card",
    "enable-funding": "paylater,venmo",
    "disable-funding": "card",
    //"disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  const checkoutOrderData = createdOrderData?.allData;
  const [message, setMessage] = useState("");
  if(!checkoutOrderData)
  {
    return '';
  }
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          createOrder={async () => {
            try {
              const response = await fetch(NEXT_PUBLIC_SITE_API_URL +"/api/paypal/create-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    {
                      checkoutOrderData: checkoutOrderData
                    },
                  ],
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(NEXT_PUBLIC_SITE_API_URL +
                `/api/paypal/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body : JSON.stringify({ "orderID": data.orderID})
                },
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction = orderData.purchase_units[0].payments.captures[0];
                const reference_id =  orderData.purchase_units[0].reference_id;
                  if(transaction?.status == 'COMPLETED')
                  {
                    await clearCart( null, () => {} );
                    
                    const newOrderData = {
                        orderId : reference_id,
                        paypal : 1,
                        payment_method : 'ppcp-gateway',
                        token : transaction.id,
                        orderno : reference_id,
                    };
                    const updateOrder =  await update_order(newOrderData);
                    if(updateOrder.success)
                    {
                      Router.push('/thank-you/?orderPostnb='+window.btoa(reference_id)+'&status=SUCCESS');
                    }else{

                    }
                  }
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaypalButtonCheckout;
