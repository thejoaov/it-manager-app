import { ApiError } from '@models/errors';

import { useCallback, useState } from 'react';
import { ResponseWithPagination } from '@services/api/types';
import { AxiosPromise } from 'axios';

export default function useRequest<Response = any>() {
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | ApiError | null>(null);
  const [meta, setMeta] = useState<ResponseWithPagination<Response> | null>(
    null
  );

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
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    response,
    loading,
    error,
    meta,
    request,
  };
}
