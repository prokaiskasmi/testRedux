// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo } from "./redux/todoSlice";
import  ToDo  from "./components/ToDo";
import  InProgress  from "./components/InProgress";
import  Done  from "./components/Done";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend"


function App() {
  //React Hooks
  const [todoDescription, setTodoDescription] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [isMaxChar,setIsMaxChar]= useState(false);

  
  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  
  

  //Rendering
  return (
    <Container maxWidth="xl">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Kanban Test
      </Typography>
      <TextField
        variant="outlined"
        label="Title of the tasks"
        fullWidth
        onChange={(e) => setTodoTitle(e.target.value)}
        value={todoTitle}
        style={{ padding:"10px" }}
       />
      <TextField
        variant="outlined"
        label="Write something here"
        fullWidth
        onChange={(e) => {setTodoDescription(e.target.value)}}
        value={todoDescription}
        style={{ padding:"10px" }}
        inputProps={{ maxLength: 200 }}
        helperText={`${todoDescription.length}/200`}

       />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          dispatch(addTodo(todoDescription,todoTitle));
          setTodoDescription("");
        }}
        disabled={!todoDescription || !todoTitle}
        style={{ padding:"10px" }}
      >
        Add Item
      </Button>
      <DndProvider backend={HTML5Backend}>
      <ToDo />
      <InProgress />
      <Done />
      </DndProvider>
      </Container>
  );
}

export default App;
