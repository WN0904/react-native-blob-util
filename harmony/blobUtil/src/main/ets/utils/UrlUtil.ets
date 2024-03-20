import common from '@ohos.app.ability.common';
import preferences from '@ohos.data.preferences';
import { DEFAULT } from '@ohos/hypium';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import fs from '@ohos.file.fs';

const TAG: string = 'UrlUtils';
const URL_KEY: string = 'url';
const STORE_NAME: string = 'server_url';

class UrlUtil {

  async getUrl(context: common.UIAbilityContext): Promise<string> {
    let preference = await preferences.getPreferences(context, STORE_NAME);
    let url = await preference.get(URL_KEY, '') as string;
    console.info(TAG, `getUrl,url= ${url}`);
    return url;
  }

  async saveUrl(context: common.UIAbilityContext, url: string) {
    let preference = await preferences.getPreferences(context, STORE_NAME);
    await preference.put(URL_KEY, url);
    await preference.flush();
  }

  // async saveCreateMediaFile( result?: SaveButtonOnClickResult) {
  //   if (result == SaveButtonOnClickResult.SUCCESS) {
  //     try {
  //       let context = getContext();
  //       let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
  //       let uri = await phAccessHelper.createAsset(photoAccessHelper.PhotoType.IMAGE, 'jpg'); // 创建媒体文件
  //       console.info('createAsset successfully, uri: ' + uri);
  //       let file = await fs.open(uri, fs.OpenMode.READ_WRITE);
  //       await fs.close(file);
  //     } catch (err) {
  //       console.error('createAsset failed, message = ', err);
  //     }
  //   } else {
  //     console.error('SaveButtonOnClickResult createAsset failed');
  //   }
  // }
}

export const urlUtil = new UrlUtil();