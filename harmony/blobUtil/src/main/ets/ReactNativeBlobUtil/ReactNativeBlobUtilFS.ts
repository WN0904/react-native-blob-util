import HashMap from '@ohos.util.HashMap';
import common from '@ohos.app.ability.common';
import fs, { Options } from '@ohos.file.fs';
import { ReactNativeBlobUtilConst } from '../utils/ReactNativeBlobUtilConst';
import { BusinessError } from '@ohos.base';
import { ArrayList } from '@kit.ArkTS';
import { promptAction } from '@kit.ArkUI';
import buffer from '@ohos.buffer';
import hash from '@ohos.file.hash';
import statvfs from "@ohos.file.statvfs"
import { picker } from '@kit.CoreFileKit';
import photoAccessHelper from '@ohos.file.photoAccessHelper';


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
    try {
      if(encoding !== 'utf8'){
        promptAction.showToast({message:'当前仅支持utf-8'})
      }
      encoding ='utf-8';
      let created = fs.accessSync(path)
      if(!created){
        let file = fs.openSync(path, fs.OpenMode.CREATE);
        fs.closeSync(file);
      }
      let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
      let writeLen = fs.writeSync(file.fd, data,{encoding:encoding });
      if(writeLen==-1){
        console.log("write data to file succeed and size is:" + writeLen)
      }else{
        console.log('success')
      }
      fs.closeSync(file);
      promptAction.showToast({message:'创建文件并写入数据成功'})
      return new Promise((resolve)=>{
        resolve(path)
      })
    }catch(err) {
      promptAction.showToast({message:'创建文件或写入数据失败'})
      return new Promise((reject)=>{
        reject(JSON.stringify(err))
      })
    }
  }

  stat(path:string,callback: (err:any,stat:any) => void) {
    fs.stat(path, (err, stat) => {
      if (err) {
        callback("failed to stat path `" + path + "` because it does not exist or it is not a folder",null)
      } else {
        let filename = path.split('/').pop();
        console.log("--------------------")
        let statObj = {
          'filename':filename,
          'path':path,
          'type':'asset',
          'size':stat.size,
          'lastModified':stat.mtime
        }
        console.log("+++++++++++++++++++++++++++")
        callback(null,statObj)
        promptAction.showToast({message:'获取信息成功'})
      }
    });
  }

  unlink(path:string){
    fs.unlink(path, (err) => {
      if (err) {
        console.error("remove file failed with error message: " + err.message );
        promptAction.showToast({message:'删除失败'})
      } else {
        console.info("remove file succeed");
        promptAction.showToast({message:'删除成功'})
      }
    });
  }

  cp(path: string,dest: string,callback: (value: Array<any>) => void) {
    try {
      if(fs.accessSync(path)){
        if(!fs.accessSync(dest)){
          let destFile = fs.openSync(dest, fs.OpenMode.CREATE);
          fs.closeSync(destFile);
        }
        fs.copyFileSync(path, dest);
        promptAction.showToast({message:'复制成功'})
      }else {
        promptAction.showToast({message:'原文件不存在'})
      }
    } catch (err) {
      promptAction.showToast({message:'复制失败'})
    }
  }



  writeFile(path: string,encoding: string,data: string ,transformFile: boolean, append: boolean):Promise<number> {
    return new Promise((resolve,reject) => {
      let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
      let encod =buffer.transcode(buffer.from(data), 'utf-8', 'ascii')
      let writeLen = fs.writeSync(file.fd,encod.buffer);
      if(writeLen==-1){
        console.log("write data to file succeed and size is:" + writeLen)
      }else{
        console.log('success')
      }
        fs.closeSync(file);
        promptAction.showToast({message:'写入成功'})
    })
  }

  writeFileArray(path:string,data:Array<any>,append:boolean):Promise<number> {
    return new Promise((resolve,reject) => {
      let blob = new buffer.Blob(data);
      let pro = blob.arrayBuffer();
      let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
      pro.then(array => {
        fs.write(file.fd,array,{encoding:'ascii'},(err, writeLen) => {
          if (err) {
            reject(-1);
            console.error("write failed with error message: " + err.message + ", error code: " + err.code);
          } else {
            console.info("write data to file succeed and size is:" + writeLen);
            resolve(writeLen);
            fs.closeSync(file);
          }
        });
      });
      fs.closeSync(file);
      promptAction.showToast({message:'编码为ascii的格式写入成功'})
    })
  }

  //创建目录
  mkdir(path: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      fs.mkdir(path, true, (err: BusinessError) => {
        if (err) {
          if (err.code == 13900015) {
            // 文件夹存在
            resolve();
            promptAction.showToast({message:"目录创建成功"})
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
        let blob = new buffer.Blob(data);
        let pro = blob.arrayBuffer();
        pro.then(array => {
          fs.write(file.fd,array,{encoding:'ascii'},(err, writeLen) => {
            if (err) {
              reject(-1);
              console.error("write failed with error message: " + err.message + ", error code: " + err.code);
            } else {
              console.info("write data to file succeed and size is:" + writeLen);
              resolve();
              fs.closeSync(file);
              promptAction.showToast({message:'编码为ascii的格式创建成功'})
            }
          });
        });
      }
    })
  }

  //查看对应目录下的文件和目录
  ls(path:string):Promise<Array<any>>{
    return new Promise((resolve,reject)=>{
      let create = fs.accessSync(path)
      if(!create){
        promptAction.showToast({message:'目录不存在'})
        reject("文件不存在")
      }
      let isDirectory = fs.statSync(path).isDirectory();
      if(!isDirectory){
        promptAction.showToast({message:'不是一个目录'})
        reject("目录不存在")
      }
      let filenames = fs.listFileSync(path);
      resolve(filenames)
      promptAction.showToast({message:'listFile succeed'})
      for (let i = 0; i < filenames.length; i++) {
        console.info("filename: %s", filenames[i]);
      }
    })
  }

  //袁老师
  exists(path: string, callback: (value: Array<boolean>) => void) {
    return new Promise((resolve, reject) => {
      fs.access(path, (err: BusinessError, result: boolean) => {
        if (err) {
          reject('File does not exist');
        } else {
          callback([result]);
          promptAction.showToast({message:'文件已经存在'})
        }
      });
    })
  };

  readFile(path: string, encoding: string, transformFile: boolean): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let file = fs.openSync(path, fs.OpenMode.READ_WRITE);
      let buf = new ArrayBuffer(4096);
      fs.read(file.fd, buf, (err, readLen) => {
        if (err) {
          reject('Failed to read the file');
        } else {
          let bytes = buf.slice(0, readLen);
          switch (encoding.toLowerCase()) {
            case "base64":
              resolve([buffer.transcode(buffer.from(bytes), 'utf-8', 'base64')]);
              break;
            case "ascii":
              resolve([buffer.transcode(buffer.from(bytes), 'utf-8', 'ascii')]);
              break;
            case "utf8":
              resolve([bytes.toString()]);
              break;
            default:
              resolve([bytes.toString()]);
              break;
          }
          promptAction.showToast({message:'成功读取文件'})
          fs.closeSync(file);
        }
      });
    })
  };

  lstat(path: string, callback: (value: Array<any>) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.lstat(path, (err, stat) => {
        if (err) {
          reject("lstat failed with error message: " + err.message + ", error code: " + err.code);
        } else {
          console.info("get link status succeed, the size of file is" + stat.size);
          callback([stat]);
          resolve();
          promptAction.showToast({message:'lstat is success'})
        }
      });
    })
  };

  mv(path: string, dest: string, callback: (value: Array<any>) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.moveFile(path, dest, 0, (err) => {
        if (err) {
          reject("move file failed with error message: " + err.message + ", error code: " + err.code);
        } else {
          console.info("move file succeed");
          callback([true]);
          resolve();
          promptAction.showToast({message:'文件移动成功'})
        }
      });
    })
  };

  hash(path: string, algorithm: string): Promise<string> {
    console.log('hash')
    return new Promise((resolve, reject) => {
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
          promptAction.showToast({message:'成功获取hash'})
        }
      });
    })
  };


  slice(path: string, dest: string, start: number, end: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let readFile = fs.openSync(path, fs.OpenMode.READ_ONLY);
      let writeFile = fs.openSync(dest, fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE);
      let buf = new ArrayBuffer(4096);
      fs.read(readFile.fd, buf, (err: BusinessError, readLen: number) => {
        if (err) {
          reject('Failed to read the file');
        } else {

          let max = end < readLen ? end : readLen;
          let bytes = buf.slice(start, readLen);
          fs.write(writeFile.fd, bytes, (err, writeLen) => {
            if (err) {
              reject("write failed with error message: " + err.message + ", error code: " + err.code);
            } else {
              resolve(bytes.toString());
              fs.closeSync(writeFile);
            }
          });
          fs.closeSync(readFile);
          promptAction.showToast({message:'slice is success'})
        }
      });
    })
  };

  df(callback: (value: Array<any>) => void) {
    let totalSize = statvfs.getTotalSizeSync(this.context.filesDir);
    let freeSize = statvfs.getFreeSizeSync(this.context.filesDir);
    let array =[
      {
        "totalSize":totalSize
      },
      {
        "freeSize":freeSize
      }]
    callback(array)
    promptAction.showToast({message:JSON.stringify(array)})
  };
}

