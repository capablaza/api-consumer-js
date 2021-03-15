export default class EmailSenderSpy {

    constructor() {
        this.paymentRequests = []
    }

    sendEmail(paymentRequest) {
        this.paymentRequests.push(paymentRequest)
    }

    timesCalled() {
        return this.paymentRequests.length
    }
}