import { DefaultThemePageFrontmatter } from './page'

export interface WikiFrontmatter extends DefaultThemePageFrontmatter {
  wiki: {
    category: string
    workspace: string
    project: string
  }
}

// 深度1 category 2 workspace 3 project
export interface WikiStorage {
  name: string
  children: WikiStorage[]
  depth: 1 | 2 | 3
}
