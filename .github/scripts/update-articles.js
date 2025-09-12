const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://dev.to/feed/ishmam_abir');  // Your Dev.to feed
  let readmeContent = fs.readFileSync('README.md', 'utf8');
  let newBlogContent = '';
  newBlogContent += `## Recent Articles on [${feed.title}](${feed.link})\n`
  feed.items.slice(0, 5).forEach(item => {
      newBlogContent += `- [${item.title}](${item.link})\n`;
      // const formattedDate = new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    // newBlogContent += `📅 ${formattedDate}\n\n`;  // Adds formatted date with a calendar emoji
  });

  const newReadme = readmeContent.replace(/<!-- BLOG-POST-LIST:START -->.*<!-- BLOG-POST-LIST:END -->/s, `<!-- BLOG-POST-LIST:START -->\n${newBlogContent}<!-- BLOG-POST-LIST:END -->`);
  fs.writeFileSync('README.md', newReadme);
})();