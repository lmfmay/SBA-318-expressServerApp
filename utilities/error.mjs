// Pass the error to the error-handling middleware
export function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
  }