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

test('Jolt offers a live project link while retaining its repository', async () => {
  const html = await renderPortfolio();
  assert.match(html, /href="https:\/\/jolt\.jacksonbaker\.dev"[^>]*>View live project/);
  assert.match(html, /href="https:\/\/github\.com\/jaxbkr\/Jolt"/);
});

test('mission messaging centers God’s glory and serving churches', async () => {
  const html = await renderPortfolio();
  const overview = html.split('<section id="overview">')[1].split('<section id="experience">')[0];
  const contact = html.split('<section id="contact">')[1];
  assert.ok(overview.includes('Software for God’s glory.'), 'Hero must state the mission');
  assert.ok(overview.includes('equip churches'), 'Profile must explain who the software serves');
  assert.ok(contact.includes('Christian ministries'), 'Contact must invite ministry opportunities');
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
