import React from 'react';

import './data.scss';

const Item = ({ value }) => {
  const values = [].concat(value);
  const props = { className: 'card-item-value' };
  return (
    <div >{
      values
        .map((val, i) => {
          props.key = `${i}-${val}`;
          return val.indexOf('http://swapi.co/api/') === 0
            ? <a href={val} target="_blank" { ...props }>{val.replace('http://swapi.co/api/', '')}</a>
            : <span { ...props }>{val}</span>;
        })
    }</div>
  );
};

const Data = ({ data }) => (
  <dl className={'answer-option'}>
    {Object.keys(data).map((info) => (
      <span className="answer-option__item" key={info}>
        <dt className="answer-option__title">{info}</dt>
        <dd className="answer-option__value"><Item value={ data[info] }/></dd>
      </span>
    ))}
  </dl>
);

export default ({ data, ...props }) => (
    <section className={'answer'} { ...props }>
      <Data data={data}/>
    </section>
);
