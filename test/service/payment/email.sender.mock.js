export default class EmailSenderMock {

    constructor() {
        this.paymentRequests = []
        this.expectedPaymentRequests = []
    }

    sendEmail(paymentRequest) {
        this.paymentRequests.push(paymentRequest);
    }

    expected(paymentRequest) {
        this.expectedPaymentRequests.push(paymentRequest);
    }

    verify() {
        return this.paymentRequests.every((v, i) => v === this.expectedPaymentRequests[i]);
    }
}