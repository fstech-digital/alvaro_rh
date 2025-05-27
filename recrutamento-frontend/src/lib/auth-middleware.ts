import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const authMiddleware = withAuth(
    function middleware(req: NextRequest) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // permite acesso se estiver autenticado
        },
        pages: {
            signIn: "/login",
        },
    }
);
