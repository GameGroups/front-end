import * as React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HelloWorld from './hello-world';

configure({ adapter: new Adapter() });

describe('Header component', () => {
  let hello;

  beforeEach(() => {
    hello = mount(<HelloWorld />);
  });

  it('should not be null', () => {
    expect(hello).not.toBeNull();
    expect(hello.find('.hello-world').length).toEqual(1);
  });
});