export const RELEASE_URL = "https://api.github.com/repos/Lazy-And-Focused/BAD-template/releases/latest";
export const RELEASE_FILE_NAME = "release.tar.gz";

export const getDownloadUrl = (version: string) =>
  `https://github.com/Lazy-And-Focused/BAD-template/releases/download/${version}/${RELEASE_FILE_NAME}`;