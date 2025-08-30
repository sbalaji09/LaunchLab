const snoowrap = require('snoowrap');

// Configure Reddit API client
const reddit = new snoowrap({
  userAgent: 'TravelBuddyAI-Scraper/1.0',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  username: 'YOUR_REDDIT_USERNAME',
  password: 'YOUR_REDDIT_PASSWORD',
});

/**
 * Given a search query/topic, fetch top relevant Reddit post and all its comments.
 * @param {string} query The topic or keywords to search for.
 * @param {string[]} subreddits List of subreddits to search (optional).
 * @returns {Promise<{post: object, comments: Array}>}
 */
async function fetchTopRedditPostWithComments(query, subreddits = ['all']) {
  let topPost = null;

  for (const subreddit of subreddits) {
    // Search posts by relevance or top
    const posts = await reddit.getSubreddit(subreddit).search({
      query,
      sort: 'relevance',
      time: 'month', // limit to recent posts for relevance
      limit: 5, // check top 5 posts
    });

    // Pick top post (e.g. highest score or most comments)
    for (const post of posts) {
      if (!topPost || post.score > topPost.score) {
        topPost = post;
      }
    }
  }

  if (!topPost) {
    throw new Error('No relevant posts found');
  }

  // Fetch all comments from the top post
  await topPost.expandReplies({limit: Infinity, depth: 10});
  const comments = extractAllComments(topPost.comments);

  return {
    post: {
      title: topPost.title,
      url: `https://reddit.com${topPost.permalink}`,
      score: topPost.score,
      numComments: topPost.num_comments,
    },
    comments,
  };
}

/**
 * Flatten nested comments into an array of comment bodies
 * @param {object[]} comments Reddit comment objects
 * @returns {string[]} Array of comment texts
 */
function extractAllComments(comments) {
  let allComments = [];
  for (const comment of comments) {
    if (comment.body) {
      allComments.push(comment.body);
      if (comment.replies && comment.replies.length > 0) {
        allComments = allComments.concat(extractAllComments(comment.replies));
      }
    }
  }
  return allComments;
}

// Example usage:
(async () => {
  try {
    const { post, comments } = await fetchTopRedditPostWithComments(
      'personalized travel itinerary AI',
      ['travel', 'TravelHacks']
    );
    console.log('Top Post:', post);
    console.log('Number of Comments:', comments.length);
    // You can now process or send these comments to your LLM for refinement
  } catch (err) {
    console.error('Error:', err);
  }
})();
