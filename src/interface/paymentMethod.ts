export default interface PaymentMethod {
  id: number;
  token: string;
  cardNumber: string;
  cardExpiry: string;
  cardHolder: string;
}
