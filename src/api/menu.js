//vue相关的东西 vuex 组件通信
const vueRelated = {
    title: 'vue相关',
    iconClass: 'el-icon-location',
    children: [
        {
            title: '表单',
            path: 'formLink',
        },
        {
            title: 'menu',
            path: 'menuLink',
        },
        {
            title: 'vuex',
            path: 'vuexLink',
        },
        {
            title: '组建通信',
            path: 'commParentLink',
        },
        {
            title: '跨组件通信',
            path: 'attrListenLink'
        },
        {
            title: '新vuex',
            path: 'NVuexLink',
        },
    ]
}

//图表相关 
const chartRelated = {
    title: '图表相关',
    iconClass: 'iconfont el-icon-home icon-item',
    children: [
        {
            title: '滑轮',
            path: 'scrollLink',
        },
        {
            title: '轮播',
            path: 'wheelLink',
        },
        {
            title: '图表',
            path: 'echartLink',
        },
        {
            title: '时间线',
            path: 'timeSelLink',
        },
        {
            title: '大屏',
            path: 'screenLink',
        },
    ]
}

//表格相关 
const tableRelated = {
    title: '表格相关',
    iconClass: 'iconfont el-icon-menufold icon-item',
    children: [
        {
            title: '树表格',
            path: 'tableTreeLink',
        },
        {
            title: '普通表格',
            path: 'tableLink'
        }
    ]
}

//其他
const otherCont = {
    title: '其他内容',
    iconClass: 'iconfont el-icon-leaf icon-item',
    children: [
        {
            title: '龙气泡',
            path: 'DragonBubbleLink',
        },
        {
            title: '流程图',
            path: 'SuperFlowLink',
        },
    ]
}


const menuList = [
    vueRelated,
    chartRelated,
    tableRelated,
    otherCont
]

module.exports  = { menuList }