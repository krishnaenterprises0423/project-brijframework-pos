import {
    GET_ALL_SALES_SUCCESS, GET_SALES_TODAY, GET_SALES_YESTERDAY,
    SALE_TO_EDIT, 
} from '../actions/types';

const INITIAL_STATE = {
    sales: [],
    sales_today: [],
    sales_yesterday: [],
    sale_to_edit: {
        name: '',
        unit_quantity: 0,
        unit_price: 0,
        whole_quantity: 0,
        whole_price: 0,
        total: 0,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_SALES_SUCCESS:
            return { ...state, sales: action.payload };

        case GET_SALES_TODAY:
            console.log('these sales are from today ', action.payload)
            return { ...state, sales_today: action.payload };

        case GET_SALES_YESTERDAY:
            console.log('these sales are from yesterday ', action.payload);
            return { ...state, sales_yesterday: action.payload };

        case SALE_TO_EDIT:
            console.log('this is the sale to edit ', action.payload);
            return { ...state, sale_to_edit: action.payload };

        default:
            return state;
    }
};



