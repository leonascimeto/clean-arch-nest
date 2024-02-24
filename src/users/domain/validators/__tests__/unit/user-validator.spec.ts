import { UserRules, UserValidator } from '../../user.validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

let sut: UserValidator

describe('UserValidator Unit Test', () => {
  beforeEach(() => {
    sut = new UserValidator()
  })

  it('Valid cases for UserValidator class', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validateData).toStrictEqual(new UserRules(props))
  })

  describe('Name Field', () => {
    it('Invalid cases for name fields', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toEqual(['name should not be empty'])

      isValid = sut.validate({ ...UserDataBuilder({}), name: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email Field', () => {
    it('Invalid cases for email fields', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toEqual([
        'email must be a string',
        'email must be an email',
        'email should not be empty',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toEqual([
        'email must be an email',
        'email should not be empty',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toEqual([
        'email must be a string',
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: 'a'.repeat(256) })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })
})
