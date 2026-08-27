// ============================================================================
// PAGE / ROUTE CONFIGURATION
// ----------------------------------------------------------------------------
// One entry per page in the site. Order here = order of Next/Back navigation
// and the order links appear in the nav bar.
// ============================================================================


export const pages = [
  { path: "/", label: "Home" },
  { path: "/message", label: "Message" },
  { path: "/gallery", label: "Gallery" },
  { path: "/timeline", label: "Timeline" },
  { path: "/question", label: "A Question" },
  { path: "/surprise", label: "Surprise" },
];

export function getPageIndex(pathname) {
  const index = pages.findIndex((p) => p.path === pathname);
  return index === -1 ? 0 : index;
}

