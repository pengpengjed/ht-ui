import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import type { PlusFormProps } from '@plus-pro-components/components'

import type { RowProps, ColProps } from 'element-plus'

export type PlusSearchSelfProps = {
  modelValue?: FieldValues
  defaultValues?: FieldValues
  columns?: PlusColumn[]
  hasFooter?: boolean
  hasReset?: boolean
  hasUnfold?: boolean
  searchText?: string
  resetText?: string
  searchLoading?: boolean
  inline?: boolean
  showNumber?: number
  labelPosition?: 'left' | 'right' | 'top'
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
  /**
   * 搜索是否需要校验 ，默认不需要校验表单
   * @variation v0.1.15
   * @default  false
   */
  needValidate?: boolean
}

export type PlusSearchProps = PlusSearchSelfProps & PlusFormProps

export interface PlusSearchEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'search', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'reset', values: FieldValues): void
  (e: 'collapse', isShowUnfold: boolean): void
}
