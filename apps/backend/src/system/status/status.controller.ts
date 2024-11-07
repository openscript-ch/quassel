import { Controller, Get } from "@nestjs/common";
import { Public } from "../session/public.decorator";
import { version } from "../../../package.json";

@Controller("status")
export class StatusController {
  @Get()
  @Public()
  get() {
    return { version };
  }
}
