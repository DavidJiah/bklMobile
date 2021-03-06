import request from '@/utils/request'

export function getOpenId(code) {
  return request({
    url: '/mobile/getOpenIdByWxCode',
    method: 'post',
    params: {
      code: code
    }
  })
}

export function initResult(qrCodeId, openId, deviceInfo) {
  return request({
    url: '/mobile/scanQrCode',
    method: 'post',
    params: {
      qrCodeId: qrCodeId,
      openId: openId,
      deviceInfo: deviceInfo
    }
  })
}
export function getJsapiSignature(configUrl) {
  return request({
    url: '/mobile/getJsapiSignature',
    method: 'post',
    params: {
      url: configUrl
    }
  })
}
export function getQrCodeInfo(qrCodeId) {
  return request({
    url: '/mobile/getQrCodeInfo',
    method: 'post',
    params: {
      qrCodeId: qrCodeId
    }
  })
}
export function shareResult(openId, qrCodeId) {
  return request({
    url: '/mobile/shareResult',
    method: 'post',
    data: {
      qrCodeId: qrCodeId,
      openId: openId,
      shareResult: 0
    }
  })
}

export function getActivityScaned(listQuery) {
  return request({
    url: '/mobile/getActivityScaned',
    method: 'post',
    data: listQuery
  })
}
