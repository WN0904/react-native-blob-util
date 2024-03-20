import request from '@ohos.request';
import { constant } from '@kit.ConnectivityKit';

import { common } from '@kit.AbilityKit';
import promptAction from '@ohos.promptAction';
import { urlUtil } from '../utils/UrlUtil';

const TAG:string = 'RequestUpload';
const HEADER:Record<string,string> = {'Content-Type': 'multipart/form-data'};


export default class RequestUpload{
  //private mediaUtils:MediaUtils = new MediaUtils();

  private uploadConfig:request.agent.Config = {
    action:request.agent.Action.UPLOAD,
    headers:HEADER,
    url:'',
    mode:request.agent.Mode.FOREGROUND,
    method:'POST',
    title:'upload',
    network:request.agent.Network.ANY,
    data:[],
    //token:UPLOAD_TOKEN
  }
  private context:common.UIAbilityContext | undefined = undefined
  private uploadTask:request.agent.Task | undefined = undefined
  private waitList:Array<String> = []

  async uploadFiles(fileUris: Array<string>,callback: (progress: number, isSucceed: boolean) => void) {
    console.info(TAG,`uploadFiles begin, ${JSON.stringify(fileUris)}`)
    if(fileUris.length === 0) {
      return;
    }
    // 查询到存在正在执行的上传任务，提示并返回
    let tasks = await request.agent.search({
      state: request.agent.State.RUNNING,
      action: request.agent.Action.UPLOAD,
      mode: request.agent.Mode.FOREGROUND
    })
    if(tasks.length > 0) {
      //提示已存在该任务
      //promptAction.showToast({ message: $r('app.string.have_upload_task_tips'), bottom: TOAST_BOTTOM });
      return;
    }

    let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    this.uploadConfig.data = await this.getFileAndData(context.cacheDir,fileUris);
    this.uploadConfig.url = await urlUtil.getUrl(context);
    this.uploadConfig.mode = request.agent.Mode.FOREGROUND;
    try {
      this.uploadTask = await request.agent.create(context, this.uploadConfig)
      await this.uploadTask.start();
      this.uploadTask.on('progress',(progress: request.agent.Progress) => {
      })
    } catch (error) {
      console.error(TAG, `task  err, err  = ${JSON.stringify(error)}`);
      callback(100,false)
    }
  }

  private async getFileAndData(cacheDir: string, fileUris: Array<string>):Promise<Array<request.agent.FormItem>> {
    let files:Array<request.agent.FormItem> = []
    console.info(TAG,'getFilesAndData begin')
    for(let i = 0;i<fileUris.length;i++) {
      console.info(TAG, `getFile fileUri = ${fileUris[i]}`);
      let imagePath:string ='';
      let file: request.agent.FormItem = {
        name: imagePath.split('cache/')[1].split('.')[0],
        value: {
          path: './' + imagePath.split('cache/')[1]
        }
      }
      files.push(file);
    }
    console.info(TAG, `getFilesAndData ${JSON.stringify(files)}`);
    return files
  }

}