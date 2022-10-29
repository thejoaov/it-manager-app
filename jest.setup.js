/* eslint-disable @typescript-eslint/no-var-requires */
import "react-native";
// import "@translations";
// import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { setUpTests } from "react-native-reanimated/lib/reanimated2/jestUtils";

setUpTests();

jest.setTimeout(120000);

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native-paper", () => {
  const RealModule = jest.requireActual("react-native-paper");
  // const TouchableHighlight = require("react-native/Libraries/Components/Touchable/TouchableHighlight");
  // const TextInput = require("react-native/Libraries/Components/TextInput/TextInput");

  return {
    ...RealModule,
    // Button: TouchableHighlight,
    // TextInput,
  };
});
