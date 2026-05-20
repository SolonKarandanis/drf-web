import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$locale/dashboard',
      params: { locale: params.locale },
    })
  },
})
