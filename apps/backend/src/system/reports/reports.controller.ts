import { Controller, Get, Query, Response } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiQuery({ name: "studyId", required: true })
  @ApiOperation({ summary: "Offers the backends data for download" })
  @ApiResponse({
    status: 200,
    description: "Report file",
    content: {
      "text/csv": {
        schema: { type: "string", format: "binary" },
      },
    },
    headers: {
      "Content-Disposition": {
        description: "Report",
        schema: { type: "string", example: 'attachment; filename="quassel-study-700-report-01-01-01_15-12.csv"' },
      },
    },
  })
  async get(@Response() res: FastifyReply, @Query("studyId") studyId: string) {
    try {
      const data = await this.reportsService.evaluatedLanguageExposure(+studyId);

      const buffer = Buffer.from(data, "utf-8");
      const dateTime = new Date().toISOString().replace(/:/g, "-").replace("T", "_").replace(/\..+/, "");
      res.header("Content-Disposition", `attachment; filename="quassel-study-${studyId}-report-${dateTime}.csv"`);
      res.header("Content-Type", "text/csv");
      res.header("Content-Length", buffer.byteLength.toString());
      res.send(buffer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
