import axios from 'axios';
import { toast } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from './Navbar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [todos, setTodos] = useState([]);



  const addTodoHandler = async () => {
    try {


      if (editingId) {

        // Update existing todo
        const res = await axios.put(`http://localhost:3000/api/todo/${editingId}`,
          { title, description },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setTodos(todos.map(todo =>
            todo._id === editingId ? res.data.todo : todo
          ));
          setTitle("");
          setDescription("");
          setEditingId(null);
        }
      } else {
        // Create new todo
        const res = await axios.post("http://localhost:3000/api/todo/create",
          { title, description },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setTodos([...todos, res.data.todo]);
          setTitle("");
          setDescription("");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  const deleteTodoHandler = async (todoId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/todo/${todoId}`, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTodos(todos.filter(todo => todo._id !== todoId));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  const editTodoHandler = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo._id);
  }

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {

        const res = await axios.get("http://localhost:3000/alltodos"); // from redis cache
        // const res = await axios.get("http://localhost:3000/api/todo/todos");   

        if (res.data.success) {
          setTodos(res.data.todos);
        }


      }
      catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
      }

    }
    fetchTodos();


  }, []);



  return (

    <div className=' min-h-screen bg-black text-white p-5 animate-fadeIn'>
      <Navbar />
      <div className='flex items-center gap-5 mt-5'>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder={editingId ? 'Edit todo title...' : 'Add new todo ...'}
          className='w-1/4'
        />
        <Button onClick={addTodoHandler}>
          {editingId ? 'Update Todo' : 'Add Todo'}
        </Button>
        {editingId && (
          <Button onClick={cancelEdit} >
            Cancel
          </Button>
        )}
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={editingId ? 'Edit description...' : 'Add description...'}
        className='mt-5 w-1/2'
      />



      <div className='grid grid-cols-3 gap-3 mt-5'>

        {todos.map((todo) => (
          <Card key={todo._id} className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
            <CardContent className='pt-6'>
              <CardHeader className='p-0 pb-4'>
                <CardTitle>{todo.title}</CardTitle>
                <CardDescription className='text-gray-400'>
                  {todo.description}
                </CardDescription>
              </CardHeader>

              <div className='flex gap-2 mt-4 '>
                <Button
                  onClick={() => editTodoHandler(todo)}

                  size="sm"
                  className='flex-1'
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteTodoHandler(todo._id)}

                  size="sm"
                  className='flex-1'
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home