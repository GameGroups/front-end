import * as React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './home';

configure({ adapter: new Adapter() });

describe('Home View component', () => {
  let home;

  beforeEach(() => {
    home = mount(<Home />);
  });

  it('should not be null', () => {
    expect(home).not.toBeNull();
  });
});