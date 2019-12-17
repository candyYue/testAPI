const GetAuth = {
  key: 'GetAuth',
  name: '认证接口定义',
  children: [
    {
      key: 'identify',
      name: '获取access_token',
      url: '/api/identity/getToken',
      method: 'POST',
      params: [{
        key: 'access_key',
        value: '94494c3e186fb7e4b99934a217efc1a4',
        required: true,
        desr: '系统分配的公钥'
      },
      {
        key: 'secret_key',
        value: 'sLye98fTXUi5DAsa50361b3645aafdd62224d827bcb9e32sLye98fTXUi5DAsfssLye98fTXUi5DAsa50361b3645aafdd62224d827bcb9e32sLye98fTXUi5DAsfs',
        required: true,
        desr: '系统分配的私钥'
      }
      ]
    }
  ]
}

export default GetAuth
