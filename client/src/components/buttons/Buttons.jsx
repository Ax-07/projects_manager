import PropTypes from 'prop-types';

export const ButtonPrimary = ({title, action}) => {
    return (
        <button className="button button__primary" onClick={action}>
            {title}
        </button>
    );
}

ButtonPrimary.propTypes = {
    title: PropTypes.string,
    action: PropTypes.func
}

export const ButtonSecondary = ({title, action}) => {
    return (
        <button className="button button__secondary" onClick={action}>
            {title}
        </button>
    );
}

ButtonSecondary.propTypes = {
    title: PropTypes.string,
    action: PropTypes.func
}