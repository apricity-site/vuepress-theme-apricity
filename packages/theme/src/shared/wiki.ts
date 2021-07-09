import { DefaultThemePageFrontmatter } from './page'
import { Page, App } from '@vuepress/core'

export interface WikiFrontmatter extends DefaultThemePageFrontmatter {
  wiki: {
    category: string
    workspace: string
    project: string
  }
}

// depth 1 category 2 workspace 3 project
// export interface WikiStorage {
//   name: string
//   children: WikiStorage[]
//   depth: 1 | 2 | 3
// }

const wikiStorage: any = {}

export const useWikiStorage = (): any => {
  return wikiStorage
}

export const resolveWikiStorage = (page: Page, app: App): any => {
  const wikiFrontmatter: WikiFrontmatter = (page.frontmatter.wiki ||
    {}) as WikiFrontmatter
  wikiStorage[wikiFrontmatter.wiki.category][wikiFrontmatter.wiki.workspace][
    wikiFrontmatter.wiki.project
  ] = page
  return wikiStorage
}
