
import PropTypes from 'prop-types';
import { memo } from 'react';
import cx from 'classnames';

import Abbr from "./form-elements/abbr";
import Error from './error';

const StateSelection = ({ handleOnChange, input, states, isFetchingStates, isShipping }) => {

	const { state, errors } = input || {};

	const inputId = `state_${isShipping ? 'shipping' : 'billing'}`;

	if (isFetchingStates) {
		// Show loading component.
		return (
			<div>
				<label className="block text-base mb-1">
					State/Country
					<Abbr required />
				</label>
				<div className="relative w-full border-none">
					<select
						disabled
						value=""
						name="state"
						className="outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400 appearance-none"
					>
						<option value="">Loading...</option>
					</select>
				</div>
			</div>
		)
	}
	//console.log('states',states);
	//console.log('state',state);
	if (!states.length) {
		return null;
	}

	return (
		<div>
			<label className="block text-base mb-1" htmlFor={inputId}>
				State
				<Abbr required />
			</label>
			<div className="relative w-full border-none">
				<select
					disabled={isFetchingStates}
					onChange={handleOnChange}
					value={state}
					name="state"
					className={`outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400 appearance-none ${isFetchingStates ? 'opacity-50' : ''}`}
					id={inputId}
				>
					<option value="">Select a state...</option>
					{states.map((state, index) => (
						<option key={state?.stateCode ?? index} value={state?.stateCode ?? ''}>
							{state?.stateName}
						</option>
					))}
				</select>
			</div>
			<Error errors={errors} fieldName={'state'} />
		</div>
	)
}

StateSelection.propTypes = {
	handleOnChange: PropTypes.func,
	input: PropTypes.object,
	states: PropTypes.array,
	isFetchingStates: PropTypes.bool,
	isShipping: PropTypes.bool
}

StateSelection.defaultProps = {
	handleOnChange: () => null,
	input: {},
	states: [],
	isFetchingStates: false,
	isShipping: true
}

export default memo(StateSelection);
