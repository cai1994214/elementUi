export const PropsType = {
  Array: {
    type: Array,
    default: ()=>([])
  },
  Object: {
    type: Object,
    default: ()=>({})
  },
  Boolean: {
    type: Boolean,
    default: false,
  },
  String: {
    type: String,
    default: ''
  },
  Number: {
    type: Number,
    default: 0
  },
  Function: Function,
  Promise: Promise
}
