# Timeline

Dated evidence that League For Basketball / League Mobile Apps was a real, multi-year product effort — not a weekend demo.

Filesystem timestamps below come from the archived marketing site included in this repo.

---

## High-level arc

```text
~2014–2015  Concept + year of design/build for League For Basketball
   2015     League Mobile Apps marketing site + multi-sport suite pages
   2015+    iOS App Store + Google Play releases (suite titles)
   later    Continued evolution of client/backend (Cap8 modernization snippets)
   today    Apps no longer in circulation — portfolio / archival showcase
```

Exact first-store-ship calendar dates may vary by title; the 2015 site already advertised free downloads on **iOS and Android** for the suite.

---

## Archive filesystem receipts

| Date | Proof |
|------|--------|
| **2015-05-22** | [`site-archive/index.html`](./site-archive/index.html) — suite homepage (Basketball, Soccer, Volleyball, Lacrosse, Tennis) |
| **2015-05-30** | [`site-archive/about.html`](./site-archive/about.html) — founder story + brand motivation |
| **2015-05-30** | [`site-archive/_sources/LeagueSite.less`](./site-archive/_sources/LeagueSite.less) — site stylesheet source |
| **2016-05-07** | [`site-archive/basketball.html`](./site-archive/basketball.html) — League For Basketball product page (updated) |

```text
2015-05 suite site → 2015-05 About / founder page → 2016-05 basketball product page refresh
```

---

## What the 2015 site claimed (product proof)

From the archived homepage and basketball page:

- League For Basketball connecting players “one court at a time”
- Free availability on **iOS and Android** (store badges / short links on the pages)
- Geo-location for favorite courts, live competition awareness, peer skill ratings, social sharing
- Same pattern repeated across the other League sports titles

Those store deep links are historic; the apps are **not** currently in circulation.

---

## Engineering continuity

The [`snippets/`](./snippets) folder captures a **later** engineering shape of the basketball line (Ionic/Angular/Capacitor + Firebase Functions): proximity check-in, live occupancy, rating aggregation, push fan-out. It is included to show the product continued to evolve technically after the original store launch era — not that this Cap8 tree is the 2015 binary.
