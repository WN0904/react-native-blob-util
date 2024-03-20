
import fs, { Options, WriteOptions} from '@ohos.file.fs';
import emitter from '@ohos.events.emitter'
import util from '@ohos.util';
import HashMap from '@ohos.util.HashMap';
import { ReactNativeBlobUtilConst } from '../utils/ReactNativeBlobUtilConst';
import common from '@ohos.app.ability.common';
import { EventEmitter,Descriptor,TurboModuleContext } from 'rnoh/ts';
import { promptAction } from '@kit.ArkUI';
import { buffer } from '@kit.ArkTS';

export type BlobUtilViewDescriptor = Descriptor<"RNCBlobUtil">
export const FAST_BLOB_UTIL = "BlobUtil"

export type Encoding = "utf8" | "ascii" | "base64";
export type Stream = {encoding:string,stream:fs.Stream | undefined}
export interface ReactNativeBlobUtilReadStream {
  path: string;
  encoding: Encoding;
  bufferSize?: number;
  closed: boolean;
  tick: number;

  open(): void;

  onData(fn: (chunk: string | number[]) => void): void;

  onError(fn: (err: any) => void): void;

  onEnd(fn: () => void): void;
}

export default class ReactNativeBlobUtilStream {
  private ctx: TurboModuleContext | undefined = undefined
  private stream: fs.Stream | undefined = undefined;
  private encoding: string = 'base64'
  private static fileStreams = new HashMap<string, Stream>();
  private descriptor: BlobUtilViewDescriptor = {} as BlobUtilViewDescriptor

  constructor(ctx: TurboModuleContext) {
    this.ctx = ctx;
  }


  async writeStream(filePath: string, encoding: string, append: boolean, callback: (errCode, errMsg, streamId?: string) => void) {
    if (!fs.accessSync(filePath)) {
      callback("ENOENT", "File '" + filePath + "' does not exist and could not be created");
      return
    }
    let file = fs.openSync(filePath);
    this.encoding = encoding;
    try {
      let stream = await fs.createStreamSync(filePath, "r+")
      let uuid = util.generateRandomUUID(true);
      ReactNativeBlobUtilStream.fileStreams.set(uuid, {
        stream: stream,
        encoding: encoding
      })
      this.stream = stream
      fs.closeSync(file);
      callback(null, null, uuid)
      console.log('writeStream finish----------', uuid)
      promptAction.showToast({
        message: '写流成功'
      })
    } catch (err) {
      console.log('writeStream exception----------', err)
      callback("EUNSPECIFIED", "Failed to create write stream at path `" + filePath + "`; " + err.message);
    }
  }

  readStream(filePath: string, encoding: string, bufferSize: number, tick: number, streamId: string): Promise<ReactNativeBlobUtilReadStream> {
    let inputStream = fs.createStreamSync(filePath, 'r+');
    if (encoding.toLowerCase() === 'utf8') {
      let buf = new ArrayBuffer(bufferSize);
      let readSize = 0;
      let readLen = inputStream.readSync(buf, {
        offset: readSize
      });
      readSize += readLen;
      while (readLen > 0) {
        readLen = inputStream.readSync(buf, {
          offset: readSize
        });
        readSize += readLen
      }
      inputStream.closeSync();
    }
    return new Promise((resolve, reject) => {
      promptAction.showToast({message:'读流成功'})
    })
  }


  writeChunk(streamId: string, data: string, callback: (value: Array<any>) => void) {
    let ss = ReactNativeBlobUtilStream.fileStreams.get(streamId)
    if (!ss) {
      return;
    }
    try{
      ss.stream.write(data, {
        encoding: ((ss.encoding === 'utf8') ? 'utf-8' : ss.encoding)
      }, (err, bytesWritten) => {
        console.log(JSON.stringify(bytesWritten)+'bytesWritten')
        if (err) {
          callback([]);
        } else {
          if (bytesWritten) {
            callback([]);
            promptAction.showToast({
              message: "成功写入Chunk流"
            })
          }
        }
      });
    }catch (err){
      console.log(err,'err')
    }
  }

  writeArrayChunk(streamId: string, data: Array<any>, callback: (value: Array<any>) => void) {
    let ss = ReactNativeBlobUtilStream.fileStreams.get(streamId)
    if (!ss) {
      return;
    }
    let blob = new buffer.Blob(data);
    let pro = blob.arrayBuffer();
    pro.then((array:ArrayBuffer) => {
      ss.stream.write(array,{
        encoding: 'utf-8'
      }, (err, bytesWritten) => {
        if (err) {
          callback([]);
        } else {
          if (bytesWritten) {
            callback([]);
            promptAction.showToast({message: "成功写入Chunk数组流"})
          }
        }
      });
    });
  }

  close(streamId: string, callback: (value: Array<any>) => void){
    let ss = ReactNativeBlobUtilStream.fileStreams.get(streamId)
    if(!ss){
      return;
    }
    ReactNativeBlobUtilStream.fileStreams.remove(streamId)
    ss.stream.close((err)=>{ if (err) {
      console.error("close stream failed with error message: " + err.message + ", error code: " + err.code);
    } else {
      console.info("close stream succeed");
      promptAction.showToast({message:'成功关闭流'})
    }
    })
  }
}