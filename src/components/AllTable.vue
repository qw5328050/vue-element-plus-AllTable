<template>
   <div>
    <el-table
      ref="multipleTable"
      style="width: 100%"
      :data="tableData"
      :header-row-class-name="() => 'headerClass'"
      border
      :show-summary="showSummary"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isSelection"
        type="selection"
        width="50"
        align="left"
        fixed="left"
      />
      <el-table-column
        v-if="isIndex"
        key="0"
        align="center"
        label="序号"
        width="80"
        fixed="left"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <template v-for="key in bindDataList">
        <el-table-column
          v-if="filterList.indexOf(key) !== -1"
          :key="key"
          :label="bindData[key]"
          :filters="filters[key]"
          :filter-method="filterHandler"
          :prop="key"
        >
          <template v-if="slotList.indexOf(key) !== -1" #default="scope">
            <slot :name="key" :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="key + 1"
          :label="bindData[key]"
          :prop="key"
        >
          <template v-if="slotList.indexOf(key) !== -1" #default="scope">
            <slot :name="key" :row="scope.row" />
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="slotList.indexOf('operation') !== -1"
        label="操作"
        fixed="right"
        :width="handleWidth('operation')"
      >
        <template #default="scope">
          <slot name="operation" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, toRef, watch } from 'vue'
import hooks from '@/hooks/search'

export default defineComponent({
  props: {
    tableData: Array,
    bindData: Object,
    isSelection: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    isIndex: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    let slots = toRefs(context.slots)
    let { bindData, queryParams, filters} = props
    let data = reactive({
      isIndeterminate: true,
      checkAll: true,
      bindDataList: bindData ? Object.keys(bindData) : [],
      slotList: JSON.stringify(slots) !== '{}' ? Object.keys(slots) : '',
      isPagination: queryParams && JSON.stringify(queryParams) !== '{}',
      isFilter: false,
      selectData: [],
      // currentPage: data.isPagination ? JSON.parse(JSON.stringify(queryParams)) : {},
      filterList: filters ? Object.keys(filters) : [],
      styleList: {}
    })
    const handleSelectionChange = () => {}
    const filterHandler = (value,row,column) => {
      const property = column['property']
      return row[property] === value
    }
    console.log(toRefs(slots))
    const init = () => {
      // data.slotList = data.$scopedSlots ? Object.keys(data.$scopedSlots).concat(Object.keys(data.$slots)) : []
    }
    console.log(context)
    return { ...props, ...toRefs(data), handleSelectionChange, filterHandler }
  }
})
</script>
