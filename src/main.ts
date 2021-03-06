import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {Logger} from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)
  const PORT = 3000
  await app.listen(PORT)
  logger.log(`app listening on port ${PORT}`)
}
bootstrap()
