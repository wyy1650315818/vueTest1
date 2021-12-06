import axios from 'axios';


//创建axios,赋给变量service
const  service = axios.create();

console.log('123:'+process.env.NODE_ENV);
console.log('123:'+process.env.VUE_APP_API);
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  service.request({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  })

  export default service;
  /**
   * 没有使用default时，但不能同时声明多个export
   * 文件 import 不需要花括号
   */