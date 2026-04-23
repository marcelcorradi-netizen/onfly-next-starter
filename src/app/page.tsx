import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="text-sm">
          Onfly Design System
        </Badge>
        <h1 className="text-heading-h1" style={{ color: "var(--content-primary)" }}>
          onfly-next-starter
        </h1>
        <p className="text-body-medium-regular max-w-md" style={{ color: "var(--content-secondary)" }}>
          Template base com Next.js 15, React 19, shadcn/ui e os tokens do Onfly Design System já configurados.
        </p>
        <div className="flex gap-3">
          <Button>Começar</Button>
          <Button variant="outline">Ver componentes</Button>
        </div>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h5">70 componentes</CardTitle>
            <CardDescription>shadcn/ui instalados e tematizados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-small-regular" style={{ color: "var(--content-tertiary)" }}>
              Button, Card, Dialog, Form, Table e muito mais — todos com os tokens Onfly aplicados.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h5">Design tokens</CardTitle>
            <CardDescription>Sincronizados direto do Figma</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-small-regular" style={{ color: "var(--content-tertiary)" }}>
              Cores, tipografia, espaçamento, sombras e grid — tudo como CSS Custom Properties prontas para usar.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-h5">Skills Claude</CardTitle>
            <CardDescription>IA integrada ao fluxo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-small-regular" style={{ color: "var(--content-tertiary)" }}>
              Skills de design system, frontend, landing page, PRD e skill creator já configuradas.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
