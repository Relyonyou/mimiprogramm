// 学习Promise
// export const request=(params)=>{
//   // 拼接路径
//   const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1/"
//   return new Promise(resolve,reject)=>{
//     wx.request({
//       ...params,
//       url:baseUrl+params.url,
//       success:(result)=>{
//         resolve(result);
//       },
//       fail:(err)=>{
//         reject(err);
//       }
//     })
//   }
// }