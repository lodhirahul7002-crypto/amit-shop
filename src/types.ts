export interface Service {
  icon: string; // Icon name matching Lucide icons
  title: string;
  dept: string;
  fee: string;
  due: string;
  color: string;
  text: string;
}

export interface Application {
  name: string;
  id: string;
  status: string;
  progress: number;
}

export interface GovtJobs {
  results: string[];
  admitCards: string[];
  latestJobs: string[];
}

export interface FeaturedJob {
  title: string;
  posts: string;
  qualification: string;
  lastDate: string;
  state: string;
  tag: string;
}

export interface QuickStat {
  label: string;
  value: string;
  iconName: string;
}

export type PortalMode = "citizen" | "admin";

export type AppView = "eseva" | "multitool";
