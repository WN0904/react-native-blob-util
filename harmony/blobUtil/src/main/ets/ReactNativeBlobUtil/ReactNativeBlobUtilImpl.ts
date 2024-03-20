import common from '@ohos.app.ability.common';
import { TurboModuleContext } from 'rnoh/ts';
import ReactNativeBlobUtilFS from './ReactNativeBlobUtilFS';
import ReactNativeBlobUtilStream, { ReactNativeBlobUtilReadStream } from './ReactNativeBlobUtilStream';
import { AsyncCallback } from '@ohos.base';

export default class ReactNativeBlobUtilImpl {
  private context: common.UIAbilityContext | undefined = undefined;

  private reactNativeBlobUtilFS: ReactNativeBlobUtilFS | undefined = undefined

  private reactNativeBlobUtilStream: ReactNativeBlobUtilStream | undefined = undefined

  private ctx: TurboModuleContext | undefined = undefined

  constructor(context: common.UIAbilityContext, ctx: TurboModuleContext) {
    this.context = context
    this.ctx = ctx
    this.reactNativeBlobUtilFS = new ReactNativeBlobUtilFS(context)
    this.reactNativeBlobUtilStream = new ReactNativeBlobUtilStream(this.ctx)
  }

  getSystemFolders() {
    return this.reactNativeBlobUtilFS.getSystemFolders()
  }

  createFile(path: string, data: string, encoding: string): Promise<string> {
    return this.reactNativeBlobUtilFS.createFile(path, data, encoding)
  }

  writeStream(path: string, encoding: string, appendData: boolean, callback: (errCode, errMsg, streamId?: string) => void) {
    this.reactNativeBlobUtilStream.writeStream(path, encoding, appendData, callback);
  }

  readStream(filePath: string, encoding: string, bufferSize: number, tick: number, streamId: string): Promise<ReactNativeBlobUtilReadStream> {
    return this.reactNativeBlobUtilStream.readStream(filePath, encoding, bufferSize, tick, streamId);
  }

  stat(path: string, callback: (err: any, stat: any) => void) {
    this.reactNativeBlobUtilFS.stat(path, callback)
  }

  cp(path: string, dest: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilFS.cp(path, dest, callback)
  }

  writeFile(path: string, encoding: string, data: string, transformFile: boolean, append: boolean): Promise<number> {
    return this.reactNativeBlobUtilFS.writeFile(path, encoding, data, transformFile, append)
  }

  writeFileArray(path: string, data: Array<any>, append: boolean): Promise<number> {
    return this.reactNativeBlobUtilFS.writeFileArray(path, data, append)
  }

  unlink(path: string) {
    this.reactNativeBlobUtilFS.unlink(path)
  }

  mkdir(path: string): Promise<void> {
    return this.reactNativeBlobUtilFS.mkdir(path)
  }

  createFileASCII(path: string, data: Array<any>): Promise<void> {
    return this.reactNativeBlobUtilFS.createFileASCII(path, data)
  }

  ls(path: string): Promise<Array<any>> {
    return this.reactNativeBlobUtilFS.ls(path)
  }

  writeChunk(streamId: string, withData: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilStream.writeChunk(streamId, withData, callback)
  }

  writeArrayChunk(streamId: string, withArray: Array<any>, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilStream.writeArrayChunk(streamId, withArray, callback)
  }

  exists(path: string, callback: (value: Array<boolean>) => void) {
    this.reactNativeBlobUtilFS.exists(path, callback)
  }

  readFile(path: string, encoding: string, transformFile: boolean): Promise<Array<any>> {
    return this.reactNativeBlobUtilFS.readFile(path, encoding, transformFile)
  }

  lstat(path: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilFS.lstat(path, callback)
  }

  mv(path: string, dest: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilFS.mv(path, dest, callback)
  }

  hash(path: string, algorithm: string): Promise<string> {
    return this.reactNativeBlobUtilFS.hash(path, algorithm)
  }

  df(callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilFS.df(callback)
  }

  slice(src: string, dest: string, start: number, end: number): Promise<string> {
    return this.reactNativeBlobUtilFS.slice(src, dest, start, end)
  }

  closeStream(streamId: string, callback: (value: Array<any>) => void) {
    this.reactNativeBlobUtilStream.close(streamId, callback)
  }
}