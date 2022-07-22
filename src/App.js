import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/homepage/Homepage';
import { Todo } from './pages/todo/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
