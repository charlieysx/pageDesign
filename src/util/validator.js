const EMAIL_PATTERN = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const ID_CARD_PATTERN = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

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

function checkEmail (rule, value, cb) {
  if (!value) {
    return cb(new Error('未填写邮箱'))
  } else if (!(EMAIL_PATTERN.test(value))) {
    return cb(new Error('嗨，这不是邮箱'))
  } else {
    cb()
  }
}

function checkIdCardNumber (rule, value, cb) {
  if (!value) {
    return cb(new Error('未填写身份证号码'))
  } else if (!(ID_CARD_PATTERN.test(value))) {
    return cb(new Error('嗨，身份证号码格式不正确'))
  } else {
    if (value.length === 18) {
      let idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      let idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += parseInt(value.substring(i, i + 1)) * idCardWi[i]
      }

      let idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
      let idCardLast = value.substring(17) // 得到最后一位身份证号码

      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
      if ((idCardMod === 2 && idCardLast.toLowerCase() !== 'x') || (idCardMod !== 2 && parseInt(idCardLast) !== idCardY[idCardMod])) {
        return cb(new Error('嗨，身份证号码错误'))
      }
    } else {
      return cb(new Error('嗨，身份证号码错误'))
    }
    cb()
  }
}

export default {
  install (Vue) {
    Vue.validator = Vue.prototype.$validator = {
      doubleCheck,
      checkPhone,
      checkEmail,
      checkIdCardNumber
    }
  }
}
