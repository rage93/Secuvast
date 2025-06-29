import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Extend NextAuth types to include custom user fields
declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    accessExp: number;
    username?: string;
  }
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
    };
  }
}

interface AccessPayload { exp: number; user_id: number; email?: string; username?: string; }

/* --------------------------------------------------------------------------------- */
/* Helper para refrescar tokens cuando el access está por expirar                    */
/* --------------------------------------------------------------------------------- */
async function refreshTokens(refreshToken: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`;
  const res = await axios.post(url, { refresh: refreshToken }, { validateStatus: () => true });

  if (res.status !== 200) throw new Error("Refresh token inválido");

  const { access, refresh } = res.data;
  const payload = jwtDecode<AccessPayload>(access);

  return {
    accessToken:  access,
    accessExp:    payload.exp,
    refreshToken: refresh ?? refreshToken,   // a veces SimpleJWT no devuelve uno nuevo
  };
}

/* --------------------------------------------------------------------------------- */
/* NextAuth options                                                                  */
/* --------------------------------------------------------------------------------- */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Django",
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/token/`;
        const res = await axios.post(url, credentials, { validateStatus: () => true });
        if (res.status !== 200) return null;

        const { access, refresh } = res.data;
        const payload = jwtDecode<AccessPayload>(access);

        return {
          id: payload.user_id.toString(),
          email: payload.email ?? credentials!.username,
          username: payload.username ?? credentials!.username,
          accessToken:  access,
          refreshToken: refresh,
          accessExp:    payload.exp,
        };
      },
    }),
  ],

  /* ---------- Callbacks ---------- */
  callbacks: {
    /* 1️⃣ Se invoca en **todas** las requests del cliente. */
    async jwt({ token, user }) {
      // Primera vez: copia campos del usuario a "token"
      if (user) {
        token.accessToken  = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessExp    = user.accessExp;
      }

      /* --- Refresh automático si faltan <60 s --- */
      const exp = token.accessExp as number | undefined;
      if (exp && Date.now() / 1000 > exp - 60) {
        try {
          const refreshed = await refreshTokens(token.refreshToken as string);
          token.accessToken  = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken;
          token.accessExp    = refreshed.accessExp;
        } catch {
          /* Refresh falló → se borran los campos y el front hará signOut() */
          delete token.accessToken;
          delete token.refreshToken;
          delete token.accessExp;
        }
      }
      return token;
    },

    /* 2️⃣ Lo que llega al hook `useSession()` */
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
        session.user = { ...session.user, id: token.sub };
      } else {
        /* token vacío → forzamos cierre de sesión */
        session = null as unknown as Session;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages:   { signIn: "/login" },
};

export default NextAuth(authOptions);
