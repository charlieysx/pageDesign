const PHONE_PATTERN = /^13[0-9]{1}[0-9]{8}$|^15[012356789]{1}[0-9]{8}$|^17[012356789]{1}[0-9]{8}$|^18[0-9]{1}[0-9]{8}$|^14[57]{1}[0-9]{8}$/
const QQ_PATTERN = /[1-9][0-9]{4,}/
const chinese = /^[\u4E00-\u9FA5]+$/

function doubleCheck (rule, value, callback) {
  if (!rule.hasOwnProperty('target')) {
    return callback(new Error('请填写 target'))
  }
  if (rule.target !== value) {
    return callback(new Error())
  }
  callback()
}

function checkPhone (rule, value, cb) {
  if (!value) {
    return cb(new Error('未填写手机号码'))
  } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
    return cb(new Error('嗨，这不是手机号码'))
  } else {
    cb()
  }
}

function realNameCheck (rule, value, callback) {
  if (value.length < 2) {
    return callback(new Error('真实姓名至少2位'))
  } else if (!chinese.test(value)) {
    return callback(new Error('真实姓名必须为中文'))
  } else {
    callback()
  }
}

export default {
  install (Vue) {
    Vue.validator = Vue.prototype.$validator = {
      doubleCheck,
      realNameCheck,
      checkPhone,
      patterns: {
        phone: PHONE_PATTERN,
        qq: QQ_PATTERN
      }
    }
  }
}
