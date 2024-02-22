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
}
