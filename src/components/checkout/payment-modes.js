import { isEmpty } from "lodash";
import Error from "./error";

const PaymentModes = ( { input, handleOnChange,paymentModes } ) => {
	
	const { errors, paymentMethod } = input || {}
	
	return (
		<div className="mt-3">
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			{
				/*paymentModes.map(function (d) {
					return (
						
						<div className="form-check woo-next-payment-input-container mt-2">
							<label className="form-check-label">
								<input onChange={handleOnChange} value={d.id} className="form-check-input mr-3" name="paymentMethod" type="radio" checked={d.id === paymentMethod} />
								<span className="woo-next-payment-content">{d.method_title}</span>
							</label>
						</div>
						
					)	
				})*/
			}

			<div className="form-checkwoo-next-payment-input-containermt-2">
				 
			<label className="form-check-label"> <input onChange={handleOnChange} value="stripe" className="form-check-inputmr-3" name="paymentMethod" type="radio" checked={'stripe'===paymentMethod}/><span className="woo-next-payment-content">Stripe</span></label></div>
			
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
				Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
			</div>
		</div>
	);
};

export default PaymentModes;
