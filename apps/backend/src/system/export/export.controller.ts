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
        schema: { type: "string", example: 'attachment; filename="quassel-database-dump-01-01-01_15-12.sql"' },
      },
    },
  })
  async get(@Response() res: FastifyReply) {
    try {
      const data = await this.exportService.fullDatabaseDump();
      const buffer = Buffer.from(data, "utf-8");
      const dateTime = new Date().toISOString().replace(/:/g, "-").replace("T", "_").replace(/\..+/, "");
      res.header("Content-Disposition", `attachment; filename="quassel-database-dump-${dateTime}.sql"`);
      res.header("Content-Type", "text/sql");
      res.header("Content-Length", buffer.byteLength.toString());
      res.send(buffer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
