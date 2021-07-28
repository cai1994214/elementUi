<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" row-key="id">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.row[column.value]}}
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script >
import treeToArray from './eval'
export default {
    name: 'treeTable',
    data(){
        return {
            columns: [
                {
                text: '事件',
                value: 'event',
                width: 200
                },
                {
                text: 'ID',
                value: 'id'
                },
                {
                text: '时间线',
                value: 'timeLine'
                },
                {
                text: '备注',
                value: 'comment'
                }
            ],
            data: [
                    {
                    id: 0,
                    event: '事件1',
                    timeLine: 50,
                    comment: '无'
                    },
                    {
                    id: 1,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    children: [
                        {
                        id: 2,
                        event: '事件2',
                        timeLine: 10,
                        comment: '无'
                        },
                        {
                        id: 3,
                        event: '事件3',
                        timeLine: 90,
                        comment: '无',
                        children: [
                            {
                            id: 4,
                            event: '事件4',
                            timeLine: 5,
                            comment: '无'
                            },
                            {
                            id: 5,
                            event: '事件5',
                            timeLine: 10,
                            comment: '无'
                            },
                            {
                            id: 6,
                            event: '事件6',
                            timeLine: 75,
                            comment: '无',
                            children: [
                                {
                                id: 7,
                                event: '事件7',
                                timeLine: 50,
                                comment: '无',
                                children: [
                                    {
                                    id: 71,
                                    event: '事件71',
                                    timeLine: 25,
                                    comment: 'xx'
                                    },
                                    {
                                    id: 72,
                                    event: '事件72',
                                    timeLine: 5,
                                    comment: 'xx'
                                    },
                                    {
                                    id: 73,
                                    event: '事件73',
                                    timeLine: 20,
                                    comment: 'xx'
                                    }
                                ]
                                },
                                {
                                id: 8,
                                event: '事件8',
                                timeLine: 25,
                                comment: '无'
                                }
                            ]
                            }
                        ]
                        }
                    ]
                    }
                ]

        }
    },
    props: {
        evalFunc: Function,
        evalArgs: Array,
        expandAll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 格式化数据源
        formatData: function() {
            let tmp
            if (!Array.isArray(this.data)) {
                tmp = [this.data]
            } else {
                tmp = this.data
            }
            const func = this.evalFunc || treeToArray
            const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
            return func.apply(null, args)
        }
    },
    methods: {
        showRow: function(row) {
            const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
            row.row._show = show
            return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
        },
        // 切换下级是否展开
        toggleExpanded: function(trIndex) {
            const record = this.formatData[trIndex]
            record._expanded = !record._expanded
        },
        // 图标显示
        iconShow(index, record) {
            return (index === 0 && record.children && record.children.length > 0)
        }
    },
    created(){
        console.log('sss')
    }
   
}
</script>

<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style  rel="stylesheet/scss" scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space ::before {
      content: ""
    }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: #2196F3;
    margin-left: 18px;
  }
</style>
