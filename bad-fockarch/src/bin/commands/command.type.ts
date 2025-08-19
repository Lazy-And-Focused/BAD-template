import type { PositionalOptions, ArgumentsCamelCase } from "yargs";

export interface ICommand<T extends {[key: string]: unknown}> {
  command: string|string[],
  argv: Record<keyof T, PositionalOptions>,
}

export abstract class Command<T extends {[key: string]: unknown}> implements ICommand<T> {
  public abstract readonly command: string|string[];
  public abstract readonly description: string;
  public abstract readonly argv: Record<keyof T, PositionalOptions>;

  public abstract execute(argv: ArgumentsCamelCase<T>): void | Promise<void>;
  
  public register() {
    return Object.keys(this.argv).map(key => [key, this.argv[key]] as const);
  }
}

export default Command;
