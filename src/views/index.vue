<template>
  <div class="index">
    <AllTable :isSelection="true" :isIndex="true" :tableData="tableData" :bindData="bindData">
      <template #name="scope">
          {{scope.row.name}}      
      </template>
    </AllTable>
    <el-button type="primary" @click="changeArr">add</el-button>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, toRef } from 'vue'
import hooks from '@/hooks/search'
import AllTable from '@/components/AllTable.vue'
export default defineComponent({
  components: { AllTable },
  setup(props, context) {
    let data = reactive({
      tableData: [],
      bindData: {
        name: '名称'
      },
    })
    const changeArr = () => data.tableData.push({name: 11})
    return {...toRefs(data), changeArr }
  }
})
let tableData = reactive([])
let data = reactive({
  name: '名称'
})
let bindData = toRefs(data)
const changeArr = () => tableData.push({name: 11})
</script>
<style>
.container {
  width: 100%;
}

.left {
  width: 150px;
  float: left;
}

.right {
  width: calc(100% - 150);
  float: left;
}
.left::after, .right::after {
  clear: both;
  content: "";
  display: block;
}
</style>


