import {AuthService} from './auth.service'
import {AuthCredentialsDto} from './dto/auth-credentials.dto'
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@Req() req): Promise<void> {
    console.log(req)
  }
}
