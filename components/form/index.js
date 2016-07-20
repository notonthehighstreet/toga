import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import Button from '../button';
import './styles.scss';

const formBem = new BEMHelper({  prefix: 'n-', name: 'form' });

export const Label = ({ className, children, ...props }) => {
  const labelClasses = classNames(formBem('label').className, className);
  return (
    <label className={ labelClasses } { ...props }>
      { children }
    </label>
  );
};

export const Field = ({ className, options, type, size, ...props }) => {
  const fieldClass = 'field';
  const selectClasses = classNames(formBem(fieldClass, 'select').className, className);
  const submitClasses = classNames(formBem(fieldClass, 'submit').className, className);
  const inputClasses = classNames(formBem(fieldClass, 'input', size ).className, className);

  switch  (type) {
  case 'select':
    return (
        <select  className={ selectClasses }  { ...props } >
          { options.map((option, i) => (
            <option value={ option.value || option } key={ i }>
              { option.label || option }
            </option>
          ))
          }
        </select>
      );

  case 'submit':
    return <Button type="submit" size={ size }  className={ submitClasses } { ...props } />;

  default:
    return <input type={ type } className={ inputClasses } { ...props } />;
  }
};

export default function Row({ type, label, name, value, options, placeholder, className, size, inline, ...props }) {
  const rowClass = classNames(formBem('row', { [size]: size, inline }).className, className);
  return (
    <div className={ rowClass }>
      <Label htmlFor={name} >{label}</Label>
      <Field { ...{ options, type, size, name, placeholder, id: name, defaultValue: value, ...props }} />
    </div>
  );
}

