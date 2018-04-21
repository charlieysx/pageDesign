import Vue from 'vue'
import moment from 'moment'

const time = (value, formatString) => {
  return moment(parseInt(value) * 1000).format(formatString)
}

Vue.filter('time', time)

export default Vue
