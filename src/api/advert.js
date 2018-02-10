import request from '@/utils/request'

export function findAdvByActivityId(activityId) {
  return request({
    url: '/mobile/countAndGetAdv',
    method: 'post',
    params: {
      activityId
    }
  })
}