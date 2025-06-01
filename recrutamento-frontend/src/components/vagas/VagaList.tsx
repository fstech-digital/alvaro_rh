"use client";

import { useEffect, useState } from "react";
import { fetchVagas } from "@/lib/api/vagas";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Vaga } from "@/types/vaga";

export function VagaList() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchVagas();
        if (Array.isArray(data)) {
          setVagas(data);
        } else if (Array.isArray(data?.vagas)) {
          setVagas(data.vagas);
        } else {
          throw new Error("Formato inesperado da resposta da API");
        }
      } catch (e) {
        setErro("Erro ao carregar vagas");
        toast({
          title: "Erro",
          description: "Não foi possível carregar as vagas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  console.log("Vagas:", vagas);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-worldtennis-dark" />
      </div>
    );
  }

  if (erro) {
    return (
      <p className="text-center text-sm text-red-500">
        Ocorreu um erro: {erro}
      </p>
    );
  }

  if (vagas.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm">
        Nenhuma vaga disponível no momento.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-worldtennis-subtle rounded-xl shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-worldtennis-subtle text-worldtennis-dark font-semibold min-w-[200px]">
              Cargo
            </TableHead>
            <TableHead className="bg-worldtennis-subtle text-worldtennis-dark font-semibold">
              Descrição
            </TableHead>
            <TableHead className="bg-worldtennis-subtle text-worldtennis-dark font-semibold">
              Loja
            </TableHead>
            <TableHead className="bg-worldtennis-subtle text-worldtennis-dark font-semibold">
              Expiração
            </TableHead>
            <TableHead className="bg-worldtennis-subtle text-worldtennis-dark font-semibold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vagas.map((vaga) => (
            <TableRow
              key={vaga._id}
              className="transition-colors hover:bg-red-600 hover:text-white"
            >
              <TableCell className="font-medium">{vaga.nome}</TableCell>
              <TableCell>{vaga.descricao}</TableCell>
              <TableCell>{vaga.loja}</TableCell>
              <TableCell>
                {new Date(vaga.dataExpiracao).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    vaga.ativo
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {vaga.ativo ? "Ativa" : "Desativada"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
