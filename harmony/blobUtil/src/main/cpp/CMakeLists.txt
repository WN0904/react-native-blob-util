# the minimum version of CMake.
#cmake_minimum_required(VERSION 3.4.1)
#project(harmony)
#
#set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})
#
#if(DEFINED PACKAGE_FIND_FILE)
#    include(${PACKAGE_FIND_FILE})
#endif()
#
#include_directories(${NATIVERENDER_ROOT_PATH}
#                    ${NATIVERENDER_ROOT_PATH}/include)
#
#add_library(application SHARED hello.cpp)
#target_link_libraries(application PUBLIC libace_napi.z.so)

# the minimum version of CMake.
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB rnoh_blob_util_SRC CONFIGURE_DEPENDS *.cpp)
add_library(rnoh_blob_util SHARED ${rnoh_blob_util_SRC})
target_include_directories(rnoh_blob_util PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(rnoh_blob_util PUBLIC rnoh)