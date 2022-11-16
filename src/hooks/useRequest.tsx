import { ApiError } from '@models/errors';

import { useCallback, useState } from 'react';
import { ResponseWithPagination } from '@services/api/types';
import { AxiosPromise } from 'axios';

export default function useRequest<Response = any, Meta = any>() {
  const [response, setResponse] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | ApiError | undefined>();
  const [meta, setMeta] = useState<Meta | ResponseWithPagination<Response>>();

  const request = useCallback(async (apiCall: AxiosPromise) => {
    setLoading(true);
    try {
      const res = await apiCall;
      if (res.data) setResponse(res.data as Response);
      if ((res.data as any).meta) {
        setMeta((res.data as any).meta);
      }
    } catch (err: any) {
      setError(err);
      setResponse(undefined);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(undefined);
  }, []);

  return { clearResponse, response, loading, error, meta, request };
}
