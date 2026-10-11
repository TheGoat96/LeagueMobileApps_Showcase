/**
 * SHOWCASE SNIPPET — Firestore path constants
 * Illustrative only. Collection names, not payloads or secrets.
 */

export const fsConst = {
  // User profile tree
  USERPROFILES: "User_Profiles",
  UP_BOOKMARKEDLOCATIONS: "BookMarked_Locations",
  UP_LOCATIONSLIST: "Locations_List",
  UP_INAPPMESSAGESLIST: "InApp_Messages_List",
  UP_STATS: "Stats",
  UP_STATS_RATINGSTATS: "RatingStats",
  UP_STATS_LOCATIONSTATS: "LocationStats",
  UP_STATS_ACHIEVEMENTS: "Achievements",
  UP_DEVICES: "Devices",

  // Locations tree
  LOCATIONS: "Locations",
  LO_LIVEUSERSLIST: "LiveUsers_List",
  LO_REPORTEDDATA: "LocationReported_Data",
  LO_LOCATIONSUSERSLIST: "UsersList",
  LO_BOOKMARKEDLIST: "BookMarkedList",

  // Check-in / check-out history
  LOCATIONSIO: "Locations_IO",
  LOIO_CHECKIN: "CheckinHistory",
  LOIO_CHECKOUT: "CheckOutHistory",

  // Peer ratings
  USERRATINGS: "User_Ratings",

  // In-app messages
  INAPPMESSAGES: "InApp_Messages",

  // Storage prefixes
  PROFILESTORAGE: "profiles_img/",
  LOCATIONSTORAGE: "locations_img/"
} as const;
