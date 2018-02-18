import { g_API_KEY } from '../constants/CREDENTIALS';

const ENDPOINT = 'https://www.googleapis.com/drive/v3/files';

export const getDriveFiles = (accessToken, pageToken) => {
  const pageSize = 5;
  let params = `?orderBy=modifiedTime+desc&pageSize=${pageSize}&q=mimeType+%3D+'application%2Fvnd.google-apps.document'&key=${g_API_KEY}`
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
    mode: 'cors',
  }).then(response => response.json());
};
