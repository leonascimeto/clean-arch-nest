import { FieldsErrors } from '../validators/validator-field.interface'

export class ValidationError extends Error {}

export class EnityValidationError extends Error {
  constructor(error: FieldsErrors) {
    super('Enity Validation Error')
    this.name = 'EnityValidationError'
  }
}
