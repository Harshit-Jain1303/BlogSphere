import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './assets/styles/foundation.css';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/NavBar";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import AuthorProfile from './pages/AuthorProfile';
import EditProfile from './pages/EditProfile';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author/:id" element={<AuthorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
