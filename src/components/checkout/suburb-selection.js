
import PropTypes from 'prop-types';
import { memo } from 'react';
import cx from 'classnames';

import Abbr from "./form-elements/abbr";
import Error from './error';

const SuburbSelection = ({ handleOnChange, input, suburbs, isFetchingSuburb, isShipping }) => {

	const { city, errors } = input || {};

	const inputId = `city_${isShipping ? 'shipping' : 'billing'}`;

	if (isFetchingSuburb) {
		// Show loading component.
		return (
			<div>
				<label className="block text-base mb-1">
					Suburb
					<Abbr required />
				</label>
				<div className="relative w-full border-none">
					<select
						disabled
						value=""
						name="city"
						className="outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400 appearance-none"
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
			<label className="block text-base mb-1" htmlFor={inputId}>
				Suburb
				<Abbr required />
			</label>
			<div className="relative w-full border-none">
				<select
					disabled={isFetchingSuburb}
					onChange={handleOnChange}
					value={city}
					name="city"
					className={`outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400 appearance-none ${isFetchingSuburb ? 'opacity-50' : ''}`}
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
			<Error errors={errors} fieldName={'city'} />
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
