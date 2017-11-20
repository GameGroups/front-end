import * as React from 'react';
import PropTypes from 'prop-types';
import HelloWorld from '../../components/hello-world/hello-world.jsx';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <HelloWorld />
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.element
};

export default Home;