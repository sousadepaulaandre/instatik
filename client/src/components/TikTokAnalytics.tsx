import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react";

interface TikTokAnalyticsProps {
  onSellerSelect?: (username: string) => void;
}

export function TikTokAnalytics({ onSellerSelect }: TikTokAnalyticsProps) {
  const [username, setUsername] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");

  // Query para análise de performance
  const { data: performance, isLoading: isLoadingPerformance } =
    trpc.socialMedia.tiktok.analyzePerformance.useQuery(
      { uniqueId: selectedUsername },
      { enabled: !!selectedUsername }
    );

  const handleSearch = () => {
    if (username.trim()) {
      setSelectedUsername(username);
      onSellerSelect?.(username);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25A4.85 4.85 0 0 0 12 2m0 5.66a4.84 4.84 0 0 1 4.84 4.84M12 2v5.66m9.5 9.32c0 3.03-3.4 5.49-7.5 5.49S6.5 20.01 6.5 17c0-3.03 3.4-5.49 7.5-5.49S21.5 13.97 21.5 17z" />
            </svg>
            TikTok Seller Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter TikTok username (ex: manusaiofficial)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <span className="ml-2">Loading seller data...</span>
          </CardContent>
        </Card>
      )}

      {/* User Info */}
      {performance?.user && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {performance.user.avatarUrl && (
                  <img
                    src={performance.user.avatarUrl}
                    alt={performance.user.nickname}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <CardTitle>{performance.user.nickname}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    @{performance.user.uniqueId}
                  </p>
                  {performance.user.verified && (
                    <Badge className="mt-2">Verified</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{performance.user.signature}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">
                  {(performance.user.followerCount / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">
                  {performance.user.videoCount}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">
                  {(performance.user.heartCount / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">Following</p>
                <p className="text-2xl font-bold">
                  {performance.user.followingCount}
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
                  likes + comments + shares per video
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
                  of followers engage per video
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Average Views
                </p>
                <p className="text-3xl font-bold">
                  {(performance.metrics.avgViews / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  per video
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
                  across top videos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Videos */}
      {performance?.topPosts && performance.topPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Videos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performance.topPosts.map((post, idx) => (
              <div
                key={post.awemeId}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-sm line-clamp-2">
                    {post.desc || "No description"}
                  </p>
                  <Badge variant="outline">#{idx + 1}</Badge>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {(post.diggCount / 1000).toFixed(1)}K
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {(post.commentCount / 1000).toFixed(1)}K
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {(post.shareCount / 1000).toFixed(1)}K
                  </div>
                  <div className="ml-auto">
                    {(post.playCount / 1000000).toFixed(1)}M views
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {new Date(post.createTime * 1000).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoadingPerformance && !performance && selectedUsername && (
        <Card>
          <CardContent className="flex items-center justify-center py-8 text-muted-foreground">
            No data found for @{selectedUsername}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
