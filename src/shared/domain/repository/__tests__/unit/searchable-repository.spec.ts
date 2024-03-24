import {
  SearchParams,
  SearchResults,
} from '../../searchable-repository-interface'

describe('SearchableRepository Unit Test', () => {
  describe('Search Params Test', () => {
    it('page props', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)

      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: 0 as any, expected: 1 },
        { page: 1 as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: -1 as any, expected: 1 },
        { page: 5.1 as any, expected: 1 },
        { page: {} as any, expected: 1 },
        { page: '2' as any, expected: 2 },
        { page: 2 as any, expected: 2 },
      ]

      params.forEach(param =>
        expect(new SearchParams({ page: param.page }).page).toEqual(
          param.expected,
        ),
      )
    })

    it('perPage props', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)

      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: 0 as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: true as any, expected: 15 },
        { perPage: -1 as any, expected: 15 },
        { perPage: 5.1 as any, expected: 15 },
        { perPage: {} as any, expected: 15 },
        { perPage: '2' as any, expected: 2 },
        { perPage: 2 as any, expected: 2 },
        { perPage: 15 as any, expected: 15 },
        { perPage: 30 as any, expected: 30 },
      ]

      params.forEach(param =>
        expect(new SearchParams({ perPage: param.perPage }).perPage).toEqual(
          param.expected,
        ),
      )
    })

    it('sort props', () => {
      const sut = new SearchParams()
      expect(sut.sort).toBeNull()

      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: 0 as any, expected: '0' },
        { sort: '' as any, expected: null },
        { sort: 'test' as any, expected: 'test' },
        { sort: true as any, expected: 'true' },
        { sort: -1 as any, expected: '-1' },
        { sort: 5.1 as any, expected: '5.1' },
        { sort: {} as any, expected: '[object Object]' },
        { sort: '2' as any, expected: '2' },
        { sort: 30 as any, expected: '30' },
      ]

      params.forEach(param =>
        expect(new SearchParams({ sort: param.sort }).sort).toEqual(
          param.expected,
        ),
      )
    })

    it('sortDir props', () => {
      let sut = new SearchParams()
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: null })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: undefined })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: '' })

      const params = [
        { sortDir: null as any, expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: 0 as any, expected: 'desc' },
        { sortDir: '' as any, expected: 'desc' },
        { sortDir: 'test' as any, expected: 'desc' },
        { sortDir: 'desc' as any, expected: 'desc' },
        { sortDir: 'asc' as any, expected: 'asc' },
        { sortDir: 'ASC' as any, expected: 'asc' },
        { sortDir: 'DESC' as any, expected: 'desc' },
      ]

      params.forEach(param =>
        expect(
          new SearchParams({ sortDir: param.sortDir, sort: 'field' }).sortDir,
        ).toEqual(param.expected),
      )
    })

    it('filter props', () => {
      const sut = new SearchParams()
      expect(sut.filter).toBeNull()

      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: 0 as any, expected: '0' },
        { filter: '' as any, expected: null },
        { filter: 'test' as any, expected: 'test' },
        { filter: true as any, expected: 'true' },
        { filter: -1 as any, expected: '-1' },
        { filter: 5.1 as any, expected: '5.1' },
        { filter: {} as any, expected: '[object Object]' },
        { filter: '2' as any, expected: '2' },
        { filter: 30 as any, expected: '30' },
      ]

      params.forEach(param =>
        expect(new SearchParams({ filter: param.filter }).filter).toEqual(
          param.expected,
        ),
      )
    })
  })

  describe('Search Result Test', () => {
    it('construct props', () => {
      let sut = new SearchResults({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        perPage: 15,
        sort: null,
        sortDir: null,
        filter: null,
      })

      expect(sut.toJson()).toStrictEqual({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        sort: null,
        sortDir: null,
        filter: null,
      })

      sut = new SearchResults({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        perPage: 15,
        sort: 'field',
        sortDir: 'asc',
        filter: 'test',
      })

      expect(sut.toJson()).toStrictEqual({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        sort: 'field',
        sortDir: 'asc',
        filter: 'test',
      })

      sut = new SearchResults({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        perPage: 1,
        sort: 'field',
        sortDir: 'asc',
        filter: 'test',
      })

      expect(sut.toJson()).toStrictEqual({
        items: ['test1', 'test2', 'test3'] as any,
        total: 3,
        currentPage: 1,
        lastPage: 3,
        perPage: 1,
        sort: 'field',
        sortDir: 'asc',
        filter: 'test',
      })
    })
  })
})
