import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const formBem = new BEMHelper({  prefix: 'n-', name: 'form' });
const buttonBem = new BEMHelper({  prefix: 'n-', name: 'button' });
const fieldClass = 'field';
const selectClasses = formBem(fieldClass, 'select');
const submitClasses = formBem(fieldClass, 'submit');

const Label = ({ children, ...props }) => {
  const labelClasses = formBem('label');
  return (
    <label { ...labelClasses } { ...props }>
      { children }
    </label>
  );
};

const render = ({ options, type, size, ...props }) => {
  const modifiers = ['primary'];
  if (size) {
    modifiers.pursh(size);
  }
  const buttonClasses = buttonBem(null, modifiers).className;
  const inputClasses = formBem(fieldClass, 'input', size );

  switch  (type) {
  case 'select':
    return (
        <select { ...selectClasses } { ...props } >
          { options.map((option, i) => (
            <option value={ option.value || option } key={ i }>
              { option.label || option }
            </option>
          ))
          }
        </select>
      );

  case 'submit':
    return (
        <input className={ classNames(buttonClasses, submitClasses.className) } type="submit" { ...props } />
      );

  default:
    return (
        <input { ...inputClasses } type={ type } { ...props } />
      );
  }
};

const Field = ({ type, label, name, value, options, placeholder, className, size, inline, ...props }) => {
  const rowClass = classNames(formBem('row', { [size]: size, inline }).className, className);
  return (
    <div className={ rowClass }>
      <Label htmlFor={name} >{label}</Label>
      { 
        render({ options, type, size, name, placeholder, id: name, defaultValue: value, ...props }) 
      }
    </div>
  );
};

module.exports = Field;
