import './App.css'
import logo from './assets/rsz_logo.png'
import TodoBoard from './components/todoBoard/todoBoard'

const data = [
  { title: 'To Do', tasks: ['Learn English', 'Go To Grocery', 'Call My Friend'] },
  { title: 'In Progress', tasks: ['Do Some Homework',] },
  { title: 'Compeleted', tasks: ['Feed The Dog', 'Exercise'] }
]

function App () {
  return (
    <div className='App'>
      <header>
        <img className='logo' alt='logo' src={logo} />
        <h3 className='header-title'>To Do List</h3>
      </header>
      <div className='todo-wrap'>
        <TodoBoard data={data} />
      </div>
    </div>
  )
}

export default App
