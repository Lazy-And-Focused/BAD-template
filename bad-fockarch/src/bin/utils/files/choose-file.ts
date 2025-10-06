import { copyFile, readdir, rm } from "fs/promises";
import { CHOOSE_FILE_REGEX } from "../constants";
import { join } from "path";

export const isChooseFile = (file: string) => CHOOSE_FILE_REGEX.test(file);

export const parseChooseFileName = (option: string, name: string) => ({
  option,
  name,
  fullName: `${option}--${name}`,
});

export const filterFiles = (files: string[]) =>
  files.filter((file) => CHOOSE_FILE_REGEX.test(file));

export const chooseFile = (files: string[], option: string): string => {
  return Object.fromEntries(
    filterFiles(files).map((file) =>
      file.match(CHOOSE_FILE_REGEX)!.slice(1, 3),
    ),
  )[option];
};

export const resolveChooseFilesAndDelete = async (
  dir: string,
  option: string,
) => {
  const files = filterFiles(await readdir(dir));
  const chooseFileData = parseChooseFileName(option, chooseFile(files, option));

  await copyFile(
    join(dir, chooseFileData.fullName),
    join(dir, chooseFileData.name),
  );

  for (const file of files) {
    if (file === chooseFileData.name) continue;

    await rm(join(dir, file));
  }

  return chooseFileData;
};
