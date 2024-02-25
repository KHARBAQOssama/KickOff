import { Stack } from "expo-router";
import Navigation from "../components/Navigation";
import { Provider } from "react-redux";
import { store } from "../src/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <Stack />
      <Navigation/>
    </Provider>
  );
};
export default Layout;
