import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Navbar from './components/Navbar'

import { v4 as uuidv4 } from 'uuid';






function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveTool = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleshowfinished = (e) => {
    setShowfinished(!showfinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTool()
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTool()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
    saveTool()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTool()
  }


  return (
    <>
      <Navbar />

      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>Itask - manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3.5">
          <h2 className='text-lg font-bold '>Add a Todo</h2>
          <input  onChange={handleChange} value={todo} type="text" className="border w-full  border-white-500 p-2 text-sm rounded-full" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-800 hover:bg-violet-950 text-sm font-bold disabled:bg-violet-500 text-white p-2 rounded-md ">Save</button>
        </div>
        <input type="checkbox" checked={showfinished} onChange={toggleshowfinished} /> Show Finished Todos
        <h2 className='text-lg my-3 font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='text-center my-5'>No Todos Added</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-2 justify-between">
              <div className='flex'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold text-white p-2 rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold text-white p-2 rounded-md mx-1'><RiDeleteBin7Fill /></button>
              </div>
            </div>
          })}
        </div>

      </div>

    </>
  )
}



export default App
