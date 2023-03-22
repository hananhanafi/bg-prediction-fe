import axios from 'axios';

export const customHeaders = {
  Accept: 'application/json',
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    if (!query) return '';
    return Object.keys(query)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');

};
