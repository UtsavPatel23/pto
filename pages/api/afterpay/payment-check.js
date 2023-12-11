// pages/api/example.js
import axios from 'axios';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
});



// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
   
  // Run the middleware
  await runMiddleware(req, res, cors);
    if(req.body?.afterpay != 1)
    {
       // res.status(500).json({ error: 'Required data not sent' });
            
    }
    var stringData = process.env.AFTERPAY_MERCHANT_ID+':'+process.env.AFTERPAY_SECRET_KEY;
    //var stringData = '42312:a47f38f9ac76ed1d062dfb4ffe6d98b35dfdbd40aea5917a9ba1f399d51e2d1f766077214fb6ba98598eeef34049f61291b4b7929142089fd70acee5a17bd788';
    // Create buffer object, specifying utf8 as encoding 
    let bufferObj = Buffer.from(stringData, "utf8"); 
    
    // Encode the Buffer as a base64 string 
    let base64StringAuth = bufferObj.toString("base64");
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.AFTERPAY_API_URL+'/v2/payments/capture',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Authorization': 'Basic '+base64StringAuth, 
        },
        data : req.body?.afterpayCapture
    };
    //res.status(200).json(config);
  try {
    // Make an HTTP request using Axios
    const response = await axios.request(config);

    // Extract the data from the response
    const data = response.data;

    // Send the data in the API response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error making HTTP request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' + error.message});
  }
}