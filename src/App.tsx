import { Route, Routes } from "react-router-dom";
import GithubProvider from "./contexts/GithubContext";
import GithubNoContextPage from "./pages/GithubNoContextPage";
import GithubPage from "./pages/GithubPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/nocontext" element={<GithubNoContextPage />} />
        <Route
          path="/"
          element={
            <GithubProvider>
              <GithubPage />
            </GithubProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
