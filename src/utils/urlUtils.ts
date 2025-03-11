import { parse } from 'url';
import { ParsedUrlQuery } from 'querystring';
import { isValidUUID } from './validationUtils';

export interface ParsedUrl {
  pathname: string;
  query: ParsedUrlQuery;
}

const parseUrl = (url: string): ParsedUrl => {
  const parsedUrl = parse(url, true);
  const pathname = parsedUrl.pathname || '/';
  const { query } = parsedUrl;

  return { pathname, query };
};

const getIdFromUrl = (url: string): string => {
  const pathSegments = url.split('/');

  return pathSegments[pathSegments.length - 1];
};

export const getIsIdValid = (
  reqUrl: string
): {
  userId: string;
  isIdValid: boolean;
} => {
  const { pathname } = parseUrl(reqUrl || '');
  const userId = getIdFromUrl(pathname);

  return { userId, isIdValid: isValidUUID(userId) };
};
