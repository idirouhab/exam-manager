import React, { useEffect, useState } from "react";
import { CookiesBanner, StyledProvider } from "components-extra";
import CookiesProvider from "../../providers/cookies";
import { COOKIES_KEY } from "../../variables/general";
import { useTranslation } from "react-i18next";

export default function CookiesBannerComponent () {
  const [showCookiesBanner, setShowCookiesBanner] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!CookiesProvider.get(COOKIES_KEY)) {
      setShowCookiesBanner(true);
    }
  }, []);

  const banner = (
    <CookiesBanner
      text={t("cookies.caption")}
      style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <CookiesBanner.Button href="#"> {t("cookies.more_info")}</CookiesBanner.Button>
      <CookiesBanner.Button
        onClick={() => {
          CookiesProvider.save(COOKIES_KEY, true);
          setShowCookiesBanner(false);
        }}
      >
        {t("cookies.accept")}
      </CookiesBanner.Button>
    </CookiesBanner>
  );
  return (<>
    {showCookiesBanner && (
      <StyledProvider>
        {banner}
      </StyledProvider>)
    }
  </>);
}