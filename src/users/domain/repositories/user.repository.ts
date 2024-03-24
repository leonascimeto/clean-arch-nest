import { RepositoryInterface } from '@/shared/domain/repository/repository-interface'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository extends RepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
