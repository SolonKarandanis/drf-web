import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Accordion from "@/shared/components/accordion/accordion";
import Card from "@/shared/components/card/card";
import List from "@/shared/components/list/list";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import { getServerSession } from "next-auth";


export const metadata:Metadata={
  title:"Drf Dashboard",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user)
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

  const faqData = [
    {
      id: 1,
      header: "What is LogRocket?",
      body:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      id: 2,
      header: "LogRocket pricing?",
      body:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      id: 3,
      header: "Where can I Find the Doc?",
      body:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
  ];

  return (
    <div>
      <PageHeader 
        currentpage="Analytics" 
        activepage="Dashboards" 
        mainpage="Analytics" />
      <div className="xxl:col-span-9 xl:col-span-8 lg:col-span-8 md:col-span-12 col-span-12">
        <div className="grid grid-cols-12 gap-x-6">
          <Card>
            <Card.Image src={item.preview} />
            <Card.IconSection>
              <Card.IconSection.Icon className="wishlist"><i className="ri-heart-line"></i></Card.IconSection.Icon>
              <Card.IconSection.Icon className="cart"><i className="ri-shopping-cart-line"></i></Card.IconSection.Icon>
              <Card.IconSection.Icon className="view"><i className="ri-eye-line"></i></Card.IconSection.Icon>
            </Card.IconSection>
            <Card.Title title={item.title}>
              <Card.Title.Rating>{item.rating}</Card.Title.Rating>
            </Card.Title>
            <Card.Description>{item.description}</Card.Description>
            <Card.Price>{item.newpr}</Card.Price>
          </Card>
          <List isOrdered={true}>
            <List.ListItem>First Item</List.ListItem>
            <List.ListItem>Second Item</List.ListItem>
          </List>
          {/* <Accordion>
            <Accordion.Title>LogRocket FAQ</Accordion.Title>
            <Accordion.Wrapper>
              {faqData.map((item) =>(
                <Accordion.Item key={item.id}>
                  <Accordion.ItemHeader>{item.header}</Accordion.ItemHeader>
                  <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion.Wrapper>
          </Accordion> */}
        </div>
      </div>
    </div>
  )
}

export default Page