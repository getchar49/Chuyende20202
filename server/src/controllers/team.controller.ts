import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache, queries } from "./common";

export default {
  getAllTeam: async (req: Request, res: Response) => {
    try {
      const allTeam = models.Team.findAll({ raw: true });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        allTeam
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }  
};
