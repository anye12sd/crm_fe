import Vue from 'vue'

const phoneTest = (format) => { //固定电话正则
    // 可匹配三位或四位数区号中划线-七位或八位数的固定电话号码
    // 021-87575755 或 021-8757575
    let reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
    if (reg.test(format)) {
        return true
    }
    return false
}

const emailTest = (format) => { //邮箱正则
    // 名称允许汉字、字母、数字，域名只允许英文域名
    // 张三001Abc@lenovo.com.cn
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (reg.test(format)) {
        return true
    }
    return false
}

const mobileTest = (format) => { //移动电话正则
    let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
    if (reg.test(format)) {
        return true
    }
    return false
}

const priceTest = (format) => { //价格正则
    // 匹配小数点两位
    let reg = /^(\d+(?:\.\d{2})?|-1)$/
    if (reg.test(format)) {
        return true
    }
    return false
}


export default function(Vue) {
    //添加全局API
    Vue.prototype.$regTest = {
        emailTest,
        phoneTest,
        mobileTest,
        priceTest
    }
}