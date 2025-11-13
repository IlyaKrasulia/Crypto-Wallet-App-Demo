import { apiClient } from 'api/apiClient';

interface Response {
  id: string;
  mnemonic: string;
  name: string;
}

interface Params {
  mnemonic: string[];
  name: string;
}

export const importMultiWallet = async (params: Params) => {
  const response = await apiClient.post<Response>('/multi_wallet/import', params);
  return response.data;
};
