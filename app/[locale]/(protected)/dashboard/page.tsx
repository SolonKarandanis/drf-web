
import List from "@/shared/components/list/list";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/shadcn/components/ui/accordion"


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
  const olderDate = new Date('2022-10-31');
  const currentDate = new Date('2022-11-01');

  const diff = olderDate.valueOf()- currentDate.valueOf()
  const formatter = new Intl.RelativeTimeFormat('en', { 
    numeric: 'always' 
  });
  const d=formatter.format(Math.round(diff / 86400000), 'day')

  return (
    <div>
      <PageHeader 
        currentpage="Analytics" 
        activepage="Dashboards" 
        mainpage="Analytics" />
      <div className="col-span-12 xxl:col-span-9 xl:col-span-8 lg:col-span-8 md:col-span-12">
        <div className="grid grid-cols-12 gap-x-6">
         
          <List isOrdered={true}>
            <List.ListItem>First Item</List.ListItem>
            <List.ListItem>Second Item</List.ListItem>
          </List>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
        </div>
      </div>
    </div>
  )
}

export default Page