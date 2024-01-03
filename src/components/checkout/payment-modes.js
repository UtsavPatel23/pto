import { isEmpty } from "lodash";
import Error from "./error";

const PaymentModes = ( { input, handleOnChange,paymentModes ,totalPriceDis} ) => {
	
	const { errors, paymentMethod } = input || {}
	
	return (
		<div className="mt-3">
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			{
				paymentModes.map(function (d) {
					if(d.method_key == 'afterpay' && (totalPriceDis < 10 || 2000 < totalPriceDis))
					{
						return (null);
					}
					if(d.method_key != 'bacs' && (totalPriceDis < 5 ))
					{
						return (null);
					}
					return (
						
						<div className="form-check woo-next-payment-input-container mt-2">
							<label className="form-check-label">
								<input onChange={handleOnChange} value={d.method_key} className="form-check-input mr-3" name="paymentMethod" type="radio" checked={d.method_key === paymentMethod} />
								<span className="woo-next-payment-content">{d.method_title}</span>
							</label>
						</div>
						
					)	
				})
			}
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
				Please send a check to Store Name, Store Street, Store Town, Store State / Country, Store Postcode.
			</div>
		</div>
	);
};

export default PaymentModes;
