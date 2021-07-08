import { FunctionalComponent, h } from 'vue'
import { ResolvedSidebarItem } from '../../shared'

export const InnerSidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth?: number
}> = ({ item, depth = 0 }) => {
  return h('p')
}
