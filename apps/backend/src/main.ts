import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { version } from "../package.json";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder().setTitle("Quassel API").setVersion(version).setDescription("Gather language exposure data").build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
