import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import CarTable from './CarTable'
import PropTypes from "prop-types";


const setup = () => {
    const props = {
        cars: [{ manufacturer: 'toyota',
            make: 'rav4',
            model: 'LE',
            year:2017 ,
            id:0},{manufacturer: 'toyota',
            make: 'corolla',
            model: 'LE',
            year:2017 ,
            id:1}],
        deleteCar:  jest.fn(),
        openModal: jest.fn(),
        sorting: jest.fn()
    }

    const renderer = createRenderer();
    renderer.render(<CarTable {...props} />);
    const output = renderer.getRenderOutput();

    return {
        props: props,
        output: output
    }
}

describe('components', () => {
    describe('CarTable', () => {
        it('should render CarTable', () => {
            const { output } = setup();
            expect(output.type).toBe('table');
            expect(output.props.className).toBe('car-table');
        })

        it('should render cars row properly', () => {
            const { output, props } = setup();
            expect(output.props.children[1].length).toBe(2);
            output.props.children[1].forEach((tr, i) => {
                    expect(tr.type).toBe('tr');
                    expect(Number(tr.key)).toBe(props.cars[i].id);
                    validateRowData(tr,props.cars[i]);
            })
        })
    })
})

const validateRowData = (tr,carData) => {
    expect(tr.props.children.length).toBe(5);
    tr.props.children.forEach((td, i) => {
        switch (i) {
            case 0:
                expect(td.props.children).toBe(carData.manufacturer);
                break;
            case 1:
                expect(td.props.children).toBe(carData.make);
                break;
            case 2:
                expect(td.props.children).toBe(carData.model);
                break;
            case 3:
                expect(td.props.children).toBe(carData.year);
                break;
        }
    })
}
