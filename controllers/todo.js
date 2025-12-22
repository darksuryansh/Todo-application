import {Todo} from "../models/todo.js";


export const createTodo= async (req , res)=>{

    try {
        const {title,description}=req.body;

        if(!title || !description){
            res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        const todo = new Todo({
            title,
            description
        }); 

        todo.save();

        res.status(201).json({
            success:true,
            message:"Todo created successfully",
            todo
        });
        
    } catch (error) {
        console.log(error);

        
    }
}

export const getTodos= async (req,res)=>{
    try {
        const  todos = await Todo.find();

        res.status(200).json({
            success:true,
            todos
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}

export const updateTodo= async (req,res)=>{
    try {
        const todoId= req.params.todoId;
        const {title, description}= req.body ;

        const todo = await Todo.findByIdAndUpdate(todoId, { title, description }, { new:true});
        res.status(200).json({
            success:true,
            todo,
            message:"Todo updated successfully"
        });


        
    } catch (error) {
        console.log(error);
        
        
    }


}
export const deleteTodo= async (req,res)=>{
    try {
        const todoId= req.params.todoId;
      

        const todo = await Todo.findByIdAndDelete(todoId );
        res.status(200).json({
            success:true,
            todo,
            message:"Todo deleted successfully"
        });


        
    } catch (error) {
        console.log(error);
        
        
    }


}