import { useState, useEffect } from 'react';

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export default function useAsync<T extends FunctionReturningPromise>(fn: T) {
  const [state, set] = useState<{ loading: boolean; value?: unknown }>({
    loading: true,
  });

  const callback = () => {
    fn().then(
      (value) => {
        set({
          loading: false,
          value,
        });
      },
      (error) => {
        set({
          loading: false,
        });
        console.log(error);
      },
    );
  };

  useEffect(() => {
    callback();
  }, [fn]);

  return state;
}
