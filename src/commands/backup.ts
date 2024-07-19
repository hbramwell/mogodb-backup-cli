import ora from "ora";
import chalk from "chalk";
import { backupDatabase } from "../services/backup";
import logger from "../utils/logger";
import { type BackupOptions } from "../types";
import { AppError, handleError } from "../utils/error-handler";

/**
 * Performs a database backup.
 * @param {BackupOptions} options - The backup options.
 */
export default async function backup(options: BackupOptions) {
  const spinner = ora("Starting backup process").start();

  try {
    const { uri, database, output } = options;

    // Check if required options are missing
    if (!uri || !database || !output) {
      throw new AppError(
        "Missing required options: uri, database, or output",
        400
      );
    }

    spinner.text = "Connecting to database...";
    await backupDatabase(uri, database, output);

    spinner.succeed(chalk.green("Backup completed successfully!"));
    logger.info(`Backup saved to: ${output}`);
  } catch (error) {
    spinner.fail(chalk.red("Backup failed"));
    handleError(error);
  }
}
