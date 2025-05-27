import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "../providers";
import { dbConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AppLayout from "@/components/layouts/app-layout";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "World Tennis",
  description: "Sistema de recrutamento da World Tennis",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR">
      <body>
        <Providers session={session}>
          <AppLayout breadcrumb={{ current: "Início" }}>
            {children}
            <Toaster />
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
