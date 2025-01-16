import { Injectable } from "@nestjs/common";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { ConfigService } from "../../config/config.service";
import { EntityManager } from "@mikro-orm/postgresql";
import { Entry } from "../../research/entries/entry.entity";

const execPromise = promisify(exec);

@Injectable()
export class ExportService {
  constructor(
    private readonly configService: ConfigService,
    private readonly em: EntityManager
  ) {}

  async fullDatabaseDump() {
    const user = this.configService.get("database.user");
    const database = this.configService.get("database.name");
    const password = this.configService.get("database.password");
    const host = this.configService.get("database.host");
    const port = this.configService.get("database.port");

    const command = `PGPASSWORD=${password} pg_dump -U ${user} -h ${host} -p ${port} ${database}`;

    return this.executeCommand(command);
  }

  async csvExport() {
    const user = this.configService.get("database.user");
    const database = this.configService.get("database.name");
    const password = this.configService.get("database.password");
    const host = this.configService.get("database.host");
    const port = this.configService.get("database.port");

    const query = this.em
      .createQueryBuilder(Entry, "entry")
      .select([
        "*",
        "carer.name as carer_name",
        "entryLanguages.ratio",
        "language.id as language_id",
        "language.name as langauge_name",
        "questionnaire.title as questionnaire_title",
        "questionnaire.started_at as questionnaire_started_at",
        "questionnaire.ended_at as questionnaire_ended_at",
        "questionnaire.created_at as questionnaire_created_at",
        "questionnaire.completed_at as questionnaire_completed_at",
        "questionnaire.remark as questionnaire_remark",
        "participant.id as participant_id",
        "participant.birthday",
        "study.id as study_id",
        "study.title as study_title",
      ])
      .join("carer", "carer")
      .join("entryLanguages", "entryLanguages")
      .join("entryLanguages.language", "language")
      .join("entry.questionnaire", "questionnaire")
      .join("questionnaire.study", "study")
      .join("questionnaire.participant", "participant")
      .getQuery();

    const copyCommand = `COPY (${query}) TO STDOUT WITH CSV HEADER DELIMITER ',';`;

    const command = `PGPASSWORD=${password} psql -U ${user} -h ${host} -p ${port} -d ${database} -c "${copyCommand}"`;

    return this.executeCommand(command);
  }

  private async executeCommand(command: string) {
    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr) throw new Error(stderr);

      return stdout;
    } catch (error) {
      throw new Error(`Database dump failed: ${error.message}`);
    }
  }
}
