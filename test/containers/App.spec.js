import React from 'react';
import { shallow } from 'enzyme';

import { App } from 'containers/App';

const mockDispatch = jest.fn();

const props = {
  dispatch: mockDispatch,
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(
    <App {...ownProps} />,
    { attachTo: document.getElementById('react') }
  );
}

describe('App', () => {
  let wrapper;

  describe('basic functionality', () => {
    beforeAll(() => {
      wrapper = setup();
    });

    it('should be a Component', () => {
      expect(wrapper.instance() instanceof React.Component).toBe(true);
    });

    it('should render properly for anonymous users', () => {
      expect(wrapper.find('HelmetWrapper')).toBePresent();
      expect(wrapper.find('ConnectedRouter')).toBePresent();
      expect(wrapper.find('Switch')).toBePresent();
      expect(wrapper.find('Footer')).toBePresent();
      expect(wrapper.find('Connect(SystemNotifications)')).toBePresent();
    });

    it('should render properly for logged users', () => {
      wrapper.setProps({
        ...wrapper.props(),
        user: {
          isAuthenticated: true,
        },
      });

      expect(wrapper.find('Header')).toBePresent();
    });
  });

  describe('with TARGET', () => {
    beforeAll(() => {
      global.APP__TARGET = 'pages';
      wrapper = setup();
    });

    it('should change basename if APP__TARGET = pages', () => {
      expect(wrapper.find('ConnectedRouter').prop('basename')).toBe('/react-redux-saga-boilerplate');
    });
  });
});