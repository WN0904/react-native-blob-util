//
// Created on 2024/1/31.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#pragma once
#include <ReactCommon/TurboModule.h>
#include "RNOH/ArkTSTurboModule.h"

namespace rnoh {
    class JSI_EXPORT ReactNativeBlobUtil : public ArkTSTurboModule {
    public:
        ReactNativeBlobUtil(const ArkTSTurboModule::Context ctx, const std::string name);
    };
} // namespace rnoh
