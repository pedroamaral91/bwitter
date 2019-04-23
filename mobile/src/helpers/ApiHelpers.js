export const url = 'http://172.16.2.75:3000';

export const postJSON = async (urlFetch, params) => {
  const formData = JSON.stringify(params);
  const headers = new Headers({"Content-type": "application/json"});
  const requestInfo = { method: 'POST', body: formData, headers: headers };
  const fetchApi = await fetch(`${url}/${urlFetch}`, requestInfo);
  const response = await fetchApi.json();
  return response;
}