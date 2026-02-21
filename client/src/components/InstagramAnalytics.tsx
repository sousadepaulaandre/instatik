import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  TrendingUp,
  Heart,
  MessageCircle,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InstagramAnalyticsProps {
  onBusinessSelect?: (userId: string) => void;
}

export function InstagramAnalytics({
  onBusinessSelect,
}: InstagramAnalyticsProps) {
  const [userId, setUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [tokenError, setTokenError] = useState(false);

  // Query para análise de performance
  const { data: performance, isLoading: isLoadingPerformance } =
    trpc.socialMedia.instagram.analyzePerformance.useQuery(
      { userId: selectedUserId },
      {
        enabled: !!selectedUserId,
        onError: (error) => {
          if (error.message.includes("access token")) {
            setTokenError(true);
          }
        },
      }
    );

  const handleSearch = () => {
    if (userId.trim()) {
      setSelectedUserId(userId);
      setTokenError(false);
      onBusinessSelect?.(userId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Warning */}
      {tokenError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Instagram access token not configured. Set INSTAGRAM_ACCESS_TOKEN
            environment variable to enable Instagram features.
          </AlertDescription>
        </Alert>
      )}

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="3.5" fill="white" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
            </svg>
            Instagram Business Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter Instagram Business Account ID (numeric ID)
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Instagram Business Account ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoadingPerformance}>
              {isLoadingPerformance ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoadingPerformance && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2">Loading business data...</span>
          </CardContent>
        </Card>
      )}

      {/* Business Info */}
      {performance?.user && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {performance.user.profilePictureUrl && (
                  <img
                    src={performance.user.profilePictureUrl}
                    alt={performance.user.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <CardTitle>{performance.user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    @{performance.user.username}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {performance.user.biography && (
              <p className="text-sm">{performance.user.biography}</p>
            )}

            {performance.user.website && (
              <a
                href={performance.user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {performance.user.website}
              </a>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">
                  {performance.user.followerCount
                    ? (performance.user.followerCount / 1000).toFixed(1)
                    : "N/A"}
                  {performance.user.followerCount ? "K" : ""}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Posts</p>
                <p className="text-2xl font-bold">
                  {performance.user.mediaCount || "N/A"}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Following</p>
                <p className="text-2xl font-bold">
                  {performance.user.followsCount
                    ? (performance.user.followsCount / 1000).toFixed(1)
                    : "N/A"}
                  {performance.user.followsCount ? "K" : ""}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Account ID</p>
                <p className="text-lg font-bold truncate">
                  {performance.user.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {performance?.metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Average Engagement
                </p>
                <p className="text-3xl font-bold">
                  {performance.metrics.avgEngagement.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  likes + comments per post
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Engagement Rate
                </p>
                <p className="text-3xl font-bold">
                  {performance.metrics.engagementRate.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  of followers engage per post
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Posts Analyzed
                </p>
                <p className="text-3xl font-bold">
                  {performance.metrics.postsCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  recent posts
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Total Engagement
                </p>
                <p className="text-3xl font-bold">
                  {(performance.metrics.totalEngagement / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  across analyzed posts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      {performance?.insights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Business Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Impressions</p>
                <p className="text-2xl font-bold">
                  {(performance.insights.impressions / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Reach</p>
                <p className="text-2xl font-bold">
                  {(performance.insights.reach / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">
                  {(performance.insights.profileViews / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">
                  {(performance.insights.followerCount / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Posts */}
      {performance?.topPosts && performance.topPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performance.topPosts.map((post, idx) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {post.mediaUrl && (
                      <img
                        src={post.mediaUrl}
                        alt="Post"
                        className="w-full max-h-48 object-cover rounded mb-2"
                      />
                    )}
                    <p className="font-semibold text-sm line-clamp-2">
                      {post.caption || "No caption"}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    #{idx + 1}
                  </Badge>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likeCount?.toLocaleString() || "0"}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.commentsCount?.toLocaleString() || "0"}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>

                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View on Instagram →
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoadingPerformance && !performance && selectedUserId && !tokenError && (
        <Card>
          <CardContent className="flex items-center justify-center py-8 text-muted-foreground">
            No data found for ID {selectedUserId}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
