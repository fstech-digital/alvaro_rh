import { VagaList } from "@/components/vagas/VagaList";

export default function VagasPage() {
  return (
    <main className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-worldtennis-highlight">
        Vagas Disponíveis
      </h1>
      <VagaList />
    </main>
  );
}
