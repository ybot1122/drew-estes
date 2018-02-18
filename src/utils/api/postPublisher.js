const ENDPOINT = 'https://cbok150lka.execute-api.us-west-2.amazonaws.com/QuackRabbitStage/publisher';

export const postPublisher = (accessToken, docId) => {
  return fetch(ENDPOINT, {
    body: JSON.stringify({ accessToken, docId }),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'no-cors',
  }).then(response => response.json());
};