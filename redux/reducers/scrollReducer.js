// redux/reducers/scrollReducer.js
import { SET_SCROLL_Y } from '../actions/scrollActions';

const initialState = {
    scrollY: 0,
};

const scrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCROLL_Y:
            return {
                ...state,
                scrollY: action.payload,
            };
        default:
            return state;
    }
};

export default scrollReducer;
