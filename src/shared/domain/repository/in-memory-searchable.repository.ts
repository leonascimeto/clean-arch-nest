import { Entity } from '../entity/entity'
import { NotFoundError } from '../errors/not-found-error'
import { InMemoryRepository } from './in-memory.repository'
import { RepositoryInterface } from './repository-interface'
import {
  SearchParams,
  SearchResults,
  SearchableRepositoryInterface,
} from './searchable-repository-interface'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  sortableFields: string[] = []

  async search(props: SearchParams): Promise<SearchResults<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir,
    )
    const itemPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )

    return new SearchResults({
      items: itemPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: string | null,
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }

    return [...items].sort((a, b) => {
      if (a[sort] > b[sort]) {
        return sortDir === 'asc' ? 1 : -1
      }
      if (a[sort] < b[sort]) {
        return sortDir === 'asc' ? -1 : 1
      }
      return 0
    })
  }

  protected async applyPaginate(
    items: E[],
    page: number,
    perPage: number,
  ): Promise<E[]> {
    const start = (page - 1) * perPage
    const end = start + perPage
    return items.slice(start, end)
  }
}
