import { EnityValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity Integration Test', () => {
  describe('Constructor Methood', () => {
    it('should throw an error when creating a user with invalid name', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.name = ''
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.name = 'a'.repeat(256)
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.name = 10 as any
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)
    })

    it('should throw an error when creating a user with invalid email', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.email = ''
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.email = 'a'.repeat(256)
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.email = 10 as any
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)
    })

    it('should throw an error when creating a user with invalid password', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.password = ''
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.password = 'a'.repeat(101)
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.password = 10 as any
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)
    })

    it('should throw an error when creating a user with invalid createdAt', () => {
      const props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)

      props.createdAt = 10 as any
      expect(() => new UserEntity(props)).toThrow(EnityValidationError)
    })

    it('should create a user with valid props', () => {
      const props: UserProps = UserDataBuilder({})
      const user = new UserEntity(props)
      expect(user).toBeInstanceOf(UserEntity)
    })
  })

  describe('Update Methood', () => {
    it('should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.update(null)).toThrow(EnityValidationError)
      expect(() => entity.update('')).toThrow(EnityValidationError)
      expect(() => entity.update(1 as any)).toThrow(EnityValidationError)
      expect(() => entity.update('a'.repeat(256))).toThrow(EnityValidationError)
    })

    it('should throw an error when update a user with invalid password', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updatePassword(null)).toThrow(EnityValidationError)
      expect(() => entity.updatePassword('')).toThrow(EnityValidationError)
      expect(() => entity.updatePassword(1 as any)).toThrow(
        EnityValidationError,
      )
      expect(() => entity.updatePassword('a'.repeat(101))).toThrow(
        EnityValidationError,
      )
    })

    it('should update the user name', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      entity.update('new name')
      expect(entity.name).toBe('new name')
    })

    it('should update the user password', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      entity.updatePassword('new password')
      expect(entity.password).toBe('new password')
    })
  })
})
