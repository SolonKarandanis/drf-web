import React from 'react'
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom' 

import SearchUserForm from './search-user-form';

describe("<SearchUserForm/>", () =>{
    render(<SearchUserForm />);
    it("1. Should render all elements on the form", () => {
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("role")).toBeInTheDocument();
        expect(screen.getByTestId("buttons")).toBeInTheDocument();
    });
});