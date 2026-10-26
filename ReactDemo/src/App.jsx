import { useState } from 'react'

function App() {
  const [todo, setTodo] = useState("") // String
  const [todoList, setTodoList] = useState([])

  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")

  const handleInputTyping = (e) => {
    // console.log(e)
    setTodo(e.target.value)
  }

  const handleButtonClick = () => {
    if (todo == "") {
      alert("Enter todo title!")
    } else {
      //Create copy of current list
      const oldList = [...todoList]
      oldList.push({
        id: Date.now(),
        title: todo,
        isCompleted: false
      }) 
      setTodoList(oldList)
      setTodo("") 
    }
  }

  const handleDoneClick = (itemId) => {
    // console.log(itemId);
    const newList = todoList.map((todoItem) => {
      let item = {...todoItem}
      if(todoItem.id == itemId){
        item.isCompleted = true
      }
      return item;
    })
    setTodoList(newList)
  }

  const handleDelete = (itemId) => {
    setTodoList(todoList.filter((item) => item.id != itemId))


    if (editId === itemId) {
      setEditId(null)
      setEditTitle("")
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setEditTitle(item.title)
  }


  const handleSave = () => {
    if (editTitle.trim() === "") {
      alert("Enter todo title!")
      return
    }

    const newList = todoList.map((item) => {
      if (item.id === editId) {
        return {
          ...item,
          title: editTitle.trim()
        }
      }
      return item
    })

    setTodoList(newList)
    setEditId(null)
    setEditTitle("")
  }

  
  const handleCancel = () => {
    setEditId(null)
    setEditTitle("")
  }

  return (
    <>
      <input
        type='text'
        value={todo}
        onChange={handleInputTyping}
      />

      <button
        style={{ marginLeft: 10 }}
        onClick={handleButtonClick}
      >
        Add todo
      </button>

      {/* <div> Current Todo: {todo} </div> */}
      {/* <div>All todos : {JSON.stringify(todoList)}</div> */}

      <br />
      <br />

      <table border={1}>
        <tbody>
          <tr>
            <th>Sl. No.</th>
            <th>Title</th>
            <th>Is Completed?</th>
            <th>Action</th>
          </tr>

          {todoList.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>
                  {editId === item.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    item.title
                  )}
                </td>

                <td>
                  {item.isCompleted ? "Yes" : "No"}
                </td>

                <td>
                  {editId === item.id ? (
                    <>
                      <button onClick={handleSave}>
                        Save
                      </button>

                      <button
                        onClick={handleCancel}
                        style={{ marginLeft: 5 }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {!item.isCompleted && (
                        <>
                          <button
                            onClick={() => handleDoneClick(item.id)}
                          >
                            Done
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            style={{ marginLeft: 5 }}
                          >
                            Edit
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ marginLeft: 5 }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App