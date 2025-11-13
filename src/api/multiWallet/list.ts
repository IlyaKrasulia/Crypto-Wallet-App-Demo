import { apiClient } from 'api/apiClient';

interface Response {
  balance: number;
  id: string;
  name: string;
  pnl: number;
  roi: number;
}

export const list = async () => {
  const response = await apiClient.get<Response[]>('/multi_wallet/list');
  return response.data;
};
