import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShowBooks from "./Pages/ShowBooks";
import EditBooks from "./Pages/EditBooks";
import CreateBooks from "./Pages/CreateBooks";
import DeleteBooks from "./Pages/DeleteBooks";
const App = () => {
  return (
    <div className="bg-slate-500 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/details/:id" element={<ShowBooks />} />
          <Route path="/books/edit/:id" element={<EditBooks />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/delete/:id" element={<DeleteBooks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
