import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./components/Route/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
				{routes.map(route => {
					return (
						<Route key={route.path} path={route.path} element={<PrivateRoute isLogin={route.isLogin} component={route.component}></PrivateRoute>} />
					)
				})}
      </Routes>
    </BrowserRouter>
  );
}

export default App;