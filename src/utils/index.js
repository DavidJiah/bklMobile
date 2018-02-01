export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function getDevice() {
  const device_type = navigator.userAgent //获取userAgent信息  
  var md = new MobileDetect(device_type) //初始化mobile-detect  
  var os = md.os() //获取系统  
  var model = ""
  if (os == "iOS") { //ios系统的处理  
    os = md.os() + md.version("iPhone")
    model = md.mobile();
  } else if (os == "AndroidOS") { //Android系统的处理  
    os = md.os() + md.version("Android")
    var sss = device_type.split(";")
    var i = contains(sss, "Build/")
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf("Build/"))
    }
  }
  return model + "---" + os //打印系统版本和手机型号  
}

const contains = function(arr, needle) {
  for (let i in arr) {
    if (arr[i].indexOf(needle) > 0)
      return i;
  }
  return -1;
}
