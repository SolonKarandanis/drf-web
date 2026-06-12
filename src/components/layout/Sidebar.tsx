import { useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Heart,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react'
import { NAV_ITEMS } from './nav-items'

const ICONS: Record<string, React.ElementType> = {
  home: Home,
  package: Package,
  users: Users,
  'shopping-cart': ShoppingCart,
  heart: Heart,
  'clipboard-list': ClipboardList,
  dashboard: LayoutDashboard,
}

interface Props {
  locale: string
  collapsed: boolean
  isAdmin: boolean
  isBuyer: boolean
}

export function Sidebar({ locale, collapsed, isAdmin, isBuyer }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (title: string) =>
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }))

  const isActive = (path: string) =>
    pathname.includes(`/${locale}/${path}`)

  return (
    <aside
      className={[
        'flex flex-col h-screen bg-card border-r border-border transition-all duration-200 flex-shrink-0',
        collapsed ? 'w-16' : 'w-60',
      ].join(' ')}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border flex-shrink-0 overflow-hidden">
        <div className="h-7 w-7 rounded-md bg-primary flex-shrink-0 flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">D</span>
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm text-foreground truncate">DRF Market</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.filter((item) => !item.buyerOnly || isBuyer).map((item) => {
          const Icon = ICONS[item.icon] ?? Home

          if (item.children) {
            const anyChildActive = item.children.some((c) => isActive(c.path))
            const open = openGroups[item.title] ?? anyChildActive

            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() => toggleGroup(item.title)}
                  className={[
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    anyChildActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.title}</span>
                      {open ? (
                        <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                      )}
                    </>
                  )}
                </button>

                {!collapsed && open && (
                  <ul className="ml-4 pl-3 border-l border-border mt-0.5 space-y-0.5">
                    {item.children.filter((c) => !c.adminOnly || isAdmin).map((child) => (
                      <li key={child.path}>
                        <a
                          href={`/${locale}/${child.path}`}
                          className={[
                            'block px-3 py-1.5 rounded-md text-sm transition-colors',
                            isActive(child.path)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                          ].join(' ')}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          }

          return (
            <a
              key={item.title}
              href={`/${locale}/${item.path}`}
              className={[
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive(item.path!)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ].join(' ')}
              title={collapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
