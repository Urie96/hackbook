-- 1
UPDATE
  article,
  article_content
SET
  article.done = 1
WHERE
  article.id = article_content.articleId;

-- 2
UPDATE
  course
SET
  course.done = 1;

-- 3
UPDATE
  article,
  section,
  course
SET
  course.done = 0
WHERE
  article.done = 0
  AND article.sectionId = section.id
  AND section.courseId = course.id;

-- 4
UPDATE
  course,
  (
    SELECT
      course.id,
      count(*) AS count
    FROM
      course,
      section,
      article
    WHERE
      course.id = section.courseId
      AND section.id = article.sectionId
    GROUP BY
      1
  ) AS t
SET
  course.articleCount = t.count
WHERE
  t.id = course.id