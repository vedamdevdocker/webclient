// TokenExpirationChecker.js
export function checkTokenExpiration(token_expires_by) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
  const expirationTimestamp = Math.floor(new Date(token_expires_by).getTime() / 1000); // Convert token_expires_by to seconds
  //console.log("is expiration time stam less than current time stamp ? ",expirationTimestamp <= currentTimestamp)
  return expirationTimestamp <= currentTimestamp;
}

