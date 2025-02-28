import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "./checkTokenExpiration";
import { IS_ACCESS_CONTROLLED_BY_REFRESH_TOKEN } from "../../../admin/setups/ConstDecl";

function TokenExpirationChecker() {
  const token_expires_by = localStorage.getItem("token_expires_by");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!IS_ACCESS_CONTROLLED_BY_REFRESH_TOKEN && checkTokenExpiration(token_expires_by)) {
        const keysToRemove = [
          "token",
          "refresh_token",
          "name",
          "emp_img",
          "username",
          "userid",
          "currenciesDataFetched",
          "loglevel",
          "token_expires_delta",
          "token_expires_by",
          "refresh_token_expires_delta",
          "refresh_token_expires_by",
        ];

        keysToRemove.forEach((key) => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
          }
        });

       clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token_expires_by, navigate]);

  return null;
}

export default TokenExpirationChecker;
