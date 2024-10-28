import Categories from "./categories"
import Brands from "./brands"
import Discount from "./discount"
import Sizes from "./sizes"

const ProductsSidebar = () => {
  return (
    <div className="col-span-12 xxl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-12">
        <div className="box products-navigation-card">
            <Categories />
            <Brands />
            {/* <Discount /> */}
            <Sizes />
        </div>
    </div>
  )
}

export default ProductsSidebar