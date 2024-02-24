import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {
  constructor(props: any, id?: string) {
    super(props, id)
  }
}

describe('UserEntity Uint Test', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'any_name', prop2: 1 }
    const sut = new StubEntity(props)

    expect(sut.props).toEqual(props)
    expect(sut.id).toBeDefined()
    expect(uuidValidate(sut.id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'any_name', prop2: 1 }
    const id = '675c616e-ed9e-4b72-9fb7-342091c62bcf'
    const sut = new StubEntity(props, id)

    expect(uuidValidate(sut.id)).toBeTruthy()
    expect(sut.id).toEqual(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'any_name', prop2: 1 }
    const id = '675c616e-ed9e-4b72-9fb7-342091c62bcf'
    const sut = new StubEntity(props, id)

    expect(sut.toJSON()).toEqual({ id, ...props })
  })
})
