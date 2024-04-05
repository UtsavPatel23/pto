import Error from './error';
import { isEmpty, map } from "lodash";
import Abbr from "./form-elements/abbr";
import ArrowDown from "../icons/ArrowDown";

const CountrySelection = ({ input, handleOnChange, countries, isShipping }) => {

	const { country, errors } = input || {};

	const inputId = `country_${isShipping ? 'shipping' : 'billing'}`;

	return (
		<div>
			<label className="block text-base mb-1" htmlFor={inputId}>
				Country
				<Abbr required />
			</label>
			<div className="relative w-full">
				<select
					onChange={handleOnChange}
					value={country}
					name="country"
					className="outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400 appearance-none"
					id={inputId}
				>
					<option value="">Select a country...</option>
					{!isEmpty(countries) &&
						map(countries, (country) => (
							<option key={country?.countryCode} data-countrycode={country?.countryCode}
								value={country?.countryCode}>
								{country?.countryName}
							</option>
						))}
				</select>
				<span className="absolute right-0 mr-1 text-gray-500" style={{ top: '25%' }}>
					<ArrowDown width={24} height={24} className="fill-current" />
				</span>
			</div>
			<Error errors={errors} fieldName={'country'} />
		</div>
	);
}

export default CountrySelection;
