import React from 'react'

function afterpay() {
    const axios = require('axios');
let data = JSON.stringify({
  "amount": {
    "amount": "37.00",
    "currency": "AUD"
  },
  "consumer": {
    "phoneNumber": "0400000000",
    "givenNames": "Joe",
    "surname": "Consumer",
    "email": "test@afterpay.com"
  },
  "billing": {
    "name": "Joe Consumer",
    "line1": "28 Freshwater Pl",
    "area1": "Southbank",
    "region": "Vic",
    "postcode": "3006",
    "countryCode": "AU",
    "phoneNumber": "0400000000"
  },
  "shipping": {
    "name": "Joe Consumer",
    "line1": "28 Freshwater Pl",
    "area1": "Southbank",
    "region": "Vic",
    "postcode": "3006",
    "countryCode": "AU",
    "phoneNumber": "0400000000"
  },
  "items": [
    {
      "name": "Blue Carabiner",
      "sku": "12341234",
      "quantity": 1,
      "pageUrl": "https://www.afterpay-merchant.com/carabiner-354193.html",
      "imageUrl": "https://img.afterpay-merchant.com/carabiner-7378-391453-1.jpg",
      "price": {
        "amount": "40.00",
        "currency": "AUD"
      },
      "categories": [
        [
          "Sporting Goods",
          "Climbing Equipment",
          "Climbing",
          "Climbing Carabiners"
        ],
        [
          "Discounts",
          "Climbing"
        ]
      ]
    },
    {
      "name": "Jeans",
      "sku": "12341235",
      "quantity": 1,
      "pageUrl": "https://www.afterpay-merchant.com/jeans-354193.html",
      "imageUrl": "https://img.afterpay-merchant.com/jeans-7378-391453-1.jpg",
      "price": {
        "amount": "20.00",
        "currency": "AUD"
      }
    }
  ],
  "discounts": [
    {
      "displayName": "10% Off Subtotal",
      "amount": {
        "amount": "3.00",
        "currency": "AUD"
      }
    }
  ],
  "merchant": {
    "redirectConfirmUrl": "https://www.afterpay-merchant.com/confirm",
    "redirectCancelUrl": "https://www.afterpay-merchant.com/cancel"
  },
  "merchantReference": "merchant-order-number",
  "taxAmount": {
    "amount": "0.00",
    "currency": "AUD"
  },
  "shippingAmount": {
    "amount": "10.00",
    "currency": "AUD"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://global-api-sandbox.afterpay.com/v2/checkouts',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic NDIzMTI6YTQ3ZjM4ZjlhYzc2ZWQxZDA2MmRmYjRmZmU2ZDk4YjM1ZGZkYmQ0MGFlYTU5MTdhOWJhMWYzOTlkNTFlMmQxZjc2NjA3NzIxNGZiNmJhOTg1OThlZWVmMzQwNDlmNjEyOTFiNGI3OTI5MTQyMDg5ZmQ3MGFjZWU1YTE3YmQ3ODg=', 
    'Cookie': '__cf_bm=GvtEYY7.OWAfdHGDd7ietQFWm14poXuz6Lfzr3YxghE-1701834597-0-AWT6Yo2ScmSncRP/65gyxlueshaISlj/39G3ZYgMU8XxmCJE0hRnX8SGdlpxbNLZmLt1cc72kUZy6uH4CuM3v3Jcj9cympXkdpbU5MaxWFkd',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    return (
        <div>
           after pay 
        </div>
    )
}

export default afterpay
