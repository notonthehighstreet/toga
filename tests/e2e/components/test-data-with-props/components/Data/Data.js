import React from 'react';
import './data.scss';

const Data = ( { list } ) => {
  return (
    <ul className={'data-list'}>{
      list.map((val, i) => {
        return (
          <li key={`${i}-${val}`}
              className={`data-value data-value--${i}`}>{val}</li>);
      })
    }</ul>
  );
};

export default class App extends React.Component {

  render() {
    const { name, list } = this.props;

    return (<section className={'answer'} { ...this.props }>
      <h2 className="name">{name}</h2>
      <Data list={list}/>
    </section>);
  }
}
