import {RNPackage, TurboModulesFactory} from '@rnoh/react-native-openharmony/ts';
import type {TurboModule, TurboModuleContext} from '@rnoh/react-native-openharmony/ts';
import {BlobUtilTurboModule} from './BlobUtilTurboModule';

class BlobUtilTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === 'ReactNativeBlobUtil' || name === "GeneratedBlobUtilTurboModule") {
      return new BlobUtilTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === 'ReactNativeBlobUtil' || name === "GeneratedBlobUtilTurboModule";
  }
}

export class BlobUtilPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new BlobUtilTurboModulesFactory(ctx);
  }
}
