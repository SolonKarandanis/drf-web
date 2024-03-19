import React from 'react'
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom' 

import CFormSelect  from "./cform-select";

const animals = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "lion", label: "Lion" },
    { value: "tiger", label: "Tiger" },
    { value: "elephant", label: "Elephant" },
    { value: "giraffe", label: "Giraffe" },
    { value: "zebra", label: "Zebra" },
    { value: "penguin", label: "Penguin" },
    { value: "panda", label: "Panda" },
    { value: "koala", label: "Koala" },
];


describe('<Select />',() =>{
    it("1. Should render with default value selected", () => {
        render(
        <CFormSelect 
            label='Animals' 
            name='animals' 
            options={animals} 
            defaultValue={"cat"} />);
     
        expect(screen.getByRole("combobox")).toHaveValue("cat");
        expect((screen.getByRole("option", { name: "Cat" }) as HTMLOptionElement).selected).toBe(true);
    });

    it("2. Should select correct value on change", async () => {
        render(
            <CFormSelect 
                label='Animals' 
                name='animals' 
                options={animals} 
                defaultValue={"cat"} />
        )
     
        fireEvent.change(screen.getByRole("combobox"),{
            target: { value: 'zebra' }
        })

        expect(screen.getByRole("combobox")).toHaveValue("zebra");
        expect((screen.getByRole("option", { name: "Zebra" }) as HTMLOptionElement).selected).toBe(true);
    });
})