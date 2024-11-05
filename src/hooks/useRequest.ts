//@ts-nocheck

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import useSWR, { SWRConfiguration } from 'swr';
import { ApiError, ApiResponse } from '../types';
import useFetcher, { FetcherOptions } from './useFetcher';

type UseRequestParameters<T> = {
  uri: string;
  options?: SWRConfiguration<T>;
  fetcherOptions?: FetcherOptions;
};

/**
 * `useSWR` default options
 */
const defaultOptions: SWRConfiguration = {
  onErrorRetry: (error: ApiError, key, config, revalidate, { retryCount }): void => {
    // Only retry on 404s up to 5 times
    // eslint-disable-next-line no-useless-return
    if (error.status === 404 && retryCount > 5) return;
  },
};

const useRequest = <T>({
  uri,
  options,
  fetcherOptions,
}: UseRequestParameters<T>): ApiResponse<T> => {
  // Fetch data only if the `uri` and `token` are not empty strings.
  // https://swr.vercel.app/docs/conditional-fetching
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isValidating, isLoading } = useSWR<T, ApiError>(
    { uri, fetcherOptions },
    uri ? useFetcher : null,
    {
      ...defaultOptions,
      ...options,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { data, error, isValidating, isLoading };
};

export default useRequest;
