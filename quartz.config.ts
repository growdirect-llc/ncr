import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Canary for NCR Counterpoint",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "ncr.growdirect.io",
    ignorePatterns: [
      ".obsidian",
      "ACKNOWLEDGMENT.md",
      "CONTRIBUTING.md",
      "NOTICE.md",
      "SECURITY.md",
      "README.md",
    ],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Space Grotesk",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFFFF",
          lightgray: "#D0D7DE",
          gray: "#6E7781",
          darkgray: "#57606A",
          dark: "#1F2328",
          secondary: "#0B6E8B",
          tertiary: "#0969DA",
          highlight: "rgba(11, 110, 139, 0.06)",
          textHighlight: "#0B6E8B33",
        },
        darkMode: {
          light: "#0D1117",
          lightgray: "#21262D",
          gray: "#8C959F",
          darkgray: "#C9D1D9",
          dark: "#E6EDF3",
          secondary: "#1A9BBD",
          tertiary: "#58A6FF",
          highlight: "rgba(11, 110, 139, 0.15)",
          textHighlight: "#0B6E8B55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
