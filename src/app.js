import express from 'express'
import cors from 'cors'

import PriceRecorder from './PriceRecorder.js'
import router from './routes/index.js'
import QuestDbClient from './QuestDbClient.js'
import {
    getPriceInBnb,
    getSurgeUselessPriceInBnb,
    startBnbPriceUpdateLoop
} from './price.js'
import {Contracts} from "./contracts.js";

// connect to QuestDB
export const questDbClient = new QuestDbClient({
    ingest: {
        host: process.env.QUESTDB_HOST || 'localhost',
        port: Number(process.env.QUESTDB_INFLUX_PORT) || 9009,
    },
    query: {
        protocol: process.env.QUESTDB_PROTOCOL || 'http',
        host: process.env.QUESTDB_HOST || 'localhost',
        port: Number(process.env.QUESTDB_REST_PORT) || 9000,
    },
})
questDbClient.connect()

// Start updating the BNB price and then start recording prices
startBnbPriceUpdateLoop().then(() => {
    const surgePriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeBnb.address, () => getPriceInBnb(Contracts.SurgeBnb.address))
    surgePriceRecorder.startRecording()

    const surgeUsdPriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeUsd.address, () => getPriceInBnb(Contracts.SurgeUsd.address))
    surgeUsdPriceRecorder.startRecording()

    const surgeEthPriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeEth.address, () => getPriceInBnb(Contracts.SurgeEth.address))
    surgeEthPriceRecorder.startRecording()

    const surgeBtcPriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeBtc.address, () => getPriceInBnb(Contracts.SurgeBtc.address))
    surgeBtcPriceRecorder.startRecording()

    const surgeAdaPriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeAda.address, () => getPriceInBnb(Contracts.SurgeAda.address))
    surgeAdaPriceRecorder.startRecording()

    const surgeUselessPriceRecorder = new PriceRecorder(questDbClient, Contracts.SurgeUseless.address, () => getSurgeUselessPriceInBnb(Contracts.SurgeUseless.address))
    surgeUselessPriceRecorder.startRecording()

    const xusdPriceRecorder = new PriceRecorder(questDbClient, Contracts.XUSD.address, () => getPriceInBnb(Contracts.XUSD.address))
    xusdPriceRecorder.startRecording()
})

// configure and start rest api
const app = express()
app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(process.env.PORT || 3000)
