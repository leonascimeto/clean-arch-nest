export type FieldsErrors = {
  [field: string]: string[]
}

export interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldsErrors
  validateData: PropsValidated
  validate(data: any): boolean
}
