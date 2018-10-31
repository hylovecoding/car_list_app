import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CarActions from '../actions';
import Modal from 'react-responsive-modal';
import CarTable from '../components/CarTable';
import {
    ADD_MODAL,
    EDIT_MODAL,
    VIEW_MODAL,
    DELETE_MODAL
} from '../constants/ModalTypes';
import './app.css'

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(CarActions, dispatch)
});

const Header = ({addOrEdit})=>{
    switch(addOrEdit) {
        case ADD_MODAL:
            return (<h3 className="modal- header">Add New Car</h3>)
        case EDIT_MODAL:
            return (<h3 className="modal- header">Edit Car</h3>)
        case DELETE_MODAL:
            return (<h3 className="modal- header">Delete Car</h3>)
        default:
            return (<h3 className="modal- header">Car Details</h3>)
    }
}

const Message = ({addOrEdit, car})=>{
    switch(addOrEdit) {
        case DELETE_MODAL:
            const carName = ` ${car.year} ${car.manufacturer} ${car.make} ${car.model}`
            return (<p className="message">Are you sure wish to delete the {carName}</p>)
        default:
            return null;
    }
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.save = this.save.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            open:false,
            modalData: {
                manufacturer:'',
                make: '',
                model: '',
                year: ''},
            readOnly: false
        }
    }
    openModal(addOrEdit, id) {
        const {cars} = this.props;
        switch(addOrEdit) {
            case ADD_MODAL:
                this.setState((state,props)=>{
                    return {
                        open:true,
                        modalData: {
                            manufacturer:'',
                            make: '',
                            model: '',
                            year: ''},
                        readOnly: false,
                        addOrEdit: ADD_MODAL
                    }
                });
                break;
            case EDIT_MODAL:
                this.setState((state,props)=>{
                    return {
                        open:true,
                        modalData:Object.assign({},cars.filter(car =>
                            car.id === id)[0]),
                        readOnly: false,
                        addOrEdit: EDIT_MODAL
                    }
                });
                break;
            case DELETE_MODAL:
                this.setState((state,props)=>{
                    return {
                        open:true,
                        modalData:cars.filter(car =>
                            car.id === id)[0],
                        addOrEdit: DELETE_MODAL,
                        readOnly: false
                    }
                });
                break;
            default : //VIEW_MODAL
                this.setState((state,props)=>{
                    return {
                        open:true,
                        modalData:cars.filter(car =>
                            car.id === id)[0],
                        readOnly: true,
                        addOrEdit: VIEW_MODAL
                    }
                });
                break;
        }

    }

    closeModal() {
        this.setState((state,props)=>{
            return {
                open:false,
                modalData: {
                    manufacturer:'',
                    make: '',
                    model: '',
                    year: ''},
                readOnly: true,
                addOrEdit: VIEW_MODAL
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        this.setState((state,props)=>{
            return {
                modelData: Object.assign(this.state.modalData,{[name]: value})
            }
        });
    }

    save (event) {
        event.preventDefault();
        const {addOrEdit} = this.state;
        const {manufacturer, make, model, year, id} = this.state.modalData;
        const {addCar, editCar, deleteCar} = this.props.actions;
        switch(addOrEdit) {
            case  ADD_MODAL:
                addCar(manufacturer, make, model, year);
                break;
            case EDIT_MODAL:
                editCar(manufacturer, make, model, year, id);
                break;
            case DELETE_MODAL:
                deleteCar(id);
                this.closeModal();
                break;
            default:
                return;
        }
    }

    render () {
        const {actions, cars} = this.props;
        const {open, modalData, readOnly, addOrEdit} = this.state;

        return(
            <div className="app-container">
                <button onClick={()=>this.openModal(ADD_MODAL)} className="add-btn">Add New</button>
                <CarTable cars={cars} openModal={this.openModal} closeModal={this.closeModal} deleteCar={this.openModal} sorting={actions.sorting}/>
                <Modal open={open}  center onClose={this.closeModal}>
                    <Header addOrEdit={addOrEdit}/>
                    <Message addOrEdit={addOrEdit} car={modalData}/>
                    <form onSubmit={this.save} className="input-form">
                        <div className={addOrEdit === DELETE_MODAL?'hidden' : ''}>
                            <label>
                                <div>Manufacturer:</div>
                                <input readOnly={readOnly} type="text" name="manufacturer" value={modalData.manufacturer} onChange={this.handleInputChange}/>
                            </label>
                            <label>
                                <div>Make:</div>
                                <input readOnly={readOnly} type="text"  name="make" value={modalData.make} onChange={this.handleInputChange}/>
                            </label>
                            <label>
                                <div>Model:</div>
                                <input readOnly={readOnly} type="text"  name="model" value={modalData.model} onChange={this.handleInputChange}/>
                            </label>
                            <label>
                                <div>Year:</div>
                                <input readOnly={readOnly} type="number"  name="year" value={modalData.year} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <div className="btn-container">
                            <input className="save-btn" type="submit" value="Save" onClick={this.save} disabled={readOnly}/>
                            <input className="cancel-btn" type="button" value="Cancel" onClick={this.closeModal}/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

