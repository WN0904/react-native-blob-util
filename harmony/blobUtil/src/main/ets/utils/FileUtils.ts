import fs from '@ohos.file.fs';
import util from '@ohos.util';
//import { DATA_ENCODE_URI } from './ReactNativeBlobUtilConst';

export default class FileUtils {
  private DATA_ENCODE_URI;


  async copyFileToCache(cacheDir: string, uri: string):Promise<String> {
    let id = uri.split('/').pop();
    let imagePath = `${cacheDir}/${id}`;
    if(fs.accessSync(imagePath)) {
      return imagePath;
    }
    let file = await fs.open(uri);
    try {
      fs.copyFile(file.fd,imagePath);
    } catch (err) {
      console.info(`copyFileToCache copyFileSync err = ${err}`)
    }
    await fs.close(file.fd);
    return imagePath;
  }

  createFile(path:string,data:string,encoding:string) {
    //同步形式检查文件是否存在
    let created = fs.accessSync(path)
    if(encoding === this.DATA_ENCODE_URI) {

    } else {
      if(created) {
        return;
      }
      let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
      fs.writeSync(file.fd,data)
    }
  }


}