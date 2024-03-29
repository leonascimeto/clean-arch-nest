import { Entity } from '@/shared/domain/entity/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import e from 'express'

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('should insert entity', async () => {
    const entity = new StubEntity({ name: 'any_name', price: 10 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
    expect(sut.items).toHaveLength(1)
  })

  it('should find entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity._id)
    expect(result).toEqual(entity)
  })

  it('should throw if entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should find all entities', async () => {
    const entity1 = new StubEntity({ name: 'test name 1', price: 50 })
    const entity2 = new StubEntity({ name: 'test name 2', price: 100 })
    await sut.insert(entity1)
    await sut.insert(entity2)
    const result = await sut.findAll()
    expect(result).toStrictEqual([entity1, entity2])
  })

  it('should update entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    entity.props.name = 'new name'
    entity.props.price = 100
    await sut.update(entity)
    const result = await sut.findById(entity.id)
    expect(result).toStrictEqual(entity)
  })

  it('should throw if entity not found when update entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('should delete entity', async () => {
    const entity = new StubEntity({ name: 'test name 1', price: 25 })
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toHaveLength(0)
  })

  it('should throw if entity not found when delete entity', async () => {
    await expect(sut.delete('fakeIdToDelete')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
})
