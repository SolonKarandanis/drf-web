import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Pencil, X, Check, Mail, Phone, MapPin, Camera, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  userQueryOptions,
  userImageQueryOptions,
  uploadUserImage,
  resetPassword,
  updateUserBio,
  updateContactInfo,
  changeAccountStatus,
} from '#/features/users/api'
import {
  socialsQueryOptions,
  userSocialsQueryOptions,
  createUserSocials,
  deleteUserSocial,
  deleteAllUserSocials,
} from '#/features/socials/api'
import { decodeJwtPayload, getAccessTokenValue } from '#/shared/token-storage'
import { UserStatus } from '#/features/users/models'
import type {
  ChangePasswordRequest,
  UpdateBioRequest,
  UpdateContactInfoRequest,
  UserAccountActions,
} from '#/features/users/models'
import type { CreateUserSocialRequest } from '#/features/socials/models'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'
import { FormTextArea } from '#/components/form/FormTextArea'
import { FormInput } from '#/components/form/FormInput'
import { FormButton } from '#/components/form/FormButton'

export const Route = createFileRoute('/$locale/_authed/users/$uuid/')({
  loader: async ({ context, params }) => {
    if (typeof window !== 'undefined') {
      await context.queryClient.ensureQueryData(userQueryOptions(params.uuid))
      context.queryClient.prefetchQuery(userImageQueryOptions(params.uuid))
    }
  },
  component: UserDetailPage,
})

const backendOrigin = () =>
  (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/').replace(/\/api\/?$/, '')

function resolveImage(path: string) {
  return path.startsWith('http') ? path : `${backendOrigin()}${path}`
}

function getLoggedInUserId(): number | null {
  try {
    const token = getAccessTokenValue()
    if (!token) return null
    const payload = decodeJwtPayload(token)
    return typeof payload.user_id === 'number' ? payload.user_id : null
  } catch {
    return null
  }
}

function UserDetailPage() {
  const { locale, uuid } = useParams({ from: '/$locale/_authed/users/$uuid/' })
  const queryClient = useQueryClient()
  const { data: user, isLoading, isError } = useQuery(userQueryOptions(uuid))
  const { data: profileImage } = useQuery(userImageQueryOptions(uuid))

  // getLoggedInUserId reads from localStorage which is only available client-side
  // and only populated after _authed.tsx's useLayoutEffect runs.
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null)
  useEffect(() => {
    setLoggedInUserId(getLoggedInUserId())
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{m.user_detail_loading()}</span>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive" role="alert">
          {isError ? m.user_detail_error() : m.user_detail_not_found()}
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/$locale/users/search" params={{ locale }}>
            {m.user_detail_back()}
          </Link>
        </Button>
      </div>
    )
  }

  const isMe = loggedInUserId !== null && loggedInUserId === user.id
  const details = user.details
  const groupNames = user.groups.map((g) => g.name).join(', ')

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/$locale/users/search"
          params={{ locale }}
          className="hover:text-foreground transition-colors"
        >
          {m.users_search_title()}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-xs">
          {user.firstName} {user.lastName}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Profile header card */}
          <div className="rounded-md border border-border bg-card overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5" />
            <div className="px-6 pb-6 -mt-10">
              <div className="mb-3">
                <AvatarUpload
                  uuid={uuid}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  imageSrc={profileImage ? resolveImage(profileImage.image) : undefined}
                  imageAlt={profileImage?.alt}
                  isMe={isMe}
                  onUploaded={() => queryClient.invalidateQueries({ queryKey: ['users', uuid, 'image'] })}
                />
              </div>

              <div className="space-y-1 mb-4">
                <h2 className="font-semibold text-lg leading-tight">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                {groupNames && (
                  <p className="text-xs text-muted-foreground">{groupNames}</p>
                )}
                {details?.city && details?.country && (
                  <p className="text-xs text-muted-foreground">
                    {details.city}, {details.country}
                  </p>
                )}
                <div className="pt-1">
                  <StatusBadge status={user.status} label={user.statusLabel} />
                </div>
              </div>

              <div className="flex gap-4 pt-3 border-t border-border">
                <StatItem label={m.user_detail_products_stat()} value="—" />
                <StatItem label={m.user_detail_orders_stat()} value="—" />
                <StatItem label={m.user_detail_following_stat()} value="—" />
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="rounded-md border border-border bg-card p-6 space-y-3">
            <p className="text-sm font-semibold">{m.user_detail_roles()}</p>
            {user.groups.length === 0 ? (
              <p className="text-sm text-muted-foreground">{m.user_detail_no_roles()}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.groups.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Account info */}
          <div className="rounded-md border border-border bg-card p-6 space-y-2 text-sm">
            <p className="font-semibold mb-3">{m.user_detail_email()}</p>
            <InfoRow label={m.user_detail_email()} value={user.email} />
            <InfoRow
              label={m.user_detail_member_since()}
              value={new Date(user.createdDate).toLocaleDateString()}
            />
          </div>

          {/* Account actions */}
          <AccountActions uuid={uuid} status={user.status} />
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <BioSection uuid={uuid} bio={user.bio} isMe={isMe} />
          <ContactSection uuid={uuid} details={details} email={user.email} isMe={isMe} />
          <SocialNetworksSection uuid={uuid} userId={user.id} isMe={isMe} />
          {isMe && <ChangePasswordSection email={user.email} />}
        </div>
      </div>
    </div>
  )
}

// ─── Avatar upload ────────────────────────────────────────────────────────────

interface AvatarUploadProps {
  uuid: string
  firstName: string
  lastName: string
  imageSrc?: string
  imageAlt?: string
  isMe: boolean
  onUploaded: () => void
}

function AvatarUpload({ uuid, firstName, lastName, imageSrc, imageAlt, isMe, onUploaded }: AvatarUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { mutate, isPending } = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: () => {
      toast.success(m.user_detail_upload_success())
      onUploaded()
    },
    onError: () => toast.error(m.user_detail_upload_error()),
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    mutate({ userUuid: uuid, image: file, title: file.name, alt: file.name })
    e.target.value = ''
  }

  return (
    <div className="space-y-1">
      <div className="relative inline-block">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || `${firstName} ${lastName}`}
            className="h-20 w-20 rounded-full border-4 border-card object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full border-4 border-card bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {firstName.charAt(0).toUpperCase()}
            {lastName.charAt(0).toUpperCase()}
          </div>
        )}

        {isMe && (
          <>
            <button
              type="button"
              disabled={isPending}
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow hover:bg-primary/90 transition-colors disabled:opacity-50"
              title={m.user_detail_upload_picture()}
            >
              {isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      {isMe && (
        <p className="text-[0.65rem] text-muted-foreground">{m.user_detail_upload_hint()}</p>
      )}
    </div>
  )
}

// ─── Bio ─────────────────────────────────────────────────────────────────────

function BioSection({ uuid, bio, isMe }: { uuid: string; bio: string; isMe: boolean }) {
  const queryClient = useQueryClient()
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState('')
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserBio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', uuid] })
      setIsEdit(false)
    },
    onError: () => setError(m.user_detail_bio_save_error()),
  })
  const { register, handleSubmit, reset } = useForm<UpdateBioRequest>({
    defaultValues: { bio },
  })

  const onSubmit = (data: UpdateBioRequest) => {
    setError('')
    mutate({ uuid, request: data })
  }

  const handleCancel = () => {
    reset({ bio })
    setIsEdit(false)
    setError('')
  }

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">{m.user_detail_bio()}</p>
        {isMe && !isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="h-3 w-3" />
            {m.user_detail_bio_edit()}
          </button>
        )}
        {isMe && isEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            {m.user_detail_bio_cancel()}
          </button>
        )}
      </div>

      {isEdit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormTextArea {...register('bio')} rows={4} />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <FormButton type="submit" size="sm" isLoading={isPending}>
            <Check className="h-3 w-3 mr-1" />
            {m.user_detail_bio_save()}
          </FormButton>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {bio?.trim() ? bio : m.user_detail_no_bio()}
        </p>
      )}
    </div>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

interface ContactSectionProps {
  uuid: string
  details?: {
    country?: string
    state?: string
    city?: string
    address?: string
    zip?: string
    phone?: string
  }
  email: string
  isMe: boolean
}

function ContactSection({ uuid, details, email, isMe }: ContactSectionProps) {
  const queryClient = useQueryClient()
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState('')
  const { mutate, isPending } = useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', uuid] })
      setIsEdit(false)
    },
    onError: () => setError(m.user_detail_contact_save_error()),
  })
  const { register, handleSubmit, reset } = useForm<UpdateContactInfoRequest>({
    defaultValues: {
      country: details?.country ?? '',
      state: details?.state ?? '',
      city: details?.city ?? '',
      address: details?.address ?? '',
      zip: details?.zip ?? '',
      phone: details?.phone ?? '',
    },
  })

  const onSubmit = (data: UpdateContactInfoRequest) => {
    setError('')
    mutate({ uuid, request: data })
  }

  const handleCancel = () => {
    reset()
    setIsEdit(false)
    setError('')
  }

  const location = [details?.address, details?.city, details?.state, details?.country, details?.zip]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold">{m.user_detail_contact()}</p>
        {isMe && !isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="h-3 w-3" />
            {m.user_detail_contact_edit()}
          </button>
        )}
        {isMe && isEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            {m.user_detail_contact_cancel()}
          </button>
        )}
      </div>

      {isEdit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FormInput {...register('phone')} type="tel" placeholder={m.user_detail_phone()} />
            <FormInput {...register('address')} placeholder={m.user_detail_address()} />
            <FormInput {...register('city')} placeholder={m.user_detail_city()} />
            <FormInput {...register('state')} placeholder={m.user_detail_state()} />
            <FormInput {...register('country')} placeholder={m.user_detail_country()} />
            <FormInput {...register('zip')} placeholder={m.user_detail_zip()} />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <FormButton type="submit" size="sm" isLoading={isPending}>
            <Check className="h-3 w-3 mr-1" />
            {m.user_detail_contact_save()}
          </FormButton>
        </form>
      ) : (
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{email}</span>
          </div>
          {details?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{details.phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
          {!details?.phone && !location && (
            <p className="text-muted-foreground text-xs italic">No contact details yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Social networks ──────────────────────────────────────────────────────────

interface SocialNetworksSectionProps {
  uuid: string
  userId: number
  isMe: boolean
}

type SocialFormValues = { socials: Array<{ socialId: string; url: string }> }

function SocialNetworksSection({ uuid, userId, isMe }: SocialNetworksSectionProps) {
  const queryClient = useQueryClient()
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState('')

  const { data: allSocials = [], isLoading: socialsLoading } = useQuery(socialsQueryOptions())
  const { data: userSocials = [], isLoading: userSocialsLoading } = useQuery(userSocialsQueryOptions(uuid))

  const { mutate: saveSocials, isPending: saving } = useMutation({
    mutationFn: createUserSocials,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socials', uuid] })
      setIsEdit(false)
    },
    onError: () => setError(m.user_detail_socials_save_error()),
  })

  const { mutate: deleteOne, isPending: deletingOne } = useMutation({
    mutationFn: deleteUserSocial,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['socials', uuid] }),
    onError: () => setError(m.user_detail_socials_save_error()),
  })

  const { mutate: deleteAll, isPending: deletingAll } = useMutation({
    mutationFn: deleteAllUserSocials,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['socials', uuid] }),
    onError: () => setError(m.user_detail_socials_save_error()),
  })

  const mutating = saving || deletingOne || deletingAll

  const { register, handleSubmit, control, reset } = useForm<SocialFormValues>({
    defaultValues: {
      socials: userSocials.map((s) => ({ socialId: String(s.socialId), url: s.url })),
    },
  })

  const { fields, append, remove } = useFieldArray({ name: 'socials', control })

  const onSubmit = (data: SocialFormValues) => {
    setError('')
    const request: Array<CreateUserSocialRequest> = data.socials.map((s) => ({
      userId,
      socialId: Number(s.socialId),
      url: s.url,
    }))
    saveSocials({ userUuid: uuid, request })
  }

  const handleEdit = () => {
    reset({
      socials: userSocials.map((s) => ({ socialId: String(s.socialId), url: s.url })),
    })
    setIsEdit(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setError('')
  }

  const handleDeleteItem = (index: number) => {
    const field = fields[index]
    const existing = userSocials.find(
      (s) => s.socialId === Number(field.socialId) && s.url === field.url,
    )
    remove(index)
    if (existing) {
      deleteOne({ userUuid: uuid, id: existing.id })
    }
  }

  const handleDeleteAll = () => {
    deleteAll({ userUuid: uuid })
    remove()
  }

  const isLoading = socialsLoading || userSocialsLoading

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold">{m.user_detail_socials()}</p>
        {isMe && !isEdit && (
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="h-3 w-3" />
            {m.user_detail_bio_edit()}
          </button>
        )}
        {isMe && isEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            {m.user_detail_socials_cancel()}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
        </div>
      )}

      {!isLoading && isEdit && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <select
                {...register(`socials.${index}.socialId`)}
                disabled={mutating}
                className="rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {allSocials.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <FormInput
                {...register(`socials.${index}.url`)}
                placeholder={m.user_detail_socials_url()}
                disabled={mutating}
                className="flex-1"
              />
              <button
                type="button"
                disabled={mutating}
                onClick={() => handleDeleteItem(index)}
                className="text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            {allSocials.length > 0 && (
              <button
                type="button"
                disabled={mutating}
                onClick={() => append({ socialId: String(allSocials[0].id), url: '' })}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <Plus className="h-3 w-3" />
                {m.user_detail_socials_add()}
              </button>
            )}
            {fields.length > 0 && (
              <button
                type="button"
                disabled={mutating}
                onClick={handleDeleteAll}
                className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50 ml-auto"
              >
                <Trash2 className="h-3 w-3" />
                {m.user_detail_socials_delete_all()}
              </button>
            )}
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <FormButton type="submit" size="sm" isLoading={saving}>
            <Check className="h-3 w-3 mr-1" />
            {m.user_detail_socials_save()}
          </FormButton>
        </form>
      )}

      {!isLoading && !isEdit && (
        <div className="flex flex-wrap gap-2">
          {userSocials.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{m.user_detail_socials_none()}</p>
          ) : (
            userSocials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs hover:bg-muted/80 transition-colors"
              >
                {s.socialName}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ─── Change password ──────────────────────────────────────────────────────────

function ChangePasswordSection({ email }: { email: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(m.user_detail_change_password_success())
      reset({ email, newPassword: '', confirmPassword: '' })
    },
    onError: () => toast.error(m.user_detail_change_password_error()),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordRequest>({
    defaultValues: { email, newPassword: '', confirmPassword: '' },
  })

  const onSubmit = (data: ChangePasswordRequest) => {
    mutate(data)
  }

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <p className="text-sm font-semibold mb-4">{m.user_detail_change_password()}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          {...register('email')}
          type="email"
          placeholder={m.user_detail_current_email()}
          disabled
        />
        <FormInput
          {...register('newPassword', { required: true, minLength: 8 })}
          type="password"
          placeholder={m.user_detail_new_password()}
          autoComplete="new-password"
        />
        {errors.newPassword && (
          <p className="text-xs text-destructive">Min 8 characters.</p>
        )}
        <FormInput
          {...register('confirmPassword', { required: true })}
          type="password"
          placeholder={m.user_detail_confirm_password()}
          autoComplete="new-password"
        />
        <FormButton type="submit" size="sm" isLoading={isPending}>
          {m.user_detail_change_password_submit()}
        </FormButton>
      </form>
    </div>
  )
}

// ─── Account actions ──────────────────────────────────────────────────────────

function AccountActions({ uuid, status }: { uuid: string; status: UserStatus }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: changeAccountStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', uuid] })
      toast.success(m.user_detail_action_success())
    },
    onError: () => toast.error(m.user_detail_action_error()),
  })

  const apply = (action: UserAccountActions) => {
    mutate({ request: { userId: uuid }, action })
  }

  return (
    <div className="rounded-md border border-border bg-card p-6 space-y-3">
      <p className="text-sm font-semibold">{m.user_detail_actions()}</p>

      <div className="flex flex-wrap gap-2">
        {status !== UserStatus.ACTIVE && (
          <Button size="sm" variant="outline" disabled={isPending} onClick={() => apply('ACTIVATE')}>
            {m.user_detail_activate()}
          </Button>
        )}
        {status === UserStatus.ACTIVE && (
          <Button size="sm" variant="outline" disabled={isPending} onClick={() => apply('DEACTIVATE')}>
            {m.user_detail_deactivate()}
          </Button>
        )}
        {status !== UserStatus.DELETED && (
          <Button size="sm" variant="destructive" disabled={isPending} onClick={() => apply('DELETE')}>
            {isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {m.user_detail_delete()}
          </Button>
        )}
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-bold text-lg leading-none">{value}</p>
      <p className="text-[0.65rem] text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
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
      className={['inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', colorClass].join(' ')}
    >
      {label}
    </span>
  )
}
