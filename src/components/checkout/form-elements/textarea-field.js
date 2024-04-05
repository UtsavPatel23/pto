import Error from "../error";
import Abbr from "./abbr";

const TextArea = ({ handleOnChange, inputValue, name, label, errors, placeholder, required, containerClassNames }) => {

	const inputId = name;
	return (
		<div className={containerClassNames}>
			<label className="block text-base mb-1" htmlFor={inputId}>
				{label || ''}
				<Abbr required={required} />
			</label>
			<textarea
				onChange={handleOnChange}
				placeholder={placeholder}
				name={name}
				className="outline-none block w-full py-2 px-3 text-base border border-gray-300 focus:border-victoria-400"
				id={inputId}
				rows="2"
			>
				{inputValue}
			</textarea>
			<Error errors={errors} fieldName={name} />
		</div>
	)
}



export default TextArea;
