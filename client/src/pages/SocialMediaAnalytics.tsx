import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TikTokAnalytics } from "@/components/TikTokAnalytics";
import { InstagramAnalytics } from "@/components/InstagramAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SocialMediaAnalytics() {
  const [activeTab, setActiveTab] = useState("tiktok");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Social Media Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze seller performance across TikTok and Instagram
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tiktok" className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25A4.85 4.85 0 0 0 12 2m0 5.66a4.84 4.84 0 0 1 4.84 4.84M12 2v5.66m9.5 9.32c0 3.03-3.4 5.49-7.5 5.49S6.5 20.01 6.5 17c0-3.03 3.4-5.49 7.5-5.49S21.5 13.97 21.5 17z" />
            </svg>
            TikTok
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="3.5" fill="white" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
            </svg>
            Instagram
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tiktok" className="space-y-6">
          <TikTokAnalytics />
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <InstagramAnalytics />
        </TabsContent>
      </Tabs>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TikTok Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ Search seller by username</p>
            <p>✓ View follower count and engagement</p>
            <p>✓ Analyze top performing videos</p>
            <p>✓ Calculate engagement rates</p>
            <p>✓ Track trending products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instagram Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ Search business accounts</p>
            <p>✓ View follower metrics</p>
            <p>✓ Analyze post performance</p>
            <p>✓ Track business insights</p>
            <p>✓ Monitor engagement trends</p>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            • <strong>TikTok:</strong> Use exact usernames (case-sensitive).
            Data is from public profiles only.
          </p>
          <p>
            • <strong>Instagram:</strong> Requires Business Account ID and
            configured access token. Set INSTAGRAM_ACCESS_TOKEN environment
            variable.
          </p>
          <p>
            • Data is refreshed in real-time from the platform APIs.
          </p>
          <p>
            • Use the comparison feature to analyze performance across
            platforms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
