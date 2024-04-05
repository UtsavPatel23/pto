import PropTypes from 'prop-types';

const Abbr = ({ required }) => {
	if (!required) {
		return null;
	}

	return <span className="text-red-600" title="required">*</span>
}

Abbr.propTypes = {
	required: PropTypes.bool
}

Abbr.defaultProps = {
	required: false
}

export default Abbr
