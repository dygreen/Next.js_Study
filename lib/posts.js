/* 파일 시스템 읽기를 위한 utility function 만들기 (gray-matter)
- 각 마크다운 파일을 parsing하여 제목, 날짜, 파일 이름(which will be used as id for the post URL)을 얻음
- index 페이지에 데이터를 날짜별로 정렬하여 나열함
*/

import fs from 'fs'; // 파일 시스템에서 파일을 읽을 수 있게 해주는 Node.js 모듈
import path from 'path'; // 파일 경로를 조작할 수 있는 Node.js 모듈
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}