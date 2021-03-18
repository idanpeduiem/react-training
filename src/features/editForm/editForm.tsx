import React, {FC} from "react";
import {Box, Fab, makeStyles} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import BasicEntity from "../basicEntity/basicEntity";
import CalendarTask from "../task/CalendarTasks/CalendarTask";
import TaskFormBody from "./taskFormBody";
import EventFormBody from "./eventFormBody";
import CalendarEvent from "../event/CalendarEvent/CalendarEvent";
import {gridItemType} from "../../App";

interface EditFormProps {
    item: BasicEntity | undefined,
    setCardSize:  React.Dispatch<React.SetStateAction<gridItemType>>
}

const EditForm: FC<EditFormProps> = ({item, setCardSize}) => {
    const pageHistory = useHistory();
    setCardSize(4);
    const classes = useStyles();
    const formBody = () => {
      if(item instanceof CalendarTask) {
          return <TaskFormBody item={item} setCardSize={setCardSize}></TaskFormBody>;
      }  else if (item instanceof CalendarEvent){
          return <EventFormBody item={item} setCardSize={setCardSize}></EventFormBody>;
      }
    };
    const handleClose = () => {
        pageHistory.push('/');
        setCardSize(12);
    };
    return (
        <>
            <Box className={classes.box}>
                <Fab className={classes.fab} onClick={handleClose}><HomeIcon/></Fab>
            </Box>
            {formBody()}
        </>
    );
}

const useStyles = makeStyles({
    fab: {
        left: "48%"
    },
    box: {
        padding: '10px'
    }
});

export default EditForm;
