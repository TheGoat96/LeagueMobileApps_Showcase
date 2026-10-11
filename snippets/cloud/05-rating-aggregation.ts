/**
 * SHOWCASE SNIPPET — rating create-or-update + mystats rollup
 * Illustrative only. Skill formulas and badge thresholds stubbed.
 */

export async function RateCurrentUser(
  currentUserId: string,
  toBeRatedUserId: string,
  rateDocId: string | null | undefined,
  rateFormValues: string
): Promise<unknown> {
  if (isExistingRateDocId(rateDocId)) {
    console.log("RATE_USER: update existing rating relationship", { rateDocId });
    return updateUserRatings(
      rateDocId as string,
      currentUserId,
      toBeRatedUserId,
      rateFormValues
    );
  }

  console.log("RATE_USER: create new rating relationship");
  return addNewUserRatings(currentUserId, toBeRatedUserId, rateFormValues);
}

/** Cap8 may send '', 'false', or omit; legacy sent the string 'undefined'. */
function isExistingRateDocId(rateDocId: string | null | undefined): boolean {
  return (
    rateDocId != null &&
    rateDocId !== "" &&
    rateDocId !== "undefined" &&
    rateDocId !== "false"
  );
}

/**
 * After a rating write, recompute per-skill averages for the rated user
 * and persist derived mystats + badge under User_Profiles/{id}/Stats.
 */
export async function RoundAllMyStats(ratedUserId: string): Promise<{
  overall: number;
  badge: string;
  raterCount: number;
}> {
  console.log("CALCULATE_STATS: roll up ratings for", ratedUserId);

  const ratings = await loadRatingsForUser(ratedUserId);
  const raterCount = ratings.length;
  if (raterCount === 0) {
    return { overall: 0, badge: "unrated", raterCount: 0 };
  }

  const skillTotals = [0, 0, 0, 0, 0];
  for (const row of ratings) {
    skillTotals[0] += row.appSkill1;
    skillTotals[1] += row.appSkill2;
    skillTotals[2] += row.appSkill3;
    skillTotals[3] += row.appSkill4;
    skillTotals[4] += row.appSkill5;
  }

  const skillAvgs = skillTotals.map((t) => t / raterCount);
  const overall =
    skillAvgs.reduce((sum, n) => sum + n, 0) / skillAvgs.length;

  const badge = badgeForAverage(overall);
  await writeMyStats(ratedUserId, { skillAvgs, overall, badge, raterCount });

  return { overall, badge, raterCount };
}

// --- stubs ---

async function updateUserRatings(
  _rateDocId: string,
  _fromUserId: string,
  _toUserId: string,
  _formJson: string
): Promise<unknown> {
  return { updated: true };
}

async function addNewUserRatings(
  _fromUserId: string,
  _toUserId: string,
  _formJson: string
): Promise<unknown> {
  return { created: true };
}

async function loadRatingsForUser(_userId: string): Promise<
  Array<{
    appSkill1: number;
    appSkill2: number;
    appSkill3: number;
    appSkill4: number;
    appSkill5: number;
  }>
> {
  return [];
}

function badgeForAverage(_overall: number): string {
  return "placeholder-badge";
}

async function writeMyStats(
  _userId: string,
  _payload: unknown
): Promise<void> {
  /* redacted */
}
