import PaymentMethod from './interface/paymentMethod';
import Request from './request';

class paymentService {
  private api: string;
  constructor(api: string) {
    this.api = api;
  }
  public getPaymentMethods = async (userId: number): Promise<PaymentMethod[]> => {
    const request = new Request('GET', this.api, 'payment-methods');
    request.setParams({ userId });
    const result = await request.fetchArray();
    return result.map(
      (record: Record<string, any>): PaymentMethod => ({
        cardExpiry: record.cardExpiry,
        cardHolder: record.cardHolder,
        cardNumber: record.cardNumber,
        id: record.id,
        token: record.token,
      }),
    );
  };
  public savePaymentMethod = async (method: PaymentMethod): Promise<boolean> => {
    const request = new Request('POST', this.api, 'payment-methods');
    request.setPayload(method);
    await request.do();
    return true;
  };
  public updatePaymentMethod = async (method: PaymentMethod): Promise<boolean> => {
    const { cardExpiry } = method;
    const request = new Request('PUT', this.api, `payment-methods/${method.id}`);
    request.setPayload({ cardExpiry });
    await request.do();
    return true;
  };
  public makePayment = async (userId: number, methodId: number, amount: number, loanId: string): Promise<boolean> => {
    const request = new Request('POST', this.api, 'payment-gateway/pay');
    request.setPayload({ userId, methodId, amount, loanId });
    await request.do();
    return true;
  };
}

export default paymentService;
