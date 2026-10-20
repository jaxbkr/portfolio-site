import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

async function renderPortfolio() {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    return renderToStaticMarkup(React.createElement(App));
  } finally {
    await server.close();
  }
}

test('experience displays the approved bullets for every role', async () => {
  const html = await renderPortfolio();
  const expected = {
  "Desktop Support": [
    "Diagnose and resolve hardware, software, account-access, and printing issues for students, faculty, and staff through Microsoft Teams and in-person support.",
    "Deploy, configure, and support Windows and macOS endpoints through device imaging and Microsoft Intune management.",
    "Guide faculty and staff through passkey enrollment at campus workshops, answering questions and troubleshooting setup to support university security compliance."
  ],
  "IT Deployment Technician": [
    "Documented more than 2,000 devices during a healthcare technology deployment spanning 4 hospitals, 2 emergency departments, and 21 clinics.",
    "Conducted enterprise asset inventories and documented infrastructure to support deployment planning for endpoint and wireless technology rollouts."
  ],
  "Resident Assistant": [
    "Addressed resident concerns and interpersonal conflicts, working with university staff to support residents and maintain daily housing operations.",
    "Coordinated community programming with university staff to foster resident engagement and connection."
  ],
  "Junior Web Developer": [
    "Built a web-scraping integration that extracted podcast and episode information from Spotify for display on an external website.",
    "Developed and maintained client web applications using Next.js, JavaScript, and Tailwind CSS.",
    "Collaborated through Git-based development workflows to implement, refine, and deliver production features."
  ],
  "Application Tester": [
    "Automated application testing with Playwright to identify defects and support software reliability.",
    "Collaborated with developers through Jira to track defects and coordinate their resolution."
  ]
};
  for (const [role, bullets] of Object.entries(expected)) {
    const card = html.split('<section').find(section => section.includes(`<b>${role}</b>`));
    assert.ok(card, `Missing role: ${role}`);
    const actual = [...card.matchAll(/<li>(.*?)<\/li>/g)].map(match => match[1]);
    assert.deepEqual(actual, bullets, `Approved bullets for ${role}`);
  }
});

test('Jolt offers a live project link while retaining its repository', async () => {
  const html = await renderPortfolio();
  assert.match(html, /href="https:\/\/jolt\.jacksonbaker\.dev"[^>]*>View live project/);
  assert.match(html, /href="https:\/\/github\.com\/jaxbkr\/Jolt"/);
});

test('primary positioning centers IT infrastructure and systems administration', async () => {
  const html = await renderPortfolio();
  const overview = html.split('<section id="overview">')[1].split('<section id="experience">')[0];
  const contact = html.split('<section id="contact">')[1];
  assert.ok(overview.includes('IT Infrastructure'), 'Focus area must emphasize infrastructure');
  assert.ok(overview.includes('Systems administration'), 'Overview must describe systems administration');
  assert.ok(overview.includes('reliable systems'), 'Profile must describe the practical focus');
  assert.ok(contact.includes('IT infrastructure and systems administration opportunities'), 'Contact must invite IT roles');
  assert.doesNotMatch(overview + contact, /God’s glory|equip churches|Christian ministries|serve your church/);
  const systemsRoute = html.indexOf('aria-pressed="true"');
  assert.ok(html.slice(systemsRoute, systemsRoute + 150).includes('Systems &amp; Virtualization'), 'Systems must be the default toolkit route');
});

test('OneAnother is an in-progress church directory and prayer application', async () => {
  const html = await renderPortfolio();
  const cards = html.match(/<section class="panel project"[\s\S]*?<\/section>/g) || [];
  const card = cards.find(card => card.includes('<h3>OneAnother</h3>')) || '';
  assert.ok(card.includes('In progress'), 'OneAnother must be marked in progress');
  assert.ok(card.includes('church membership directory'), 'Explain the directory purpose');
  assert.ok(card.includes('prayer requests'), 'Explain the prayer purpose');
  assert.ok(!card.includes('<a '), 'Do not invent a live or repository URL');
});
