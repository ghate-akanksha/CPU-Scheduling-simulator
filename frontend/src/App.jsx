import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import LiveSimulation from "./pages/LiveSimulation";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/live-simulation"
          element={<LiveSimulation />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;