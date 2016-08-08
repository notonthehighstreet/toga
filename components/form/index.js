import React from 'react';
import BEMHelper from 'react-bem-helper';

import Button from '../button';
import './styles.scss';

const bem = new BEMHelper({prefix: 'n-', name: 'form'});

export const Label = ({className, children, ...props}) => {
  const labelClasses = bem('label', null, className);
  return (
    <label { ...labelClasses } { ...props }>
      { children }
    </label>
  );
};

export const Field = ( { className, type, size, tref, ...props }) => {
  const fieldClass = 'field';
  const selectClasses = bem(fieldClass, 'select', className);
  const submitClasses = bem(fieldClass, 'submit', className);
  const inputClasses = bem(fieldClass, {'input': true, [size]: !!size}, className);
  props.ref = tref;

  switch (type) {
  case 'select':
    return <select  { ...selectClasses } { ...props } />;

  case 'submit':
    return <Button type="submit" size={ size } { ...submitClasses } { ...props } />;

  default:
    return <input type={ type } { ...inputClasses } { ...props } />;
  }
};

export default function Row({type, label, name, value, placeholder, className, size, inline, ...props}) {
  const rowClasses = bem('row', {[size]: size, inline}, className);
  return (
    <div { ...rowClasses }>
      <Label htmlFor={name}>{label}</Label>
      <Field { ...{
        type,
        size,
        name,
        placeholder,
        id: name,
        defaultValue: value,
        ...props
      }} />
    </div>
  );
}
