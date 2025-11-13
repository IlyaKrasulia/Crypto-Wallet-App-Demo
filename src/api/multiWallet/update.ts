import { apiClient } from 'api/apiClient';

interface Response {
  id: string;
  name: string;
}

interface Params {
  name: string;
}

export const update = async (params: Params) => {
  const response = await apiClient.post<Response>('/multi_wallet/update', params);
  return response.data;
};
