"use client";

import Card from "@/shared/components/card/card";
import { useGetProductSearchResults } from "../hooks/useGetProductSearchResults";

const ProductResults = () => {
    const {
        handleGetSearchResults,
        results,
        isLoading
    } = useGetProductSearchResults();

    return (
        <div className="grid grid-cols-12 gap-x-6">
            {results.map((item) =>(
                <Card key={item.id}>
                    <Card.Image src={item.previewImage?.image} href={`/products/${item.uuid}`}/>
                    <Card.IconSection>
                        <Card.IconSection.Icon 
                            className="wishlist"
                            href={`/components/pages/ecommerce/wishlist/`}>
                            <i className="ri-heart-line"></i>
                        </Card.IconSection.Icon>
                        <Card.IconSection.Icon 
                            className="cart"
                            href={`/components/pages/ecommerce/cart/`}>
                            <i className="ri-shopping-cart-line"></i>
                        </Card.IconSection.Icon>
                        <Card.IconSection.Icon 
                            className="view" 
                            href={`/products/${item.uuid}`}>
                            <i className="ri-eye-line"></i>
                        </Card.IconSection.Icon>
                    </Card.IconSection>
                    <Card.Title title={item.title}>
                        {/* <Card.Title.Rating>{item.rating}</Card.Title.Rating> */}
                    </Card.Title>
                    <Card.Description>{item.title}</Card.Description>
                    <Card.Price>{item.price}</Card.Price>
                </Card>
            ))}
        </div>
    )
}

export default ProductResults

{/* <div className="grid grid-cols-12 gap-x-6">
                                {Itemsdata1.map((item) =>(
                                    <Card>
                                        <Card.Image src={item.preview} href={`/products/${productUuid}`}/>
                                        <Card.IconSection>
                                            <Card.IconSection.Icon 
                                                className="wishlist"
                                                href={`/components/pages/ecommerce/wishlist/`}>
                                                <i className="ri-heart-line"></i>
                                            </Card.IconSection.Icon>
                                            <Card.IconSection.Icon 
                                                className="cart"
                                                href={`/components/pages/ecommerce/cart/`}>
                                                <i className="ri-shopping-cart-line"></i>
                                            </Card.IconSection.Icon>
                                            <Card.IconSection.Icon 
                                                className="view" 
                                                href={`/products/${productUuid}`}>
                                                <i className="ri-eye-line"></i>
                                            </Card.IconSection.Icon>
                                        </Card.IconSection>
                                        <Card.Title title={item.title}>
                                            <Card.Title.Rating>{item.rating}</Card.Title.Rating>
                                        </Card.Title>
                                        <Card.Description>{item.description}</Card.Description>
                                        <Card.Price>{item.newpr}</Card.Price>
                                    </Card>
                                ))}
                            </div> */}