import { Controller, Get, Response } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { ExportService } from "./export.service";

@Controller("export")
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  @ApiOperation({ summary: "Offers the backends data for download" })
  @ApiResponse({
    status: 200,
    description: "Database dump file",
    content: {
      "text/sql": {
        schema: { type: "string", format: "binary" },
      },
    },
    headers: {
      "Content-Disposition": {
        description: "Attachment dump.sql",
        schema: { type: "string", example: "attachment; filename=dump.sql" },
      },
    },
  })
  get(@Response() res: FastifyReply) {
    const data = this.exportService.fullDatabaseDump();
    const buffer = Buffer.from(data, "utf-8");
    res.header("Content-Disposition", "attachment; filename=dump.sql");
    res.header("Content-Type", "text/sql");
    res.header("Content-Length", buffer.byteLength);
    res.send(data);
  }
}
