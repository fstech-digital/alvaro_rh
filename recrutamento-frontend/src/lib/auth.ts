import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './mongodb'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import { dbConnect } from './mongoose'
import jwt from 'jsonwebtoken';



export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),

    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Senha', type: 'password' },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isValid) return null;

                const accessToken = jwt.sign(
                    { id: user._id.toString(), email: user.email, role: user.role || "user" },
                    process.env.JWT_SECRET!,
                    { expiresIn: "30d" }
                );

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role || "user",
                    accessToken,
                };
            }

        }),
    ],

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as 'admin' | 'user';
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
}
