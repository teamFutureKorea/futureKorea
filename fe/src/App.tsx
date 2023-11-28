import { styled } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/Header";
function App() {
  return (
    <BrowserRouter>
      <Routes>
				{routes.map(route => {
					return (
						<Route key={route.path} path={route.path} element={<Wrap>
              <Header/>
              <route.component />
              </Wrap>} />
					)
				})}
      </Routes>
    </BrowserRouter>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
export default App;