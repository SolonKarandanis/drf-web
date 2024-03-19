import React from 'react'
import { render, screen,fireEvent } from "@testing-library/react";
import CButton from './cbutton';
// import ClearIcon from '@mui/icons-material/Clear';

describe('<Button />',()=>{
    it('1. On initial render the button is enabled',async () => {
        render(
        <CButton btnType='primary' 
            type="submit"
            className='btn btn-shadow btn-lg w-40'>
            Search
        </CButton>)
        expect(await screen.findByRole('button')).toBeEnabled();
    })

    it('2. The button has text content',async () =>{
        render(
        <CButton btnType='primary' 
            type="submit"
            className='btn btn-shadow btn-lg w-40'>
            Search
        </CButton> 
        )
        expect(await screen.findByRole('button')).toHaveTextContent('Search');
    })

    it('3. The button is in loading state',async () =>{
        render(
        <CButton btnType='primary' 
            type="submit"
            className='btn btn-shadow btn-lg w-40'
            isLoading={true}>
            Search
        </CButton>  
        )
        
        expect(screen.getByTestId('Button.Spinner')).toBeInTheDocument()
    })




    it('4. calls the onClick callback handler',async () =>{
        const onClick = jest.fn()
        render(
            <CButton btnType='primary' 
                type="submit"
                className='btn btn-shadow btn-lg w-40'
                onClick={onClick}>
                Search
            </CButton> 
        )
        fireEvent.click(await screen.findByRole('button'),{
            target: { value: 'JavaScript' },
        })
        expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('5. It renders an Icon', async ()=>{

        render(
            <CButton btnType='danger' 
                type="submit"
                className='btn btn-shadow btn-lg w-40'
                >
                Clear
            </CButton> 
        )
        // icon={<ClearIcon />}
        expect(screen.getByTestId('Button.Icon')).toBeInTheDocument()

    })
})