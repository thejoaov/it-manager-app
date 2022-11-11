import AppContextProvider from '@contexts/appContext';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

export const navigationMock = (screenName = 'Root', params: any = {}) => ({
  reset: jest.fn(),
  canGoBack: jest.fn(),
  getId: jest.fn(),
  getState: jest.fn(),
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  removeListener: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  getParam: jest.fn(),
  getParent: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  isFocused: jest.fn(),
  state: {
    index: 0,
    routes: [
      {
        key: screenName,
        name: screenName,
        params,
      },
    ],
  },
});

export const routeMock = (screenName = 'Default', params: any = {}): any => ({
  route: {
    params,
  },
  key: '0',
  name: screenName,
  path: screenName,
});

export const renderWithWrapper = (component: React.ReactElement) => {
  return render(
    <AppContextProvider>
      <NavigationContainer>{component}</NavigationContainer>
    </AppContextProvider>
  );
};
