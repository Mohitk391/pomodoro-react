import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/homepage/Homepage';
import { Taskpage } from './pages/taskpage/Taskpage';
import { Todo } from './pages/todo/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/task/:id" element={<Taskpage />} />
      </Routes>
    </div>
  );
}

export default App;
