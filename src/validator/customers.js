;
import validator from 'validator';
import isEmpty from './is-empty';


const validateAndSanitizeCheckoutFormCustomers = ( data) => {
	
	let errors = {};
	let sanitizedData = {};
	
	/**
	 * Set the firstName value equal to an empty string if user has not entered the firstName, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for for the rest of the fields
	 */
	data.firstName = ( ! isEmpty( data.firstName ) ) ? data.firstName : '';
	data.lastName = ( ! isEmpty( data.lastName ) ) ? data.lastName : '';
	data.email = ( ! isEmpty( data.email ) ) ? data.email : '';
	data.oldpassword = ( ! isEmpty( data.oldpassword ) ) ? data.oldpassword : '';
	data.password = ( ! isEmpty( data.password ) ) ? data.password : '';
	data.confirmPassword = ( ! isEmpty( data.confirmPassword ) ) ? data.confirmPassword : '';
	
	/**
	 * Checks for error if required is true
	 * and adds Error and Sanitized data to the errors and sanitizedData object
	 *
	 * @param {String} fieldName Field name e.g. First name, last name
	 * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
	 * @param {Integer} min Minimum characters required
	 * @param {Integer} max Maximum characters required
	 * @param {String} type Type e.g. email, phone etc.
	 * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
	 */
	const addErrorAndSanitizedData = ( fieldName, errorContent, min, max, type = '', required ) => {
		
		/**
		 * Please note that this isEmpty() belongs to validator and not our custom function defined above.
		 *
		 * Check for error and if there is no error then sanitize data.
		 */
		if ( ! validator.isLength( data[ fieldName ], { min, max } ) ){
			errors[ fieldName ] = `${errorContent} must be ${min} to ${max} characters`;
		}
		
		if ( 'email' === type && ! validator.isEmail( data[ fieldName ] ) ){
			errors[ fieldName ] = `${errorContent} is not valid`;
		}
		
		if ( 'phone' === type && ! validator.isMobilePhone( data[ fieldName ] ) ) {
			errors[ fieldName ] = `${errorContent} is not valid`;
		}

		if ( 'confirmPassword' === type && (data['confirmPassword'] != data['password'] )  ) {
			errors['confirmPassword'] = `${errorContent} is must match`;
		}

		if ( 'oldpassword' === type) {
			if(localStorage.getItem('u8po1d')) {
				if(localStorage.getItem('u8po1d') != (btoa(data['oldpassword'])))
				{
					errors['oldpassword'] = `${errorContent} is incorrect `;
				}
			}else{
				errors['oldpassword'] = `${errorContent} is incorrect `;
			}
		}
		
		if ( required && validator.isEmpty( data[ fieldName ] ) ) {
			errors[ fieldName ] = `${errorContent} is required`;
		}
		
		// If no errors
		if ( ! errors[ fieldName ] ) {
			sanitizedData[ fieldName ] = validator.trim( data[ fieldName ] );
			sanitizedData[ fieldName ] = ( 'email' === type ) ? validator.normalizeEmail( sanitizedData[ fieldName ] ) : sanitizedData[ fieldName ];
			sanitizedData[ fieldName ] = validator.escape( sanitizedData[ fieldName ] );
		}
		
	};
	
	addErrorAndSanitizedData( 'firstName', 'First name', 2, 35, 'string', true );
	addErrorAndSanitizedData( 'lastName', 'Last name', 2, 35, 'string', true );
	addErrorAndSanitizedData( 'email', 'Email', 11, 254, 'email', true );
	
	if(data.oldpassword != '' || data.password != '' || data.confirmPassword != '')
	{
		if(localStorage.getItem('token') != 'loginphone')
		{
			addErrorAndSanitizedData( 'oldpassword', 'Old Password', 6, 60, 'oldpassword', true );
		}
		addErrorAndSanitizedData( 'password', 'Password', 6, 60, 'string', true );
		addErrorAndSanitizedData( 'confirmPassword', 'Confirm Password', 6, 60, 'confirmPassword', true );
	}
	
	return {
		sanitizedData,
		errors,
		isValid: isEmpty( errors )
	}
};

export default validateAndSanitizeCheckoutFormCustomers;
