import GithubProvider from "./contexts/GithubContext";
import GithubPage from "./pages/GithubPage";

function App() {
  return (
    <>
      <GithubProvider>
        <GithubPage />
      </GithubProvider>
    </>
  );
}

export default App;
