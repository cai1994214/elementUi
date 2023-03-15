// 其他内容
const DragonBubble = () => import('@/components/otherRelated/dragonBubble');

const SuperFlow = () => import('@/components/otherRelated/superFlow');

export default [
  {
    path: '/dragonBubble',
    name: "DragonBubbleLink",
    component: DragonBubble
  },
  {
    path: '/superFlow',
    name: "SuperFlowLink",
    component: SuperFlow
  }
]
