import * as fse from "fs-extra";
import * as Identicon from "identicon.js";
import * as randomstring from "randomstring";
import * as randomHex from "randomhex";
import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import axios from "axios";
import { Request, Response } from "express";

// import { redisCache, queries } from "./common";
import models from "../models";


declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}


const userSummary = user => {
  const summary = {
    id: user.id,
    username: user.username,
    email: user.email,
    brief_description: user.brief_description,
    avatarurl: user.avatarurl,
    provider: user.provider,
    detail_description: user.detail_description
  };
  return summary;
};

const comparePassword = async function(credentialsPassword, userPassword) {
  const isPasswordMatch = await bcrypt.compare(
    credentialsPassword,
    userPassword
  );
  return isPasswordMatch;
};

const generateRandomImg = () => {
  /* generate random icon for user */
  const avatarData = new Identicon(randomHex(16), 420).toString();
  const avatarBase64Img = `data:image/png;base64,${avatarData}`;
  return avatarBase64Img;
};

const saveBase64Img = async avatarBase64Img => {
  /* generate random icon for user */
  const avatarImage = avatarBase64Img.split(";base64,").pop();

  const avatarName = randomstring.generate().concat(".png");
  const filePath = `./assets/${avatarName}`;

  await fse.outputFile(filePath, avatarImage, { encoding: "base64" });

  let avatarurl = `${SERVER_URL}:${SERVER_PORT}/assets/${avatarName}`;

  //assume port would be 80 for production build
  if (NODE_ENV === "production") {
    avatarurl = `${SERVER_URL}/assets/${avatarName}`;
  }
  return avatarurl;
};

const removePreviousImg = avatarurl => {
  const urlBeginIndex = avatarurl.indexOf("/assets/");
  const localUrl = avatarurl.slice(urlBeginIndex);

  fse.remove(`.${localUrl}`, err => {
    if (err) throw err;
    console.log(`${localUrl} was deleted`);
  });
};






