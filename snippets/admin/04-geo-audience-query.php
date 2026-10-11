<?php
/**
 * SHOWCASE SNIPPET — geo audience selection for rich / in-app campaigns
 * Illustrative only. Not a runnable admin backend.
 *
 * Pattern: persist campaign creative → proximity box on lat/lng →
 * select logged-in users in locale + device OS → fan out via push provider.
 */

// include_once('leagueConnect.php');
// include_once('functions.php');
// include_once('leaguePushWoosh.php'); // push provider wrapper (credentials omitted)

function resolve_device_filter($deviceOS) {
  switch ($deviceOS) {
    case 'iOS':
      return "('iOS')";
    case 'Android':
      return "('Android')";
    default:
      return "('iOS', 'Android', 'Win32NT')";
  }
}

/**
 * After inserting into Rich_Notifications / Messages, target users in a radius.
 * Real SQL / push fan-out omitted; structure mirrors production admin PHP.
 */
function target_users_in_area($sourceLat, $sourceLon, $radiusKm, $locale, $deviceOS) {
  $deviceType = resolve_device_filter($deviceOS);

  // $proximity = mathGeoProximity($sourceLat, $sourceLon, $radiusKm);
  // SELECT userName, deviceId, userId, locale, devicePlatform, latitude, longitude
  // FROM User_Profile
  // WHERE latitude BETWEEN latMin AND latMax
  //   AND longitude BETWEEN lngMin AND lngMax
  //   AND logInStatus = 1
  //   AND locale = ?
  //   AND devicePlatform IN (...)

  return [
    'audience' => 'Area',
    'filters' => compact('sourceLat', 'sourceLon', 'radiusKm', 'locale', 'deviceType'),
    'note' => 'Illustrative — query + Pushwoosh send redacted'
  ];
}
