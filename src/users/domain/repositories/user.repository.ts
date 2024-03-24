import { UserEntity } from '../entities/user.entity'
import { SearchableRepositoryInterface } from '@/shared/domain/repository/searchable-repository-interface'

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
