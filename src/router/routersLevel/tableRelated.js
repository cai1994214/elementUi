// 表格相关
const TableTree = () => import( '@/components/tableRelated/tableTree');
const Ttable = () => import( '@/components/tableRelated/commTable');


export default [
  {
    path: '/Table',
    name: 'tableLink',
    component: Ttable
  },
  {
    path:'/tableTree',
    name:"tableTreeLink",
    component:TableTree
  },
]
