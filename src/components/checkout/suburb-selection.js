
import PropTypes from 'prop-types';
import {memo} from 'react';
import cx from 'classnames';

import Abbr from "./form-elements/abbr";
import Error from './error';

const SuburbSelection = ({handleOnChange, input, suburbs, isFetchingSuburb, isShipping}) => {
	
	const {city, errors} = input || {};
	
	const inputId = `city_${isShipping ? 'shipping' : 'billing'}`;
	
	if (isFetchingSuburb) {
		// Show loading component.
		return (
			<div className="mb-3">
				<label className="leading-7 text-sm text-gray-700">
					suburb
					<Abbr required/>
				</label>
				<div className="relative w-full border-none">
					<select
						disabled
						value=""
						name="city"
						className="opacity-50 bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
					>
						<option value="">Loading...</option>
					</select>
				</div>
			</div>
		)
	}
	//console.log('suburbs',suburbs);
	//console.log('suburb',city);
	if (!suburbs.length) {
		return null;
	}
	
	return (
		<div className="mb-3">
			<label className="leading-7 text-sm text-gray-600" htmlFor={inputId}>
				suburb
				<Abbr required/>
			</label>
			<div className="relative w-full border-none">
				<select
					disabled={isFetchingSuburb}
					onChange={handleOnChange}
					value={city}
					name="city"
					className={cx(
						'bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full',
						{'opacity-50': isFetchingSuburb}
					)}
					id={inputId}
				>
					<option value="">Select a suburb...</option>
					{suburbs.map((suburb, index) => (
						<option key={suburb?.location ?? index} value={suburb?.location ?? ''} data-state={suburb?.state ?? ''}>
							{suburb?.location}
						</option>
					))}
				</select>
			</div>
			<Error errors={errors} fieldName={'city'}/>
		</div>
	)
}

SuburbSelection.propTypes = {
	handleOnChange: PropTypes.func,
	input: PropTypes.object,
	suburbs: PropTypes.array,
	isFetchingSuburb: PropTypes.bool,
	isShipping: PropTypes.bool
}

SuburbSelection.defaultProps = {
	handleOnChange: () => null,
	input: {},
	suburbs: [],
	isFetchingSuburb: false,
	isShipping: true
}

export default memo(SuburbSelection);
