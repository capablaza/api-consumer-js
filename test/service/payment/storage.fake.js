export default class StorageFake {

    constructor() {
        this.paymentRequests = []
    }

    save(request) {
        this.paymentRequests.push(request);
    }

    find(request) {
        return this.paymentRequests.find(e => e == request)
    }

}