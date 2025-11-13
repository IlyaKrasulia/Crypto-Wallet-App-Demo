import { apiClient } from 'api/apiClient';

interface Response {
  id: string;
  token: string;
}

interface Params {
  device_id: string;
  device_ip: string;
  device_name: string;
  device_os: string;
}

export const authorize = async (params: Params) => {
  const response = await apiClient.post<Response>('/device/authorize', params);
  return response.data;
};
