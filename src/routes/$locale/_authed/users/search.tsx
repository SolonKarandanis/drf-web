import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'

import { searchUsers } from '#/shared/query/users'
import { allGroupsQueryOptions } from '#/shared/query/users'
import type { UserModel } from '#/models/user.models'
import { UserStatus } from '#/models/user.models'
import type { UserSearchRequest } from '#/models/search.models'
import { m } from '#/paraglide/messages'
import { CForm, FormInput, FormSelect, FormButton } from '#/components/form'

export const Route = createFileRoute('/$locale/_authed/users/search')({
  component: UserSearchPage,
})

const STATUS_OPTIONS = [
  { value: UserStatus.ACTIVE, label: 'Active' },
  { value: UserStatus.UNVERIFIED, label: 'Unverified' },
  { value: UserStatus.DEACTIVATED, label: 'Deactivated' },
  { value: UserStatus.DELETED, label: 'Deleted' },
]

const DEFAULT_PAGING = { page: 1, limit: 10 }

interface FormValues {
  username: string
  name: string
  email: string
  role: number | null
  status: UserStatus | null
}

function UserSearchPage() {
  const { locale } = useParams({ from: '/$locale/_authed/users/search' })
  const { data: groups } = useQuery(allGroupsQueryOptions())
  const [page, setPage] = useState(1)
  const { mutate: doSearch, data, isPending: isLoading, isError } = useMutation({
    mutationFn: searchUsers,
  })

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { username: '', name: '', email: '', role: null, status: null },
  })

  const groupOptions = (groups ?? []).map((g) => ({ value: g.id, label: g.name }))

  const buildRequest = (values: FormValues, p: number): UserSearchRequest => ({
    paging: { ...DEFAULT_PAGING, page: p },
    username: values.username || undefined,
    name: values.name || undefined,
    email: values.email || undefined,
    role: values.role ?? 0,
    status: values.status ?? undefined,
  })

  const onSubmit = (values: FormValues) => {
    setPage(1)
    doSearch(buildRequest(values, 1))
  }

  const handlePage = (values: FormValues, next: number) => {
    setPage(next)
    doSearch(buildRequest(values, next))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">{m.users_search_title()}</h1>

      <div className="rounded-md border border-border bg-card p-6">
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div className="space-y-3">
              <FormInput {...register('username')} placeholder={m.users_search_placeholder_username()}>
                {m.users_search_placeholder_username()}
              </FormInput>
              <FormInput {...register('name')} placeholder={m.users_search_placeholder_name()}>
                {m.users_search_placeholder_name()}
              </FormInput>
              <FormInput
                {...register('email')}
                type="email"
                placeholder={m.users_search_placeholder_email()}
              >
                {m.users_search_placeholder_email()}
              </FormInput>
            </div>

            <div className="space-y-3">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    field={field}
                    options={groupOptions}
                    placeholder={m.users_search_filter_all_roles()}
                    isClearable
                  >
                    {m.users_search_filter_role()}
                  </FormSelect>
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    field={field}
                    options={STATUS_OPTIONS}
                    placeholder={m.users_search_filter_all_statuses()}
                    isClearable
                  >
                    {m.users_search_filter_status()}
                  </FormSelect>
                )}
              />
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-border flex justify-between">
            <FormButton type="submit" intent="info" isLoading={isLoading}>
              {m.users_search_submit()}
            </FormButton>
            <FormButton
              type="button"
              intent="danger"
              isDisabled={isLoading}
              onClick={() => reset()}
            >
              Reset
            </FormButton>
          </div>
        </CForm>
      </div>

      {isError && <p className="text-sm text-destructive">{m.users_search_error()}</p>}

      {data && (
        <>
          <UserTable users={data.data} locale={locale} />

          {data.pages > 1 && (
            <div className="flex items-center gap-3">
              <FormButton
                intent="outline"
                size="sm"
                disabled={page <= 1 || isLoading}
                onClick={handleSubmit((v) => handlePage(v, page - 1))}
              >
                {m.users_search_prev()}
              </FormButton>
              <span className="text-sm text-muted-foreground">
                {m.users_search_pagination({
                  page: String(page),
                  pages: String(data.pages),
                  count: String(data.count),
                })}
              </span>
              <FormButton
                intent="outline"
                size="sm"
                disabled={page >= data.pages || isLoading}
                onClick={handleSubmit((v) => handlePage(v, page + 1))}
              >
                {m.users_search_next()}
              </FormButton>
            </div>
          )}

          {data.data.length === 0 && (
            <p className="text-sm text-muted-foreground">{m.users_search_no_results()}</p>
          )}
        </>
      )}
    </div>
  )
}

function UserTable({ users, locale }: { users: Array<UserModel>; locale: string }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">
              {m.users_search_col_name()}
            </th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">
              {m.users_search_col_username()}
            </th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">
              {m.users_search_col_email()}
            </th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">
              {m.users_search_col_status()}
            </th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">
              {m.users_search_col_created()}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr key={user.uuid} className="hover:bg-muted/40 transition-colors">
              <td className="px-4 py-2">
                <Link
                  to="/$locale/users/$uuid"
                  params={{ locale, uuid: user.uuid }}
                  className="font-medium text-foreground hover:underline"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{user.username}</td>
              <td className="px-4 py-2 text-muted-foreground">{user.email}</td>
              <td className="px-4 py-2">
                <StatusBadge status={user.status} label={user.statusLabel} />
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {new Date(user.createdDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status, label }: { status: UserStatus; label: string }) {
  const colorClass =
    status === UserStatus.ACTIVE
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : status === UserStatus.UNVERIFIED
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        : status === UserStatus.DEACTIVATED
          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        colorClass,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
