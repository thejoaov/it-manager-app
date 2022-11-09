import { Ticket } from "@models/tickets";
import apiService from "@services/api";
import { RequestWithPagination } from "@services/api/types";
import { useCallback, useState } from "react";

export const useRequestTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [meta, setMeta] = useState<RequestWithPagination<{}> | null>(null);

  const getAllOpenTickets = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiService.getTickets();
      setTickets(data.data);
      setMeta(data.meta);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tickets,
    loading,
    error,
    meta,
    getAllOpenTickets,
  };
};
