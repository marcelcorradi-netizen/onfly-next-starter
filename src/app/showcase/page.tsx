"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Terminal } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle, } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ── Sidebar navigation config ────────────────────────────────────────────────
const GROUPS: { label: string; items: { id: string; label: string }[] }[] = [
  {
    label: "Design System",
    items: [
      { id: "colors", label: "Cores" },
      { id: "typography", label: "Tipografia" },
      { id: "spacing", label: "Espaçamento" },
    ],
  },
  {
    label: "Inputs",
    items: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio-group", label: "Radio Group" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "toggle", label: "Toggle" },
      { id: "input-otp", label: "Input OTP" },
    ],
  },
  {
    label: "Display",
    items: [
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "card", label: "Card" },
      { id: "table", label: "Table" },
      { id: "progress", label: "Progress" },
      { id: "skeleton", label: "Skeleton" },
      { id: "separator", label: "Separator" },
      { id: "alert", label: "Alert" },
      { id: "calendar", label: "Calendar" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
      { id: "accordion", label: "Accordion" },
      { id: "collapsible", label: "Collapsible" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { id: "dialog", label: "Dialog" },
      { id: "alert-dialog", label: "Alert Dialog" },
      { id: "sheet", label: "Sheet" },
      { id: "dropdown-menu", label: "Dropdown Menu" },
      { id: "popover", label: "Popover" },
      { id: "tooltip", label: "Tooltip" },
      { id: "hover-card", label: "Hover Card" },
    ],
  },
  {
    label: "Complex",
    items: [
      { id: "command", label: "Command" },
      { id: "scroll-area", label: "Scroll Area" },
    ],
  },
]

// ── Variation row helper ─────────────────────────────────────────────────────
function Var({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium" style={{ color: "var(--content-tertiary)" }}>
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ── Token swatch helper ──────────────────────────────────────────────────────
function Swatch({ name, cssVar, textVar }: { name: string; cssVar: string; textVar?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 w-20 rounded-md border"
        style={{ background: `var(${cssVar})`, borderColor: "var(--border-secondary)" }}
      />
      <span className="text-[10px] font-medium leading-tight" style={{ color: "var(--content-secondary)" }}>{name}</span>
      <span className="text-[9px] leading-tight font-mono" style={{ color: "var(--content-tertiary)" }}>{cssVar}</span>
    </div>
  )
}

// ── Token stories ─────────────────────────────────────────────────────────────
function ColorsStory() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--content-tertiary)" }}>Brand</p>
        <div className="flex flex-wrap gap-3">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => (
            <Swatch key={n} name={`brand-${n}`} cssVar={`--color-brand-${n}`} />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--content-tertiary)" }}>Backgrounds semânticos</p>
        <div className="flex flex-wrap gap-3">
          <Swatch name="primary" cssVar="--background-primary" />
          <Swatch name="secondary" cssVar="--background-secondary" />
          <Swatch name="tertiary" cssVar="--background-tertiary" />
          <Swatch name="brand-subtle-1" cssVar="--background-brand-subtle-1" />
          <Swatch name="brand-subtle-2" cssVar="--background-brand-subtle-2" />
          <Swatch name="brand-solid" cssVar="--background-brand-solid" />
          <Swatch name="primary-inverse" cssVar="--background-primary-inverse" />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--content-tertiary)" }}>Estados</p>
        <div className="flex flex-wrap gap-3">
          <Swatch name="success-subtle-1" cssVar="--background-success-subtle-1" />
          <Swatch name="success-solid" cssVar="--background-success-solid" />
          <Swatch name="warning-subtle-1" cssVar="--background-warning-subtle-1" />
          <Swatch name="warning-solid" cssVar="--background-warning-solid" />
          <Swatch name="error-subtle-1" cssVar="--background-error-subtle-1" />
          <Swatch name="error-solid" cssVar="--background-error-solid" />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--content-tertiary)" }}>Neutros (gray)</p>
        <div className="flex flex-wrap gap-3">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => (
            <Swatch key={n} name={`gray-${n}`} cssVar={`--color-gray-${n}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TypographyStory() {
  const textStyles = [
    { label: "Display Large", cls: "text-display-large" },
    { label: "Display Medium", cls: "text-display-medium" },
    { label: "Display Small", cls: "text-display-small" },
    { label: "Heading H1", cls: "text-heading-h1" },
    { label: "Heading H2", cls: "text-heading-h2" },
    { label: "Heading H3", cls: "text-heading-h3" },
    { label: "Heading H4", cls: "text-heading-h4" },
    { label: "Heading H5", cls: "text-heading-h5" },
    { label: "Heading H6", cls: "text-heading-h6" },
    { label: "Body Medium Regular", cls: "text-body-medium-regular" },
    { label: "Body Medium Medium", cls: "text-body-medium-medium" },
    { label: "Body Medium Semi-Bold", cls: "text-body-medium-semi-bold" },
    { label: "Body Small Regular", cls: "text-body-small-regular" },
    { label: "Body Small Medium", cls: "text-body-small-medium" },
    { label: "Body Small Semi-Bold", cls: "text-body-small-semi-bold" },
    { label: "Label Large", cls: "text-label-large-semi-bold" },
    { label: "Label Medium", cls: "text-label-medium-semi-bold" },
    { label: "Label Small", cls: "text-label-small-semi-bold" },
  ]
  return (
    <div className="space-y-6 max-w-2xl">
      {textStyles.map(({ label, cls }) => (
        <div key={cls} className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: "var(--border-secondary)" }}>
          <span className="w-48 shrink-0 text-[11px] font-mono" style={{ color: "var(--content-tertiary)" }}>{label}</span>
          <span className={cls} style={{ color: "var(--content-primary)" }}>Onfly Design System</span>
        </div>
      ))}
    </div>
  )
}

function SpacingStory() {
  const steps = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120]
  return (
    <div className="space-y-3 max-w-lg">
      {steps.map((n) => (
        <div key={n} className="flex items-center gap-4">
          <span className="w-24 text-right text-[11px] font-mono shrink-0" style={{ color: "var(--content-tertiary)" }}>
            --scale-{n}
          </span>
          <div
            className="h-4 rounded-sm shrink-0"
            style={{ width: `var(--scale-${n})`, background: "var(--background-brand-solid)" }}
          />
          <span className="text-[11px]" style={{ color: "var(--content-secondary)" }}>{n}px</span>
        </div>
      ))}
    </div>
  )
}

// ── Component stories ─────────────────────────────────────────────────────────
function ButtonStory() {
  return (
    <div className="space-y-6">
      <Var label="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </Var>
      <Var label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">+</Button>
      </Var>
      <Var label="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled outline</Button>
      </Var>
    </div>
  )
}

function InputStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Default">
        <Input placeholder="Placeholder" className="w-full" />
      </Var>
      <Var label="Com Label">
        <div className="w-full space-y-1.5">
          <Label htmlFor="inp-label">E-mail</Label>
          <Input id="inp-label" type="email" placeholder="voce@exemplo.com" />
        </div>
      </Var>
      <Var label="Disabled">
        <Input placeholder="Não editável" disabled className="w-full" />
      </Var>
    </div>
  )
}

function TextareaStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Default">
        <Textarea placeholder="Escreva aqui..." className="w-full" />
      </Var>
      <Var label="Com Label">
        <div className="w-full space-y-1.5">
          <Label htmlFor="ta-label">Mensagem</Label>
          <Textarea id="ta-label" placeholder="Descreva seu pedido..." rows={4} />
        </div>
      </Var>
      <Var label="Disabled">
        <Textarea placeholder="Não editável" disabled className="w-full" />
      </Var>
    </div>
  )
}

function SelectStory() {
  return (
    <div className="space-y-6 max-w-xs">
      <Var label="Default">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voo">Voo</SelectItem>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="carro">Carro</SelectItem>
          </SelectContent>
        </Select>
      </Var>
      <Var label="Com Label">
        <div className="w-full space-y-1.5">
          <Label>Categoria</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nacional">Nacional</SelectItem>
              <SelectItem value="internacional">Internacional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Var>
    </div>
  )
}

function CheckboxStory() {
  return (
    <div className="space-y-6">
      <Var label="Default">
        <div className="flex items-center gap-2">
          <Checkbox id="cb1" />
          <Label htmlFor="cb1">Aceitar termos</Label>
        </div>
      </Var>
      <Var label="Checked">
        <div className="flex items-center gap-2">
          <Checkbox id="cb2" defaultChecked />
          <Label htmlFor="cb2">Notificações por e-mail</Label>
        </div>
      </Var>
      <Var label="Disabled">
        <div className="flex items-center gap-2">
          <Checkbox id="cb3" disabled />
          <Label htmlFor="cb3" className="opacity-50">Desabilitado</Label>
        </div>
      </Var>
    </div>
  )
}

function RadioGroupStory() {
  return (
    <div className="space-y-6">
      <Var label="Default">
        <RadioGroup defaultValue="voo">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="voo" id="r1" />
            <Label htmlFor="r1">Voo</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="hotel" id="r2" />
            <Label htmlFor="r2">Hotel</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="carro" id="r3" />
            <Label htmlFor="r3">Carro</Label>
          </div>
        </RadioGroup>
      </Var>
    </div>
  )
}

function SwitchStory() {
  const [on1, setOn1] = useState(false)
  const [on2, setOn2] = useState(true)
  return (
    <div className="space-y-6">
      <Var label="Off">
        <div className="flex items-center gap-3">
          <Switch checked={on1} onCheckedChange={setOn1} id="sw1" />
          <Label htmlFor="sw1">{on1 ? "Ativo" : "Inativo"}</Label>
        </div>
      </Var>
      <Var label="On (default)">
        <div className="flex items-center gap-3">
          <Switch checked={on2} onCheckedChange={setOn2} id="sw2" />
          <Label htmlFor="sw2">{on2 ? "Ativo" : "Inativo"}</Label>
        </div>
      </Var>
      <Var label="Disabled">
        <Switch disabled id="sw3" />
        <Switch disabled defaultChecked id="sw4" />
      </Var>
    </div>
  )
}

function SliderStory() {
  const [val, setVal] = useState([40])
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Default">
        <Slider value={val} onValueChange={setVal} min={0} max={100} step={1} className="w-full" />
        <span className="text-sm text-muted-foreground ml-2">{val[0]}%</span>
      </Var>
      <Var label="Disabled">
        <Slider defaultValue={[60]} disabled className="w-full" />
      </Var>
    </div>
  )
}

function ToggleStory() {
  return (
    <div className="space-y-6">
      <Var label="Default">
        <Toggle>Texto</Toggle>
        <Toggle variant="outline">Outline</Toggle>
      </Var>
      <Var label="Pressed">
        <Toggle defaultPressed>Ativo</Toggle>
      </Var>
      <Var label="Sizes">
        <Toggle size="sm">Pequeno</Toggle>
        <Toggle size="default">Default</Toggle>
        <Toggle size="lg">Grande</Toggle>
      </Var>
      <Var label="Toggle Group">
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
          <ToggleGroupItem value="center">Centro</ToggleGroupItem>
          <ToggleGroupItem value="right">Direita</ToggleGroupItem>
        </ToggleGroup>
      </Var>
    </div>
  )
}

function InputOTPStory() {
  return (
    <div className="space-y-6">
      <Var label="6 dígitos">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Var>
    </div>
  )
}

function BadgeStory() {
  return (
    <div className="space-y-6">
      <Var label="shadcn">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Var>
      <Var label="Onfly semânticas">
        <Badge variant="success">Aprovado</Badge>
        <Badge variant="warning">Pendente</Badge>
        <Badge variant="error">Recusado</Badge>
        <Badge variant="brand">Em aberto</Badge>
      </Var>
    </div>
  )
}

function AvatarStory() {
  return (
    <div className="space-y-6">
      <Var label="Com imagem">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Var>
      <Var label="Fallback">
        <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>JZ</AvatarFallback></Avatar>
      </Var>
    </div>
  )
}

function CardStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Default">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reserva de Voo</CardTitle>
            <CardDescription>São Paulo → Rio de Janeiro</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ida e volta · 2 passageiros · Econômica</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Reservar</Button>
            <Button size="sm" variant="outline">Detalhes</Button>
          </CardFooter>
        </Card>
      </Var>
    </div>
  )
}

function TableStory() {
  const rows = [
    { nome: "Ana Lima", destino: "SP → RJ", tipo: "Voo", valor: "R$ 380", status: "Aprovado", variant: "success" as const },
    { nome: "Carlos Melo", destino: "BH → BSB", tipo: "Voo", valor: "R$ 520", status: "Pendente", variant: "warning" as const },
    { nome: "Julia Souza", destino: "Recife", tipo: "Hotel", valor: "R$ 840", status: "Aprovado", variant: "success" as const },
    { nome: "Pedro Nunes", destino: "Curitiba", tipo: "Carro", valor: "R$ 210", status: "Recusado", variant: "error" as const },
  ]
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Colaborador</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.nome}>
            <TableCell className="font-medium">{r.nome}</TableCell>
            <TableCell>{r.destino}</TableCell>
            <TableCell>{r.tipo}</TableCell>
            <TableCell className="text-right">{r.valor}</TableCell>
            <TableCell><Badge variant={r.variant}>{r.status}</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ProgressStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="25%"><Progress value={25} className="w-full" /></Var>
      <Var label="50%"><Progress value={50} className="w-full" /></Var>
      <Var label="75%"><Progress value={75} className="w-full" /></Var>
      <Var label="100%"><Progress value={100} className="w-full" /></Var>
    </div>
  )
}

function SkeletonStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Text lines">
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Var>
      <Var label="Card skeleton">
        <div className="w-full flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </Var>
    </div>
  )
}

function SeparatorStory() {
  return (
    <div className="space-y-6 max-w-sm">
      <Var label="Horizontal">
        <div className="w-full space-y-4">
          <p className="text-sm">Acima do separador</p>
          <Separator />
          <p className="text-sm">Abaixo do separador</p>
        </div>
      </Var>
      <Var label="Vertical">
        <div className="flex items-center gap-4 h-8">
          <span className="text-sm">Voos</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Hotéis</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Carros</span>
        </div>
      </Var>
    </div>
  )
}

function AlertStory() {
  return (
    <div className="space-y-4 max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Informação</AlertTitle>
        <AlertDescription>Sua solicitação foi recebida e está em análise.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>Não foi possível processar o pagamento. Tente novamente.</AlertDescription>
      </Alert>
    </div>
  )
}

function CalendarStory() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="space-y-4">
      <Var label="Date picker">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
      </Var>
      {date && (
        <p className="text-sm text-muted-foreground">
          Selecionado: {date.toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  )
}

function TabsStory() {
  return (
    <div className="space-y-6">
      <Var label="Default">
        <Tabs defaultValue="voos" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="voos">Voos</TabsTrigger>
            <TabsTrigger value="hoteis">Hotéis</TabsTrigger>
            <TabsTrigger value="carros">Carros</TabsTrigger>
          </TabsList>
          <TabsContent value="voos" className="mt-3">
            <Card><CardContent className="pt-4 text-sm text-muted-foreground">Busque voos nacionais e internacionais.</CardContent></Card>
          </TabsContent>
          <TabsContent value="hoteis" className="mt-3">
            <Card><CardContent className="pt-4 text-sm text-muted-foreground">Encontre hospedagem com os melhores preços.</CardContent></Card>
          </TabsContent>
          <TabsContent value="carros" className="mt-3">
            <Card><CardContent className="pt-4 text-sm text-muted-foreground">Aluguel de veículos em todo o Brasil.</CardContent></Card>
          </TabsContent>
        </Tabs>
      </Var>
    </div>
  )
}

function BreadcrumbStory() {
  return (
    <Var label="Default">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Início</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Viagens</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Reservas</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Var>
  )
}

function PaginationStory() {
  return (
    <Var label="Default">
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </Var>
  )
}

function AccordionStory() {
  return (
    <div className="space-y-6 max-w-md">
      <Var label="Single">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>O que é a Onfly?</AccordionTrigger>
            <AccordionContent>Plataforma de gestão de viagens corporativas.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Como faço uma reserva?</AccordionTrigger>
            <AccordionContent>Acesse Viagens {">"} Reservar e escolha o destino.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Como aprovar uma solicitação?</AccordionTrigger>
            <AccordionContent>Vá em Aprovações e clique em Aprovar na solicitação desejada.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Var>
    </div>
  )
}

function CollapsibleStory() {
  const [open, setOpen] = useState(false)
  return (
    <div className="max-w-xs">
      <Var label="Default">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Mostrar detalhes
              <ChevronRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-1">
            <div className="rounded-md border px-4 py-2 text-sm">Voo: GOL 1234</div>
            <div className="rounded-md border px-4 py-2 text-sm">Hotel: Ibis BH</div>
          </CollapsibleContent>
        </Collapsible>
      </Var>
    </div>
  )
}

function DialogStory() {
  return (
    <Var label="Default">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Abrir dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar reserva</DialogTitle>
            <DialogDescription>Revise os detalhes antes de confirmar sua reserva de viagem.</DialogDescription>
          </DialogHeader>
          <div className="py-2 text-sm text-muted-foreground">SP → RJ · Ida e volta · R$ 380,00</div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Var>
  )
}

function AlertDialogStory() {
  return (
    <Var label="Default">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Excluir reserva</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>Essa ação não pode ser desfeita. A reserva será cancelada permanentemente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Var>
  )
}

function SheetStory() {
  return (
    <div className="space-y-6">
      <Var label="Right (default)">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Abrir sheet →</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Detalhes da viagem</SheetTitle>
              <SheetDescription>Informações completas sobre a sua solicitação.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Destino: São Paulo → Rio de Janeiro</p>
              <p>Data: 10/04/2026</p>
              <p>Passageiros: 2</p>
            </div>
            <SheetFooter className="mt-6">
              <Button className="w-full">Confirmar</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Var>
      <Var label="Left">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">← Abrir sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu lateral</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-1">
              {["Início", "Viagens", "Despesas", "Aprovações"].map((item) => (
                <button key={item} className="w-full rounded px-3 py-2 text-left text-sm hover:bg-secondary">{item}</button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </Var>
    </div>
  )
}

function DropdownMenuStory() {
  return (
    <Var label="Default">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Ações</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Var>
  )
}

function PopoverStory() {
  return (
    <Var label="Default">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Abrir popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Filtros</h4>
            <div className="space-y-1.5">
              <Label htmlFor="pop-input">Destino</Label>
              <Input id="pop-input" placeholder="Ex: São Paulo" />
            </div>
            <Button size="sm" className="w-full mt-2">Aplicar</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Var>
  )
}

function TooltipStory() {
  return (
    <div className="space-y-6">
      <Var label="Default">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Passe o mouse</Button>
          </TooltipTrigger>
          <TooltipContent><p>Reservar voo</p></TooltipContent>
        </Tooltip>
      </Var>
      <Var label="Posições">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}><p>Tooltip {side}</p></TooltipContent>
          </Tooltip>
        ))}
      </Var>
    </div>
  )
}

function HoverCardStory() {
  return (
    <Var label="Default">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@onfly</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>OF</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Onfly Tech</p>
              <p className="text-xs text-muted-foreground mt-0.5">Plataforma de gestão de viagens corporativas.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </Var>
  )
}

function CommandStory() {
  return (
    <div className="max-w-sm">
      <Var label="Default">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup heading="Viagens">
              <CommandItem>Reservar voo</CommandItem>
              <CommandItem>Reservar hotel</CommandItem>
              <CommandItem>Alugar carro</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Configurações">
              <CommandItem>Perfil</CommandItem>
              <CommandItem>Políticas de viagem</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Var>
    </div>
  )
}

function ScrollAreaStory() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  return (
    <Var label="Vertical (200px)">
      <ScrollArea className="h-48 w-60 rounded-md border">
        <div className="p-3 space-y-1">
          {items.map((item) => (
            <div key={item} className="rounded px-2 py-1.5 text-sm hover:bg-secondary cursor-default">
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Var>
  )
}

// ── Story registry ────────────────────────────────────────────────────────────
const STORIES: Record<string, { label: string; component: React.ComponentType }> = {
  colors:         { label: "Cores",         component: ColorsStory },
  typography:     { label: "Tipografia",    component: TypographyStory },
  spacing:        { label: "Espaçamento",   component: SpacingStory },
  button:         { label: "Button",        component: ButtonStory },
  input:          { label: "Input",         component: InputStory },
  textarea:       { label: "Textarea",      component: TextareaStory },
  select:         { label: "Select",        component: SelectStory },
  checkbox:       { label: "Checkbox",      component: CheckboxStory },
  "radio-group":  { label: "Radio Group",   component: RadioGroupStory },
  switch:         { label: "Switch",        component: SwitchStory },
  slider:         { label: "Slider",        component: SliderStory },
  toggle:         { label: "Toggle",        component: ToggleStory },
  "input-otp":    { label: "Input OTP",     component: InputOTPStory },
  badge:          { label: "Badge",         component: BadgeStory },
  avatar:         { label: "Avatar",        component: AvatarStory },
  card:           { label: "Card",          component: CardStory },
  table:          { label: "Table",         component: TableStory },
  progress:       { label: "Progress",      component: ProgressStory },
  skeleton:       { label: "Skeleton",      component: SkeletonStory },
  separator:      { label: "Separator",     component: SeparatorStory },
  alert:          { label: "Alert",         component: AlertStory },
  calendar:       { label: "Calendar",      component: CalendarStory },
  tabs:           { label: "Tabs",          component: TabsStory },
  breadcrumb:     { label: "Breadcrumb",    component: BreadcrumbStory },
  pagination:     { label: "Pagination",    component: PaginationStory },
  accordion:      { label: "Accordion",     component: AccordionStory },
  collapsible:    { label: "Collapsible",   component: CollapsibleStory },
  dialog:         { label: "Dialog",        component: DialogStory },
  "alert-dialog": { label: "Alert Dialog",  component: AlertDialogStory },
  sheet:          { label: "Sheet",         component: SheetStory },
  "dropdown-menu":{ label: "Dropdown Menu", component: DropdownMenuStory },
  popover:        { label: "Popover",       component: PopoverStory },
  tooltip:        { label: "Tooltip",       component: TooltipStory },
  "hover-card":   { label: "Hover Card",    component: HoverCardStory },
  command:        { label: "Command",       component: CommandStory },
  "scroll-area":  { label: "Scroll Area",   component: ScrollAreaStory },
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ShowcasePage() {
  const [selected, setSelected] = useState("colors")
  const story = STORIES[selected]
  const StoryComponent = story?.component

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 overflow-y-auto border-r" style={{ borderColor: "var(--border-secondary)" }}>
        <div
          className="sticky top-0 z-10 border-b bg-background px-4 py-3"
          style={{ borderColor: "var(--border-secondary)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--content-tertiary)" }}>
            Showcase
          </p>
        </div>
        <nav className="p-2">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-4">
              <p
                className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--content-tertiary)" }}
              >
                {group.label}
              </p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                    selected === item.id ? "font-medium" : "hover:bg-secondary"
                  )}
                  style={
                    selected === item.id
                      ? { backgroundColor: "var(--background-brand-subtle-1)", color: "var(--content-brand-accent)" }
                      : { color: "var(--content-primary)" }
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div
          className="sticky top-0 z-10 border-b bg-background px-8 py-4"
          style={{ borderColor: "var(--border-secondary)" }}
        >
          <h1 className="text-lg font-semibold" style={{ color: "var(--content-primary)" }}>
            {story?.label}
          </h1>
        </div>
        <div className="px-8 py-8">
          {StoryComponent ? <StoryComponent /> : null}
        </div>
      </main>
    </div>
  )
}
