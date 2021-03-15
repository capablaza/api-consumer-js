import PaymentRequest from '../../../main/service/payment/payment.request'
import PaymentResponse from '../../../main/service/payment/payment.response'

export default class PaymentService {
    constructor(logger, emailSender, storage) {
        this.logger = logger;
        this.emailSender = emailSender;
        this.storage = storage;
    }

    createPaymentRequest(sale, creditCard) {
        this.logger.append("Creating payment for sale " + sale);
        return new PaymentRequest(sale, creditCard);
    }

    sendPayment(request, restClient) {
        this.logger.append("Sending payment .... ");
        let paymentResponse = restClient.sendPayment(request);
        this.logger.append("Payment response : " + paymentResponse.code);

        if (paymentResponse.code == PaymentResponse.ERROR) {
            console.log('asdsa adasdsa')
            this.emailSender.sendEmail(request);
            this.storage.save(request);
        }

        return paymentResponse;
    }
}