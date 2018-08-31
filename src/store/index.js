import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    langs: [],
    baseCoins: [],
    cashRates: {},
    cashUnit: null,
    cashRate: [],
    market: null,
    coinText: null,
    coin: null,
    baseCoin: null,
    price: 0,
    yesterdayPrice: 0,
    highestPrice: 0,
    lowestPrice: 0,
    amount: 0,
    pairs: [],
    selectedBaseCoin: null,
    member: {},
    buy: null,
    sell: null,
    buyAmount: null,
    sellAmount: null,
    buyAmountMax: 0,
    sellAmountMax: 0,
    buyCash: '≈ 0.00',
    sellCash: '≈ 0.00',
    assets: 0,
    dealNoCompletes: [],
    dealCompletes: [],
    coinRecharges: [],
    recents: [],
  },
  getters: {
    langs: state => state.langs,
    baseCoins: state => state.baseCoins,
    cashUnit: state => state.cashUnit,
    cashRate: state => state.cashRate,
    market: state => state.market,
    coinText: state => state.coinText,
    coin: state => state.coin,
    baseCoin: state => state.baseCoin,
    price: state => state.price,
    yesterdayPrice: state => state.yesterdayPrice,
    highestPrice: state => state.highestPrice,
    lowestPrice: state => state.lowestPrice,
    amount: state => state.amount,
    pairs: state => state.pairs,
    selectedBaseCoin: state => state.selectedBaseCoin,
    member: state => state.member,
    buy: state => state.buy,
    sell: state => state.sell,
    buyAmount: state => state.buyAmount,
    sellAmount: state => state.sellAmount,
    buyAmountMax: state => state.buyAmountMax,
    sellAmountMax: state => state.sellAmountMax,
    buyCash: state => state.buyCash,
    sellCash: state => state.sellCash,
    assets: state => state.sellAmountMax,
    dealNoCompletes: state => state.dealNoCompletes,
    dealCompletes: state => state.dealCompletes,
    coinRecharges: state => state.coinRecharges,
    recents: state => state.recents,
  },
  mutations: {
    [TYPES.LANGS](state, langs) {
      state.langs = langs
    },
    [TYPES.CASH_UNIT](state, cashUnit) {
      state.cashUnit = cashUnit
    },
    [TYPES.CASH_RATES](state, cashRates) {
      state.cashRates = cashRates
    },
    [TYPES.CASH_RATE](state, cashRate) {
      state.cashRate = cashRate
    },
    [TYPES.BASE_COINS](state, baseCoins) {
      state.baseCoins = baseCoins
    },
    [TYPES.MARKET](state, market) {
      state.market = market
      for (const pair of state.pairs) {
        if (pair.market === state.market) {
          state.coinText = pair.coinText
          state.market = pair.market
          state.coin = pair.coin
          state.baseCoin = pair.baseCoin
          state.price = pair.price
          state.yesterdayPrice = pair.yesterdayPrice
          state.highestPrice = pair.highestPrice
          state.lowestPrice = pair.lowestPrice
          state.amount = pair.amount
        }
        pair.isActive = pair.market === state.market
      }
      state.cashRate = state.cashRates[state.baseCoin][state.cashUnit]
    },
    [TYPES.PAIRS](state, pairs) {
      for (const pair of pairs) {
        pair.visible = pair.baseCoin === state.selectedBaseCoin
      }
      state.pairs = pairs
    },
    [TYPES.CHANGE_BASE_COIN](state, selectedBaseCoin) {
      state.selectedBaseCoin = selectedBaseCoin

      for (const pair of state.pairs) {
        pair.visible = pair.baseCoin === selectedBaseCoin
      }
    },
    [TYPES.MEMBER](state, member) {
      state.member = member
    },
    [TYPES.BUY](state, buy) {
      state.buy = buy
    },
    [TYPES.SELL](state, sell) {
      state.sell = sell
    },
    [TYPES.BUY_AMOUNT](state, buyAmount) {
      state.buyAmount = buyAmount
    },
    [TYPES.SELL_AMOUNT](state, sellAmount) {
      state.sellAmount = sellAmount
    },
    [TYPES.BUY_AMOUNT_MAX](state, assets) {
      state.buyAmountMax = state.buy > 0 ? (Math.floor((assets[state.baseCoin] / state.buy) * 100000000) / 100000000).toFixed(8) : assets[state.baseCoin]
    },
    [TYPES.SELL_AMOUNT_MAX](state, assets) {
      state.sellAmountMax = assets[state.coin]
    },
    [TYPES.BUY_CASH](state, buyCash) {
      state.buyCash = buyCash
    },
    [TYPES.SELL_CASH](state, sellCash) {
      state.sellCash = sellCash
    },
    [TYPES.ASSETS](state, assets) {
      let total = 0
      for (const key in assets) {
        if ({}.hasOwnProperty.call(assets, key) && state.pairs.length > 0) {
          if (key === 'btc') {
            total += assets[key]
          } else {
            let pair = state.pairs.filter(c => c.market === `${key}/btc`)[0]
            if (pair) {
              total += assets[key] * pair.price
            } else {
              pair = state.pairs.filter(c => c.market === `btc/${key}`)[0]
              if (pair.price > 0) total += assets[key] / pair.price
            }
          }
        }
      }

      state.assets = total.toFixed(8)
    },
    [TYPES.DEAL_NO_COMPLETES](state, dealNoCompletes) {
      state.dealNoCompletes = dealNoCompletes
    },
    [TYPES.DEAL_COMPLETES](state, dealCompletes) {
      state.dealCompletes = dealCompletes
    },
    [TYPES.COIN_RECHARGES](state, coinRecharges) {
      state.coinRecharges = coinRecharges
    },
    [TYPES.RECENTS](state, recents) {
      state.recents = recents
    },
  },
  actions: {
    async asyncLangs({ commit }, langs) {
      const { data } = await axios.get(`/static/json/${langs}.json`)

      commit(TYPES.LANGS, data.langs)
      commit(TYPES.CASH_UNIT, data.cashUnit)
    },
    async asyncBaseCoins({ commit }) {
      const { data } = await axios.get('/static/json/baseCoins.json')

      commit(TYPES.BASE_COINS, Object.keys(data.baseCoins))
      commit(TYPES.CASH_RATES, data.baseCoins)
    },
    async asyncPairs({ commit }) {
      const { data } = await axios.get('/static/json/pairs.json')

      commit(TYPES.PAIRS, data.pairs)
      commit(TYPES.CHANGE_BASE_COIN, data.pairs[0].baseCoin)
      commit(TYPES.MARKET, data.pairs[0].market)
    },
    async asyncMember({ commit }) {
      const { data } = await axios.get('/static/json/member.json')

      commit(TYPES.MEMBER, data.member)
      commit(TYPES.BUY_AMOUNT_MAX, data.member.assets)
      commit(TYPES.SELL_AMOUNT_MAX, data.member.assets)
      commit(TYPES.ASSETS, data.member.assets)
    },
    async asyncDealNoCompletes({ commit }) {
      const { data } = await axios.get('/static/json/dealNoCompletes.json')

      commit(TYPES.DEAL_NO_COMPLETES, data.dealNoCompletes)
    },
    async asyncDealCompletes({ commit }) {
      const { data } = await axios.get('/static/json/dealCompletes.json')

      commit(TYPES.DEAL_COMPLETES, data.dealCompletes)
    },
    async asyncCoinRecharges({ commit }) {
      const { data } = await axios.get('/static/json/coinRecharges.json')

      commit(TYPES.COIN_RECHARGES, data.coinRecharges)
    },
    async asyncRecents({ commit }) {
      const { data } = await axios.get('/static/json/recents.json')

      commit(TYPES.RECENTS, data.recents)
    },
  },
})

export default store
