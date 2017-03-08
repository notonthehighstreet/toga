import React from 'react';

import './data.scss';

const Item = ({ value }) => {
  const values = [].concat(value);
  return (
    <div >{
      values
        .map((val, i) => {
          return (
            <span key={`${i}-${val}`}
                  className={`data-value data-value--${i}`}
              >
              {val}
            </span>);
        })
    }</div>
  );
};

const Data = ({ data }) => (
  <dl className={'data-list'}>
    {Object.keys(data).map((info, i) => (
      <span className={`data-list__item data-list__item--${i}`} key={info}>
        <dt className="data-list__title">{info}</dt>
        <dd className="data-list__value"><Item value={ data[info] }/></dd>
      </span>
    ))}
  </dl>
);

export default ({ data, ...props }) => (
    <section className={'answer'} { ...props }>
      <Data data={data}/>
    </section>
);
