import { useRouter } from 'next/router';
import * as React from 'react';

export default function urlset() {
  const [value, setValue] = React.useState(1);
  const router = useRouter()
  console.log('router',router);
  console.log('pathname',router.pathname);
  console.log('query',router.query);
  
  const handleClick = (event) => {
    //console.log('getCookie',getCookie('satish'));
    setValue(2)
    var newLocation = "";
    var newQuery = '/?'+encodeDataToURL(myData);
    newLocation +=  window.location.pathname + newQuery;
    newLocation = newLocation.replaceAll("%5B%5D", "-multiple-");
    console.log('newLocation ' +newLocation);
    window.history.pushState('Details', "search title", newLocation); 
    /*router.push(
      { pathname: router.pathname, query: { "name": "Someone" } },
      "urlset?name=andn"
    );*/
  };
  
console.log('value',value);

var myData = {
  id: 12,
  fname: 'satish v 3',
  lname: 'Ford rajaram 3',
  //url: 'https://es.wikipedia.org/wiki/Henry_Ford',
};

const encodeDataToURL = (data) => {
  return Object
    .keys(data)
    .map(value => `${value}=${encodeURIComponent(data[value])}`)
    .join('&');
}

console.log('URL ',encodeDataToURL(myData));

  return (
    <>
    <button onClick={handleClick}>
      ok set url
    </button>
    </>
  );
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
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
