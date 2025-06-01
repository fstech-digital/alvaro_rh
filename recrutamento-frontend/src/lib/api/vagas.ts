import { getSession } from "next-auth/react";
import { apiClient } from "./axios";

export async function fetchVagas() {
    const session = await getSession();

    if (!session?.accessToken) {
        throw new Error("Token de autenticação não encontrado.");
    }

    try {
        const res = await apiClient.get("/vagas", {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return res.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Erro ao buscar vagas.");
    }
}
