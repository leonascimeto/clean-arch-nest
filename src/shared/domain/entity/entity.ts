import { v4 as uuidv4 } from 'uuid'

export abstract class Entity<Props = any> {
  readonly _id: string
  readonly props: Props

  constructor(props: Props, id?: string) {
    this._id = id ?? uuidv4()
    this.props = props
  }

  get id() {
    return this._id
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
