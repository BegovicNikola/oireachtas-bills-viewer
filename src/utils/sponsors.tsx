import { Fragment } from "react";

import type { Sponsor } from "@/types/bills";
import type { ReactNode } from "react";

// Constants
const SEPARATOR_LENGTH = 2; // ", "
const ELLIPSIS_LENGTH = 3; // "..."

// Types
interface SponsorData {
  name: string;
  isPrimary: boolean;
}

/**
 * Extracts and sorts sponsors, placing primary sponsors first.
 */
function extractAndSortSponsors(sponsors: Sponsor[]): SponsorData[] {
  return sponsors
    .map((sponsor) => {
      const name =
        sponsor.sponsor.by?.showAs || sponsor.sponsor.as?.showAs || "N/A";
      const isPrimary = sponsor.sponsor.isPrimary === true;
      return { name, isPrimary };
    })
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
}

/**
 * Renders a single sponsor with separator and bold formatting for primary sponsors.
 */
function renderSponsor(
  name: string,
  isPrimary: boolean,
  index: number,
): ReactNode {
  return (
    <Fragment key={index}>
      {index > 0 && ", "}
      {isPrimary ? <strong>{name}</strong> : name}
    </Fragment>
  );
}

/**
 * Renders a list of sponsors.
 */
function renderSponsors(sponsors: SponsorData[]): ReactNode {
  return (
    <>
      {sponsors.map(({ name, isPrimary }, index) =>
        renderSponsor(name, isPrimary, index),
      )}
    </>
  );
}

/**
 * Finds the index of the last sponsor that fits within maxLength.
 * Returns -1 if no sponsor fits.
 */
function findTruncationPoint(
  sponsors: SponsorData[],
  maxLength: number,
): number {
  let currentLength = 0;
  let lastCompleteIndex = -1;

  for (let i = 0; i < sponsors.length; i++) {
    const sponsor = sponsors[i];
    const separatorLength = i > 0 ? SEPARATOR_LENGTH : 0;
    const sponsorLength = sponsor.name.length;

    if (
      currentLength + separatorLength + sponsorLength + ELLIPSIS_LENGTH <=
      maxLength
    ) {
      currentLength += separatorLength + sponsorLength;
      lastCompleteIndex = i;
    } else {
      break;
    }
  }

  return lastCompleteIndex;
}

/**
 * Truncates a string to fit within maxLength, ensuring it ends on a complete word.
 */
function truncateWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space before maxLength
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If no space found or space is too early, just cut at maxLength
  if (lastSpaceIndex === -1 || lastSpaceIndex < maxLength * 0.5) {
    return truncated;
  }

  // Return up to the last complete word
  return truncated.slice(0, lastSpaceIndex);
}

export function formatSponsors(
  sponsors: Sponsor[] | null,
  maxLength: number = 100,
): ReactNode {
  if (!sponsors || sponsors.length === 0) {
    return "N/A";
  }

  const sortedSponsors = extractAndSortSponsors(sponsors);

  // Build the full text string to calculate length
  const fullText = sortedSponsors.map(({ name }) => name).join(", ");
  const totalLength = fullText.length;

  // If within limit, return formatted JSX
  if (totalLength <= maxLength) {
    return renderSponsors(sortedSponsors);
  }

  // Find truncation point
  const lastCompleteIndex = findTruncationPoint(sortedSponsors, maxLength);

  // If we couldn't fit at least one sponsor, show first sponsor truncated
  if (lastCompleteIndex === -1) {
    const firstSponsor = sortedSponsors[0];
    const truncatedName = truncateWord(
      firstSponsor.name,
      maxLength - ELLIPSIS_LENGTH,
    );
    return (
      <>
        {firstSponsor.isPrimary ? (
          <strong>{truncatedName}...</strong>
        ) : (
          <>{truncatedName}...</>
        )}
      </>
    );
  }

  // Build truncated JSX up to lastCompleteIndex
  return (
    <>
      {renderSponsors(sortedSponsors.slice(0, lastCompleteIndex + 1))}
      ...
    </>
  );
}
