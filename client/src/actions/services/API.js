import io from "socket.io-client";
import axios from "axios";

import {
  NODE_ENV,
  DEV_SERVER_PORT,
  DEV_SERVER_URL,
  DEV_SERVER_WS,
  PROD_SERVER_PORT,
  PROD_SERVER_URL,
  PROD_SERVER_WS
} from "@/utils/secrets";

const apiV1 = () =>
  axios.create({
    baseURL:
      /* API server chạy ở cổng 3030 với chế độ phát triển, 80 với chế độ sản phẩm */
      NODE_ENV === "development"
        ? `${DEV_SERVER_URL}:${DEV_SERVER_PORT}/api/v1`
        : `${PROD_SERVER_URL}:${PROD_SERVER_PORT}/api/v1`,
    withCredentials: true
  });

const socket = io(
  /* API server chạy ở cổng 3030 với chế độ phát triển, 80 với chế độ sản phẩm */
  process.env.NODE_ENV === "development"
    ? `${DEV_SERVER_WS}:${DEV_SERVER_PORT}`
    : `${PROD_SERVER_WS}:${PROD_SERVER_PORT}`
);

export { socket, apiV1 };
