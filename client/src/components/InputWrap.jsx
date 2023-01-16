import styled from 'styled-components';

const InputEdit = styled.input`
  &[type='text'],
  &[type='number'],
  &[type='password'] {
    border-radius: 8px;
    padding: 12px 16px;
    width: 100%;
  }
`;

const InputWrap = ({ type, value, name, placeholder, ...rest }) => {
  if (name === 'team') {
    value = value.replaceAll(/[^0-9]/g, '').substring(0, 2);
    if (value < 1 || value > 25) {
      value = '';
    }
  }
  return (
    <InputEdit
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      maxLength={rest.length}
      {...rest}
    />
  );
};

export default InputWrap;
