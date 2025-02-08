import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ArticleListing from "./pages/Listing";
import ArticleDetail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        {/* <Route path="/articles/:articleId/edit" element={<EditArticle />} /> */}
        <Route path="*" element={<Navigate replace to="/articles" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
