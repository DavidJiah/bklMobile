export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function getDevice() {
  try {
    const device_type = navigator.userAgent //获取userAgent信息  
    const md = new MobileDetect(device_type) //初始化mobile-detect  
    let os = md.os() //获取系统  
    let model = ""
    if (os == "iOS") { //ios系统的处理  
      os = md.os() + md.version("iPhone")
      model = md.mobile();
    } else if (os == "AndroidOS") { //Android系统的处理  
      os = md.os() + md.version("Android")
      const sss = device_type.split(";")
      const i = contains(sss, "Build/")
      if (i > -1) {
        model = sss[i].substring(0, sss[i].indexOf("Build/"))
      } else {
        model = '未知机型'
      }
    }
    return model + "---" + os //打印手机型号和系统版本
  } catch (e) {
    return '机型获取失败' + '（' + e + '）'
  }
}

const contains = function(arr, needle) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(needle) > 0)
      return i;
  }
  return -1;
}
