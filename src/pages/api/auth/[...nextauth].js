// next
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// third-party
import api from 'utils/api';
import { serverApi } from 'utils/serverApi';

export default NextAuth({
    //   debug: true, // 👈 liga logs
    //   logger: {
    //     error: (...args) => console.error('[NextAuth][error]', ...args),
    //     warn: (...args) => console.warn('[NextAuth][warn]', ...args),
    //     debug: (...args) => console.log('[NextAuth][debug]', ...args)
    //   },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    providers: [
        CredentialsProvider({
            id: 'login',
            name: 'Login',
            credentials: {
                login: { label: 'login', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const resp = await serverApi.post('/auth/login', {
                        login: credentials?.login,
                        password: credentials?.password
                    });

                    // backend esperado: { token: '...', user: { id, login, ... } }
                    if (resp.status === 200 && resp.data?.token && resp.data?.user) {
                        return {
                            id: resp.data.user.id,
                            login: resp.data.user.login,
                            accessToken: resp.data.token
                        };
                    }

                    // força erro “exibível” no signIn(...)
                    throw new Error(resp.data?.message || 'Credenciais inválidas');
                } catch (err) {
                    console.error('[AUTH] login error', err?.response?.status, err?.response?.data || err?.message);
                    throw new Error(err?.response?.data?.message || err?.message || 'Login failed');
                }
            }
        }),

        // functionality provided for credentials based authentication is intentionally limited to discourage use of passwords due to the
        // inherent security risks associated with them and the additional complexity associated with supporting usernames and passwords.
        // We recommend to ignore credential based auth unless its super necessary
        // Ref: https://next-auth.js.org/providers/credentials
        // https://github.com/nextauthjs/next-auth/issues/3562
        CredentialsProvider({
            id: 'register',
            name: 'Register',
            credentials: {
                name: { label: 'Name', type: 'text', placeholder: 'Enter Name' },
                email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter Password' }
            },
            async authorize(credentials) {
                try {
                    const user = await api.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
                        name: credentials?.name,
                        password: credentials?.password,
                        email: credentials?.email
                    });

                    if (user) {
                        users.push(user.data);
                        return user.data;
                    }
                } catch (e) {
                    const errorMessage = e?.response.data.message;
                    throw new Error(errorMessage);
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user, account }) => {
            // Primeiro login por Credentials
            if (user?.accessToken) token.accessToken = user.accessToken;
            if (user?.id) token.id = user.id;

            // OAuth (se usar): token pode vir pelo account
            if (account?.access_token) token.accessToken = account.access_token;
            if (account?.provider) token.provider = account.provider;

            return token;
        },
        session: ({ session, token }) => {
            // exponha o accessToken para o cliente (Axios interceptor)
            session.accessToken = token.accessToken;

            // opcional: id do usuário na sessão
            if (token?.id) {
                session.user = { ...(session.user || {}), id: token.id };
            }

            // opcional: provider para debug
            session.provider = token.provider;

            return session;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: Number(process.env.REACT_APP_JWT_TIMEOUT)
    },
    jwt: {
        secret: process.env.REACT_APP_JWT_SECRET
    },
    pages: {
        signIn: '/login',
        newUser: '/register'
    }
});

// // next
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// // third-party
// import api from 'utils/api';
// import { serverApi } from 'utils/serverApi';

// export default NextAuth({
//   debug: true, // 👈 liga logs
//   logger: {
//     error: (...args) => console.error('[NextAuth][error]', ...args),
//     warn: (...args) => console.warn('[NextAuth][warn]', ...args),
//     debug: (...args) => console.log('[NextAuth][debug]', ...args)
//   },
//   secret: process.env.NEXTAUTH_SECRET_KEY,
//   providers: [
//     // CredentialsProvider({
//     //   id: 'login',
//     //   name: 'Login',
//     //   credentials: {
//     //     login: { label: 'login', type: 'text' },
//     //     password: { label: 'Password', type: 'password' }
//     //   },
//     //   async authorize(credentials) {
//     //     try {
//     //       const { data } = await api.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
//     //         login: credentials?.login,
//     //         password: credentials?.password
//     //       });

//     //       console.log('user.data', user.data);
//     //       console.log('[AUTH] /auth/login <=', resp.status, resp.data);

//     //       // Esperado: { token: '...', user: { id, login, ... } }
//     //       if (resp.status === 200 && resp.data?.token && resp.data?.user) {
//     //         return {
//     //           id: resp.data.user.id,
//     //           login: resp.data.user.login,
//     //           accessToken: resp.data.token
//     //         };
//     //       }

//     //       throw new Error(resp.data?.message || 'Credenciais inválidas');
//     //     } catch (e) {
//     //       const errorMessage = e?.response.data.message;
//     //       throw new Error(errorMessage);
//     //     }
//     //   }
//     // }),

//     CredentialsProvider({
//       id: 'login',
//       name: 'Login',
//       credentials: {
//         login: { label: 'login', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         try {
//           const resp = await serverApi.post('/auth/login', {
//             login: credentials?.login,
//             password: credentials?.password
//           });

//           console.log('[AUTH] /auth/login <=', resp.status, resp.data);

//           // backend esperado: { token: '...', user: { id, login, ... } }
//           if (resp.status === 200 && resp.data?.token && resp.data?.user) {
//             return {
//               id: resp.data.user.id,
//               login: resp.data.user.login,
//               accessToken: resp.data.token
//             };
//           }

//           // força erro “exibível” no signIn(...)
//           throw new Error(resp.data?.message || 'Credenciais inválidas');
//         } catch (err) {
//           console.error('[AUTH] login error', err?.response?.status, err?.response?.data || err?.message);
//           throw new Error(err?.response?.data?.message || err?.message || 'Login failed');
//         }
//       }
//     }),

//     // functionality provided for credentials based authentication is intentionally limited to discourage use of passwords due to the
//     // inherent security risks associated with them and the additional complexity associated with supporting usernames and passwords.
//     // We recommend to ignore credential based auth unless its super necessary
//     // Ref: https://next-auth.js.org/providers/credentials
//     // https://github.com/nextauthjs/next-auth/issues/3562
//     CredentialsProvider({
//       id: 'register',
//       name: 'Register',
//       credentials: {
//         name: { label: 'Name', type: 'text', placeholder: 'Enter Name' },
//         email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
//         password: { label: 'Password', type: 'password', placeholder: 'Enter Password' }
//       },
//       async authorize(credentials) {
//         try {
//           const user = await api.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
//             name: credentials?.name,
//             password: credentials?.password,
//             email: credentials?.email
//           });

//           if (user) {
//             users.push(user.data);
//             return user.data;
//           }
//         } catch (e) {
//           const errorMessage = e?.response.data.message;
//           throw new Error(errorMessage);
//         }
//       }
//     })
//   ],
//   callbacks: {
//     jwt: async ({ token, user, account }) => {
//       console.log('callbacks token', token);
//       console.log('callbacks user', user);
//       console.log('callbacks account', account);
//       // Primeiro login por Credentials
//       if (user?.accessToken) token.accessToken = user.accessToken;
//       if (user?.id) token.id = user.id;

//       // OAuth (se usar): token pode vir pelo account
//       if (account?.access_token) token.accessToken = account.access_token;
//       if (account?.provider) token.provider = account.provider;

//       return token;
//     },
//     session: ({ session, token }) => {
//       console.log('session session', session);
//       console.log('session token', token);
//       // exponha o accessToken para o cliente (Axios interceptor)
//       session.accessToken = token.accessToken;

//       // opcional: id do usuário na sessão
//       if (token?.id) {
//         session.user = { ...(session.user || {}), id: token.id };
//       }

//       // opcional: provider para debug
//       session.provider = token.provider;

//       return session;
//     }
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: Number(process.env.REACT_APP_JWT_TIMEOUT)
//   },
//   jwt: {
//     secret: process.env.REACT_APP_JWT_SECRET
//   },
//   pages: {
//     signIn: '/login',
//     newUser: '/register'
//   }
// });
