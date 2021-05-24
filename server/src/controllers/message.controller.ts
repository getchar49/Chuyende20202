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

const generateFileName = data => {
  const fileExtension = data.name.replace(/^.*\./, "");
  const randomFileName = randomstring.generate().concat(`.${fileExtension}`);
  return randomFileName;
};

export default {
  getAllMessage: async (req: Request, res: Response) => {
    try {
      const allMessage = models.Message.findAll({ raw: true });
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        allMessage
      });
    } catch (err) {
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  createMessage: async data => {
    try {
      const { channelId, userId, text, username, avatarurl, file } = data;

      // remove stale data from cache
      redisCache.delete(`messageList:${channelId}`);

      /* check if it is upload or message */
      if (!file) {
        const messageResponse = await models.Message.create({
          channel_id: channelId,
          user_id: userId,
          avatarurl,
          username,
          text
        });
        const message = messageResponse.get({ plain: true });
        return {
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          message
        };
      }
      const isFileValid = validateUploadFiles(file);
      if (!isFileValid.size) {
        return {
          meta: {
            type: "error",
            status: 403,
            message: "file exceed maximum size of 5 mbs"
          }
        };
      }
      if (!isFileValid.type) {
        return {
          meta: {
            type: "error",
            status: 403,
            message: "Files upload can only be in text, image, or audio type"
          }
        };
      }
    }
  }
}