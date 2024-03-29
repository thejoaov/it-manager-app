import { ApiError } from '@models/errors';

import { useCallback, useState } from 'react';
import { Meta } from '@services/api/types';
import { AxiosPromise } from 'axios';

export default function useRequest<Response = any, MetaData = Meta>() {
  const [response, setResponse] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | ApiError | undefined>();
  const [meta, setMeta] = useState<MetaData>();

  const request = useCallback(
    async (apiCall: AxiosPromise): Promise<Response> => {
      try {
        setLoading(true);
        const res = await apiCall;
        if (res.data) setResponse(res.data as Response);

        if ((res.data as any).meta) {
          setMeta((res.data as any).meta);
        }

        return res.data as Response;
      } catch (err: any) {
        setError(err);
        setResponse(undefined);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResponse = useCallback(() => {
    setResponse(undefined);
  }, []);

  return { clearResponse, response, loading, error, meta, request };
}
