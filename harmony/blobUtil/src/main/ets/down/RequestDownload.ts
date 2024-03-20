
import common from '@ohos.app.ability.common';
import request from '@ohos.request';
const TAG: string = 'RequestDownload';

export default class RequestDownload {

  private context: common.UIAbilityContext | undefined = undefined;
  private waitList: Array<string[]> = [];
  private downloadTask: request.agent.Task | undefined = undefined;

  constructor(context: common.UIAbilityContext) {
    this.context = context
  }

  async downloadFile(folder: string, url: string, callback: (progress: number, isSuccess: boolean) => void) {
    console.info(TAG, 'downloadFile');
    // 查询到存在正在执行的下载任务，提示并返回
    let tasks = await request.agent.search({
      state: request.agent.State.RUNNING,
      action: request.agent.Action.DOWNLOAD,
      mode: request.agent.Mode.FOREGROUND
    })
    if(tasks.length> 0) {
      //提示
      //promptAction.showToast({ message: $r('app.string.have_download_task_tips'), bottom: TOAST_BOTTOM });
      return
    }
    let splitUrl = url.split('//')[1].split('/');
    let downloadConfig: request.agent.Config = {
      action: request.agent.Action.DOWNLOAD,
      url: url,
      method: 'POST',
      title: 'download',
      mode: request.agent.Mode.FOREGROUND,
      network: request.agent.Network.ANY,
      saveas: `./${folder}/${splitUrl[splitUrl.length-1]}`,
      overwrite: true
    }
    console.info(TAG, `downloadFile, downloadConfig = ${JSON.stringify(downloadConfig)}`);
    this.downloadTask = await request.agent.create(this.context, downloadConfig);
    this.downloadTask.on('progress', (progress: request.agent.Progress) => {
      console.info(TAG, `progress,  progress = ${progress.processed} ${progress.state}`);
      let processed = Number(progress.processed.toString()).valueOf();
      let size = progress.sizes[0];
      let process: number = Math.floor(processed / size * 100);
      if (process < 100) {
        callback(process, false);
      }
    })
    this.downloadTask.on('completed', (progress: request.agent.Progress) => {
      console.info(TAG, `download complete, file= ${url}, progress = ${progress.processed}`);
      callback(100, true);
      this.deleteTask();
    })
    this.downloadTask.on('failed', async (progress: request.agent.Progress) => {
      if (this.downloadTask) {
        let taskInfo = await request.agent.show(this.downloadTask.tid);
        console.info(TAG, `fail,  resean = ${taskInfo.reason}, faults = ${JSON.stringify(taskInfo.faults)}`);
      }
      callback(100, false);
      this.deleteTask();
    })
    await this.downloadTask.start();
  }

  async deleteTask() {
    if(this.downloadTask) {
      this.downloadTask.off('progress');
      this.downloadTask.off('completed');
      this.downloadTask.off('failed');
      await request.agent.remove(this.downloadTask.tid);
    }
    this.downloadTask = undefined;
  }

}
