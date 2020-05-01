import {JwtStrategy} from './jwt.strategy'
import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserRepository} from './user.repository'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
