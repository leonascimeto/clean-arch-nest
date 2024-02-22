export type UserProps = {
  name: string
  email: string
  password: string
  cratedAt?: Date
}

export class UserEntity {
  constructor(readonly props: UserProps) {
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
