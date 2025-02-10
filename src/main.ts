import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Blog Posting API Documentation')
    .setDescription(
      'This is the API documentation for the Blog Posting application. The API allows users to create, read, update, and delete blog posts, as well as manage authentication, user profiles, and comments.',
    )
    .setVersion('1.0')
    .addBearerAuth() // bearer token auth
    .build();

  // swagger doc
  const document = SwaggerModule.createDocument(app, config);

  // swagger UI
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
