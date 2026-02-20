/**
 * Apify API Integration
 * Handles data collection from TikTok Shop and Instagram via Apify actors
 */

interface ApifyConfig {
  apiKey: string;
  baseUrl: string;
}

interface ApifyActorRun {
  id: string;
  status:
    | "READY"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "TIMED_OUT"
    | "ABORTED";
  output?: {
    resultUrl?: string;
    data?: unknown;
  };
}

/**
 * Initialize Apify client
 * Requires APIFY_API_KEY environment variable
 */
export function createApifyClient(apiKey: string): ApifyConfig {
  if (!apiKey) {
    throw new Error("APIFY_API_KEY environment variable is required");
  }

  return {
    apiKey,
    baseUrl: "https://api.apify.com/v2",
  };
}

/**
 * Run TikTok Shop actor to collect trending products
 */
export async function runTikTokShopActor(
  config: ApifyConfig,
  options: {
    searchQuery?: string;
    maxResults?: number;
  } = {},
) {
  const { searchQuery = "trending", maxResults = 100 } = options;

  const actorId = "excavator/tiktok-shop-product"; // Apify actor ID for TikTok Shop
  const input = {
    searchQuery,
    maxResults,
    proxy: {
      useApifyProxy: true,
    },
  };

  try {
    const response = await fetch(
      `${config.baseUrl}/acts/${actorId}/runs?token=${config.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.statusText}`);
    }

    const run = (await response.json()) as ApifyActorRun;
    return run;
  } catch (error) {
    console.error("Error running TikTok Shop actor:", error);
    throw error;
  }
}

/**
 * Run Instagram actor to collect product data
 */
export async function runInstagramActor(
  config: ApifyConfig,
  options: {
    searchQuery?: string;
    maxResults?: number;
  } = {},
) {
  const { searchQuery = "trending", maxResults = 100 } = options;

  const actorId = "apify/instagram-scraper"; // Apify actor ID for Instagram
  const input = {
    searchQuery,
    maxResults,
    proxy: {
      useApifyProxy: true,
    },
  };

  try {
    const response = await fetch(
      `${config.baseUrl}/acts/${actorId}/runs?token=${config.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.statusText}`);
    }

    const run = (await response.json()) as ApifyActorRun;
    return run;
  } catch (error) {
    console.error("Error running Instagram actor:", error);
    throw error;
  }
}

/**
 * Poll for actor run completion
 */
export async function waitForActorCompletion(
  config: ApifyConfig,
  runId: string,
  maxWaitTime: number = 300000, // 5 minutes
): Promise<ApifyActorRun> {
  const startTime = Date.now();
  const pollInterval = 5000; // 5 seconds

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const response = await fetch(
        `${config.baseUrl}/actor-runs/${runId}?token=${config.apiKey}`,
      );

      if (!response.ok) {
        throw new Error(`Apify API error: ${response.statusText}`);
      }

      const run = (await response.json()) as ApifyActorRun;

      if (
        run.status === "SUCCEEDED" ||
        run.status === "FAILED" ||
        run.status === "TIMED_OUT" ||
        run.status === "ABORTED"
      ) {
        return run;
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    } catch (error) {
      console.error("Error polling actor run:", error);
      throw error;
    }
  }

  throw new Error(
    `Actor run ${runId} did not complete within ${maxWaitTime}ms`,
  );
}

/**
 * Get actor run results
 */
export async function getActorResults(
  config: ApifyConfig,
  runId: string,
): Promise<unknown[]> {
  try {
    const response = await fetch(
      `${config.baseUrl}/actor-runs/${runId}/dataset/items?token=${config.apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.statusText}`);
    }

    const results = await response.json();
    return Array.isArray(results) ? results : [results];
  } catch (error) {
    console.error("Error fetching actor results:", error);
    throw error;
  }
}
