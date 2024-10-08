import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import StepsForm from '../src/index.vue'

describe('steps-form/index.vue', () => {
  test('render test', async () => {
    const values = ref<number>(1)
    const stepForm = ref<any[]>([
      {
        title: '第一步',
        form: {
          modelValue: {},
          columns: [
            {
              label: '名称',
              width: 120,
              prop: 'name',
              valueType: 'copy',
              tooltip: '名称最多显示6个字符'
            },
            {
              label: '状态',
              width: 120,
              prop: 'status',
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
                },
                {
                  label: '解决中',
                  value: '2',
                  color: 'yellow'
                },
                {
                  label: '失败',
                  value: '3',
                  color: 'red'
                }
              ]
            }
          ],
          rules: {
            name: [
              {
                required: true,
                message: '请输入名称'
              }
            ]
          }
        }
      },
      {
        title: '第二步',
        form: {
          labelWidth: '100',
          modelValue: {},
          columns: [
            {
              label: '标签',
              width: 120,
              prop: 'tag'
            },
            {
              label: '执行进度',
              width: 200,
              prop: 'progress'
            },
            {
              label: '评分',
              width: 200,
              prop: 'rate',
              valueType: 'rate'
            },
            {
              label: '是否显示',
              width: 100,
              prop: 'switch',
              valueType: 'switch'
            }
          ],
          rules: {
            tag: [
              {
                required: true,
                message: '请输入标签'
              }
            ],
            progress: [
              {
                required: true,
                message: '请输入执行进度'
              }
            ]
          }
        }
      },
      {
        title: '第三步',
        form: {
          modelValue: {},
          columns: [
            {
              label: '时间',
              prop: 'time',
              valueType: 'date-picker'
            },
            {
              label: '要求',
              prop: 'demand',
              valueType: 'checkbox',
              options: [
                {
                  label: '四六级',
                  value: '0'
                },
                {
                  label: '计算机二级证书',
                  value: '1'
                },
                {
                  label: '普通话证书',
                  value: '2'
                }
              ]
            },
            {
              label: '奖励',
              prop: 'price'
            },
            {
              label: '提成',
              prop: 'percentage'
            },
            {
              label: '说明',
              prop: 'desc',
              valueType: 'textarea',
              fieldProps: {
                maxlength: 10,
                showWordLimit: true,
                autosize: { minRows: 2, maxRows: 4 }
              }
            }
          ],
          rules: {
            time: [
              {
                required: true,
                trigger: 'change',
                message: '请选择时间'
              }
            ],
            demand: [
              {
                required: true,
                trigger: 'change',
                message: '请选择要求'
              }
            ]
          }
        }
      }
    ])

    const wrapper = mount(() => <StepsForm modelValue={values.value} data={stepForm.value} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-steps-form').exists()).toBe(true)
    expect(wrapper.find('.plus-steps-form .el-steps').exists()).toBe(true)
    expect(wrapper.find('.plus-steps-form .el-steps').exists()).toBe(true)
    expect(wrapper.find('.plus-steps-form .el-steps .el-step__head').exists()).toBe(true)
    expect(wrapper.find('.plus-steps-form .plus-form').exists()).toBe(true)
    expect(wrapper.find('.plus-steps-form .plus-form .plus-form__footer').exists()).toBe(true)
  })
})
