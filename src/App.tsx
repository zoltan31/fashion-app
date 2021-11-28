import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClothPage from "./views/cloth";
import SeasonPage from "./views/season";
import UploadPage from "./views/upload";
import WardrobePage from "./views/wardrobe";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/wardrobe/:id">
          <ClothPage />
        </Route>
        <Route path="/wardrobe">
          <WardrobePage />
        </Route>
        <Route path="/upload">
          <UploadPage />
        </Route>
        <Route path="/">
          <SeasonPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
