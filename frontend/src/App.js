import { Provider } from "react-redux";
import store from "./store";
import MainApp from "./container/main-app";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
