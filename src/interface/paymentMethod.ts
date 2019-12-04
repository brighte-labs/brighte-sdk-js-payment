export default interface PaymentMethod {
  id: number;
  token: string;
  type: string;
  cardNumber: string;
  cardExpiry: string;
  cardHolder: string;
  cardType: string;
}
