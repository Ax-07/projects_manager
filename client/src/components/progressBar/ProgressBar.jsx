import PropTypes from 'prop-types';

export const ProgressBar = ({ progress }) => {
    return (
        <div className='progress'>
        <div className='progress__bar'>
          <div className='progress__bar__fill' style={{ width: `${'50'}%` }}></div>
        <div className='progress__percentage'>{progress}%</div>
        </div>
      </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number,
};