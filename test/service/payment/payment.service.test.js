import EmailSenderDummy from "./email.sender.dummy";
import Sale from '../../../main/service/payment/sale'
import CreditCard from '../../../main/service/payment/credit.card'
import PaymentService from '../../../main/service/payment/payment.service'
import LoggerDummy from "./logger.dummy";
import StorageDummy from "./storage.dummy";
import PaymentRestClientStub from "./payment.rest.client.stub";
import Status from "../../../main/service/payment/status";
import EmailSenderMock from "./email.sender.mock";
import EmailSenderSpy from "./email.sender.spy";
import StorageFake from "./storage.fake";

test('given SaleAndCreditCard When BothAreCorrect Then PaymentRequestIsFill', () => {

    let logger = new LoggerDummy()
    let emailSender = new EmailSenderDummy()
    let storage = new StorageDummy()

    let sale = new Sale()
    let creditCard = new CreditCard()

    let paymentService = new PaymentService(logger, emailSender, storage)
    let paymentRequest = paymentService.createPaymentRequest(sale, creditCard)

    expect(paymentRequest.isFill()).toBeTruthy()
});

test('givenPaymentRequestWhenIsValidThenResponseCodeIs200', () => {
    let logger = new LoggerDummy()
    let emailSender = new EmailSenderDummy()
    let storage = new StorageDummy()

    let sale = new Sale()
    let creditCard = new CreditCard()

    let paymentService = new PaymentService(logger, emailSender, storage);
    let paymentRequest = paymentService.createPaymentRequest(sale, creditCard);

    let restClient = new PaymentRestClientStub(Status.OK);

    let paymentResponse = paymentService.sendPayment(paymentRequest, restClient);

    expect(paymentResponse.code).toBe(Status.OK)
});

test('givenPaymentRequestWhenResponseIsErrorThenSendEmail', () => {

    let logger = new LoggerDummy()
    let storage = new StorageDummy()

    let emailSender = new EmailSenderMock()
    let sale = new Sale()
    let creditCard = new CreditCard()

    let paymentService = new PaymentService(logger, emailSender, storage)

    let paymentRequest = paymentService.createPaymentRequest(sale, creditCard);

    let restClient = new PaymentRestClientStub(Status.ERROR);

    let paymentResponse = paymentService.sendPayment(paymentRequest, restClient);

    expect(paymentResponse.code).toBe(Status.ERROR)
    emailSender.expected(paymentRequest);
    emailSender.verify();
});

test('givenPaymentRequestWhenResponseIsErrorThenSendEmailOnce', () => {
    let emailSender = new EmailSenderSpy()
    let sale = new Sale();

    let logger = new LoggerDummy()
    let storage = new StorageDummy()

    let creditCard = new CreditCard()

    let paymentService = new PaymentService(logger, emailSender, storage);
    let paymentRequest = paymentService.createPaymentRequest(sale, creditCard);

    let restClient = new PaymentRestClientStub(Status.ERROR);

    let paymentResponse = paymentService.sendPayment(paymentRequest, restClient);

    expect(paymentResponse.code).toBe(Status.ERROR)
    expect(emailSender.timesCalled()).toBe(1)
});

test('givenPaymentRequestWhenIsWrongThenStorageHaveRequestSaved', () => {
    let emailSender = new EmailSenderDummy()
    let storage = new StorageFake()
    let sale = new Sale();
    let logger = new LoggerDummy()
    let creditCard = new CreditCard()

    let paymentService = new PaymentService(logger, emailSender, storage);
    let paymentRequest = paymentService.createPaymentRequest(sale, creditCard);

    let restClient = new PaymentRestClientStub(Status.ERROR);

    let paymentResponse = paymentService.sendPayment(paymentRequest, restClient);

    expect(paymentResponse.code).toBe(Status.ERROR)

    let requestFromStorage = storage.find(paymentRequest);

    expect(requestFromStorage).toBe(paymentRequest)

});