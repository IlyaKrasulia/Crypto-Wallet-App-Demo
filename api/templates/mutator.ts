// import { auth } from '@/auth';
import axios, { AxiosRequestConfig, AxiosError, isAxiosError } from "axios";
// import { getSession, signOut } from 'next-auth/react';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// AXIOS_INSTANCE.interceptors.request.use(async value => {
//   // If there is Authorization header do nothing
//   if (!value.headers.Authorization) {
//     try {
//       const session = await getSession();
//       value.headers.Authorization = session?.token ? `Bearer ${session.token}` : '';
//     } catch {}

//     try {
//       const session = await auth();
//       value.headers.Authorization = session?.token ? `Bearer ${session.token}` : '';
//     } catch {}
//   }
//   return value;
// });

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
  })
    .then((res) => res.data)
    .catch((err: Error | AxiosError) => {
      if (isAxiosError(err)) {
        const data = err.response?.data;
        // if (err.status === 401) {
        //   signOut();
        // }

        if (typeof data === "string") {
          throw new Error(data);
        }
        if (data?.message) {
          throw data?.message;
        }

        if (Array.isArray(data?.errors) && data?.errors.length > 0) {
          throw new Error(data.errors[0]);
        }

        if (
          Array.isArray(data?.errorMessage) &&
          data?.errorMessage.length > 0
        ) {
          throw new Error(data.errorMessage[0]);
        }
      }
      // Always throw the error so it can reach react query
      throw err;
    });

  return promise;
};
