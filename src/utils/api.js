// // src/utils/api.js
// import axios from 'axios';
// import { getSession, signOut } from 'next-auth/react';

// const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// api.interceptors.request.use(async (config) => {
//   const session = await getSession(); // client-side
//   console.log('session', session);
//   const token = session?.accessToken; // ✅ vamos expor isso na callback session
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     // console.debug('Sem accessToken na session (verifique callbacks do NextAuth).');
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await signOut({ callbackUrl: '/login' });
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// src/utils/api.js
// LOGS \\

// src/utils/api.js
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') // sem barra final
});

api.interceptors.request.use(async (cfg) => {
    const session = await getSession();
    const token = session?.accessToken;

    if (token) {
        cfg.headers = cfg.headers || {};
        cfg.headers.Authorization = `Bearer ${token}`;
    }

    return cfg;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response?.status === 401) {
            await signOut({ callbackUrl: '/login' });
        }
        return Promise.reject(err);
    }
);

export default api;
