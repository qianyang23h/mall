import {
  ADD_COUNTER,
  ADD_CART
} from './mutation-types'


export default {
  [ADD_COUNTER](state, payload){
    payload.count++
  },
  [ADD_CART](state, payload){
    payload.count = 1
    payload.isChecked = true
    state.cartList.push(payload)
  }
}
