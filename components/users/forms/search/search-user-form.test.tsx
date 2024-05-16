import React from 'react'
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import SearchUserForm from './search-user-form';

describe("<SearchUserForm/>", () =>{
    render(<SearchUserForm />);
    describe('Render', () => {
        it("1. Should render all elements on the form", () => {
            expect(screen.getByTestId("form")).toBeInTheDocument();
            expect(screen.getByTestId("username")).toBeInTheDocument();
            expect(screen.getByTestId("name")).toBeInTheDocument();
            expect(screen.getByTestId("email")).toBeInTheDocument();
            expect(screen.getByTestId("role")).toBeInTheDocument();
            expect(screen.getByTestId("buttons")).toBeInTheDocument();
        });
    });
    describe('Behavior', () =>{
        it('1. Should be able to add text to the username input', async () => {
            const input = screen.getByTestId('input-username')
            await userEvent.type(input, 'hey there')
            expect(input).toHaveValue("hey there")
        });
        it('2. Should be able to add text to the name input', async () => {
            const input = screen.getByTestId("input-name")
            await userEvent.type(input, 'hey there')
            expect(input).toHaveValue("hey there")
        });
        it('3. Should be able to add text to the email input', async () => {
            const input = screen.getByTestId("input-email")
            await userEvent.type(input, 'skarandanis@email.com')
            expect(input).toHaveValue("skarandanis@email.com")
        });
    })
    
});