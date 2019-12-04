import 'isomorphic-fetch';
import queryString from 'query-string';

export class Request {
  private api: string;
  private method: string;
  private path: string;
  private params: object = {};
  private payload: object = {};
  private headers: Headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(method: string, api: string, path: string) {
    this.api = api;
    this.method = method;
    this.path = path;
  }

  public setPayload(payload: object): void {
    this.payload = payload;
  }

  public setParams(params: object): void {
    this.params = params;
  }

  public async fetchArray(): Promise<Array<Record<string, any>>> {
    const response = await this.do();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} ${result.error || response.statusText}`);
    }
    return result;
  }

  public async do(): Promise<Response> {
    let query: string = '';
    const init =
      this.method === 'GET'
        ? {
            headers: this.headers,
            method: this.method,
          }
        : {
            body: '',
            headers: this.headers,
            method: this.method,
          };
    if (this.payload && this.method !== 'GET') {
      init.body = JSON.stringify(this.payload);
    }
    if (this.params) {
      query = '?' + queryString.stringify(this.params);
    }
    return await fetch(`${this.api}${this.path}${query}`, init);
  }
}

export default Request;
