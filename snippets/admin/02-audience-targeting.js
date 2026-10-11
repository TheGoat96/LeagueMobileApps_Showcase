/**
 * SHOWCASE SNIPPET — admin audience targeting (Location / Area / All)
 * Illustrative only. Pattern shared by Rich + In-App + Text notification UIs.
 */

// import { adminConfig } from "./01-admin-console-surface";

/**
 * Choosing an audience swaps which PHP endpoint receives the campaign.
 * That is how ops targeted checked-in courts vs geo-radius vs broadcast.
 */
export function resolveNotifyEndpoint(kind, audience) {
  const prefix = "https://ADMIN-HOST/php/"; // adminConfig.hostServerPrefix

  const map = {
    rich: {
      Location: "notifyAtLocal.php",
      Area: "notifyInArea.php",
      All: "notifyAll.php"
    },
    inApp: {
      Location: "inAppMessageLocal.php",
      Area: "inAppMessageArea.php",
      All: "inAppMessageAll.php"
    },
    text: {
      Location: "textNotifyAtLocal.php",
      Area: "textNotifyInArea.php",
      All: "textNotifyAll.php"
    }
  };

  const file = map[kind]?.[audience];
  if (!file) {
    throw new Error(`Unsupported target: ${kind}/${audience}`);
  }
  return prefix + file;
}

/** UI toggle sketch — show location picker vs lat/lng/radius fields. */
export function audienceUiMode(audience) {
  if (audience === "Location") return { showLocationPicker: true, showRadius: false };
  if (audience === "Area") return { showLocationPicker: false, showRadius: true };
  return { showLocationPicker: false, showRadius: false }; // All
}
