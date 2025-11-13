import { apiClient } from 'api/apiClient';

interface Response {
  id: string;
  mnemonic: string[];
  name: string;
}

interface Params {
  mnemonic: string;
}

export const exportMultiWallet = async (params: Params) => {
  const response = await apiClient.post<Response>('/multi_wallet/export', params);
  return response.data;
};
