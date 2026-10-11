/**
 * SHOWCASE SNIPPET — League Core Admin console surface (~2016)
 * Illustrative only. Not a runnable admin app.
 *
 * Internal ops UI for League Mobile Apps: catalog management +
 * geo-targeted campaign delivery (rich push, in-app, SMS/text).
 */

export const ADMIN_MODULES = {
  courts: {
    page: "courts.html",
    ops: ["addCourt", "searchCourts", "deleteCourt"]
  },
  players: {
    page: "players.html",
    ops: ["searchNearbyPlayers", "searchPlayersAtLocation"]
  },
  notifications: {
    text: "text-notifications.html",
    rich: "rich-notifications.html",
    inApp: "inapp-notifications.html",
    /**
     * Each notification type supported three audience scopes:
     * Location (checked-in at a court), Area (lat/lng + radius), All.
     */
    audienceScopes: ["Location", "Area", "All"]
  }
};

/** Host prefixes redacted — production pointed at League Core PHP endpoints. */
export const adminConfig = {
  appName: "League Mobile Apps",
  hostServerPrefix: "https://ADMIN-HOST/php/",
  appWebLink: "https://www.leaguemobileapps.com"
};
