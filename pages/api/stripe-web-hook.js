import { buffer } from "micro";
const Stripe = require('stripe');
import { isEmpty } from 'lodash';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

/**
 * Update Order.
 *
 * Once payment is successful or failed,
 * Update Order Status to 'Processing' or 'Failed' and set the transaction id.
 *
 * @param {String} newStatus Order Status to be updated.
 * @param {String} orderId Order id
 * @param {String} transactionId Transaction id.
 *
 * @returns {Promise<void>}
 */
const updateOrder = async ( newStatus, orderId, transactionId = '' ) => {

    let newOrderData = {
        status: newStatus
    }

    if ( transactionId ) {
        newOrderData.transaction_id = transactionId
    }

    try {
        const {data} = await api.put( `orders/${ orderId }`, newOrderData );
        console.log( '✅ Order updated data', data );
    } catch (ex) {
        console.error('Order creation error', ex);
        throw ex;
    }
}

const AddOrdernote = async ( orderId, noteMessage = '' ) => {

    const noteData = {
        note: noteMessage
      };

    
    try {
        const {data} = await api.post( `orders/${ orderId }/notes`, noteData );
        console.log( '✅ Order updated data', data );
    } catch (ex) {
        console.error('Order creation error', ex);
        throw ex;
    }
}

const handler = async (req, res) => {
    
    console.log("req", req);
    console.log("res", res);

    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

       

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log( 'stripeEvent', stripeEvent );
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ( 'checkout.session.completed' === stripeEvent.type ) {
            const session = stripeEvent.data.object;
            console.log( 'sessionsession', session );
            console.log( '✅ session.metadata.orderId', session.metadata.orderPostID, session.id );
			
			// Get  pi_  key ( checkoutSession.payment_intent)
            const checkoutSession =   await  stripe.checkout.sessions.retrieve(session.id);

            //  Get ch_    (intent.latest_charge) 
            const intent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent, {
                apiVersion: '2022-11-15',
              });

            // All transaction details Run
            const paymentIntents = await stripe.paymentIntents.list({
                limit: 5,
            });
            
            let chargesData = "";
              //  get ch_ id (text.charges.data.id)
             paymentIntents.data.forEach (function(value, key) {
               if(value.id == checkoutSession.payment_intent)
               {
                chargesData = value;
               }
               
               })
           let payment_method_details = '';
           if ( !isEmpty( intent.latest_charge ) ) {
            chargesData.charges.data.forEach (function(value1, key) {
                   if(value1.id == intent.latest_charge)
                   {
                       payment_method_details = value1.payment_method_details;
                   }
                   
                   })
           } 
			
			// Add Order Note.
                try {
						//await AddOrdernote( session.metadata.orderPostID, `Order charge successful in Stripe. session Charge: ${JSON.stringify(session)}. `   );
						//await AddOrdernote( session.metadata.orderPostID, `Order charge successful in Stripe. checkoutSession Charge: ${JSON.stringify(checkoutSession)}. `   );
						//await AddOrdernote( session.metadata.orderPostID, `Order charge successful in Stripe. intent Charge: ${JSON.stringify(intent)}. `   );
						//await AddOrdernote( session.metadata.orderPostID, `Order charge successful in Stripe. paymentIntents Charge: ${JSON.stringify(paymentIntents)}. `   );
						
                   // if ( payment_method_details != '' ) {
                   // await AddOrdernote( session.metadata.orderId, `Order charge successful in Stripe. Charge: ${intent.latest_charge}. Payment Method: ${payment_method_details.card.brand} ending in ${payment_method_details.card.last4}` );
                   // }else{
                       await AddOrdernote( session.metadata.orderPostID, `Order charge successful in Stripe. Charge: ${intent.latest_charge}. ` );
                   // }
                } catch (error) {
                    await AddOrdernote( session.metadata.orderPostID ,'Order Note failed');
                    console.error('Order note error', error);
                }
				
            // Payment Success.
            try {
                //await updateOrder( 'processing', session.metadata.orderPostID, session.id );
                await updateOrder( 'snv', session.metadata.orderPostID, session.id );
            } catch (error) {
                await updateOrder( 'failed', session.metadata.orderPostID );
                console.error('Update order error', error);
            }
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export default handler;
