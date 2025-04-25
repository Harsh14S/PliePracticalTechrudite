import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';

/**
 * Returns the app's document directory path
 */
export const getAppStoragePath = (): string => {
  return RNFS.DocumentDirectoryPath;
};

/**
 * Generates a unique file name with optional prefix and extension
 */
const generateFileName = (
  prefix: string = 'img',
  extension: string = 'jpg',
): string => {
  const id = uuidv4();
  return `${prefix}_${id}.${extension}`;
};

/**
 * Copies a temporary image file to the app's document directory
 * @param tempPath The source path (e.g. from ImagePicker)
 * @param prefix Optional prefix for file name
 * @returns The new permanent path or null if failed
 */
export const saveImageToAppStorage = async (
  tempPath: string,
  prefix: string = 'img',
): Promise<string | null> => {
  try {
    const ext = tempPath.split('.').pop()?.split('?')[0] || 'jpg';
    const fileName = generateFileName(prefix, ext);
    const destPath = `${getAppStoragePath()}/${fileName}`;

    await RNFS.copyFile(tempPath, destPath);
    return destPath;
  } catch (error) {
    console.error('[saveImageToAppStorage] Failed to save image:', error);
    return null;
  }
};

/**
 * Deletes an image from the app's document directory
 * @param filePath The absolute path to the image
 */
export const deleteImageFromAppStorage = async (
  filePath: string,
): Promise<void> => {
  try {
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
    }
  } catch (error) {
    console.warn('[deleteImageFromAppStorage] Failed to delete image:', error);
  }
};
