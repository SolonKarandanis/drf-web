import React from 'react'
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import CreateUserForm from './create-user-form';

describe("<CreateUserForm/>", () =>{
    describe('Render', () => {
        test("1. Should render all elements on the form", () =>{
            render(<CreateUserForm />);
            expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
            expect(screen.getByTestId("input-lastName")).toBeInTheDocument();
            expect(screen.getByTestId("input-email")).toBeInTheDocument();
        })
    })
});