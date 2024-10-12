//
// Created on 2024/1/31.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".


#include "BlobUtilTurboModule.h"
#include "RNOH/ArkTSTurboModule.h"

using namespace rnoh;
using namespace facebook;

static jsi::Value __hostFunction_BlobUtilTurboModule_createFile(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "createFile", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_getConstants(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "getConstants", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_createFileASCII(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                     const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "createFileASCII", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_writeFile(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                               const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "writeFile", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_stat(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                          const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "stat", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_cp(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                        const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "cp", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_writeFileArray(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                    const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "writeFileArray", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_unlink(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                            const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "unlink", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_writeStream(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                 const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "writeStream", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_mkdir(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                 const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "mkdir", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_readFile(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                              const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "readFile", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_ls(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                        const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "ls", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_exists(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                            const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "exists", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_writeArrayChunk(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                     const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "writeArrayChunk", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_writeChunk(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "writeChunk", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_lstat(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                           const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "lstat", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_mv(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                        const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "mv", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_hash(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                          const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "hash", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_slice(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                           const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "slice", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_df(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                        const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "df", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_closeStream(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                        const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "closeStream", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_readStream(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "readStream", args, count);
}

static jsi::Value __hostFunction_BlobUtilTurboModule_fetchBlobForm(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "fetchBlobForm", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_fetchBlob(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "fetchBlob", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_pathForAppGroup(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "pathForAppGroup", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_syncPathAppGroup(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "syncPathAppGroup", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_removeSession(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "removeSession", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_cancelRequest(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "cancelRequest", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_enableProgressReport(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "enableProgressReport", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_enableUploadProgressReport(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).call(rt, "enableUploadProgressReport", args, count);
}
static jsi::Value __hostFunction_BlobUtilTurboModule_presentPreview(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "presentPreview", args, count);
}


ReactNativeBlobUtil::ReactNativeBlobUtil(const ArkTSTurboModule::Context ctx, const std::string name)
    : ArkTSTurboModule(ctx, name) {
    methodMap_["createFile"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_createFile};
    methodMap_["getConstants"] = MethodMetadata{0, __hostFunction_BlobUtilTurboModule_getConstants};
    methodMap_["writeFile"] = MethodMetadata{5, __hostFunction_BlobUtilTurboModule_writeFile};
    methodMap_["stat"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_stat};
    methodMap_["cp"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_cp};
    methodMap_["unlink"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_unlink};
    methodMap_["mkdir"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_mkdir};
    methodMap_["createFileASCII"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_createFileASCII};
    methodMap_["writeArrayChunk"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_writeArrayChunk};
    methodMap_["writeChunk"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_writeChunk};
    methodMap_["exists"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_exists};
    methodMap_["readFile"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_readFile};
    methodMap_["lstat"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_lstat};
    methodMap_["mv"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_mv};
    methodMap_["hash"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_hash};
    methodMap_["df"] = MethodMetadata{1, __hostFunction_BlobUtilTurboModule_df};
    methodMap_["slice"] = MethodMetadata{4, __hostFunction_BlobUtilTurboModule_slice};
    methodMap_["closeStream"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_closeStream};
    methodMap_["readStream"] = MethodMetadata{5, __hostFunction_BlobUtilTurboModule_readStream};
    methodMap_["writeStream"] = MethodMetadata{4, __hostFunction_BlobUtilTurboModule_writeStream};
    methodMap_["writeFileArray"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_writeFileArray};
    methodMap_["ls"] = MethodMetadata{1, __hostFunction_BlobUtilTurboModule_ls};
    methodMap_["fetchBlobForm"] = MethodMetadata{7, __hostFunction_BlobUtilTurboModule_fetchBlobForm};
    methodMap_["fetchBlob"] = MethodMetadata{7, __hostFunction_BlobUtilTurboModule_fetchBlob};
    methodMap_["pathForAppGroup"] = MethodMetadata{1, __hostFunction_BlobUtilTurboModule_pathForAppGroup};
    methodMap_["syncPathAppGroup"] = MethodMetadata{1, __hostFunction_BlobUtilTurboModule_syncPathAppGroup};
    methodMap_["removeSession"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_removeSession};
    methodMap_["cancelRequest"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_cancelRequest};
    methodMap_["enableProgressReport"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_enableProgressReport};
    methodMap_["enableUploadProgressReport"] = MethodMetadata{3, __hostFunction_BlobUtilTurboModule_enableUploadProgressReport};
    methodMap_["presentPreview"] = MethodMetadata{2, __hostFunction_BlobUtilTurboModule_presentPreview};
 
}