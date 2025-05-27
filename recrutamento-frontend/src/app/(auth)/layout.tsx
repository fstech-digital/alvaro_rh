import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "../providers";

export const metadata: Metadata = {
  title: "Entrar - Sistema de Recrutamento",
  description: "Autenticação do Sistema de Recrutamento",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
