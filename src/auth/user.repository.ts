import * as bcrypt from 'bcrypt'
import {AuthCredentialsDto} from './dto/auth-credentials.dto'
import {EntityRepository, Repository} from 'typeorm'
import {User} from './user.entity'
import {ConflictException, InternalServerErrorException} from '@nestjs/common'
import {Logger} from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const logger = new Logger('signup')
    const {username, password} = authCredentialsDto

    const user = new User()
    const salt = await bcrypt.genSalt()

    user.username = username
    user.password = await this.hashPassword(password, salt)
    user.salt = salt

    try {
      await user.save()
      logger.log(`new user: ${username}`)
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('User already exists')
      }
      throw new InternalServerErrorException()
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<string> {
    const {username, password} = authCredentialsDto
    const user = await this.findOne({username})
    if (user && (await user.validatePassword(password))) {
      return user.username
    } else {
      return null
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }
}
