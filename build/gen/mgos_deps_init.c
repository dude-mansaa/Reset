/* This file is auto-generated by mos build, do not edit! */

#include <stdbool.h>
#include <stdio.h>

#include "common/cs_dbg.h"

#include "mgos_app.h"


extern bool mgos_mongoose_init(void);
extern bool mgos_bt_common_init(void);
extern bool mgos_bt_service_config_init(void);
extern bool mgos_wifi_init(void);
extern bool mgos_http_server_init(void);
extern bool mgos_mjs_init(void);
extern bool mgos_pwm_init(void);
extern bool mgos_rpc_common_init(void);
extern bool mgos_rpc_service_config_init(void);
extern bool mgos_rpc_service_fs_init(void);
extern bool mgos_rpc_uart_init(void);

static const struct lib_descr {
  const char *title;
  bool (*init)(void);
} descrs[] = {

  // "mongoose". deps: [ ]
  {
    .title = "mongoose",
    .init = mgos_mongoose_init,
  },

  // "bt_common". deps: [ "mongoose" ]
  {
    .title = "bt_common",
    .init = mgos_bt_common_init,
  },

  // "bt_service_config". deps: [ "bt-common" ]
  {
    .title = "bt_service_config",
    .init = mgos_bt_service_config_init,
  },

  // "wifi". deps: [ "mongoose" ]
  {
    .title = "wifi",
    .init = mgos_wifi_init,
  },

  // "http_server". deps: [ "mongoose" ]
  {
    .title = "http_server",
    .init = mgos_http_server_init,
  },

  // "mjs". deps: [ "mongoose" ]
  {
    .title = "mjs",
    .init = mgos_mjs_init,
  },

  // "pwm". deps: [ "mongoose" ]
  {
    .title = "pwm",
    .init = mgos_pwm_init,
  },

  // "rpc_common". deps: [ "http-server" ]
  {
    .title = "rpc_common",
    .init = mgos_rpc_common_init,
  },

  // "rpc_service_config". deps: [ "rpc-common" ]
  {
    .title = "rpc_service_config",
    .init = mgos_rpc_service_config_init,
  },

  // "rpc_service_fs". deps: [ "rpc-common" ]
  {
    .title = "rpc_service_fs",
    .init = mgos_rpc_service_fs_init,
  },

  // "rpc_uart". deps: [ "rpc-common" ]
  {
    .title = "rpc_uart",
    .init = mgos_rpc_uart_init,
  },

};

bool mgos_deps_init(void) {
  size_t i;
  for (i = 0; i < sizeof(descrs) / sizeof(struct lib_descr); i++) {
    LOG(LL_DEBUG, ("init %s...", descrs[i].title));
    if (!descrs[i].init()) {
      LOG(LL_ERROR, ("%s init failed", descrs[i].title));
      return false;
    }
  }

  return true;
}
