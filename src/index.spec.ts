import paymentService from '.';
const methods = [
  {
    cardExpiry: '04/22',
    cardHolder: 'Steve Rogers',
    cardNumber: '1234xxxxxxxx1234',
    cardType: 'VISA',
    id: 'asfiejfaslfsafi4aj',
    token: 'fdsaflsa;kfjaseifja',
    type: 'card',
  },
];
const get = {
  fetchArray: jest.fn().mockImplementation(() => Promise.resolve(methods)),
  setParams: jest.fn(),
};
jest.mock('./request', () => {
  return jest.fn().mockImplementation(method => {
    if (method === 'GET') {
      return get;
    }
  });
});

describe('payment service', () => {
  describe('getPaymentMethods', () => {
    test('success', async (): Promise<any> => {
      const api = new paymentService('http://localhost', 'jwt');
      const result = await api.getPaymentMethods(1);
      expect(result).toEqual(methods);
    });
  });
});
