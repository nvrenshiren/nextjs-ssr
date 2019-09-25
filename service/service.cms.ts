import utilHttp from '../assets/util/util.http'
import {
  FixedSearchParams,
  SearchOneParams,
  SearchParams
} from '../server/interface/request.interface'
import {
  FixedSearchRes,
  SearchOneRes,
  SearchRes
} from '../server/interface/response.interface'

export default {
  search: (params: SearchParams) => {
    return utilHttp.post<SearchRes, SearchParams>({
      url: '/cms/search',
      params
    })
  },
  searchone: (params: SearchOneParams) => {
    return utilHttp.post<SearchOneRes, SearchOneParams>({
      url: '/cms/searchone',
      params
    })
  },
  fixedsearch: (params: FixedSearchParams) => {
    return utilHttp.post<FixedSearchRes, FixedSearchParams>({
      url: '/cms/fixedsearch',
      params
    })
  }
}
