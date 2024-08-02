//
// Created on 2024/1/31.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#ifndef HARMONY_BLOBUTILPACKAGE_H
#define HARMONY_BLOBUTILPACKAGE_H

#include "BlobUtilTurboModule.h"
#include "RNOH/Package.h"

using namespace rnoh;
using namespace facebook;

class NativeRNBlobUtilFactoryDelegate : public TurboModuleFactoryDelegate {
public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "ReactNativeBlobUtil") {
            return std::make_shared<ReactNativeBlobUtil>(ctx, name);
        }
        return nullptr;
    };
};

namespace rnoh {
    class BlobUtilPackage : public Package {
    public:
        BlobUtilPackage(Package::Context ctx) : Package(ctx) {}
        std::unique_ptr<TurboModuleFactoryDelegate> createTurboModuleFactoryDelegate() override {
            return std::make_unique<NativeRNBlobUtilFactoryDelegate>();
        }
    };
} // namespace rnoh

#endif // HARMONY_BLOBUTILPACKAGE_H
