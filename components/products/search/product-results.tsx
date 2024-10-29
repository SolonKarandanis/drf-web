"use client";

import Card from "@/shared/components/card/card";
import { useGetProductSearchResults } from "../hooks/useGetProductSearchResults";
import { useAppSelector } from "@/shared/redux/hooks";
import { productsSearchResultsSelector } from "@/shared/redux/features/products/productsSlice";
import ProductResultsLoading from "./product-results-loading";

const ProductResults = () => {
    const {
        handleGetSearchResults,
        isLoading
    } = useGetProductSearchResults();
    const configState = useAppSelector((state)=>state.config);
    const results = useAppSelector(productsSearchResultsSelector);
    const host = configState.djangoHost
    const path = configState.baseUrl

    return (
        
        <div className="grid grid-cols-12 gap-x-6">
            {isLoading && (<ProductResultsLoading iterate={8} />)}
            {!isLoading && results.map((item) =>{
                const productImage = item.previewImage
                const imagePath = productImage ?   `${host}${productImage.image}` : `${path}/assets/images/faces/21.jpg`;
                return (
                    <Card key={item.id}>
                        <Card.Image src={imagePath} href={`/products/${item.uuid}`}/>
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
                            <Card.Title.Rating>4.2</Card.Title.Rating>
                        </Card.Title>
                        <Card.Description>{item.content}</Card.Description>
                        <Card.Price price={item.price} oldPrice={item.price} discount={72}></Card.Price>
                    </Card>
                )
            })}
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