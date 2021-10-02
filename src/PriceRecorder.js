import { getBnbPrice } from "./price.js"

export default class PriceRecorder {
    constructor(dbClient, address, getSurgePriceFn) {
        this.dbClient = dbClient
        this.address = address
        this.getSurgePriceFn = getSurgePriceFn
        this.interval = undefined
    }

    startRecording() {
        this.record()
        this.interval = setInterval(async () => this.record(), 60000)
    }

    stopRecording() {
        clearInterval(this.interval)
    }

    isRecording() {
        return !!this.interval
    }

    setPriceProcessor(processorFn) {
        this.priceProcessor = processorFn;
    }

    async record() {
        let surgeBnbPrice = await this.getSurgePriceFn()

        if (this.priceProcessor) {
            surgeBnbPrice = this.priceProcessor(surgeBnbPrice)
        }

        const bnbUsdPrice = getBnbPrice()

        await this.dbClient.insert(`${this.address} price=${surgeBnbPrice},bnbPrice=${bnbUsdPrice}`)
    }
}