import actionTypes from "../actionTypes";
import { globalStateService } from "./services";

export default {
  toggleRightSidebar: () => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_TOGGLE
    });
  },
  switchRightSidebarView: selectedView => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: selectedView
    });
  },
  switchTargetUser: targetUserId => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_TARGET_USER_SWITCH,
      payload: targetUserId
    });
  },


  clearSocketConnection: () => dispatch => {
    globalStateService.clearSocketConnection();
    dispatch({
      type: actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR
    });
  }
};
