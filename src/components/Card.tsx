// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDrag } from "react-dnd";
import { removeTodo } from "../redux/todoSlice";
import Edit from "../components/Edit"

function Card(todo: { id: string; description: string; title: string; status: string ;}) {

    //React Redux Hooks
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    const [isVisible,setVisible] = useState(false);



    const [{ isDragging }, drag] = useDrag(() => ({
        type: "todo",
        item: { id: todo.id, status: todo.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));


    //Rendering
    return (
        <><List>
        <ListItem key={todo.id} draggable="true" ref={drag}>
            <ListItemText>
                {todo.title} :
            </ListItemText>
            <ListItemText>
                {todo.description}
            </ListItemText>
        
            <ListItemSecondaryAction>
                <IconButton
                    onClick={() => {
                        dispatch(removeTodo(todo.id));
                    } }
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => {setVisible(!isVisible);}}
                >
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
            </List>
            <Container style={{ display: isVisible ? "block" : "none" }}>
                <Edit id={todo.id} description={todo.description} title={todo.title} status={todo.status}/>
            </Container>
            </>

    );
}

export default Card