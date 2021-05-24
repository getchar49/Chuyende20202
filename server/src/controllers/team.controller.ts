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
  },
  createTeam: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const teamAbout = req.body.about;

      // remove stale data from cache
      redisCache.delete(`teamList:${currentUserId}`);

      const createTeamResponse = await models.sequelize.transaction(
        async transaction => {
          const teamData = await models.Team.create(
            {
              name: teamName,
              brief_description: teamAbout
            },
            { transaction, raw: true }
          );
          const team = teamData.get({ plain: true });

          await models.TeamMember.create(
            {
              team_id: team.id,
              user_id: currentUserId,
              admin: true
            },
            { transaction }
          );
          const channelData = await models.Channel.create(
            {
              name: "general",
              public: true,
              brief_description:
                "Company-wide announcements and work-based matters",
              detail_description:
                "This channel is for workspace-wide communication and announcements. All members are in this channel.",
              team_id: team.id
            },
            { transaction }
          );
          const channel = channelData.get({ plain: true });
          await models.ChannelMember.create(
            {
              user_id: currentUserId,
              channel_id: channel.id
            },
            { transaction }
          );
          return team;
        }
      );

      const team = createTeamResponse;
      /* get user's teams */
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [currentUserId],
        model: models.Team,
        raw: true
      });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        team,
        teamList
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
