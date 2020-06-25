import { authenticationService } from "../services/";

export function handleResponse(response) {
  if (response.statusText != "OK") {
    if ([400, 401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload(true);
      console.log("status error");
    }
    const error = (response.config.data && response.data) || response.statusText;
    return Promise.reject(error);
  }
  return response.config.data;
}
