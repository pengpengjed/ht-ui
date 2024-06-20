<template>
  <div>
    <el-button type="primary" @click="editable = true"> 开启编辑状态 </el-button>
    <el-button type="danger" @click="editable = false"> 关闭编辑状态 </el-button>
    <el-divider />
    <PlusTable
      :editable="editable"
      :columns="tableConfig"
      :table-data="tableData"
      :title-bar="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTable } from 'plus-pro-components'
import type { PlusColumn, OptionsRow } from 'plus-pro-components'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  checkbox: string[]
  rate: number
  time: string | Date
  tag: number
  img: string
  link: string
  money: number
  progress: number
  text: string
}

const editable = ref(false)

const TestServe = {
  getList: async () => {
    const data: TableRow[] = Array.from({ length: 6 }).map((item, index) => {
      return {
        id: index,
        name: index < 2 ? '' : 'name'.padEnd(50, index + ''),
        status: String(index % 2),
        checkbox: [String(index % 2)],
        rate: index > 2 ? 4 : 1,
        time: index < 2 ? '' : new Date(),
        tag: index > 3 ? 0 : 1,
        img: 'https://dummyimage.com/',
        link: '链接',
        money: index,
        progress: index * 10,
        code: `const { tableData } = useTable<TableRow[]>()`,
        text: 'text'
      }
    })

    return { data }
  }
}
const { tableData } = useTable<TableRow[]>()

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    width: 120,
    valueType: 'copy',
    formatter: (value: string) => (value ? value.slice(0, 4) + '...' : '')
  },
  {
    label: '状态',
    prop: 'status',
    width: 140,
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      }
    ],
    formatter: (value, { column }) =>
      (column.options as OptionsRow[])?.find(item => item.value === value)?.label + '-自定义' || ''
  },
  {
    label: '状态1',
    prop: 'status',
    width: 140,
    valueType: 'radio',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      }
    ],
    formatter: (value, { column }) =>
      (column.options as OptionsRow[])?.find(item => item.value === value)?.label + '-自定义' || ''
  },
  {
    label: '状态2',
    prop: 'checkbox',
    width: 120,
    valueType: 'checkbox',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      }
    ],
    formatter: (value: string[], { column }) =>
      (column.options as OptionsRow[])
        ?.filter(item => value.includes(item.value as string))
        .map(item => item.label)
        .toString()
  },
  {
    label: '评分',
    width: 60,
    prop: 'rate',
    valueType: 'rate',
    formatter: value => (value >= 4 ? `${value} 高` : `${value} 低`)
  },
  {
    label: '标签',
    width: 80,
    prop: 'tag',
    valueType: 'tag',
    fieldProps: value => {
      return { type: value === 1 ? 'primary' : 'danger' }
    },
    formatter: value => (value ? '开启' : '关闭')
  },
  {
    label: '日期',
    prop: 'time',
    valueType: 'date-picker',
    width: 120,
    fieldProps: {
      type: 'date',
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    label: '日期',
    prop: 'time',
    valueType: 'date-picker',
    width: 120,
    formatter: value => (value ? new Date().toJSON().slice(0, 10) : ''),
    //  valueType=== 'date-picker' 时， formatter 存在时，fieldProps的format和valueFormat不再生效。
    fieldProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    label: '图片',
    prop: 'img',
    valueType: 'img',
    width: 60,
    formatter: value => value + '60x60'
  },
  {
    label: '头像',
    prop: 'img',
    valueType: 'avatar',
    width: 100,
    formatter: value => value + '200x200'
  },
  {
    label: '链接',
    prop: 'link',
    valueType: 'link',
    width: 100,
    formatter: value => `${value}->`
  },
  {
    label: '金钱',
    prop: 'money',
    valueType: 'money',
    width: 100,
    formatter: (value: number) => `$${value.toFixed(2)} `
  },
  {
    label: '进度',
    prop: 'progress',
    valueType: 'progress',
    width: 100,
    formatter: value => value + 15
  },
  {
    label: '代码',
    prop: 'code',
    valueType: 'code',
    width: 200,
    formatter: value => value + '【结束】'
  },
  {
    label: '文本',
    prop: 'text',
    valueType: 'text',
    width: 200,
    formatter: value => value + '-文本'
  }
]

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data.map(item => ({ ...item }))
  } catch (error) {}
}
getList()
</script>
