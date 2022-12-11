import 'react-native';
// import "@translations";
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { setUpTests } from 'react-native-reanimated/lib/reanimated2/jestUtils';

setUpTests();

jest.setTimeout(120000);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/Animated/animations/TimingAnimation');
