<template>
  <div>
    <header class="header clearfix bg">
      <div class="float-left">
        <div class="logo d-inline-block">
          <h6 class="p-4 m-0 d-inline-block">
            <router-link to="/">
              <img alt="bitholic" src="/static/img/logo.png">
            </router-link>
          </h6>
        </div>
        <ul class="d-inline-block list-inline m-0">
          <li class="list-inline-item">
            <div class="d-flex">
              <div class="w-25 p-3">
                <img class="coin-pic" :alt="coin" :src="coinImage(coin)">
              </div>
              <div class="w-75 py-2 px-3">
                <h6 class="m-0">{{ coinText }}</h6>
                <p class="m-0 text-uppercase">{{ market }}</p>
              </div>
            </div>
          </li>
          <li class="list-inline-item position-relative">
            <h1 class="m-0 v-50">
              <b :class="rateSign === '+' ? 'text-danger' : 'text-primary'">{{ price }}</b>
              <small class="header-cash text-uppercase">{{ cash(price) }}</small>
            </h1>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <small class="text-muted">{{ langs.yesterdayRate }}</small>
              <p :class="rateSign === '+' ? 'text-danger' : 'text-primary'" class="m-0">{{ yesterdayRate }}</p>
            </div>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <small class="text-muted">{{ langs.highestPrice }}</small>
              <p class="m-0">{{ highestPrice }}</p>
            </div>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <small class="text-muted">{{ langs.lowestPrice }}</small>
              <p class="m-0">{{ lowestPrice }}</p>
            </div>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <small class="text-muted">{{ langs.tradeAmount }}</small>
              <p class="m-0 text-uppercase">{{ amount }} {{ coin }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="float-right mr-3">
        <ul class="list-inline">
          <li class="list-inline-item">
            <div class="v-50">
              <router-link to="">{{ langs.login }}</router-link>
            </div>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <router-link to="">{{ langs.register }}</router-link>
            </div>
          </li>
          <li class="list-inline-item ml-3">
            <div class="v-50">
              <router-link to="">{{ langs.language }}</router-link>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <main class="main d-flex">
      <aside class="lnb">
        <nav class="tab-buttons d-flex mt-1">
          <a class="tab-button w-100 text-uppercase text-center py-3 d-block" href="javascript:;" v-for="baseCoin in baseCoins" v-bind:key="baseCoin" v-on:click="changeBaseCoin(baseCoin)" :class="{ active: baseCoin === selectedBaseCoin }">
            {{ baseCoin }}
          </a>
        </nav>
        <ul class="list-group">
          <li class="list-group-item cursor-pointer" v-for="pair in pairs" v-bind:key="pair.market" v-show="pair.visible" :class="{ active: pair.isActive }"  v-on:click="changeMarket(pair.market)">
            <a class="d-flex text-white" href="javascript:;">
              <div class="w-25 p-1 text-center">
                <img class="coin-pic" :alt="pair.coin" :src="coinImage(pair.coin)">
                <small class="text-uppercase">{{ pair.coin }}</small>
              </div>
              <div class="w-75 pl-3">
                <span v-show="false">{{ pair.rate = ((pair.price - pair.yesterdayPrice) / pair.price) * 100 }}</span>
                <p class="m-0" :class="pair.rate > 0 ? 'text-danger' : 'text-primary'">
                  {{ pair.rate > 0 ? `+ ${pair.rate.toFixed(2)}` : (pair.rate === 0 ? ` 0.00` : `- ${Math.abs(pair.rate).toFixed(2)}`) }}%
                </p>
                <p class="m-0">{{ pair.price }}</p>
                <p class="text-muted m-0 small">거래 {{ pair.amount.toFixed(4) }}</p>
              </div>
            </a>
          </li>
        </ul>
      </aside>
      <div class="content d-flex pt-1 pl-1">
        <div class="left-container">
          <section class="chart bg p-5">
            <h1 class="display-1">Chart</h1>
          </section>
          <section class="deal d-flex mt-1">
            <section class="deal-record bg">
              <nav class="tab-buttons">
                <a class="tab-button text-center p-3 d-inline-block" :class="{ active: tabDealNoComplete }" href="javascript:;" v-on:click="changeDealTab(0)">
                  {{ langs.dealNoComplete }}
                </a>
                <a class="tab-button text-center p-3 d-inline-block" :class="{ active: tabDealComplete }" href="javascript:;" v-on:click="changeDealTab(1)">
                  {{ langs.dealComplete }}
                </a>
                <a class="tab-button text-center p-3 d-inline-block" :class="{ active: tabCoinRecharge }" href="javascript:;" v-on:click="changeDealTab(2)">
                  {{ langs.coinRecharge }}
                </a>
              </nav>
              <div class="tab-content px-3">
                <div class="tab-pane" :class="{ active: tabDealNoComplete }">
                  <table class="table table-sm table-borderless small">
                    <thead>
                      <tr class="text-muted">
                        <th>{{ langs.time }}</th>
                        <th>{{ langs.pair }}</th>
                        <th>{{ langs.dir }}</th>
                        <th>{{ langs.price }}</th>
                        <th>{{ langs.amount }}</th>
                        <th>{{ langs.deal }}</th>
                        <th>{{ langs.percent }}</th>
                        <th>{{ langs.opera }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="dealNoComplete in dealNoCompletes" v-bind:key="dealNoComplete.id">
                        <td>
                          {{ dealNoComplete.time }}
                        </td>
                        <td class="text-uppercase">
                          {{ dealNoComplete.pair }}
                        </td>
                        <td>
                          <span :class="dealNoComplete.dir === '매수' ? 'text-danger' : 'text-primary'">{{ dealNoComplete.dir }}</span>
                        </td>
                        <td>
                          <span :class="dealNoComplete.dir === '매수' ? 'text-danger' : 'text-primary'">{{ dealNoComplete.price }}</span>
                        </td>
                        <td>
                          {{ dealNoComplete.amount }}
                        </td>
                        <td>
                          {{ dealNoComplete.deal }}
                        </td>
                        <td>
                          {{ dealNoComplete.percent.toFixed(2) }}
                        </td>
                        <td>
                          <a href="">{{ langs.cancel }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tab-pane" :class="{ active: tabDealComplete }">
                  <table class="table table-sm table-borderless small">
                    <thead>
                      <tr class="text-muted">
                        <th>{{ langs.time }}</th>
                        <th>{{ langs.pair }}</th>
                        <th>{{ langs.dir }}</th>
                        <th>{{ langs.price }}</th>
                        <th>{{ langs.amount }}</th>
                        <th>{{ langs.dealAmount }}</th>
                        <th>{{ langs.average }}</th>
                        <th>{{ langs.status }}</th>
                        <th>{{ langs.opera }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="dealComplete in dealCompletes" v-bind:key="dealComplete.id">
                        <td>
                          {{ dealComplete.time }}
                        </td>
                        <td class="text-uppercase">
                          {{ dealComplete.pair }}
                        </td>
                        <td>
                          <span :class="dealComplete.dir === '매수' ? 'text-danger' : 'text-primary'">{{ dealComplete.dir }}</span>
                        </td>
                        <td>
                          <span :class="dealComplete.dir === '매수' ? 'text-danger' : 'text-primary'">{{ dealComplete.price }}</span>
                        </td>
                        <td>
                          {{ dealComplete.amount }}
                        </td>
                        <td>
                          {{ dealComplete.dealAmount }}
                        </td>
                        <td>
                          {{ dealComplete.average }}
                        </td>
                        <td>
                          {{ dealComplete.status }}
                        </td>
                        <td>
                          <a href="">{{ langs.opera }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tab-pane" :class="{ active: tabCoinRecharge }">
                  <table class="table table-sm table-borderless small">
                    <thead>
                      <tr class="text-muted">
                        <th>{{ langs.time }}</th>
                        <th>{{ langs.coin }}</th>
                        <th>{{ langs.dir }}</th>
                        <th>{{ langs.amounts }}</th>
                        <th>{{ langs.status }}</th>
                        <th>{{ langs.opera }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="coinRecharge in coinRecharges" v-bind:key="coinRecharge.id">
                        <td>
                          {{ coinRecharge.time }}
                        </td>
                        <td class="text-uppercase">
                          {{ coinRecharge.coin }}
                        </td>
                        <td>
                          {{ coinRecharge.dir }}
                        </td>
                        <td>
                          {{ coinRecharge.amounts }}
                        </td>
                        <td>
                          {{ coinRecharge.status }}
                        </td>
                        <td>
                          <a href="">{{ langs.opera }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section class="deal-trade bg ml-1">
              <nav class="tab-buttons d-flex">
                <a class="tab-button text-center p-3 d-block w-100" :class="{ active: tabDealBuy }" href="javascript:;" v-on:click="changeTradeTab(0)">
                  {{ langs.buy }}
                </a>
                <a class="tab-button text-center p-3 d-block w-100" :class="{ active: tabDealSell }" href="javascript:;" v-on:click="changeTradeTab(1)">
                  {{ langs.sell }}
                </a>
              </nav>
              <div class="tab-content px-3">
                <form class="tab-pane" :class="{ active: tabDealBuy }" v-on:submit.prevent="dealTrade('buy')">
                  <div class="d-flex pt-3">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.staticPrice }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control bg text-white" v-model="buy" placeholder="0">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white">
                            <small>{{ baseCoin }}</small>
                          </span>
                          <button class="btn btn-danger" type="button" v-on:click="plus(-0.00000001, 'buy')">
                            -
                          </button>
                          <button class="btn btn-danger" type="button" v-on:click="plus(0.00000001 , 'buy')">
                            +
                          </button>
                        </div>
                      </div>
                      <div class="form-text text-muted text-uppercase small">{{ buyCash }}</div>
                    </div>
                  </div>
                  <div class="d-flex pt-2">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.amounts }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control bg text-white" maxlength="10" v-model="buyAmount" placeholder="0">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white">
                            <small>{{ coin }}</small>
                          </span>
                        </div>
                        <div class="input-group-append dropup">
                          <div class="dropdown">
                            <button class="btn btn-danger dropdown-toggle btn-amount-percent" type="button" v-on:click="changeBuyAmountPercent()">
                              %
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" :class="{ show: dropdownBuyAmountPercent }">
                              <button class="dropdown-item" type="button" v-for="percent in [10, 25, 50, 100]" v-bind:key="percent" v-on:click="changeBuyAmountPercent(percent)">{{ percent }}%</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-text text-muted small">
                        {{ langs.avaliable }} {{ buyAmountMax }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex pt-2">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.total }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control" type="number" readonly v-model="buyTotal">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white double">
                            <small>{{ baseCoin }}</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-3">
                    <button class="btn btn-block btn-danger" type="submit">
                      {{ langs.buy }}
                    </button>
                  </div>
                </form>
                <div class="tab-pane" :class="{ active: tabDealSell }">
                  <div class="d-flex pt-3">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.staticPrice }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control bg text-white" type="number" step="0.01" min="0.00000001" v-model="sell" placeholder="0">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white">
                            <small>{{ baseCoin }}</small>
                          </span>
                        </div>
                      </div>
                      <div class="form-text text-muted text-uppercase small">{{ sellCash }}</div>
                    </div>
                  </div>
                  <div class="d-flex pt-2">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.amounts }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control bg text-white" type="number" :max="sellAmountMax" min="0.00000001" step="0.00000001" v-model="sellAmount" placeholder="0">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white">
                            <small>{{ coin }}</small>
                          </span>
                        </div>
                        <div class="input-group-append dropup">
                          <div class="dropdown">
                            <button class="btn btn-outline-primary dropdown-toggle" type="button" v-on:click="changeSellAmountPercent()">
                              %
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" :class="{ show: dropdownSellAmountPercent }">
                              <button class="dropdown-item" type="button" v-for="percent in [10, 25, 50, 100]" v-bind:key="percent" v-on:click="changeSellAmountPercent(percent)">{{ percent }}%</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-text text-muted small">
                        {{ langs.avaliable }} {{ sellAmountMax }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex pt-2">
                    <div class="deal-trade-label text-muted small">
                      {{ langs.total }}
                    </div>
                    <div class="deal-trade-input">
                      <div class="input-group">
                        <input class="form-control" type="number" readonly v-model="sellTotal">
                        <div class="input-group-append">
                          <span class="input-group-text text-uppercase bg text-white">
                            <small>{{ baseCoin }}</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-3">
                    <button class="btn btn-block btn-primary">
                      {{ langs.sell }}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
        <div class="right-container ml-1">
          <section class="assets">
            <div class="d-flex bg">
              <div class="icon p-3">
                <i class="fas fa-fw fa-3x fa-wallet text-info"></i>
              </div>
              <div class="body p-2">
                <small class="text-muted">{{ langs.assets }}</small>
                <h5 class="m-0 text-uppercase">{{ assets }} btc</h5>
                <small class="text-uppercase">{{ assetsCash }}</small>
              </div>
            </div>
            <div class="d-flex mt-1">
              <div class="w-50 bg px-3 py-2">
                <div class="float-left py-1">
                  <img class="coin-pic" :alt="coin" :src="coinImage(coin)">
                </div>
                <small class="d-block float-left pl-3 text-muted">
                  {{ langs.avaliable }} <span class="text-uppercase">{{ coin }}</span>
                </small>
                <small class="d-block float-right pt-2">
                  <a href="javascript:;">{{ langs.deposit }}</a>
                </small>
                <small class="d-block float-left pl-3 text-uppercase">{{ member.assets[coin] }} {{ coin }}</small>
              </div>
              <div class="w-50 bg px-3 py-2 ml-1">
                <div class="float-left py-1">
                  <img class="coin-pic" :alt="baseCoin" :src="coinImage(baseCoin)">
                </div>
                <small class="d-block float-left pl-3 text-muted">
                  {{ langs.avaliable }} <span class="text-uppercase">{{ baseCoin }}</span>
                </small>
                <small class="d-block float-right pt-2">
                  <a href="">{{ langs.deposit }}</a>
                </small>
                <small class="d-block float-left pl-3 text-uppercase">{{ member.assets[baseCoin] }} {{ baseCoin }}</small>
              </div>
            </div>
          </section>
          <section class="trade-list bg mt-1">
            <h6 class="m-0 section-heading p-3">호가</h6>
            <table class="table table-sm table-borderless small trade-list-table">
              <thead>
                <tr class="text-muted">
                  <th class="text-right">
                    {{ langs.price }}(<span class="text-uppercase">{{ baseCoin }}</span>)
                  </th>
                  <th class="text-right">
                    {{ langs.amount }}(<span class="text-uppercase">{{ coin }}</span>)
                  </th>
                  <th class="text-right">
                    {{ langs.sum }}(<span class="text-uppercase">{{ baseCoin }}</span>)
                  </th>
                </tr>
              </thead>
              <tbody class="trades sell">
                <tr v-for="trade in trades" v-bind:key="trade.price">
                  <td class="text-right">
                    <span class="text-primary">{{ trade.price.toFixed(8) }}</span>
                  </td>
                  <td class="text-right">
                    {{ trade.amount }}
                  </td>
                  <td class="text-right">
                    {{ (trade.price * trade.amount).toFixed(8) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section class="recent bg mt-1">
            <h6 class="m-0 section-heading">{{ langs.deal }}</h6>
            <table class="table table-sm table-borderless small">
              <thead>
                <tr class="text-muted">
                  <th>{{ langs.time }}</th>
                  <th class="text-right">
                    {{ langs.dealPrice }}(<span class="text-uppercase">{{ baseCoin }}</span>)
                  </th>
                  <th class="text-right">
                    {{ langs.dealAmount }}(<span class="text-uppercase">{{ coin }}</span>)
                  </th>
                  <th class="text-right">
                    {{ langs.sum }}(<span class="text-uppercase">{{ baseCoin }}</span>)
                  </th>
                </tr>
              </thead>
              <tbody class="recents">
                <tr v-for="recent in recents" v-bind:key="recent.id">
                  <td>
                    {{ recent.time }}
                  </td>
                  <td class="text-right">
                    <span :class="recent.dir === '매수' ? 'text-danger' : 'text-primary'">{{ recent.price }}</span>
                  </td>
                  <td class="text-right">
                    {{ recent.amount }}
                  </td>
                  <td class="text-right">
                    {{ (recent.price * recent.amount).toFixed(8) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as TYPES from '../store/mutation-types'

export default {
  name: 'Exchange',
  data() {
    return {
      tabDealNoComplete: true,
      tabDealComplete: false,
      tabCoinRecharge: false,
      tabDealBuy: true,
      tabDealSell: false,
      dropdownBuyAmountPercent: false,
      dropdownSellAmountPercent: false,
      trades: [
        {
          price: 1145.37249284,
          amount: 0.00016539,
        },
        {
          price: 1445.37249284,
          amount: 0.00016539,
        },
        {
          price: 1434.25894534,
          amount: 0.00009996,
        },
        {
          price: 1430.00000000,
          amount: 0.00178812,
        },
        {
          price: 1421.55550000,
          amount: 0.00061223,
        },
        {
          price: 1420.00000000,
          amount: 0.00004959,
        },
        {
          price: 1419.82138127,
          amount: 0.00027186,
        },
        {
          price: 1419.61292189,
          amount: 0.00041928,
        },
        {
          price: 1419.39763131,
          amount: 0.00056224,
        },
        {
          price: 1418.82342355,
          amount: 0.00082312,
        },
        {
          price: 1417.65448845,
          amount: 0.00094845,
        },
        {
          price: 1417.65000000,
          amount: 0.00001216,
        },
        {
          price: 1416.92382187,
          amount: 0.00012359,
        },
        {
          price: 1415.37249284,
          amount: 0.00016539,
        },
        {
          price: 1414.37249284,
          amount: 0.00016539,
        },
        {
          price: 1413.25894534,
          amount: 0.00009996,
        },
        {
          price: 1412.00000000,
          amount: 0.00178812,
        },
        {
          price: 1411.55550000,
          amount: 0.00061223,
        },
        {
          price: 1410.00000000,
          amount: 0.00004959,
        },
        {
          price: 1409.82138127,
          amount: 0.00027186,
        },
        {
          price: 1409.61292189,
          amount: 0.00041928,
        },
        {
          price: 1409.39763131,
          amount: 0.00056224,
        },
        {
          price: 1408.82342355,
          amount: 0.00082312,
        },
        {
          price: 1407.65448845,
          amount: 0.00094845,
        },
        {
          price: 1407.65000000,
          amount: 0.00001216,
        },
        {
          price: 1406.92382187,
          amount: 0.00012359,
        },
        {
          price: 1405.37249284,
          amount: 0.00016539,
        },
        {
          price: 1404.37249284,
          amount: 0.00016539,
        },
        {
          price: 1404.25894534,
          amount: 0.00009996,
        },
        {
          price: 1403.00000000,
          amount: 0.00178812,
        },
        {
          price: 1401.55550000,
          amount: 0.00061223,
        },
        {
          price: 1401.00000000,
          amount: 0.00004959,
        },
        {
          price: 1400.82138127,
          amount: 0.00027186,
        },
        {
          price: 1399.61292189,
          amount: 0.00041928,
        },
        {
          price: 1399.39763131,
          amount: 0.00056224,
        },
        {
          price: 1398.82342355,
          amount: 0.00082312,
        },
        {
          price: 1397.65448845,
          amount: 0.00094845,
        },
        {
          price: 1397.65000000,
          amount: 0.00001216,
        },
        {
          price: 1396.92382187,
          amount: 0.00012359,
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'langs',
      'cashUnit',
      'cashRate',
      'baseCoins',
      'market',
      'coinText',
      'coin',
      'baseCoin',
      'price',
      'yesterdayPrice',
      'highestPrice',
      'lowestPrice',
      'amount',
      'pairs',
      'selectedBaseCoin',
      'member',
      'buyAmount',
      'sellAmount',
      'buyAmountMax',
      'sellAmountMax',
      'buyCash',
      'sellCash',
      'assets',
      'dealNoCompletes',
      'dealCompletes',
      'coinRecharges',
      'recents',
    ]),
    buy: {
      get() {
        return this.$store.state.buy
      },
      set(buy) {
        this.$store.commit(TYPES.BUY, buy)
      },
    },
    sell: {
      get() {
        return this.$store.state.sell
      },
      set(sell) {
        this.$store.commit(TYPES.SELL, sell)
      },
    },
    buyAmount: {
      get() {
        return this.$store.state.buyAmount
      },
      set(buyAmount) {
        this.$store.commit(TYPES.BUY_AMOUNT, buyAmount)
      },
    },
    sellAmount: {
      get() {
        return this.$store.state.sellAmount
      },
      set(sellAmount) {
        this.$store.commit(TYPES.SELL_AMOUNT, sellAmount)
      },
    },
    subPrice() {
      return this.price - this.yesterdayPrice
    },
    rateSign() {
      return this.subPrice > 0 ? '+' : (this.subPrice === 0 ? '' : '-')
    },
    rate() {
      return (this.subPrice / this.price) * 100
    },
    yesterdayRate() {
      return `${this.rateSign}${Math.abs(this.rate).toFixed(2)}% ${this.rateSign}${Math.abs(this.subPrice).toFixed(8)}`
    },
    buyTotal() {
      return (this.buy * this.buyAmount).toFixed(8)
    },
    sellTotal() {
      return (this.sell * this.sellAmount).toFixed(8)
    },
    assetsCash() {
      return this.cash(this.assets)
    },
  },
  watch: {
    buy() {
      let buyPrice = this.buy
      if (String(buyPrice)[0] === '0' && !isNaN(Number(String(buyPrice)[1]))) {
        buyPrice = String(buyPrice).replace(/^0+/, '')
      }

      if (!isNaN(Number())) {
        const buy = String(buyPrice).split('.')

        if (typeof buy[1] !== 'undefined' && buy[1].length > 8) {
          buyPrice = `${buy[0]}.${buy[1].slice(0, 8)}`
        }

        buyPrice = buyPrice > 1000000000 ? 1000000000 : buyPrice
        buyPrice = buyPrice < 0 ? 0 : buyPrice
        this.$store.commit(TYPES.BUY_CASH, this.cash(buyPrice))
      } else {
        buyPrice = ''
      }
      this.$store.commit(TYPES.BUY, buyPrice)
      this.$store.commit(TYPES.BUY_AMOUNT_MAX, this.member.assets)
    },
    sell() {
      let sellPrice = this.sell
      sellPrice = sellPrice > 1000000000 ? 1000000000 : sellPrice
      sellPrice = sellPrice < 0 ? 0 : sellPrice
      this.$store.commit(TYPES.SELL_CASH, this.cash(sellPrice))
      this.validSellAmount()
    },
    buyAmount() {
      this.validBuyAmount()
    },
    sellAmount() {
      this.validSellAmount()
    },
    buyAmountMax() {
      this.validBuyAmount()
    },
    sellAmountMax() {
      this.validSellAmount()
    },
  },
  methods: {
    changeBaseCoin(selectedBaseCoin) {
      this.$store.commit(TYPES.CHANGE_BASE_COIN, selectedBaseCoin)
    },
    coinImage(coin) {
      return `/static/img/coin/${coin}.png`
    },
    cash(price) {
      return `≈ ${(price * this.cashRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${this.cashUnit}`
    },
    changeMarket(market) {
      this.$store.commit(TYPES.MARKET, market)
      this.$store.commit(TYPES.BUY_AMOUNT_MAX, this.member.assets)
      this.$store.commit(TYPES.SELL_AMOUNT_MAX, this.member.assets)
    },
    changeDealTab(tab) {
      this.tabDealNoComplete = tab === 0
      this.tabDealComplete = tab === 1
      this.tabCoinRecharge = tab === 2
    },
    changeTradeTab(tab) {
      this.tabDealBuy = tab === 0
      this.tabDealSell = tab === 1
    },
    changeBuyAmountPercent(percent) {
      this.dropdownBuyAmountPercent = !(this.dropdownBuyAmountPercent === true)
      this.buyAmount = percent > 0 ? (this.buyAmountMax * (percent / 100)).toFixed(8) : this.buyAmount

      if (percent >= 100) this.buyAmount = this.buyAmountMax
    },
    changeSellAmountPercent(percent) {
      this.dropdownSellAmountPercent = !(this.dropdownSellAmountPercent === true)
      this.sellAmount = percent > 0 ? (this.member.assets[this.coin] * (percent / 100)).toFixed(8) : this.sellAmount

      if (percent >= 100) this.sellAmount = this.sellAmountMax
    },
    validBuyAmount() {
      this.buyAmount = +this.buyAmount > +this.buyAmountMax ? this.buyAmountMax : this.buyAmount
    },
    validSellAmount() {
      this.sellAmount = +this.sellAmount > +this.sellAmountMax ? this.sellAmountMax : this.sellAmount
    },
    plus(add, dir) {
      if (dir === 'buy') {
        this.buy = (Number(this.buy) + Number(add)).toFixed(8)
      } else {
        this.sell = (Number(this.sell) + Number(add)).toFixed(8)
      }
    },
    dealTrade(dir) {
      return dir
    },
  },
  created() {
    this.$store.dispatch('asyncLangs', window.navigator.language.slice(0, 2) || 'en')
    this.$store.dispatch('asyncBaseCoins')
    this.$store.dispatch('asyncPairs')
    this.$store.dispatch('asyncMember')
    this.$store.dispatch('asyncDealNoCompletes')
    this.$store.dispatch('asyncDealCompletes')
    this.$store.dispatch('asyncCoinRecharges')
    this.$store.dispatch('asyncRecents')
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
$main-height: 100%;
.content {
  width: calc(100% - 200px);
  height: $main-height;
  .left-container {
    width: calc(100% - 370px);
    height: calc(100vh - 70px);
    .chart {
      min-height: 500px;
      height: calc(100vh - 353px);
    }
    .deal {
      width: 100%;
      bottom: 0;
      height: 280px;
      .deal-record {
        width: calc(100% - 440px);
      }
      .deal-trade {
        width: 440px;
        .deal-trade-label {
          padding-top: 10px;
          width: 80px;
        }
        .deal-trade-input {
          width: calc(100% - 80px);
        }
        .btn-amount-percent {
          width: 60.18px;
        }
        .input-group-text {
          min-width: 60.17px;
        }
      }
    }
  }
  .right-container {
    width: 370px;
    height: calc(100vh - 70px);
    .assets {
      height: 126px;
      .icon {
        width: 80px;
      }
      .body {
        width: calc(100% - 80px);
      }
    }
    .trade-list {
      height: calc(100vh - 126px - 357px);
      .trade-list-table th,
      .trade-list-table td {
        width: 33.333333333% !important;
      }
      .trades {
        overflow: hidden;
        height: 100vh;
      }
    }
    .recent {
      height: 280px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.lnb {
  overflow: auto;
  min-width: 200px;
  height: calc(100vh - 66px);
  &::-webkit-scrollbar {
    display: none;
  }
  .list-group-item {
    transition: background-color .2s ease;
    &:hover {
      background-color: #0e1a23;
    }
    a:hover {
      text-decoration: none;
    }
    &.active {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: #17a2b8;
      }
    }
  }
}
.header {
  .logo {
    position: relative;
    width: 203px;
    margin-right: 25px;
    padding-right: 25px;
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 3px;
      border-radius: 3px;
      height: 40px;
      background-color: rgba(0, 0, 0, .3);
      top: 12.5px;
      right: 0;
    }
  }
  .header-cash {
    font-size: 1rem;
  }
}
</style>
