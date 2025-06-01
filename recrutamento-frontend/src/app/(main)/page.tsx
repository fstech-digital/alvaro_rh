"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DebugToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      console.log("🔐 Copie este token para testar no Insomnia:");
      console.log(session.accessToken);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Debug Token</h1>
      <p className="text-gray-700">
        Verifique o console do navegador para o token de acesso.
      </p>
    </div>
  );
}
