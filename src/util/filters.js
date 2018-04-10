import Vue from 'vue'
import moment from 'moment'

const time = (value, formatString) => {
  return moment(parseInt(value) * 1000).format(formatString)
}

const serverPirce = (value) => {
  let price = parseFloat(value) * 10000 * 0.04
  return price < 3500 ? 3500 : price
}

Vue.filter('time', time)
Vue.filter('serverPirce', serverPirce)

export default Vue
