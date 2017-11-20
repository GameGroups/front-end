import * as React from 'react';
import Home from '../../views/home/home';
import './app.scss';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container-fluid'>
        <Home />
      </div>
    );
  }
}