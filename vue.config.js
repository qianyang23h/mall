// const path = require('path')
// const { config } = require('process')

// // 定义resolve函数，返回绝对路径
// function resolve(dir){
//     return path.join(__dirname, dir)
// }

// module.exports={
//     chainWebpack:(config)=>{
//         config.resolve.alias
//             .set('@', resolve('./src'))
//             .set('assets',resolve('.src/assets'))
//             .set('common',resolve('/src/common'))
//             .set('components',resolve('./src/components'))
//             .set('network',resolve('./src/network'))
//             .set('views',resolve('src/views'))
//     },
// }

// 这两种方法都可以
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
