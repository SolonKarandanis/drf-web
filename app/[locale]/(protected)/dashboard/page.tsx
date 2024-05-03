import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Card from "@/shared/components/card/card";
import { getServerSession } from "next-auth";
import Link from 'next/link'

const Page = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session)
  const olderDate = new Date('2022-10-31');
  const currentDate = new Date('2022-11-01');

  const diff = olderDate.valueOf()- currentDate.valueOf()
  const formatter = new Intl.RelativeTimeFormat('en', { 
    numeric: 'always' 
  });
  const d=formatter.format(Math.round(diff / 86400000), 'day')
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
  return (
    <div>
      <div className="xxl:col-span-9 xl:col-span-8 lg:col-span-8 md:col-span-12 col-span-12">
        <div className="grid grid-cols-12 gap-x-6">
          <Card>
            <Card.Image src={item.preview} />
            <Card.Title title={item.title}>
              <Card.Title.Rating>{item.rating}</Card.Title.Rating>
            </Card.Title>
            <Card.Description>{item.description}</Card.Description>
          </Card>

          <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="box product-card">
              <div className="box-body">
                <Link href="/components/pages/ecommerce/product-details/" className="product-image">
                  <img src={item.preview} className="card-img mb-3 rounded-md"
                      alt="..." />
                </Link>
                <div className="product-icons">
                  <Link aria-label="anchor" href="/components/pages/ecommerce/wishlist/" className="wishlist"><i
                      className="ri-heart-line"></i></Link>
                  <Link aria-label="anchor" href="/components/pages/ecommerce/cart/" className="cart"><i
                      className="ri-shopping-cart-line"></i></Link>
                  <Link aria-label="anchor" href="/components/pages/ecommerce/product-details/" className="view"><i
                      className="ri-eye-line"></i></Link>
                </div>
                <p
                  className="product-name font-semibold mb-0 flex items-center justify-between">
                  {item.title}<span className="ltr:float-right rtl:float-left text-warning text-xs">4.2<i
                      className="ri-star-s-fill align-middle ms-1 inline-block"></i></span>
                </p>
                <p className="product-description text-[.6875rem] text-[#8c9097] dark:text-white/50 mb-2">
                  {item.description}
                </p>
                <p className="mb-1 font-semibold text-[1rem] flex items-center justify-between">
                  <span>{item.newpr}<span
                      className="text-[#8c9097] dark:text-white/50 line-through ms-1 inline-block opacity-[0.6]">{item.newpr}</span></span><span
                          className="badge bg-secondary/10 text-secondary ltr:float-right rtl:float-left text-[0.625rem]">72%
                      off</span>
                </p>
                <p
                  className="text-[.6875rem] text-success font-semibold mb-0 flex items-center">
                  <i className="ti ti-discount-2 text-[1rem] me-1"></i>Offer Price {item.offerprice}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page