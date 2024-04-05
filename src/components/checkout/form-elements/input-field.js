import Error from "../error";
import PropTypes from 'prop-types';
import Abbr from "./abbr";

const InputField = ({ handleOnChange, inputValue, name, type, label, errors, placeholder, required, containerClassNames, isShipping, readonly = false }) => {

	const inputId = `${name}_${isShipping ? 'shipping' : 'billing'}`;

	return (
		<div className={containerClassNames}>
			<label className="block text-base mb-1" htmlFor={inputId}>
				{label || ''}
				<Abbr required={required} />
			</label>
			<input
				onChange={handleOnChange}
				value={inputValue}
				placeholder={placeholder}
				type={type}
				name={name}
				className="outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400"
				id={inputId}
				readonly={readonly}
			/>
			<Error errors={errors} fieldName={name} />
		</div>
	)
}

InputField.propTypes = {
	handleOnChange: PropTypes.func,
	inputValue: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string
}

InputField.defaultProps = {
	handleOnChange: () => null,
	inputValue: '',
	name: '',
	type: 'text',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: ''
}

export default InputField;
