import { g_API_KEY } from '../constants/CREDENTIALS';

const ENDPOINT = 'https://www.googleapis.com/drive/v3/files';

export const getDriveFiles = (accessToken, pageToken) => {
  let params = `?orderBy=modifiedTime%2Crecency%2CcreatedTime&pageSize=50&key=${g_API_KEY}`
  if (pageToken) {
    params += `&pageToken=${pageToken}`;
  }
  const endpointWithParams = ENDPOINT.concat(params);

  return fetch(endpointWithParams, {
    cache: 'no-cache',
    headers: new Headers({
      'Authorization': `Bearer ${accessToken}`,      
    }),
    method: 'GET',
    mode: 'no-cors',
  }).then(response => response.json());
};
