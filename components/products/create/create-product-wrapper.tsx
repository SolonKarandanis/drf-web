import ProductForm from "../forms/product-form"

const CreateProductWrapper= () => {
    const defaultFormValues={
        title:'',
        sku:'',
        brand:0,
        gender:undefined,
        category:0,
        publishStatus:'',
        availabilityStatus:'',
        inventory:0,
        price:0,
        content:'',
        fabricDetails:'',
        careInstructions:'',
        colors:[],
        sizes:[] 
    }
    return (
        <ProductForm defaultValues={defaultFormValues}/>
    )
}

export default CreateProductWrapper