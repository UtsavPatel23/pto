export function fieldFocusSet(billingValidationResult,shippingValidationResult,ValidationResult){
    if( ! billingValidationResult.isValid)
			{
				var inputidErrorser = Object.keys(billingValidationResult.errors)[0];
				if(inputidErrorser != undefined && inputidErrorser != '') 
				{
					var  el =  document.getElementById(inputidErrorser+"_billing");
					if(el){el.focus();}
				}
			}else if( ! shippingValidationResult.isValid)
			{
				var inputidErrorser = Object.keys(shippingValidationResult.errors)[0];
				if(inputidErrorser != undefined && inputidErrorser != '')
				{
					var  el = document.getElementById(inputidErrorser+"_shipping");
					if(el){el.focus();}
				}
			}else  if( ! ValidationResult.isValid)
			{
				var inputidErrorser = Object.keys(ValidationResult.errors)[0];
				if(inputidErrorser != undefined && inputidErrorser != '') 
				{
					var  el =   document.getElementsByName(inputidErrorser)[0];
					if(el){el.focus();}
				}
			}
}