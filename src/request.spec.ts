import 'isomorphic-fetch';
import fetch from 'jest-fetch-mock';
import Request from './request';

describe('Request', (): void => {
  const fetchAny = fetch as any;
  afterEach((): void => {
    fetchAny.resetMocks();
  });
  test('success', async (): Promise<any> => {
    const body = [{ data: '12345' }];
    fetchAny.mockResponseOnce(JSON.stringify(body));
    const request = new Request('GET', 'http://localhost:8080/', 'endpoint');
    request.setParams({ userId: 10 });
    const result = await request.fetchArray();
    expect(result).toEqual(body);
  });
  test('failure', async (): Promise<any> => {
    const body = { error: 'invalid token' };
    fetchAny.mockResponseOnce(JSON.stringify(body), { status: 401 });
    const request = new Request('GET', 'http://localhost:8080/', 'endpoint');
    request.setParams({ userId: 10 });
    await request.fetchArray().catch((e: Error) => {
      expect(e.message).toEqual('401 invalid token');
    });
  });
});
