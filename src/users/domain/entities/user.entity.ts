import { Entity } from '@/shared/domain/entity/entity'

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
    super(props, id)
    this.props.cratedAt = this.props.cratedAt ?? new Date()
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get cratedAt(): Date {
    return this.props.cratedAt
  }
}
