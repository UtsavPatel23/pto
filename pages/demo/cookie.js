// App.jsx
import React from 'react';



function cookie() {


  function onChange(e) {
    console.log('val',e.target.value);
    var cname ='satish';
   // setCookie(cname,e.target.value,5);  
    console.log('getCookie',getCookie('satish'));
  }
  return (
    <div>
        
      <input type='text' name='add_name_arr' onChange={onChange} />
      
    </div>
  );
}

export default cookie;

 
export function setCookie1(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
export function getCookie1(cname) {
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
  