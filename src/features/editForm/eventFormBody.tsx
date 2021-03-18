import React, {FC, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent, makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {getISOTime} from "../../assets/SimpleDate";
import {CirclePicker} from "react-color";
import ChipInput from 'material-ui-chip-input';
import {addEvent, updateEvent} from '../event/EventStore/EventSlice';
import CalendarEvent from "../event/CalendarEvent/CalendarEvent";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {gridItemType} from "../../App";

interface EventFormProps {
    item: CalendarEvent,
    add?: boolean,
    setCardSize:  React.Dispatch<React.SetStateAction<gridItemType>>
}

const EventFormBody: FC<EventFormProps> = ({item, add = false, setCardSize}) => {
    const event = item;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [invitedGuests, setInvitedGuests] = useState([...event.getInvitedGuests()]);
    const [title, setTitle] = useState(event.getTitle());
    const [color, setColor] = useState(event.getColor());
    const [description, setDescription] = useState(event.getDescription());
    const [beginningTime, setBeginningTime] = useState(getISOTime(event.getBeginningTime()));
    const [endingTime, setEndingTime] = useState(getISOTime(event.getEndingTime()));
    const [notificationTime, setNotificationTime] = useState(getISOTime(event.getNotificationTime()));
    const [invalidForm, setInvalidForm] = useState(false);
    const [helperText, setHelperText] = useState("");
    const pageHistory = useHistory();

    const validateForm = () => {
        if (title.length === 0) {
            setInvalidForm(true);
            setHelperText("Please enter a title");
            return false;
        }
        return true;
    }
    const updateTitle = (event: any) => {
        setTitle(event.target.value);
        if (event.target.value.length > 0) {
            setInvalidForm(false);
            setHelperText("");
        } else {
            setInvalidForm(true);
            setHelperText("Please enter a title");
        }
    };
    const updateDescription = (event: any) => {
        setDescription(event.target.value);
    };
    const updateBeginningTime = (event: any) => {
        setBeginningTime(event.target.value);
    };
    const updateEndingTime = (event: any) => {
        setEndingTime(event.target.value);
    };
    const updateNotificationTime = (event: any) => {
        setNotificationTime(event.target.value);
    };
    const updateColor = (event: any) => {
        setColor(event.hex);
    };
    const handleAddChip = (chip: any) => {
        invitedGuests.push(chip);
        setInvitedGuests(invitedGuests);
    };
    const handleDeleteChip = (chip: any, index: any) => {
        invitedGuests.splice(index, 1);
        setInvitedGuests(invitedGuests);
    };
    const handleClose = () => {
        pageHistory.push('/');
        setCardSize(12);
    };
    const submitForm = () => {
        if (validateForm()) {
            const updatedEvent = new CalendarEvent(event.getId(), title, description, beginningTime, endingTime, color, invitedGuests, notificationTime);
            if (add) {
                dispatch(addEvent(updatedEvent));
            } else {
                dispatch(updateEvent(updatedEvent));
            }
            handleClose();
        }

    };
    return (
        <div>
            <Card>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><Typography>Title:</Typography></TableCell>
                                <TableCell>
                                    <TextField defaultValue={event.getTitle()} onChange={updateTitle}
                                               error={invalidForm} helperText={helperText}
                                               multiline/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Description:</Typography></TableCell>
                                <TableCell>
                                    <TextField defaultValue={event.getDescription()} onChange={updateDescription}
                                               multiline/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Beginning Time:</Typography></TableCell>
                                <TableCell>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue={getISOTime(event.getBeginningTime())}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={updateBeginningTime}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Ending Time:</Typography></TableCell>
                                <TableCell>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue={getISOTime(event.getEndingTime())}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={updateEndingTime}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Color:</Typography></TableCell>
                                <TableCell>
                                    <CirclePicker onChange={updateColor}/>
                                    <Typography>Selected Color:</Typography>
                                    <CirclePicker colors={[color]}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Invite guests:</Typography></TableCell>
                                <TableCell>
                                    <ChipInput
                                        value={invitedGuests}
                                        onAdd={(chip) => handleAddChip(chip)}
                                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Notification Time:</Typography></TableCell>
                                <TableCell>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue={getISOTime(event.getNotificationTime())}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={updateNotificationTime}
                                    /> </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions>
                    <Button onClick={submitForm} className={classes.saveButton}>Save</Button>
                    <Button onClick={handleClose} className={classes.cancelButton}>Cancel</Button>
                </CardActions>
            </Card>
        </div>
    );
}

const useStyles = makeStyles({
    cancelButton: {
        backgroundColor: "lightgrey"
    },
    saveButton: {
        backgroundColor: "#9ce1ff"
    }
});

export default EventFormBody;