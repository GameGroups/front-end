import * as React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../views/home/home';
import App from './app';

configure({ adapter: new Adapter() });

describe('Root App component', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  it('should not be null', () => {
    expect(app).not.toBeNull();
  });

  it('should have a Home Component', () => {
    expect(app.find(Home).length).toEqual(1);
  });
});