"use client";

import Card from "@/shared/components/card/card";
import { 
    useGetInitialProductSearchResults, 
    useGetProductSearchResults 
} from "../hooks/useGetProductSearchResults";
import { useAppSelector } from "@/shared/redux/hooks";
import ProductResultsLoading from "./product-results-loading";
import { useRouter } from "next/navigation";
import { useMutateUserCart } from "@/components/cart/hooks/useMutateUserCart";

const ProductResults = () => {
    const {
        results,
        isLoading
    } = useGetProductSearchResults();
    const {
        mutationLoading,
        handleAddItemsToCartRequest
    } = useMutateUserCart();
    useGetInitialProductSearchResults();
    const router = useRouter(); 
    const configState = useAppSelector((state)=>state.config);
    const host = configState.djangoHost
    const path = configState.baseUrl

    return (
        
        <div className="grid grid-cols-12 gap-x-6">
            {isLoading && (<ProductResultsLoading iterate={8} />)}
            {!isLoading && results.map((item) =>{
                const productImage = item.previewImage
                const imagePath = productImage ?   `${host}${productImage.image}` : `${path}/assets/images/faces/21.jpg`;

                const handleRouteToEdit = ()=>{
                    router.push(`/products/${item.uuid}/edit`);
                }

                const handleAddToCart = () => {
                    console.log(item);
                };

                const handleAddToWishList = () => {
                    console.log(item);
                };

                return (
                    <Card key={item.id}>
                        <Card.Image src={imagePath} href={`/products/${item.uuid}`}/>
                        <Card.IconSection>
                            <Card.IconSection.Icon 
                                className="wishlist"
                                onClick={handleAddToWishList}>
                                <i className="ri-heart-line"></i>
                            </Card.IconSection.Icon>
                            <Card.IconSection.Icon 
                                className="cart"
                                onClick={handleAddToCart}>
                                <i className="ri-shopping-cart-line"></i>
                            </Card.IconSection.Icon>
                            <Card.IconSection.Icon 
                                className="view"
                                onClick={handleRouteToEdit}>
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