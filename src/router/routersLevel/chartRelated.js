// 图标相关
const Tscroll = () => import( '@/components/chartRelated/scrollDemo/scrolltest');
const Wheel = () => import( '@/components/chartRelated/wheel');
const Mechart = () => import( '@/components/chartRelated/echart');
const timeSel = () => import( '@/components/chartRelated/timeSel');
const screenData = () => import( '@/components/chartRelated/screenData');


export default [
  {
    path:'/Tscroll',
    name:'scrollLink',
    component:Tscroll
  },
  {
    path: '/Wheel',
    name: 'wheelLink',
    component: Wheel
  },
  {
    path:'/echart',
    name:'echartLink',
    component:Mechart,
  },
  {
    path:"/timeSel",
    name:"timeSelLink",
    component:timeSel
  },
  {
    path:'/screenData',
    name:"screenLink",
    component:screenData
  },
]
