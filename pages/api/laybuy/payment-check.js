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
  if(req.body?.laybuy != 1)
    {
       //res.status(500).json({ error: 'Required data not sent' });
            
    }
    var stringData = process.env.LAYBUY_MERCHANT_ID+':'+process.env.LAYBUY_API_KEY;
    let bufferObj = Buffer.from(stringData, "utf8"); 
    let base64StringAuth = bufferObj.toString("base64");
  const options = {
    method: 'POST',
    url: process.env.LAYBUY_API_URL+'/order/confirm',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic '+base64StringAuth
    },
    data :  req.body?.laybuyCapture
  };
  
  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json(error);
    });
}