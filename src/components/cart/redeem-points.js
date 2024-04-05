import { useState } from "react";
import { get_points } from "../../utils/customjs/custome";


const RedeemPoints = ({ customerData, setCoutData, totalPrice, coutData, redeem_your_pointsText, setRedeem_your_pointsText, messageRyp, setMessageRyp }) => {



	var rewardPoints = get_points(customerData);

	if (rewardPoints < 1) {
		return '';
	}
	const applyRedeemYourPoints = async () => {
		let response = {
			success: false,
			error: '',
		};
		if (redeem_your_pointsText == '') {
			response.error = "Please enter ponints";
			setMessageRyp(response);
			return;
		}
		if (rewardPoints < 100) {
			response.error = "You must have at least 100 points in your to apply rewards";
			setMessageRyp(response);
			return;
		}
		var redeemPrice = parseInt(redeem_your_pointsText) / 100;
		if (parseInt(redeem_your_pointsText) > rewardPoints || parseInt(redeem_your_pointsText) < 1) {
			response.error = "Please enter valid point.";
			setMessageRyp(response);
			return;
		}
		if (redeemPrice > (totalPrice)) {
			response.error = "You can`t Redeem more Points than order subtotal, Please enter Right Value.";
			setMessageRyp(response);
			return;
		}
		response.error = "";
		response.success = true;
		setMessageRyp(response);
		setCoutData({
			...coutData,
			"redeemPrice": redeemPrice
		}
		);
		console.log('redeem_your_pointsText', redeem_your_pointsText);
		console.log('redeemPrice', redeemPrice);
		return;
	}
	const handleRedeemYourPoints = async (e) => {
		if (e.target.value != '') {
			setRedeem_your_pointsText(parseInt(e.target.value));
		} else {
			setRedeem_your_pointsText(e.target.value);
		}
	}
	if (typeof window !== "undefined") {
		const input_redeem_your_points = document.getElementById('redeem_your_points');
		if (input_redeem_your_points) {
			document.getElementById('redeem_your_points').addEventListener('keydown', function (event) {
				// Allow numeric keys, backspace, and arrow keys
				if ((event.keyCode >= 48 && event.keyCode <= 57) || // 0-9
					(event.keyCode >= 96 && event.keyCode <= 105) || // Numeric keypad
					event.keyCode === 8 || // Backspace
					(event.keyCode >= 37 && event.keyCode <= 40) // Arrow keys
				) {
					// Allow the keypress
				} else {
					// Prevent the keypress
					event.preventDefault();
				}
			});
		}
	}
	return (
		<>
			<div key="redeem_your_points">
				<h5 htmlFor="redeem_your_points" className="font-semibold text-xl mb-3">Redeem Your Points ({rewardPoints})</h5>
				<input type='number' name="redeem_your_points" id="redeem_your_points" onChange={handleRedeemYourPoints} value={redeem_your_pointsText} className="w-full outline-none p-2 text-sm border border-gray-300  focus:border-victoria-400"></input>
				<div className='block mt-3'>
					<span className='text-red-600'>{messageRyp.error}</span>
					{messageRyp.success ?
						<>
							<span className='text-green-600'> Applied</span>
						</>
						: null
					}
				</div>
				<button
					onClick={applyRedeemYourPoints}
					className="inline-block w-52 p-2 text-white bg-victoria-700 duration-500 font-medium text-center hover:bg-white border hover:text-victoria-700 border-victoria-700"
				>Submit</button>
			</div>
		</>
	);
};

export default RedeemPoints;
