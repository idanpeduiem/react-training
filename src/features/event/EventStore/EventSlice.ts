import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import eventReader from "./EventReader";
import CalendarEvent from "../CalendarEvent/CalendarEvent";

export const eventSlice = createSlice({
    name: 'events',
    initialState: eventReader.getEvents()
    ,
    reducers: {
        removeEvent(state, action: PayloadAction<CalendarEvent>) {
            return state.filter((event) => event !== action.payload);
        },
        addEvent(state, action: PayloadAction<CalendarEvent>) {
            state.push(action.payload);
        },
        updateEvent(state, action: PayloadAction<CalendarEvent>) {
            let newEventList: CalendarEvent[] = state;
            newEventList = newEventList.map(event => {
                if (event.getId() === action.payload.getId()) {
                    return action.payload;
                }
                return event;
            });
            return newEventList;
        }
    },
});

export const selectEvents = (state: any) => state.events;

export const {removeEvent, addEvent, updateEvent} = eventSlice.actions

export default eventSlice.reducer;
