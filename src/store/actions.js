
import {
  ADD_COUNTER,
  ADD_CART
} from './mutation-types'

export default {
  addToCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = null
      for(let i = 0 ; i < context.state.cartList.length; i++){   // 这种遍历方式效率最高
        if(context.state.cartList[i].iid == payload.iid){
          oldProduct = context.state.cartList[i]
        }
      }
      if(oldProduct){
        // payload.count++;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      }
      else{
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}
