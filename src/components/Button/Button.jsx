import React from 'react';
import PropTypes from 'prop-types';
import css from '../Button/Button.module.css';

const Button = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={css.Button} type="button" onClick={handleClick}>
      <span className="button-label">Load more</span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
