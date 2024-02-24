import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields Integration Tests', () => {
  it('Should validate with errors', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.validate(null)).toBeFalsy()
    expect(validator.errors).toEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price must be a number conforming to the specified constraints',
        'price should not be empty',
      ],
    })
  })

  it('Should validate without errors', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.validate({ name: 'valid', price: 10 })).toBeTruthy()
    expect(validator.validateData).toStrictEqual(
      new StubRules({ name: 'valid', price: 10 }),
    )
    expect(validator.errors).toBeNull()
  })
})
