"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Credenciais inválidas");
      toast({
        title: "Erro",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login realizado",
        description: "Bem-vindo de volta!",
        variant: "success",
      });

      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-worldtennis-dark flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-worldtennis-subtle"
      >
        <div className="text-center space-y-2">
          <Image
            src="/logo.png"
            alt="Logo World Tennis"
            width={280}
            height={280}
            className="mx-auto rounded-full p-2 bg-white"
          />

          <h1 className="text-3xl font-bold text-worldtennis-dark">Entrar</h1>
          <p className="text-sm text-gray-600">
            Acesse o sistema de recrutamento
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
          />
          {error && (
            <p className="text-red-500 text-sm text-center ">{error}</p>
          )}
          <Button
            type="submit"
            className=" w-full bg-worldtennis-highlight text-white hover:bg-[#800020] "
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>

          <p className="text-sm text-center">
            <a href="#" className="text-worldtennis-dark hover:underline">
              Esqueci minha senha
            </a>
          </p>
        </div>

        <Toaster />
      </form>
    </main>
  );
}
