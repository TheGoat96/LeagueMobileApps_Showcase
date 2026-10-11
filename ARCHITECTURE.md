# Architecture

Deeper system design for the portfolio showcase. No production credentials or proprietary business calibrations are described here.

**Context:** League Mobile Apps (flagship: League For Basketball) was a solo-built, store-shipped suite active roughly **2015–2019** (see [TIMELINE.md](./TIMELINE.md), [BUSINESS.md](./BUSINESS.md), and the 2015 [`site-archive/`](./site-archive)). Commercially and product-wise it was positioned as a **real-time** platform: live court occupancy, instant peer ratings, and push feedback. The flows below describe the **later** Cap8 + Cloud Functions shape of that same product family — useful for engineering discussion, not a claim that this exact stack was the original store binary.

---

## End-to-end data flow

### 1. App → Cloud (write / command path)

The Cap8 client calls named HTTPS Cloud Functions for geo and rating operations:

- Nearby courts (`userNearbyLocations`)
- Seed sparse regions (`userSeedNearbyLocations`)
- Verify new court distance (`verifyNewLocationDistance`)
- Proximity check-in gate (`verifyCheckInStatus`)
- Check-in / check-out history (`locationIOUpdate`)
- Peer rating update (`updateUserRating`)
- Email verification / change helpers

Direct Firestore writes cover profile fields, live occupancy membership, bookmarks, and media metadata. Storage holds profile and location images.

### 2. Cloud → Firestore document model

Canonical shape (names only):

```
User_Profiles/{userId}
  BookMarked_Locations/
  Locations_List/
  InApp_Messages_List/
  Stats/
    RatingStats
    LocationStats
    Achievements
  Devices/

Locations/{locationId}
  LiveUsers_List/
  LocationReported_Data/
  UsersList/
  BookMarkedList/

Locations_IO/{ioDocId}
  CheckinHistory/
  CheckOutHistory/

User_Ratings/{ratingDocId}

InApp_Messages/{messageId}
```

### 3. App → Firestore (read path)

- Auth state + user profile listeners
- Location documents and live user lists for court detail
- Rankings / mystats derived documents
- In-app message lists

### 4. Instant feedback (push + derived stats)

Realtime product loops that users felt immediately:

| Event | Feedback path |
|-------|----------------|
| Check-in / check-out | `LiveUsers_List` + player count update; optional location push to bookmarked users when counts cross notify thresholds |
| Peer rating write | Create/update `User_Ratings` → mystats rollup → rating / badge push to the rated user |
| In-app campaigns | Cloud-delivered in-app messages (check-in, create location, invite) kept engagement high |

When live player counts cross notify thresholds, Cloud Functions resolve interested users (bookmarks / notify prefs), localize the message, and fan out via FCM. Rating changes similarly trigger localized rating notifications — the engineering backbone of `#GetYourStatsUp`.

---

## Client layering

```
src/app/
├── access/                 ← auth / onboarding
├── locations/              ← map, panel, add-location, location-info
├── ratings/ rankings/ stats/
├── profile/ account/ settings/
├── services/               ← API, device/geo, location-info, ratings, auth
├── state/                  ← NGXS: app, user, locations, rankings, messages
├── models/                 ← DTOs + endpoint surface
└── guards/                 ← AuthGuard
```

### Runtime control flow (check-in)

| Step | Role |
|------|------|
| 1 | Ensure device location (Capacitor Geolocation) |
| 2 | Call `verifyCheckInStatus` with lat/lng + locationId + radius |
| 3 | On success, update `LiveUsers_List` + player count |
| 4 | Call `locationIOUpdate` to create/update I/O history |
| 5 | Patch user `checkInLocation` for single-court presence |

Strategy for leaving a court mirrors the path with `checkInStatus=false`.

---

## Cloud layering

```
functions/src/
├── index.ts                ← export surface + admin init
├── firestoreConst.ts       ← collection / path constants
├── config/                 ← project config (redacted in showcase)
├── locations/              ← map query, check-in/out, setup, shared geo
├── rating/                 ← rate user + mystats rollup
├── users/                  ← profile, bookmarks, messages, email helpers
├── pushNotifications/      ← location + rating notify fan-out
└── shared/                 ← utilities
```

### Geo query pattern

1. Expand a lat/lng bounding box for the requested radius
2. Query candidate locations inside the box
3. Intersect + distance-reduce to true neighbors
4. Return a slim map payload to the client

Check-in uses the same distance idea against a single court, not the full nearby set.

---

## Auto-checkout (defense in depth)

| Path | Trigger | Behavior |
|------|---------|----------|
| Client | Device leaves court radius while checked in | Immediate live-list remove + I/O update (`auto`) |
| Cron | Scheduled Cloud Function | Find stale `Locations_IO` check-ins and force checkout |

Two paths keep occupancy honest when the app is backgrounded or offline.

---

## Rating pipeline

1. Client submits skill scores + optional existing `rateDocId`
2. Cloud creates or updates the `User_Ratings` relationship
3. Aggregator recalculates per-skill averages and overall badge
4. Derived mystats document is written under the rated user’s profile
5. Optional rating push notifies the rated user

---

## Cap8 vs Core function naming

League Basketball Cap8 uses **flat** HTTPS function names:

```
{functionsBase}/userNearbyLocations
{functionsBase}/verifyCheckInStatus
{functionsBase}/updateUserRating
```

League Mobile Core historically used REST-style path prefixes (`/rest/api/v1/...`). The endpoint model in the client documents that difference explicitly so the basketball app does not accidentally call Core routes.
