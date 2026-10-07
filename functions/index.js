/*
 Cloud Functions for Firebase - Contact to Slack bridge
 Trigger: Firestore onCreate for `contacts/{docId}`
 Posts submissions to Slack via Incoming Webhook.
*/

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { logger } = require('firebase-functions');

initializeApp();
const db = getFirestore();

// Secret: preferred (requires Blaze): `firebase functions:secrets:set SLACK_WEBHOOK_URL`
// Fallback (works on Spark): store a document at `config/slack` with field `webhookUrl`
const SLACK_WEBHOOK_URL = defineSecret('SLACK_WEBHOOK_URL');

async function resolveSlackWebhookUrl() {
  // Prefer secret (if available)
  const fromEnv = process.env.SLACK_WEBHOOK_URL;
  if (fromEnv && fromEnv.startsWith('https://')) return fromEnv;

  // Fallback: Firestore config doc
  try {
    const cfgSnap = await db.doc('config/slack').get();
    const url = cfgSnap.get('webhookUrl');
    if (url && typeof url === 'string' && url.startsWith('https://')) return url;
  } catch (e) {
    logger.warn('No Slack webhook in Firestore config', String(e));
  }
  throw new Error('Slack webhook URL not configured. Set secret SLACK_WEBHOOK_URL or create doc config/slack{webhookUrl}');
}

exports.onContactCreated = onDocumentCreated(
  {
    document: 'contacts/{docId}',
    region: 'us-central1',
    secrets: [SLACK_WEBHOOK_URL],
    retry: true,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const contactId = snap.id;
    const data = snap.data();

    // Idempotency guard
    if (data?.delivery?.deliveredAt) {
      logger.info('Already delivered, skipping', { contactId });
      return;
    }

    const name = data?.name || 'Unknown';
    const email = data?.email || 'No email';
    const company = data?.company || '—';
    const message = (data?.message || '').toString().slice(0, 3000);

    const payload = {
      text: `New contact form submission from ${name}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: 'New Contact Submission' } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Name*\n${name}` },
          { type: 'mrkdwn', text: `*Email*\n${email}` },
          { type: 'mrkdwn', text: `*Company*\n${company}` },
        ]},
        { type: 'section', text: { type: 'mrkdwn', text: `*Message*\n${message}` } },
        { type: 'context', elements: [ { type: 'mrkdwn', text: `Doc ID: ${contactId}` } ] },
      ],
    };

    try {
      const webhookUrl = await resolveSlackWebhookUrl();
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      if (!resp.ok) {
        throw new Error(`Slack webhook failed (${resp.status}): ${text}`);
      }

      await db.doc(`contacts/${contactId}`).set({
        status: 'delivered',
        delivery: { deliveredAt: new Date().toISOString() },
      }, { merge: true });

      logger.info('Slack delivered', { contactId });
    } catch (err) {
      logger.error('Slack error', { error: String(err), contactId });
      await db.doc(`contacts/${contactId}`).set({
        status: 'failed',
        delivery: {
          attempts: (data?.delivery?.attempts || 0) + 1,
          lastAttemptAt: new Date().toISOString(),
          error: String(err?.message || err),
        },
      }, { merge: true });
      throw err; // allow retry
    }
  }
);

// Discovery questionnaire handler
exports.onDiscoveryCreated = onDocumentCreated(
  {
    document: 'discoveries/{docId}',
    region: 'us-central1',
    secrets: [SLACK_WEBHOOK_URL],
    retry: true,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const discoveryId = snap.id;
    const data = snap.data();

    if (data?.delivery?.deliveredAt) {
      logger.info('Discovery already delivered, skipping', { discoveryId });
      return;
    }

    const company = data?.companyName || 'Unknown company';
    const contact = data?.primaryContact || 'Unknown';
    const email = data?.email || 'No email';
    const phone = data?.phone || '—';
    const industry = data?.industry || '—';
    const staffSize = data?.staffSize || '—';
    const serviceLevel = data?.serviceLevel || '—';
    const timeline = data?.timeline || '—';
    const challenges = (data?.challenges || '').toString().slice(0, 1500);
    const goals = (data?.goals || '').toString().slice(0, 1500);

    const payload = {
      text: `New IT Discovery submission from ${company}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: 'New IT Discovery Questionnaire' } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Company*\n${company}` },
          { type: 'mrkdwn', text: `*Contact*\n${contact}` },
          { type: 'mrkdwn', text: `*Email*\n${email}` },
          { type: 'mrkdwn', text: `*Phone*\n${phone}` },
          { type: 'mrkdwn', text: `*Industry*\n${industry}` },
          { type: 'mrkdwn', text: `*Staff*\n${staffSize}` },
          { type: 'mrkdwn', text: `*Service level*\n${serviceLevel}` },
          { type: 'mrkdwn', text: `*Timeline*\n${timeline}` },
        ]},
        { type: 'section', text: { type: 'mrkdwn', text: `*Challenges*\n${challenges || '—'}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Goals*\n${goals || '—'}` } },
        { type: 'context', elements: [ { type: 'mrkdwn', text: `Doc ID: ${discoveryId}` } ] },
      ],
    };

    try {
      const webhookUrl = await resolveSlackWebhookUrl();
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      if (!resp.ok) {
        throw new Error(`Slack webhook failed (${resp.status}): ${text}`);
      }

      await db.doc(`discoveries/${discoveryId}`).set({
        status: 'delivered',
        delivery: { deliveredAt: new Date().toISOString() },
      }, { merge: true });

      logger.info('Discovery delivered to Slack', { discoveryId });
    } catch (err) {
      logger.error('Discovery Slack error', { error: String(err), discoveryId });
      await db.doc(`discoveries/${discoveryId}`).set({
        status: 'failed',
        delivery: {
          attempts: (data?.delivery?.attempts || 0) + 1,
          lastAttemptAt: new Date().toISOString(),
          error: String(err?.message || err),
        },
      }, { merge: true });
      throw err;
    }
  }
);

// Cyber readiness assessment handler
exports.onCyberAssessmentCreated = onDocumentCreated(
  {
    document: 'cyber-assessments/{docId}',
    region: 'us-central1',
    secrets: [SLACK_WEBHOOK_URL],
    retry: true,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const assessmentId = snap.id;
    const data = snap.data();

    if (data?.delivery?.deliveredAt) {
      logger.info('Cyber assessment already delivered, skipping', { assessmentId });
      return;
    }

    const company = data?.companyName || 'Unknown company';
    const name = data?.name || 'Unknown';
    const email = data?.email || 'No email';
    const phone = data?.phone || '—';
    const scorePercent = data?.scorePercent ?? '—';
    const scoreLevel = data?.scoreLevel || '—';

    const payload = {
      text: `New cyber readiness assessment from ${company}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: 'New Cyber Readiness Assessment' } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Company*\n${company}` },
          { type: 'mrkdwn', text: `*Contact*\n${name}` },
          { type: 'mrkdwn', text: `*Email*\n${email}` },
          { type: 'mrkdwn', text: `*Phone*\n${phone}` },
          { type: 'mrkdwn', text: `*Score*\n${scorePercent}%` },
          { type: 'mrkdwn', text: `*Level*\n${scoreLevel}` },
        ]},
        { type: 'context', elements: [ { type: 'mrkdwn', text: `Doc ID: ${assessmentId}` } ] },
      ],
    };

    try {
      const webhookUrl = await resolveSlackWebhookUrl();
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      if (!resp.ok) {
        throw new Error(`Slack webhook failed (${resp.status}): ${text}`);
      }

      await db.doc(`cyber-assessments/${assessmentId}`).set({
        status: 'delivered',
        delivery: { deliveredAt: new Date().toISOString() },
      }, { merge: true });

      logger.info('Cyber assessment delivered to Slack', { assessmentId });
    } catch (err) {
      logger.error('Cyber assessment Slack error', { error: String(err), assessmentId });
      await db.doc(`cyber-assessments/${assessmentId}`).set({
        status: 'failed',
        delivery: {
          attempts: (data?.delivery?.attempts || 0) + 1,
          lastAttemptAt: new Date().toISOString(),
          error: String(err?.message || err),
        },
      }, { merge: true });
      throw err;
    }
  }
);

// Newsletter subscription handler
exports.onNewsletterSubscription = onDocumentCreated(
  {
    document: 'newsletter-subscriptions/{docId}',
    region: 'us-central1',
    secrets: [SLACK_WEBHOOK_URL],
    retry: true,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const subscriptionId = snap.id;
    const data = snap.data();

    // Idempotency guard
    if (data?.delivery?.deliveredAt) {
      logger.info('Newsletter subscription already delivered, skipping', { subscriptionId });
      return;
    }

    const email = data?.email || 'Unknown';
    const source = data?.source || 'unknown';
    const timestamp = data?.timestamp?.toDate?.() || new Date();

    const payload = {
      text: `New newsletter subscription: ${email}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: '📧 New Newsletter Subscription' } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Email*\n${email}` },
          { type: 'mrkdwn', text: `*Source*\n${source}` },
          { type: 'mrkdwn', text: `*Subscribed*\n${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}` },
        ]},
        { type: 'section', text: { 
          type: 'mrkdwn', 
          text: `*Preferences*\n• Cybersecurity updates\n• AI trends\n• Tech insights` 
        }},
        { type: 'context', elements: [ { type: 'mrkdwn', text: `Subscription ID: ${subscriptionId}` } ] },
      ],
    };

    try {
      const webhookUrl = await resolveSlackWebhookUrl();
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      if (!resp.ok) {
        throw new Error(`Slack webhook failed (${resp.status}): ${text}`);
      }

      await db.doc(`newsletter-subscriptions/${subscriptionId}`).set({
        status: 'delivered',
        delivery: { deliveredAt: new Date().toISOString() },
      }, { merge: true });

      logger.info('Newsletter subscription delivered to Slack', { subscriptionId });
    } catch (err) {
      logger.error('Newsletter subscription Slack error', { error: String(err), subscriptionId });
      await db.doc(`newsletter-subscriptions/${subscriptionId}`).set({
        status: 'failed',
        delivery: {
          attempts: (data?.delivery?.attempts || 0) + 1,
          lastAttemptAt: new Date().toISOString(),
          error: String(err?.message || err),
        },
      }, { merge: true });
      throw err; // allow retry
    }
  }
);


