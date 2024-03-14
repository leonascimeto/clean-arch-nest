import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity Uint Test', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('Should contruct the user entity', () => {
    expect(UserEntity.validate).toHaveBeenCalledWith(props)
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should return name', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Should return email', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Should return password', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Should return cratedAt', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update name', () => {
    const newName = 'newname'
    sut.update(newName)

    expect(UserEntity.validate).toHaveBeenCalledWith(props)
    expect(sut.props.name).toEqual(newName)
  })

  it('Should update password', () => {
    const newPassword = 'newpassword'
    sut.updatePassword(newPassword)

    expect(UserEntity.validate).toHaveBeenCalledWith(props)
    expect(sut.props.password).toEqual(newPassword)
  })
})
