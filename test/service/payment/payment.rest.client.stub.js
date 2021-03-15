import PaymentResponse from '../../../main/service/payment/payment.response'

export default class PaymentRestClientStub {
    constructor(code) {
        this.code = code;
    }

    sendPayment(request) {
        return new PaymentResponse(this.code);
    }
}