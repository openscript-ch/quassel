import { Controller, Get, Query, Response } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { ExportService } from "./export.service";

enum ExportType {
  csv = "csv",
  sql = "sql",
}

const mimeTypes: { [t in ExportType]: string } = {
  csv: "text/csv",
  sql: "text/sql",
};

@Controller("export")
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  @ApiQuery({ name: "type", enum: ExportType, enumName: "ExportType", required: false })
  @ApiQuery({ name: "studyId", required: false })
  @ApiOperation({ summary: "Offers the backends data for download" })
  @ApiResponse({
    status: 200,
    description: "Database dump file",
    content: {
      "text/plain": {
        schema: { type: "string", format: "binary" },
      },
    },
    headers: {
      "Content-Disposition": {
        description: "Attachment dump",
        schema: { type: "string", example: 'attachment; filename="quassel-database-dump-01-01-01_15-12.sql"' },
      },
    },
  })
  async get(@Response() res: FastifyReply, @Query("type") type: ExportType = ExportType.sql, @Query("studyId") studyId: string) {
    try {
      let data: string;
      switch (type) {
        case ExportType.sql:
          data = await this.exportService.fullDatabaseDump();
          break;
        case ExportType.csv:
          data = await this.exportService.csvExport(+studyId);
          break;
      }
      const buffer = Buffer.from(data, "utf-8");
      const dateTime = new Date().toISOString().replace(/:/g, "-").replace("T", "_").replace(/\..+/, "");
      res.header("Content-Disposition", `attachment; filename="quassel-database-dump-${dateTime}.${type}"`);
      res.header("Content-Type", mimeTypes[type]);
      res.header("Content-Length", buffer.byteLength.toString());
      res.send(buffer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
