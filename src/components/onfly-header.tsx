"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CreditCard,
  Flag,
  HandCoins,
  HelpCircle,
  Home,
  Hotel,
  LayoutGrid,
  Plane,
  Receipt,
  Rocket,
  Settings,
  Shield,
  Ticket,
  Users,
  WalletCards,
  Waypoints,
} from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import logoSrc from "@/assets/logo.svg"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type HeaderMenuKey =
  | "viagens"
  | "despesas"
  | "gestao"
  | "configuracoes"

type HeaderItemKey =
  | "inicio"
  | "viagens"
  | "despesas"
  | "aprovacoes"
  | "gestao"
  | "configuracoes"

type HeaderAction = {
  label: string
  icon: LucideIcon
  href?: string
}

type HeaderNavItem = {
  key: HeaderItemKey
  label: string
  icon: LucideIcon
  href?: string
  menuKey?: HeaderMenuKey
}

export type OnflyHeaderProps = {
  className?: string
  activeItem?: HeaderItemKey
  defaultOpenMenu?: HeaderMenuKey | null
  userName?: string
  userInitials?: string
  onNavigate?: (key: HeaderItemKey | HeaderMenuKey, href?: string) => void
}

const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { key: "inicio", label: "Início", icon: Home, href: "/" },
  { key: "viagens", label: "Viagens", icon: BriefcaseBusiness, href: "#", menuKey: "viagens" },
  { key: "despesas", label: "Despesas", icon: CreditCard, href: "#", menuKey: "despesas" },
  { key: "aprovacoes", label: "Aprovações", icon: Flag, href: "#" },
  { key: "gestao", label: "Gestão", icon: WalletCards, href: "#", menuKey: "gestao" },
  { key: "configuracoes", label: "Configurações", icon: Settings, href: "#", menuKey: "configuracoes" },
]

const HEADER_MENUS: Record<HeaderMenuKey, HeaderAction[]> = {
  viagens: [
    { label: "Reservar", icon: Ticket, href: "#" },
    { label: "Reservas realizadas", icon: BriefcaseBusiness, href: "#" },
    { label: "Concierge", icon: Hotel, href: "#" },
    { label: "Monitor de segurança", icon: Shield, href: "#" },
  ],
  despesas: [
    { label: "Despesas", icon: Receipt, href: "#" },
    { label: "Relatórios", icon: LayoutGrid, href: "#" },
    { label: "Adiantamentos", icon: HandCoins, href: "#" },
  ],
  gestao: [
    { label: "Cartões", icon: CreditCard, href: "#" },
    { label: "Faturas", icon: Receipt, href: "#" },
    { label: "Acompanhar orçamentos", icon: Building2, href: "#" },
    { label: "Créditos", icon: HandCoins, href: "#" },
    { label: "Travel BI", icon: Waypoints, href: "#" },
    { label: "Relatório de reservas", icon: Plane, href: "#" },
    { label: "Bilhetes não voados", icon: Ticket, href: "#" },
  ],
  configuracoes: [
    { label: "Dados da empresa", icon: Building2, href: "#" },
    { label: "Colaboradores", icon: Users, href: "#" },
    { label: "Políticas de viagens", icon: BriefcaseBusiness, href: "#" },
    { label: "Seguro viagem", icon: Shield, href: "#" },
    { label: "Pagamentos", icon: HandCoins, href: "#" },
    { label: "Onfly connect", icon: Rocket, href: "#" },
    { label: "Orçamentos", icon: Building2, href: "#" },
    { label: "Campos gerenciais", icon: LayoutGrid, href: "#" },
  ],
}

const MENU_WIDTH: Record<HeaderMenuKey, string> = {
  viagens: "w-[202px]",
  despesas: "w-[197px]",
  gestao: "w-[252px]",
  configuracoes: "w-[245px]",
}

export function OnflyHeader({
  className,
  activeItem = "inicio",
  defaultOpenMenu = null,
  userName = "Marcel Corradi",
  userInitials = "MC",
  onNavigate,
}: OnflyHeaderProps) {
  const [openMenu, setOpenMenu] = useState<HeaderMenuKey | null>(defaultOpenMenu)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setOpenMenu(defaultOpenMenu)
  }, [defaultOpenMenu])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  function handleNavClick(item: HeaderNavItem) {
    if (item.menuKey) {
      setOpenMenu((current) => (current === item.menuKey ? null : item.menuKey!))
    } else {
      setOpenMenu(null)
    }

    onNavigate?.(item.key, item.href)
  }

  function handleMenuAction(menuKey: HeaderMenuKey, action: HeaderAction) {
    setOpenMenu(null)
    onNavigate?.(menuKey, action.href)
  }

  return (
    <header
      ref={rootRef}
      className={cn(
        "relative z-20 border-b bg-background",
        className
      )}
      style={{ borderColor: "var(--border-secondary)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Onfly">
          <Image src={logoSrc} alt="Onfly" height={28} priority />
        </Link>

        <nav className="flex min-w-0 flex-1 items-center gap-1">
          {HEADER_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.key
            const isOpen = openMenu === item.menuKey

            const isRealNavHref = !item.menuKey && item.href && item.href !== "#"
            const navButtonClass = cn(
              "flex h-10 items-center gap-2 rounded-md px-4 text-[15px] tracking-[-0.01em] transition-colors",
              "hover:bg-secondary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "font-medium" : "font-normal"
            )
            const navButtonStyle = {
              color: "var(--content-primary)",
              backgroundColor: isOpen ? "var(--background-secondary)" : "transparent",
            }
            const navButtonInner = (
              <>
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--content-brand-accent)" }}
                  strokeWidth={1.9}
                />
                <span className="whitespace-nowrap">{item.label}</span>
                {item.menuKey ? (
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                    style={{ color: "var(--content-secondary)" }}
                    strokeWidth={1.8}
                  />
                ) : null}
              </>
            )

            return (
              <div key={item.key} className="relative">
                {isRealNavHref ? (
                  <Link href={item.href!} className={navButtonClass} style={navButtonStyle}>
                    {navButtonInner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={navButtonClass}
                    style={navButtonStyle}
                  >
                    {navButtonInner}
                  </button>
                )}

                {item.menuKey && isOpen ? (
                  <div
                    className={cn(
                      "absolute left-0 top-[52px] overflow-hidden rounded-lg border bg-background py-1 shadow-[0_10px_16px_-3px_rgba(9,11,14,0.04),0_4px_6px_-4px_rgba(9,11,14,0.04)]",
                      MENU_WIDTH[item.menuKey]
                    )}
                    style={{ borderColor: "var(--border-secondary)" }}
                  >
                    {HEADER_MENUS[item.menuKey].map((action) => {
                      const ActionIcon = action.icon
                      const isRealHref = action.href && action.href !== "#"
                      const sharedClass = "flex h-10 w-full items-center gap-2 px-4 text-left text-sm transition-colors hover:bg-secondary"
                      const sharedStyle = { color: "var(--content-primary)" }
                      const inner = (
                        <>
                          <ActionIcon
                            className="h-4 w-4 shrink-0"
                            style={{ color: "var(--content-brand-accent)" }}
                            strokeWidth={1.8}
                          />
                          <span>{action.label}</span>
                        </>
                      )

                      return isRealHref ? (
                        <Link
                          key={action.label}
                          href={action.href!}
                          className={sharedClass}
                          style={sharedStyle}
                          onClick={() => setOpenMenu(null)}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => handleMenuAction(item.menuKey!, action)}
                          className={sharedClass}
                          style={sharedStyle}
                        >
                          {inner}
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md px-3 text-[15px] tracking-[-0.01em] transition-colors hover:bg-secondary"
            style={{ color: "var(--content-primary)" }}
          >
            <HelpCircle className="h-4 w-4" strokeWidth={1.8} />
            <span>Ajuda</span>
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            style={{ color: "var(--content-secondary)" }}
            aria-label="Acessos rápidos"
          >
            <Rocket className="h-4 w-4" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="ml-1 flex items-center gap-3 rounded-full p-0 transition-colors hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={userName}
          >
            <Avatar
              size="default"
              className="h-8 w-8 border-2"
              style={{
                backgroundColor: "var(--background-brand-subtle-1)",
                borderColor: "var(--background-primary)",
              }}
            >
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  backgroundColor: "var(--background-brand-subtle-1)",
                  color: "var(--content-brand-accent)",
                }}
              >
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  )
}
