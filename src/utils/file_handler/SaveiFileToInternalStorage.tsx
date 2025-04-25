import RNFS from 'react-native-fs';

type StorageType = 'private' | 'public';

interface SaveLocalMediaOptions {
  sourcePath: string; // Absolute path to the local file
  fileName?: string; // Optional custom filename
  storage?: StorageType; // Default is 'private'
}

interface UpdateLocalMediaOptions {
  existingFilePath: string; // Path of file to replace
  newSourcePath: string; // New file path to copy from
}

export const MediaFileHelper = {
  /**
   * Copy a local file into app storage (private or public)
   */
  async saveMediaFile({
    sourcePath,
    fileName = `media_${Date.now()}.png`,
    storage = 'private',
  }: SaveLocalMediaOptions): Promise<string | false> {
    const targetDir =
      storage === 'private'
        ? `${RNFS.DocumentDirectoryPath}/subscriptions/profiles`
        : `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.alphaved.trackify/subscriptions/profiles`;

    const targetPath = `file://${targetDir}/${fileName}`;

    try {
      const dirExists = await RNFS.exists(targetDir);
      if (!dirExists) {
        await RNFS.mkdir(targetDir);
      }

      await RNFS.copyFile(sourcePath, targetPath);
      return targetPath;
    } catch (error) {
      console.error('Error saving local media file:', error);
      return false;
    }
  },

  /**
   * Delete a file from the file system
   */
  async deleteMediaFile(filePath: string): Promise<boolean> {
    try {
      const exists = await RNFS.exists(filePath);
      if (exists) {
        await RNFS.unlink(filePath);
        return true;
      } else {
        console.warn('File does not exist:', filePath);
        return false;
      }
    } catch (error) {
      console.error('Error deleting media file:', error);
      return false;
    }
  },

  /**
   * Replace an existing media file with a new local file
   */
  async updateMediaFile({
    existingFilePath,
    newSourcePath,
  }: UpdateLocalMediaOptions): Promise<string | false> {
    try {
      const exists = await RNFS.exists(existingFilePath);
      if (exists) {
        await RNFS.unlink(existingFilePath);
      }

      await RNFS.copyFile(newSourcePath, existingFilePath);
      return existingFilePath;
    } catch (error) {
      console.error('Error updating media file:', error);
      return false;
    }
  },
};

/**
 * Converts a local image file to a Base64 string.
 * @param filePath Absolute path to the image file (e.g., from image picker or saved path)
 * @returns Base64-encoded string or false if error
 */
export const convertImageToBase64 = async (
  filePath: string,
): Promise<string | false> => {
  try {
    const base64String = await RNFS.readFile(filePath, 'base64');
    return base64String;
  } catch (error) {
    console.error('Failed to convert image to Base64:', error);
    return false;
  }
};

export function extractDetailsFromPath(filePath: string): {
  file_type: string;
  file_name: string;
} {
  const parts = filePath.split('/');
  const details = parts[parts.length - 1].split('.');
  const file_type = details?.[details.length - 1] || '';
  const file_name = details.slice(0, -1).join('.');
  return {file_type, file_name};
}
