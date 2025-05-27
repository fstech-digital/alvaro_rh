export { authMiddleware as default } from "@/lib/auth-middleware";

export const config = {
    matcher: [
        // Protege tudo, exceto:
        // - /api/auth (NextAuth)
        // - /login
        // - arquivos estáticos (_next, favicon, logo)
        "/((?!api/auth|_next|favicon.ico|logo.png|login).*)",
    ],
};
