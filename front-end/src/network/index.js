module.exports.getCourseSections = async () => {
  const sections = await this.$axios.get(
    `courses/${this.courseId}/sections?_embed=articles`
  );
  // sections.sort
  sections.forEach((section) => {
    section.articles.sort((a, b) => {
      return a.publishDate > b.publishDate;
    });
  });
};
