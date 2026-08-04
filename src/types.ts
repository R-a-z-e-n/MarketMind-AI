export type UserRole = 'admin' | 'team_member' | 'viewer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization: string;
}

export type NavPage =
  | 'dashboard'
  | 'command_center'
  | 'weekly_brief'
  | 'ai_strategy'
  | 'research'
  | 'planner'
  | 'generator'
  | 'image_studio'
  | 'video_studio'
  | 'seo'
  | 'review'
  | 'publishing'
  | 'automation'
  | 'analytics'
  | 'team'
  | 'brand_settings'
  | 'enterprise'
  | 'billing';

export type PageId = NavPage;

export type PlatformChannel =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'threads'
  | 'blog'
  | 'newsletter'
  | 'ad_copy';

export type PostStatus = 'draft' | 'in_review' | 'scheduled' | 'published';

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface PostItem {
  id: string;
  title: string;
  channel: PlatformChannel;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  scheduledAt?: string;
  publishedAt?: string;
  status: PostStatus;
  author: string;
  campaignId?: string;
  seoKeywords?: string[];
  hashtags?: string[];
  tags?: string[];
  aiQualityScore?: number;
  brandToneScore?: number;
  comments?: CommentItem[];
  analytics?: {
    views: number;
    likes: number;
    shares: number;
    commentsCount: number;
    ctr: number;
  };
}

export interface BrandSettings {
  brandName: string;
  industry: string;
  websiteUrl: string;
  tone: string;
  targetAudience: string;
  valueProposition: string;
  corePillars: string[];
  defaultHashtags: string[];
  forbiddenWords: string[];
  brandColorPrimary: string;
  logoUrl?: string;
}

export interface CompetitorItem {
  id: string;
  name: string;
  website: string;
  marketShare: string;
  strengths: string[];
  weaknesses: string[];
  contentStrategy: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface TrendItem {
  id: string;
  title: string;
  category: string;
  momentum: 'high' | 'medium' | 'emerging';
  searchVolume: string;
  growth: string;
  summary: string;
  actionableIdea: string;
}

export interface CampaignItem {
  id: string;
  name: string;
  objective: string;
  startDate: string;
  endDate: string;
  channels: PlatformChannel[];
  budget?: string;
  status: 'planning' | 'active' | 'completed';
  postsCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  status: 'active' | 'pending';
}

export interface WeeklyBrief {
  weekOf: string;
  summary: string;
  topGoals: string[];
  contentPillarsFocus: string[];
  competitorAlerts: string[];
  suggestedTopics: { topic: string; platform: PlatformChannel; reasoning: string }[];
}

export interface AnalyticsSummary {
  totalImpressions: number;
  impressionsGrowth: number;
  totalEngagement: number;
  engagementGrowth: number;
  avgCTR: number;
  ctrGrowth: number;
  publishedCount: number;
  topPerformingChannel: PlatformChannel;
  channelBreakdown: {
    channel: PlatformChannel;
    posts: number;
    engagement: number;
    growthRate: string;
  }[];
}
