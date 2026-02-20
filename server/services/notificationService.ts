/**
 * Notification Service
 * Handles email notifications and in-app alerts
 */

import { getDb } from "../db";
import { notifications, InsertNotification } from "../../drizzle/schema";

interface EmailNotification {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface NotificationPayload {
  userId: number;
  type: "top_product" | "seller_milestone" | "price_drop" | "trend_alert";
  title: string;
  message: string;
  productId?: number;
  sellerId?: number;
}

/**
 * Send email notification using Manus built-in email service
 */
export async function sendEmailNotification(
  emailData: EmailNotification,
): Promise<boolean> {
  try {
    // Using Manus built-in notification API
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/notification/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
        }),
      },
    );

    if (!response.ok) {
      console.error("Email notification failed:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending email notification:", error);
    return false;
  }
}

/**
 * Create and store in-app notification
 */
export async function createNotification(
  payload: NotificationPayload,
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Database not available");
    return false;
  }

  try {
    const notificationData: InsertNotification = {
      userId: payload.userId,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      productId: payload.productId,
      sellerId: payload.sellerId,
      isRead: 0,
    };

    await db.insert(notifications).values(notificationData);
    return true;
  } catch (error) {
    console.error("[Notifications] Error creating notification:", error);
    return false;
  }
}

/**
 * Send top product alert
 */
export async function sendTopProductAlert(
  userId: number,
  userEmail: string,
  productName: string,
  rank: number,
  platform: string,
  productUrl?: string,
) {
  const title = `🎯 ${productName} entrou no Top ${rank}!`;
  const message = `Um novo produto está em destaque no ${platform}. Confira agora!`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${title}</h2>
      <p style="color: #666; font-size: 16px;">${message}</p>
      <p style="color: #666;">Produto: <strong>${productName}</strong></p>
      <p style="color: #666;">Plataforma: <strong>${platform}</strong></p>
      <p style="color: #666;">Posição: <strong>#${rank}</strong></p>
      ${productUrl ? `<p><a href="${productUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ver Produto</a></p>` : ""}
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Você recebeu este alerta porque está monitorando este produto.</p>
    </div>
  `;

  const emailSent = await sendEmailNotification({
    to: userEmail,
    subject: title,
    html: htmlContent,
    text: `${title}\n\n${message}\n\nProduto: ${productName}\nPlataforma: ${platform}\nPosição: #${rank}`,
  });

  if (emailSent) {
    await createNotification({
      userId,
      type: "top_product",
      title,
      message,
    });
  }

  return emailSent;
}

/**
 * Send seller milestone alert
 */
export async function sendSellerMilestoneAlert(
  userId: number,
  userEmail: string,
  sellerName: string,
  milestone: string,
  platform: string,
  sellerUrl?: string,
) {
  const title = `🚀 ${sellerName} atingiu ${milestone}!`;
  const message = `Um vendedor que você está monitorando atingiu um marco importante.`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${title}</h2>
      <p style="color: #666; font-size: 16px;">${message}</p>
      <p style="color: #666;">Vendedor: <strong>${sellerName}</strong></p>
      <p style="color: #666;">Marco: <strong>${milestone}</strong></p>
      <p style="color: #666;">Plataforma: <strong>${platform}</strong></p>
      ${sellerUrl ? `<p><a href="${sellerUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ver Loja</a></p>` : ""}
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Você recebeu este alerta porque está monitorando este vendedor.</p>
    </div>
  `;

  const emailSent = await sendEmailNotification({
    to: userEmail,
    subject: title,
    html: htmlContent,
    text: `${title}\n\n${message}\n\nVendedor: ${sellerName}\nMarco: ${milestone}\nPlataforma: ${platform}`,
  });

  if (emailSent) {
    await createNotification({
      userId,
      type: "seller_milestone",
      title,
      message,
    });
  }

  return emailSent;
}

/**
 * Send trend alert
 */
export async function sendTrendAlert(
  userId: number,
  userEmail: string,
  trendName: string,
  description: string,
) {
  const title = `📈 Nova tendência detectada: ${trendName}`;
  const message = description;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${title}</h2>
      <p style="color: #666; font-size: 16px;">${message}</p>
      <p><a href="${process.env.VITE_FRONTEND_FORGE_API_URL}/dashboard/trends" style="background-color: #ffc107; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ver Tendências</a></p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Você recebeu este alerta porque está inscrito em alertas de tendências.</p>
    </div>
  `;

  const emailSent = await sendEmailNotification({
    to: userEmail,
    subject: title,
    html: htmlContent,
    text: `${title}\n\n${message}`,
  });

  if (emailSent) {
    await createNotification({
      userId,
      type: "trend_alert",
      title,
      message,
    });
  }

  return emailSent;
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Database not available");
    return false;
  }

  try {
    const { eq } = await import("drizzle-orm");
    await db
      .update(notifications)
      .set({ isRead: 1 })
      .where(eq(notifications.id, notificationId));
    return true;
  } catch (error) {
    console.error("[Notifications] Error marking notification as read:", error);
    return false;
  }
}

/**
 * Get unread notifications count
 */
export async function getUnreadNotificationsCount(
  userId: number,
): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Database not available");
    return 0;
  }

  try {
    const { eq, and } = await import("drizzle-orm");
    const result = await db
      .select()
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, 0)),
      );
    return result.length;
  } catch (error) {
    console.error("[Notifications] Error getting unread count:", error);
    return 0;
  }
}
