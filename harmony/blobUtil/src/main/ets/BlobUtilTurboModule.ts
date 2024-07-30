import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import common from '@ohos.app.ability.common';
import ReactNativeBlobUtilImpl from './ReactNativeBlobUtil/ReactNativeBlobUtilImpl';
import ConfigType from './ReactNativeBlobUtil/ReactNativeBlobUtilConfig'

export class BlobUtilTurboModule extends TurboModule {
  private context: common.UIAbilityContext = this.ctx.uiAbilityContext;
  private reactNativeBlobUtilImpl: ReactNativeBlobUtilImpl = new ReactNativeBlobUtilImpl(this.context,this.ctx)

  getConstants():Object{
    return this.reactNativeBlobUtilImpl.getSystemFolders();
  }

  fetchBlob(options: ConfigType, taskId: string, method: string, url: string, headers: Object, form: Array<any> | string, callback: (err: any, rawType: string, data: string, responseInfo: any) => void) {
    this.reactNativeBlobUtilImpl.fetchBlob(options, taskId, method, url, headers, form, callback);
  }

  fetchBlobForm(options: ConfigType, taskId: string, method: string, url: string, headers: Object, form: Array<any> | string, callback: (err: any, rawType: string, data: string, responseInfo: any) => void) {
    this.reactNativeBlobUtilImpl.fetchBlobForm(options, taskId, method, url, headers, form, callback);
  }

  pathForAppGroup() {
    // only ios
  }

  async syncPathAppGroup() {
    // only ios
  }

  cancelRequest(taskId: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilImpl.cancelRequest(taskId, callback);
  }

  enableProgressReport(taskId: string, interval: number, count: number) {
    this.reactNativeBlobUtilImpl.enableProgressReport(taskId, interval, count);
  }

  enableUploadProgressReport(taskId: string, interval: number, count: number) {
    this.reactNativeBlobUtilImpl.enableUploadProgressReport(taskId, interval, count);
  }

  removeSession(paths: Array<any>, callback: (err: any) => void) {
    this.reactNativeBlobUtilImpl.removeSession(paths, callback);
  }

  createFile(path: string, data: string, encoding: string):Promise<string> {
    return this.reactNativeBlobUtilImpl.createFile(path,data,encoding)
  }

  stat(path: string, callback: (err: any, stat: any) => void) {
    this.reactNativeBlobUtilImpl.stat(path, callback)
  }

  cp(path: string, dest: string, callback: (err: any, res: any) => void) {
    this.reactNativeBlobUtilImpl.cp(path, dest, callback)
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
  readStream(path:string,encoding:string,bufferSize:number,tick:number,streamId:string):void{
    return this.reactNativeBlobUtilImpl.readStream(path,encoding,bufferSize,tick,streamId)
  }

  unlink(path:string, callback: (err: any) => void){
    this.reactNativeBlobUtilImpl.unlink(path, callback)
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

  writeChunk(streamId: string, withData: string, callback: (err: any) => void){
    return this.reactNativeBlobUtilImpl.writeChunk(streamId,withData,callback)
  }

  writeArrayChunk(streamId: string, withArray: Array<any>, callback: (err: any) => void){
    this.reactNativeBlobUtilImpl.writeArrayChunk(streamId,withArray,callback)
  }

  exists(path: string, callback: (value: boolean) => void){
    this.reactNativeBlobUtilImpl.exists(path,callback)
  }

  readFile(path: string, encoding: string, transformFile: boolean):Promise<any>{
    return this.reactNativeBlobUtilImpl.readFile(path,encoding,transformFile)
  }

  presentPreview(path: string, scheme: string):Promise<any>{
      return this.reactNativeBlobUtilImpl.presentPreview(path, scheme)
  }

  lstat(path: string, callback: (err: any, stat: any) => void){
   this.reactNativeBlobUtilImpl.lstat(path,callback)
  }

  mv(path: string, dest: string, callback: (err: any, res: any) => void){
    this.reactNativeBlobUtilImpl.mv(path,dest,callback)
  }

  hash(path: string, algorithm: string):Promise<string>{
    return this.reactNativeBlobUtilImpl.hash(path,algorithm)
  }

  df(callback: (err: any, stat: Object) => void){
    this.reactNativeBlobUtilImpl.df(callback)
  }

  slice(src: string, dest: string, start: number, end: number):Promise<string>{
    return this.reactNativeBlobUtilImpl.slice(src,dest,start,end)
  }

  closeStream(streamId: string, callback: (err: any) => void){
    this.reactNativeBlobUtilImpl.closeStream(streamId,callback)
  }
}
