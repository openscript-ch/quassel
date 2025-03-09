import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { version } from "../package.json";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { fastifySecureSession } from "@fastify/secure-session";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    origin: configService.get("cors.origin"),
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Disposition"],
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.register(fastifySecureSession, {
    expiry: configService.get("session.expiry"),
    cookieName: configService.get("session.cookieName"),
    secret: configService.get("session.secret"),
    salt: configService.get("session.salt"),
    cookie: {
      path: "/",
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + configService.get("session.expiry") * 1000),
    },
  });

  const config = new DocumentBuilder().setTitle("Quassel API").setVersion(version).setDescription("Gather language exposure data").build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen({ host: configService.get("host"), port: configService.get("port") });
}
bootstrap();
