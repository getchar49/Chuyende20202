import * as fse from "fs-extra";
import * as randomstring from "randomstring";
import { Request, Response } from "express";
import * as _ from "lodash";


const validateUploadFiles = data => {
  if (data.size > 1024 * 1024 * 5) {
    return { size: false };
  }
  if (
    !data.type.startsWith("image/") &&
    !data.type.startsWith("text/plain") &&
    !data.type.startsWith("audio/")
  ) {
    return { type: false };
  }
  return { size: true, type: true };
};