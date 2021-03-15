export default class PaymentRequest {
    constructor(sale, creditCard) {
        this.sale = sale;
        this.creditCard = creditCard;
    }

    isFill() {
        return (this.sale != null && this.creditCard != null);
    }
}