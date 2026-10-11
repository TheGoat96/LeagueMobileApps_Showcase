/**
 * SHOWCASE SNIPPET — rich notification compose payload (admin UI)
 * Illustrative only. Sponsor / affiliate fields were first-class for brand inventory.
 */

export function composeRichNotificationForm(values) {
  return {
    notifyAudience: values.audience, // Location | Area | All
    notifyLoc: values.locationId || "",
    srchCrtLat: values.lat || "",
    srchCrtLon: values.lng || "",
    richNotiRadius: values.radiusKm || "",
    richNotiLocale: values.locale || "en",
    notifyDevice: values.device || "All", // iOS | Android | All

    // Brandable rich media surfaces
    notifyHdrTxt: values.header,
    notifyAffl1: values.affiliate1 || "",
    notifySpnsr: values.sponsorLine || "", // e.g. "sponsored by"
    notifyAffl2: values.affiliate2 || "",
    notifySplhImage: values.splashImageUrl || "",
    notifyBdyMsg: values.body,
    notifyBtnTxt: values.ctaLabel || "Learn More",
    notifyBtnLnk: values.ctaUrl || "",
    notifyDsplyMsg: values.lockScreenMessage
  };
}

/**
 * Admin submitted via GET to the audience-resolved PHP endpoint,
 * then rendered results listing targeted users / devices.
 */
export async function submitRichNotification(endpoint, form) {
  // $.get(endpoint, form) … results table populated in the admin page
  return { endpoint, form, status: "illustrative-only" };
}
