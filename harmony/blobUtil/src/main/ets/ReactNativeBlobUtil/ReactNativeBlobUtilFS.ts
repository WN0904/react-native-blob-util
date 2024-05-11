import HashMap from '@ohos.util.HashMap';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';
import { promptAction } from '@kit.ArkUI';
import buffer from '@ohos.buffer';
import hash from '@ohos.file.hash';
import statvfs from "@ohos.file.statvfs"

export default class ReactNativeBlobUtilFS {

  private context: common.UIAbilityContext | undefined = undefined;

  constructor(context:common.UIAbilityContext) {
    this.context = context;
  }

  getSystemFolders():object{
    let res = new HashMap<string, Object>();
    res.set('CacheDir',this.context.cacheDir);
    res.set('DocumentDir',this.context.filesDir);
    //下载的标准目录
    res.set('DownloadDir',this.context.filesDir);
    //应用安装后的app的hap资源包所在目录
    res.set('MainBundleDir',this.context.bundleCodeDir)
    //电影存放路径
    res.set('MovieDir',this.context.filesDir+'/movie')
    //音乐存放路径
    res.set('MusicDir',this.context.filesDir+'/music')
    //图片存放路径
    res.set('PictureDir',this.context.filesDir+'/picture')

    res.set("ApplicationSupportDir", "");
    res.set("RingtoneDir", "");
    res.set("SDCardDir", "");
    res.set("SDCardApplicationDir", "");
    res.set("DCIMDir", "");

    res.set("LegacyDCIMDir", "");
    res.set("LegacyPictureDir", "");
    res.set("LegacyMusicDir", "");
    res.set("LegacyDownloadDir", "");
    res.set("LegacyMovieDir", "");
    res.set("LegacyRingtoneDir", "");
    res.set("LegacySDCardDir", "");

    const entriesArray = Array.from(res.entries());
    // 将数组转换为对象
    const myObject = entriesArray.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    return myObject;
  }

  createFile(path:string,data:string,encoding:string):Promise<string> {
    return new Promise((res, rej) => {
      try {
        if(encoding !== 'utf8'){
          rej(null)
          return
        }
        encoding ='utf-8';
        let created = fs.accessSync(path)
        if(!created){
          let file = fs.openSync(path, fs.OpenMode.CREATE);
          fs.closeSync(file);
        }
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
        fs.writeSync(file.fd, data,{encoding:encoding });
        fs.closeSync(file);
        res(path)
      } catch(err) {
        console.error("createFile failed with error message: " + err.message + ", error code: " + err.code);
        rej(err)
      }
    })
  }

  stat(path:string,callback: (err:any,stat:any) => void) {
    fs.stat(path, (err, stat) => {
      if (err) {
        callback("failed to stat path `" + path + "` because it does not exist or it is not a folder",null)
      } else {
        let filename = path.split('/').pop();
        let statObj = {
          'filename':filename,
          'path':path,
          'type':'asset',
          'size':stat.size,
          'lastModified':stat.mtime
        }
        callback(null,statObj)
      }
    });
  }

  unlink(path:string, callback: (err: any) => void){
    try {
      fs.unlink(path, (err) => {
        if (err) {
          console.error("remove file failed with error message: " + err.message);
          callback("remove file failed with error message: " + err.message)
        } else {
          console.info("remove file succeed");
          callback(null)
        }
      });
    } catch(err) {
      let errMsg = "unlink failed with error message: " + err.message + ", error code: " + err.code;
      console.error(errMsg);
      callback(errMsg);
    }
  }

  removeSession(paths: Array<any>,callback: (err: any) => void) {
    let removeAsyncArr = [];
    for (let i = 0; i < paths.length; i++) {
      removeAsyncArr.push(fs.unlink(paths[i]))
    }
    
    Promise.all([removeAsyncArr]).then(() => {
      callback('')
    }).catch((err) => {
      callback(err)
    })
  }

  cp(path: string,dest: string,callback: (err: any, res: any) => void) {
    try {
      if(fs.accessSync(path)){
        fs.copyFileSync(path, dest);
        callback(null, '')
      }else {
        callback('file is not exist', null)
      }
    } catch (err) {
      callback('ap err', null)
    }
  }



  writeFile(path: string,encoding: string,data: string ,transformFile: boolean, append: boolean):Promise<number> {
    return new Promise((resolve,reject) => {
      try {
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        let encod =buffer.transcode(buffer.from(data), 'utf-8', 'ascii')
        let writeLen = fs.writeSync(file.fd,encod.buffer);
        if(writeLen==-1){
          console.log("write data to file succeed and size is:" + writeLen)
        }else{
          console.log('success')
        }
        fs.closeSync(file);
        resolve(writeLen)
      } catch (err) {
        let errMsg = "writeFile failed with error message: " + err.message + ", error code: " + err.code;
        console.error(errMsg);
        reject(errMsg);
      }
    })
  }

  writeFileArray(path:string,data:Array<any>,append:boolean):Promise<number> {
    return new Promise((resolve,reject) => {
      try {
        let buf = buffer.from(data);
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        fs.write(file.fd,buf.toString('utf-8'),{encoding:'utf-8'},(err, writeLen) => {
          if (err) {
            reject(-1);
            console.error("write failed with error message: " + err.message + ", error code: " + err.code);
          } else {
            console.info("write data to file succeed and size is:" + writeLen);
            resolve(writeLen);
          }
          fs.closeSync(file);
        });
      } catch (err) {
        let errMsg = "writeFileArray failed with error message: " + err.message + ", error code: " + err.code;
        console.error(errMsg);
        reject(errMsg);
      }
    })
  }

  //创建目录
  mkdir(path: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      fs.mkdir(path, true, (err: BusinessError) => {
        if (err) {
          if (err.code == 13900015) {
            // 文件夹存在
            reject('floder exists');
          } else {
            reject(`Directory could not be created ${err.message} ${err.code}`);
          }
        } else {
          resolve();
        }
      })
    })
  }

  createFileASCII(path:string,data:Array<any>):Promise<void>{
    return new Promise((resolve,reject)=>{
      let createFileASCII = fs.accessSync(path)
      if(!createFileASCII){
        let file = fs.openSync(path, fs.OpenMode.CREATE);
        fs.closeSync(file);
        reject("File at path `" + path + "` already exists")
      }else{
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
        let buf = buffer.from(data);
        fs.write(file.fd,buf.toString('utf-8'),{encoding:'utf-8'},(err, writeLen) => {
          if (err) {
            reject(err);
            console.error("write failed with error message: " + err.message + ", error code: " + err.code);
          } else {
            console.info("write data to file succeed and size is:" + writeLen);
            resolve();
          }
          fs.closeSync(file);
        });
      }
    })
  }

  //查看对应目录下的文件和目录
  ls(path:string):Promise<Array<any>>{
    return new Promise((resolve,reject)=>{
      let create = fs.accessSync(path)
      if(!create){
        reject("文件不存在")
      }
      let isDirectory = fs.statSync(path).isDirectory();
      if(!isDirectory){
        reject("目录不存在")
      }
      let filenames = fs.listFileSync(path);
      resolve(filenames)
      for (let i = 0; i < filenames.length; i++) {
        console.info("filename: %s", filenames[i]);
      }
    })
  }

  exists(path: string, callback: (value: boolean) => void) {
    return new Promise((resolve, reject) => {
      fs.access(path, (err: BusinessError, result: boolean) => {
        if (err) {
          reject('File does not exist');
        } else {
          callback(result);
        }
      });
    })
  };

  readFile(path: string, encoding: string, transformFile: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let fileInfo = fs.statSync(path)
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
        let buf = new ArrayBuffer(fileInfo.size);
        fs.read(file.fd, buf, (err, readLen) => {
          if (err) {
            reject('Failed to read the file');
          } else {
            let bytes = buffer.from(buf, 0, readLen);
            switch (encoding.toLowerCase()) {
              case "base64":
                resolve(buffer.transcode(bytes, 'utf-8', 'base64'));
                break;
              case "ascii":
                resolve(buffer.transcode(bytes, 'utf-8', 'ascii'));
                break;
              case "utf8":
                resolve(bytes.toString('utf-8'));
                break;
              default:
                resolve(bytes.toString('utf-8'));
                break;
            }
            fs.closeSync(file);
          }
        });
      } catch (err) {
        let errMsg = "readFile failed with error message: " + err.message + ", error code: " + err.code;
        console.error(errMsg);
        reject(errMsg);
      }
    })
  };

  lstat(path: string, callback: (err: any, stat: any) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.lstat(path, (err, stat: fs.Stat) => {
        if (err) {
          callback("lstat failed with error message: " + err.message + ", error code: " + err.code, null)
          reject("lstat failed with error message: " + err.message + ", error code: " + err.code);
        } else {
          console.info("get link status succeed, the size of file is" + stat.size);
          let infoStat = {
            mode: stat.mode,
            size: stat.size,
            ctime: stat.ctime,
            mtime: stat.mtime,
            atime: stat.atime,
            gid: stat.gid,
            uid: stat.uid
          }
          callback(null, infoStat)
          resolve();
        }
      });
    })
  };

  mv(path: string, dest: string, callback: (err: any, res: any) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.moveFile(path, dest, 0, (err) => {
        if (err) {
          callback("move file failed with error message: " + err.message + ", error code: " + err.code, null)
          reject("move file failed with error message: " + err.message + ", error code: " + err.code);
        } else {
          callback(null, '');
          resolve();
        }
      });
    })
  };

  hash(path: string, algorithm: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let algorithms: HashMap<string, string> = new HashMap();
        algorithms.set('md5', 'md5');
        algorithms.set('sha1', 'sha1');
        algorithms.set('sha256', 'sha256');
        // algorithm不存在
        if (!algorithms.hasKey(algorithm)) {
          reject('Invalid hash algorithm');
          return;
        }
        // 判断是否是文件夹
        let isDirectory = fs.statSync(path).isDirectory();
        if (isDirectory) {
          reject('file  IsDirectory');
          return;
        }
        // 判断文件是否在
        let res = fs.accessSync(path);
        if (!res) {
          reject('file not exists');
          return;
        }
        hash.hash(path, algorithm, (err, str) => {
          if (err) {
            reject("calculate file hash failed with error message: " + err.message + ", error code: " + err.code);
          } else {
            console.info("calculate file hash succeed:" + str);
            resolve(str)
          }
        });
      } catch (err) {
        let errMsg = "hash failed with error message: " + err.message + ", error code: " + err.code;
        console.error(errMsg);
        reject(errMsg);
      }
    })
  };


  slice(path: string, dest: string, start: number, end: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let fileInfo = fs.statSync(path);
        let readFile = fs.openSync(path, fs.OpenMode.READ_ONLY);
        let writeFile = fs.openSync(dest, fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE);
        let buf = new ArrayBuffer(fileInfo.size);
        fs.read(readFile.fd, buf, (err: BusinessError, readLen: number) => {
          if (err) {
            reject('Failed to read the file');
            fs.closeSync(readFile);
          } else {
            let max = end < readLen ? end : readLen;
            let bytes = buf.slice(start, max);
            fs.write(writeFile.fd, bytes, (err, writeLen) => {
              if (err) {
                reject("write failed with error message: " + err.message + ", error code: " + err.code);
              } else {
                resolve(bytes.toString());
                fs.closeSync(writeFile);
              }
            });
            fs.closeSync(readFile);
          }
        });
      } catch (err) {
        let errMsg = "slice failed with error message: " + err.message + ", error code: " + err.code;
        console.error(errMsg);
        reject(errMsg);
      }
    })
  };

  df(callback: (err: any, stat: Object) => void) {
    let totalSize = statvfs.getTotalSizeSync(this.context.filesDir);
    let freeSize = statvfs.getFreeSizeSync(this.context.filesDir);
    callback(null, { "free": freeSize, "total": totalSize})
  };
}

