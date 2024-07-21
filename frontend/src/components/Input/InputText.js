import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Input, LabelInput } from './Elements';

function InputText({ label, name, id, value = '', onChange, checkRegex }) {
  const [email, setEmail] = useState(value);

  const handleChange = (e) => {
    setEmail(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <InputGroup>
      <Input
        required
        name={name}
        value={email}
        id={id}
        type="text"
        onChange={handleChange}
        checkRegex={checkRegex}
      ></Input>
      <LabelInput htmlFor={id}>{label}</LabelInput>
    </InputGroup>
  );
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checkRegex: PropTypes.bool,
};
export default InputText;
