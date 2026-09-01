export interface TranscriptLine {
  id: string;
  speaker: string;
  timestamp: string;
  text: string;
  isHost?: boolean;
}

export interface MeetingSummaryData {
  eyebrow: string;
  reportTitle: string;
  summaryBadge: string;
  summaryHeading: string;
  summaryParagraph: string;
  keyTakeaways: string[];
  actionItemsHeading: string;
  actionItemsSubtext: string;
  actionItems: {
    id: string;
    text: string;
    assignee?: string;
  }[];
}

export interface MeetingDemoData {
  idleState: {
    heading: string;
    subtext: string;
    upcomingTitle: string;
    upcomingEmptyText: string;
    upcomingActionText: string;
    pastTitle: string;
    pastSubtext: string;
    pastActionText: string;
    startMeetingButtonText: string;
  };
  recordingState: {
    meetingTitle: string;
    badgeText: string;
    statusText: string;
    pauseButtonText: string;
    stopButtonText: string;
    tabs: string[];
    listeningPillText: string;
  };
  transcript: TranscriptLine[];
  summary: MeetingSummaryData;
}

export const MEETING_DEMO_DATA: MeetingDemoData = {
  idleState: {
    heading: "Meeting Mode",
    subtext: "Start capture to keep notes beside the live transcript.",
    upcomingTitle: "Upcoming meetings",
    upcomingEmptyText: "No today meetings found.",
    upcomingActionText: "Refresh",
    pastTitle: "Past meetings",
    pastSubtext: "Open saved transcripts and summaries.",
    pastActionText: "View Past Meetings",
    startMeetingButtonText: "Start Meeting",
  },
  recordingState: {
    meetingTitle: "Weekly Design Sync",
    badgeText: "1:1",
    statusText: "recording · 00:19",
    pauseButtonText: "Pause",
    stopButtonText: "Stop Meeting",
    tabs: ["Notes", "Transcript", "Summary"],
    listeningPillText: "Listening",
  },
  transcript: [
    {
      id: "line-1",
      speaker: "Other",
      timestamp: "11:20 AM",
      text: "Let's launch the new design system on Tuesday.",
      isHost: false,
    },
    {
      id: "line-2",
      speaker: "You",
      timestamp: "11:21 AM",
      text: "Sounds great. I'll update Figma and send the recap to the team.",
      isHost: true,
    },
  ],
  summary: {
    eyebrow: "MEETING REPORT",
    reportTitle: "Weekly Design Sync",
    summaryBadge: "EXECUTIVE SUMMARY",
    summaryHeading: "Design System Launch & Component Tokens",
    summaryParagraph:
      "The team confirmed the launch timeline for the updated design system scheduled for this Tuesday. The update standardizes dark monochrome color tokens, typography scales, and responsive navigation components across all platforms. Sarah will publish the finalized component library to Figma and distribute the release documentation to engineering.",
    keyTakeaways: [
      "Launch scheduled for Tuesday with full component token coverage.",
      "Finalized Figma library update and engineering release documentation."
    ],
    actionItemsHeading: "Next Steps",
    actionItemsSubtext: "Extracted commitments.",
    actionItems: [],
  },
};
