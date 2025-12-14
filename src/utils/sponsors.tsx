import { Fragment } from "react";

import type { Sponsor } from "@/types/bills";
import type { ReactNode } from "react";

interface SponsorData {
  name: string;
  isPrimary: boolean;
}

/**
 * Extracts sponsor name from API structure.
 */
function getSponsorName(sponsor: Sponsor): string {
  return sponsor.sponsor.by?.showAs || sponsor.sponsor.as?.showAs || "N/A";
}

/**
 * Extracts and sorts sponsors, placing primary sponsors first.
 */
function extractAndSortSponsors(sponsors: Sponsor[]): SponsorData[] {
  return sponsors
    .map((sponsor) => ({
      name: getSponsorName(sponsor),
      isPrimary: sponsor.sponsor.isPrimary === true,
    }))
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
}

/**
 * Renders a list of sponsors with separators and formatting.
 */
function renderSponsors(sponsors: SponsorData[]): ReactNode {
  return (
    <>
      {sponsors.map(({ name, isPrimary }, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          {isPrimary ? <strong>{name}</strong> : name}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Calculates the total length of sponsors when joined.
 */
function calculateTotalLength(sponsors: SponsorData[]): number {
  return sponsors.map(({ name }) => name).join(", ").length;
}

/**
 * Finds the index of the last sponsor that fits within maxLength.
 * Returns -1 if no sponsor fits.
 */
function findTruncationPoint(
  sponsors: SponsorData[],
  maxLength: number,
): number {
  const ELLIPSIS_LENGTH = 3; // "..."
  const SEPARATOR_LENGTH = 2; // ", "

  let currentLength = 0;
  let lastCompleteIndex = -1;

  for (let i = 0; i < sponsors.length; i++) {
    const sponsor = sponsors[i];
    const separatorLength = i > 0 ? SEPARATOR_LENGTH : 0;
    const totalNeeded =
      currentLength + separatorLength + sponsor.name.length + ELLIPSIS_LENGTH;

    if (totalNeeded <= maxLength) {
      currentLength += separatorLength + sponsor.name.length;
      lastCompleteIndex = i;
    } else {
      break;
    }
  }

  return lastCompleteIndex;
}

/**
 * Truncates a string at word boundaries when possible.
 */
function truncateWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If no space or space is too early, cut at maxLength
  if (lastSpaceIndex === -1 || lastSpaceIndex < maxLength * 0.5) {
    return truncated;
  }

  return truncated.slice(0, lastSpaceIndex);
}

/**
 * Formats and renders sponsors with truncation support.
 * Primary sponsors are bolded and sorted first.
 */
export function formatSponsors(
  sponsors: Sponsor[] | null,
  maxLength: number = 100,
): ReactNode {
  if (!sponsors || sponsors.length === 0) {
    return "N/A";
  }

  const sortedSponsors = extractAndSortSponsors(sponsors);
  const totalLength = calculateTotalLength(sortedSponsors);

  // If everything fits, render all
  if (totalLength <= maxLength) {
    return renderSponsors(sortedSponsors);
  }

  // Find how many sponsors fit
  const lastCompleteIndex = findTruncationPoint(sortedSponsors, maxLength);
  const ELLIPSIS_LENGTH = 3;

  // Edge case: even first sponsor doesn't fit - truncate it
  if (lastCompleteIndex === -1) {
    const firstSponsor = sortedSponsors[0];
    const truncatedName = truncateWord(
      firstSponsor.name,
      maxLength - ELLIPSIS_LENGTH,
    );

    return firstSponsor.isPrimary ? (
      <strong>{truncatedName}...</strong>
    ) : (
      <>{truncatedName}...</>
    );
  }

  // Render sponsors that fit, then ellipsis
  return (
    <>
      {renderSponsors(sortedSponsors.slice(0, lastCompleteIndex + 1))}
      ...
    </>
  );
}
