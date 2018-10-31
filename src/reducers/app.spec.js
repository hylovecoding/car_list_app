import app from './app'
import * as sortTypes  from '../constants/SortTypes';
import * as actionTypes from "../constants/ActionTypes";

describe('app reducer', () => {
    it('should handle initial state', () => {
        expect(
            app(undefined, {})
        ).toEqual({
            cars: [],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_ASC,
        })
    })

    it('should handle ADD_CAR', () => {
        expect(
            app({
                cars: [],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, { type: actionTypes.ADD_CAR,
                manufacturer: 'toyota',
                make: 'rav4',
                model: 'LE',
                year:2017 })
        ).toEqual({
            cars: [{manufacturer: 'toyota',
                make: 'rav4',
                model: 'LE',
                year:2017 ,
            id:0}],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_ASC,
        })

        expect(
            app({
                cars: [{manufacturer: 'toyota',
                    make: 'rav4',
                    model: 'LE',
                    year:2017 ,
                    id:0}],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, { type: actionTypes.ADD_CAR,
                manufacturer: 'toyota',
                make: 'corolla',
                model: 'LE',
                year:2017 })
        ).toEqual({
            cars: [{ manufacturer: 'toyota',
                make: 'rav4',
                model: 'LE',
                year:2017 ,
                id:0},{manufacturer: 'toyota',
                make: 'corolla',
                model: 'LE',
                year:2017 ,
                id:1}],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_ASC,
        })
    })

    it('should handle DELETE_CAR', () => {
        expect(
            app({
                cars: [{ manufacturer: 'toyota',
                    make: 'rav4',
                    model: 'LE',
                    year:2017 ,
                    id:0},{manufacturer: 'toyota',
                    make: 'corolla',
                    model: 'LE',
                    year:2017 ,
                    id:1}],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, {
                type: actionTypes.DELETE_CAR,
                id: 1
            })
        ).toEqual({
            cars: [{manufacturer: 'toyota',
                make: 'rav4',
                model: 'LE',
                year:2017 ,
                id:0}],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_ASC,
        })
    })

    it('should handle EDIT_CAR', () => {
        expect(
            app({
                cars: [{ manufacturer: 'toyota',
                    make: 'rav4',
                    model: 'LE',
                    year:2017 ,
                    id:0},{manufacturer: 'toyota',
                    make: 'corolla',
                    model: 'LE',
                    year:2017 ,
                    id:1}],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, {
                type: actionTypes.EDIT_CAR,
                manufacturer: 'toyota',
                make: 'corolla',
                model: 'LE',
                year:2018 ,
                id: 1
            })
        ).toEqual({
            cars: [{ manufacturer: 'toyota',
                make: 'rav4',
                model: 'LE',
                year:2017 ,
                id:0},{manufacturer: 'toyota',
                make: 'corolla',
                model: 'LE',
                year:2018 ,
                id:1}],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_ASC,
        })
    })

    it('should handle SORT_CAR', () => {
        expect(
            app({
                cars: [{ manufacturer: 'aaaa',
                    make: 'rav4',
                    model: 'LE',
                    year:2017 ,
                    id:0},{manufacturer: 'zzzz',
                    make: 'corolla',
                    model: 'LE',
                    year:2017 ,
                    id:1}],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, {
                type: actionTypes.SORT_CAR,
                sortKey: sortTypes.SORT_MANUFACTURER
            })
        ).toEqual({
            cars: [{manufacturer: 'zzzz',
                make: 'corolla',
                model: 'LE',
                year:2017 ,
                id:1},{ manufacturer: 'aaaa',
                make: 'rav4',
                model: 'LE',
                year:2017 ,
                id:0}],
            sortKey: sortTypes.SORT_MANUFACTURER,
            sortOrder:  sortTypes.SORT_DESC,
        })

        expect(
            app({
                cars: [{ manufacturer: 'zzzz',
                    make: 'rav4',
                    model: 'LE',
                    year:2018 ,
                    id:0},{manufacturer: 'aaaa',
                    make: 'corolla',
                    model: 'LE',
                    year:2017 ,
                    id:1}],
                sortKey: sortTypes.SORT_MANUFACTURER,
                sortOrder:  sortTypes.SORT_ASC,
            }, {
                type: actionTypes.SORT_CAR,
                sortKey: sortTypes.SORT_YEAR
            })
        ).toEqual({
            cars: [{manufacturer: 'aaaa',
                make: 'corolla',
                model: 'LE',
                year:2017 ,
                id:1},
                { manufacturer: 'zzzz',
                    make: 'rav4',
                    model: 'LE',
                    year:2018 ,
                    id:0}],
            sortKey: sortTypes.SORT_YEAR,
            sortOrder:  sortTypes.SORT_ASC,
        })
    })
})
