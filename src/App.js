import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import PostViewPage from './Components/PostViewPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/instaPost' element={<PostViewPage/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
