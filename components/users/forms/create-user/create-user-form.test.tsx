import React from 'react'
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import CreateUserForm from './create-user-form';

beforeEach(()=>{
    render(<CreateUserForm />);
});

describe("<CreateUserForm/>", () =>{

    describe('<PersonalInfo />', () => {

        describe('Render', () => {
            test("1. Should render all elements on the 1st step of the form (PersonalInfo)", () =>{
                expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
                expect(screen.getByTestId("input-lastName")).toBeInTheDocument();
                expect(screen.getByTestId("input-email")).toBeInTheDocument();
            })
        })
        describe('Behavior', () =>{
            test('1. Should be able to add text to the first name input', async () => {
                const input = screen.getByTestId('input-firstName')
                await userEvent.type(input, 'hey there')
                expect(input).toHaveValue("hey there")
            });
            test('2. Should be able to add text to the last name input', async () => {
                const input = screen.getByTestId("input-lastName")
                await userEvent.type(input, 'hey there')
                expect(input).toHaveValue("hey there")
            });
            test('3. Should be able to add text to the email input', async () => {
                const input = screen.getByTestId("input-email")
                await userEvent.type(input, 'skarandanis@email.com')
                expect(input).toHaveValue("skarandanis@email.com")
            });
            test('4. Should show email error message on invalid email', async () => {
                const input = screen.getByTestId("input-email")
                await userEvent.type(input, 'skarandanis.com')
                const nextButton = screen.getByTestId("next-button");
                await userEvent.click(nextButton);
                const emailError= screen.getByText("Email is required");
                expect(emailError).toBeInTheDocument();
            });
        })
    })
});