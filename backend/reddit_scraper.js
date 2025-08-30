const fetch = require('node-fetch'); // or import fetch from 'node-fetch'

async function scrapeRedditPosts(subreddit, keyword, limit = 10) {
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&sort=relevance&limit=${limit}&restrict_sr=1`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'your-app-name-v1.0' // required by Reddit API
    }
  });
  const data = await response.json();
  // Extract relevant posts titles and selftexts
  const posts = data.data.children.map(child => ({
    title: child.data.title,
    text: child.data.selftext,
    url: `https://reddit.com${child.data.permalink}`,
  }));
  return posts;
}
