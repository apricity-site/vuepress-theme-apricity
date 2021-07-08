import { WikiStorage } from '../../shared'

const wikiStorage: WikiStorage = {} as WikiStorage

export const resolveWikiStorage = (): WikiStorage => {
  return wikiStorage
}
