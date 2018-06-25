import axios from 'axios'

function getToken () {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.YR-KO-XpW2nx19XRLbVJajsJ960ZwQElUNiUhrzoTfQ'
}

// 配置请求拦截器，设置token
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let token = getToken()
  config.headers['token'] = token
  return config
})

export default ({Vue}) => {
  Vue.prototype.$axios = axios
}
