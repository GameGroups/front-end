import * as React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './hello-world';

configure({ adapter: new Adapter() });

describe('Header component', () => {
  let header;

  beforeEach(() => {
    header = mount(<Header />);
  });

  it('should not be null', () => {
    expect(header).not.toBeNull();
    expect(header.find('.header').length).toEqual(1);
  });
});