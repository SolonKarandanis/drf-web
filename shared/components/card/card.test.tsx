import React from 'react'
import { render, screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom' 

import Card from './card';

const item ={
    id: '1',
    percentage:"72% off",
    preview: "../../../../assets/images/ecommerce/png/1.png",
    title: 'Dapzem & Co',
    description:'Branded hoodie ethnic style',
    rating:4.2,
    oldpr: '$229',
    newpr: '$1,799',
    offerprice:'$229',
    data:"In Offer",
    quantity:1,
    images: [
       { 'img': "../../../../assets/images/ecommerce/png/1.png" },
       { 'img': "../../../../assets/images/ecommerce/png/1.png" },
       { 'img': "../../../../assets/images/ecommerce/png/1.png" }],
}

describe('<Card />',() =>{
    it("1. Should render with children", () =>{
        render(
            <Card>
                a
            </Card>
        );
    });
});