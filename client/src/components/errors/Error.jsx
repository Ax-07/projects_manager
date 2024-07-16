import PropTypes from 'prop-types';

export const Error = ({ message }) => <div>Error: {message}</div>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};