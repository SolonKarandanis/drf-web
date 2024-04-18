import SearchInput from '@/shared/components/search-input/search-input'
import { Button } from '@/shared/shadcn/components/ui/button'

const Page = () => {
  return (
    <div>
      dashboard
      <Button variant="destructive">Default</Button>
      <SearchInput />
    </div>
  )
}

export default Page