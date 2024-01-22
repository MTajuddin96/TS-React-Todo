import { setUser } from "../redux/actions/user.actions"
import { openNotificationWithIcon } from "../utils/Notification"
import { setItem } from "../utils/Storage"
import { request } from "./verb.services"

export const loginUser = (data) => {
  return dispatch => {
    return request('auth/login', 'post', data, false)
      .then(({ data }) => {
        dispatch(setUser(data.user))
        setItem('user', data.user)
        setItem('tokenContainer', { token: data.access_token })
      })
      .catch((e) => {
        console.log(e)
        openNotificationWithIcon('error', 'Error!', e.response.data.message);
      })
  }
}