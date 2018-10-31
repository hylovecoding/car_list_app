import {
    ADD_CAR,
    DELETE_CAR,
    EDIT_CAR,
    SORT_CAR,
} from '../constants/ActionTypes';
import {
    SORT_MANUFACTURER,
    SORT_ASC,
    SORT_DESC
} from '../constants/SortTypes';

const initialState = {
    cars: [],
    sortKey: SORT_MANUFACTURER,
    sortOrder:  SORT_ASC,
    isModalOpened: false
};


export default function app(state = initialState, action) {

    const {type,manufacturer, make, model, year, id } = action;
    const {cars} = state;
    let sortKey = action.sortKey || SORT_MANUFACTURER;
    let sortOrder =  state.sortOrder;
    switch(type) {
        case ADD_CAR:
            return {
                ...state,
                cars: [...cars, {
                        manufacturer: manufacturer,
                        make: make,
                        model: model,
                        year: year,
                        id: cars.reduce((maxId, car) => Math.max(car.id, maxId), -1) + 1,
                    }
                ]
            }
        case EDIT_CAR:
            return {
                ...state,
                cars: cars.map(car =>
                    car.id === id ?
                        { ...car, manufacturer: manufacturer,
                            make: make,
                            model: model,
                            year: year } :
                        car
                )
            }

        case DELETE_CAR:
            return {
                ...state,
                cars: cars.filter(car =>
                    car.id !== id
                )
            }
        case SORT_CAR:
            if(sortKey === state.sortKey) {
               sortOrder = sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC;
            }
            return {
                cars: cars.sort( (a, b) => {
                    if( a[sortKey] < b[sortKey] ) return sortOrder === SORT_ASC ? -1 : 1;
                    if( a[sortKey] > b[sortKey] ) return sortOrder === SORT_ASC ? 1: -1;
                    return 0;
                }),
                sortKey: sortKey,
                sortOrder: sortOrder
            };
        default: return state;
    }
}


