import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, NotButton, Input, LabelInput, CloseEyeIcon, OpenEyeIcon } from './Elements';

function PasswordInput({ label, name, id, value = '', onChange, checkRegex }) {
  const [password, setPassword] = useState(value);
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    setPassword(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <InputGroup>
      <div>
        <Input
          required
          name={name}
          id={id}
          isWithButton
          value={password}
          type={visible ? 'text' : 'password'}
          onChange={handleClick}
          checkRegex={checkRegex}
        ></Input>
        <LabelInput htmlFor={id}>{label}</LabelInput>
        <NotButton onClick={() => setVisible(!visible)}>{visible ? <OpenEyeIcon /> : <CloseEyeIcon />}</NotButton>
      </div>
    </InputGroup>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checkRegex: PropTypes.bool,
};
export default PasswordInput;
