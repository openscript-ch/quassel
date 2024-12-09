import { Injectable } from "@nestjs/common";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { ConfigService } from "../../config/config.service";

const execPromise = promisify(exec);

@Injectable()
export class ExportService {
  constructor(private readonly configService: ConfigService) {}

  async fullDatabaseDump() {
    try {
      const user = this.configService.get("database.user");
      const database = this.configService.get("database.name");
      const password = this.configService.get("database.password");
      const host = this.configService.get("database.host");
      const port = this.configService.get("database.port");

      const command = `PGPASSWORD=${password} pg_dump -U ${user} -h ${host} -p ${port} ${database}`;

      const { stdout, stderr } = await execPromise(command);
      if (stderr) {
        throw new Error(stderr);
      }
      return stdout;
    } catch (error) {
      throw new Error(`Database dump failed: ${error.message}`);
    }
  }
}
