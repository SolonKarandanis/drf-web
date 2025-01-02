import React from 'react'
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import FormButton from './form-button';
import { MdClear } from "react-icons/md";

describe('<Button />',()=>{
    it('1. On initial render the button is enabled',async () => {
        render(
        <FormButton intent='primary' 
            type="submit"
            className='w-40 btn btn-shadow btn-lg'>
            Search
        </FormButton>)
        expect(await screen.findByRole('button')).toBeEnabled();
    })

    it('2. The button has text content',async () =>{
        render(
        <FormButton intent='primary' 
            type="submit"
            className='w-40 btn btn-shadow btn-lg'>
            Search
        </FormButton> 
        )
        expect(await screen.findByRole('button')).toHaveTextContent('Search');
    })

    it('3. The button is in loading state',async () =>{
        render(
        <FormButton intent='primary' 
            type="submit"
            className='w-40 btn btn-shadow btn-lg'
            isLoading={true}>
            Search
        </FormButton>  
        )
        
        expect(screen.getByTestId('Button.Spinner')).toBeInTheDocument()
    })




    it('4. calls the onClick callback handler',async () =>{
        const onClick = jest.fn()
        render(
            <FormButton intent='primary' 
                type="submit"
                className='w-40 btn btn-shadow btn-lg'
                onClick={onClick}>
                Search
            </FormButton> 
        )
        fireEvent.click(await screen.findByRole('button'),{
            target: { value: 'JavaScript' },
        })
        expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('5. It renders an Icon', async ()=>{

        render(
            <FormButton intent='danger' 
                type="submit"
                className='w-40 btn btn-shadow btn-lg'
                icon={<MdClear />}
                >
                Clear
            </FormButton> 
        )
        expect(screen.getByTestId('Button.Icon')).toBeInTheDocument()

    })
})