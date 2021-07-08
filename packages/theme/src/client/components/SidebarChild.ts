import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared'
import NavLink from './NavLink.vue'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string
): boolean => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const renderItem = (
  item: ResolvedSidebarItem,
  props: VNode['props'],
  inner = false,
  depth: number
): VNode | null => {
  const nav = h(NavLink, {
    ...props,
    item,
  })
  // if the item has link, render it as `<NavLink>`
  if (!inner && item.link && item.link.indexOf('.html') !== -1) {
    return nav
  }

  if (inner && item.link && item.link.indexOf('#') !== -1) {
    return nav
  }

  // if the item only has text, render it as `<p>`
  if (inner && !item.link && depth > 0) {
    console.log(item)
    return h('p', item.text)
  }

  return null
}

const renderChildren = (
  item: ResolvedSidebarItem,
  depth: number,
  inner: boolean
): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    {
      class: {
        'sidebar-sub-items': depth > 0,
      },
    },
    item.children.map((child) => {
      const childVNode = h(
        'li',
        h(SidebarChild, {
          item: child,
          depth: depth + 1,
          inner: inner,
        })
      )
      const route = useRoute()
      if (
        inner &&
        child.link &&
        child.link.indexOf('.html') !== -1 &&
        !isActiveItem(route, child)
      ) {
        return null
      }
      return childVNode
    })
  )
}

export const SidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth?: number
  inner: boolean
}> = ({ item, depth = 0, inner = false }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  return [
    renderItem(
      item,
      {
        class: {
          'sidebar-heading': depth === 0,
          'sidebar-item': true,
          active,
        },
      },
      inner,
      depth
    ),
    renderChildren(item, depth, inner),
  ]
}

SidebarChild.displayName = 'SidebarChild'

SidebarChild.props = {
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
  },
  inner: {
    type: Boolean,
    required: false,
  },
}
