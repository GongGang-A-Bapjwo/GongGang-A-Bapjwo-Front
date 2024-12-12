// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import scrollReducer from './scrollReducer';

const rootReducer = combineReducers({
    scroll: scrollReducer, // scroll 관련 상태
});

export default rootReducer;
