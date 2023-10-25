import Error from "../error";
import Abbr from "./abbr";

const TextArea = ({ handleOnChange, inputValue, name,  label, errors, placeholder, required, containerClassNames }) => {

	const inputId = name;
	return (
		<div className={containerClassNames}>
			<label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
				{ label || '' }
				<Abbr required={required}/>
			</label>
			<textarea
				onChange={ handleOnChange }
				placeholder={placeholder}
				name={name}
				className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
				id={inputId}
				rows="2"
			>
				{inputValue}
			</textarea>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	)
}



export default TextArea;
