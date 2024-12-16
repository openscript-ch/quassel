import { Controller, Get } from "@nestjs/common";
import { Public } from "../session/public.decorator";
import { version } from "../../../package.json";
import { ApiOperation } from "@nestjs/swagger";

@Controller("status")
export class StatusController {
  @Get()
  @ApiOperation({ summary: "Returns the backends status information" })
  @Public()
  get() {
    return { version };
  }
}
