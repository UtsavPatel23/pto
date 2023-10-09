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