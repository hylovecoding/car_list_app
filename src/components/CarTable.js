import React from 'react'
import PropTypes from 'prop-types'
import {
    EDIT_MODAL,
    VIEW_MODAL,
    DELETE_MODAL
} from '../constants/ModalTypes';
import {
    SORT_MANUFACTURER,
    SORT_MAKE,
    SORT_MODEL,
    SORT_YEAR,
} from '../constants/SortTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './CarTable.css'

const CarTable = ({ cars, deleteCar, openModal, sorting }) => (
    <table className="car-table">
        <tr>
            <th className="manufacturer"  onClick={()=>sorting(SORT_MANUFACTURER)}>manufacturer</th>
            <th className="make" onClick={()=>sorting(SORT_MAKE)}>make</th>
            <th className="model" onClick={()=>sorting(SORT_MODEL)}>model</th>
            <th className="year" onClick={()=>sorting(SORT_YEAR)}>year</th>
            <th className="edit-delete"></th>
        </tr>

        {cars.map(car =>(
                <tr key={car.id}>
                    <td onClick={()=>openModal(VIEW_MODAL,car.id)} className="manufacturer-cell">{car.manufacturer}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td className="year">{car.year}</td>
                    <td className="edit-delete">
                        <i className="fs-icon"><FontAwesomeIcon icon={faPencilAlt}  onClick={()=>openModal(EDIT_MODAL,car.id)}/></i>
                        <i className="fs-icon"><FontAwesomeIcon icon={faTrashAlt}  onClick={()=>openModal(DELETE_MODAL,car.id)}/></i>
                    </td>
                </tr>
            )
        )}
    </table>

)

CarTable.propTypes = {
    cars: PropTypes.arrayOf(PropTypes.shape({
        manufacturer: PropTypes.string.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
    }).isRequired).isRequired,
    deleteCar: PropTypes.func.isRequired,
    openModal:PropTypes.func.isRequired
}

export default CarTable
//asdda