import { Entity } from '@/shared/domain/entity/entity'
import { UserValidatorFactory } from '../validators/user.validator'
import { EnityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  name: string
  email: string
  password: string
  cratedAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.cratedAt = this.props.cratedAt ?? new Date()
  }

  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  get name(): string {
    return this.props.name
  }

  private set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  private set password(password: string) {
    this.props.password = password
  }

  get cratedAt(): Date {
    return this.props.cratedAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isvalid = validator.validate(props)
    if (!isvalid) {
      throw new EnityValidationError(validator.errors)
    }
  }
}
