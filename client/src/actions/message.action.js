import actionTypes from "@/actionTypes";
import { messageService } from "./services";

export default {
  fetchMoreMessage: currentMessageData => async dispatch => {
    dispatch({
      type: actionTypes.MESSAGE_FETCH_MORE
    });
    try {
      const response = await messageService.fetchMoreMessage(
        currentMessageData
      );
      const { data } = response;
      dispatch({
        type: actionTypes.MESSAGE_FETCH_MORE_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
  },

  emitSocketMessage: messageData => () => {
    messageService.emitSocketMessage(messageData);
  },

  receiveSocketMessage: () => dispatch => {
    messageService.receiveSocketMessage(dispatch);
  },

  dispatchReceivedMessage: data => (dispatch, getState) => {
    if (data.meta.type === "success") {
      const { currentChannel } = getState().channelReducer;
      const newData = { ...data };
      newData.currentChannel = currentChannel;
      dispatch({
        type: actionTypes.MESSAGE_SOCKET_RECEIVE,
        payload: newData
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
  }
};
