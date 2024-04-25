import { TurboModule, RNOHError,Descriptor } from '@rnoh/react-native-openharmony/ts';
import ReactNativeBlobUtilFS from './ReactNativeBlobUtil/ReactNativeBlobUtilFS';
import common from '@ohos.app.ability.common';
import ReactNativeBlobUtilImpl from './ReactNativeBlobUtil/ReactNativeBlobUtilImpl';
import { AsyncCallback } from '@ohos.base';
import { ReactNativeBlobUtilReadStream } from './ReactNativeBlobUtil/ReactNativeBlobUtilStream';

export class BlobUtilTurboModule extends TurboModule {
  private context: common.UIAbilityContext = this.ctx.uiAbilityContext;
  private reactNativeBlobUtilImpl: ReactNativeBlobUtilImpl = new ReactNativeBlobUtilImpl(this.context,this.ctx)

  getConstants():Object{
    return this.reactNativeBlobUtilImpl.getSystemFolders();
  }

  createFile(path: string, data: string, encoding: string):Promise<string> {
    return this.reactNativeBlobUtilImpl.createFile(path,data,encoding)
  }

  stat(path:string,callback: (err:any,stat:any) => void) {
    this.reactNativeBlobUtilImpl.stat(path,callback)
  }

  cp(path:string,dest:string,callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilImpl.cp(path,dest,callback)
  }

  writeFile(path: string, encoding: string, data: string, transformFile: boolean, append: boolean):Promise<number> {
    return this.reactNativeBlobUtilImpl.writeFile(path,encoding,data,transformFile,append)
  }

  writeFileArray(path: string, data: Array<any>, appendData: boolean) {
    return this.reactNativeBlobUtilImpl.writeFileArray(path,data,appendData)
  }

  writeStream(path: string, encoding: string, appendData: boolean, callback: (errCode,errMsg,streamId?:string) => void) {
    this.reactNativeBlobUtilImpl.writeStream(path,encoding,appendData,callback)
  }
  readStream(path:string,encoding:string,bufferSize:number,tick:number,streamId:string):Promise<ReactNativeBlobUtilReadStream>{
    return this.reactNativeBlobUtilImpl.readStream(path,encoding,bufferSize,tick,streamId)
  }

  unlink(path:string){
    this.reactNativeBlobUtilImpl.unlink(path)
  }

  mkdir(path:string):Promise<void>{
    return this.reactNativeBlobUtilImpl.mkdir(path)
  }

  createFileASCII(path:string,data:Array<any>):Promise<void>{
    return this.reactNativeBlobUtilImpl.createFileASCII(path,data)
  }

  ls(path:string):Promise<Array<any>>{
    return this.reactNativeBlobUtilImpl.ls(path)
  }

  writeChunk(streamId: string, withData: string, callback: (value: Array<any>) => void){
    return this.reactNativeBlobUtilImpl.writeChunk(streamId,withData,callback)
  }

  writeArrayChunk(streamId: string, withArray: Array<any>, callback: (value: Array<any>) => void){
    this.reactNativeBlobUtilImpl.writeArrayChunk(streamId,withArray,callback)
  }

  exists(path: string, callback: (value: Array<boolean>) => void){
    this.reactNativeBlobUtilImpl.exists(path,callback)
  }

  readFile(path: string, encoding: string, transformFile: boolean):Promise<Array<any>>{
    return this.reactNativeBlobUtilImpl.readFile(path,encoding,transformFile)
  }

  lstat(path: string, callback: (value: Array<any>) => void){
   this.reactNativeBlobUtilImpl.lstat(path,callback)
  }

  mv(path: string, dest: string, callback: (value: Array<any>) => void){
    this.reactNativeBlobUtilImpl.mv(path,dest,callback)
  }

  hash(path: string, algorithm: string):Promise<string>{
    return this.reactNativeBlobUtilImpl.hash(path,algorithm)
  }

  df(callback: (value: Array<any>) => void){
    this.reactNativeBlobUtilImpl.df(callback)
  }

  slice(src: string, dest: string, start: number, end: number):Promise<string>{
    return this.reactNativeBlobUtilImpl.slice(src,dest,start,end)
  }

  closeStream(streamId: string, callback: (value: Array<any>) => void){
    this.reactNativeBlobUtilImpl.closeStream(streamId,callback)
  }
}
