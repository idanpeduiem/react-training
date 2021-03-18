import {configureStore} from '@reduxjs/toolkit';
import taskReducer from '../features/task/TaskStore/TaskSlice';
import eventReducer from '../features/event/EventStore/EventSlice';
import {compose} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        events: eventReducer,
    }, enhancers: composeEnhancers
});

export default store;