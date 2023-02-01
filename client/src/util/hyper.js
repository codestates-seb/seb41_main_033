export default function viewSplitLine(content) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const replace = (content) => {
    const convertContent = content.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });

    const htmlArr = [];
    convertContent.split("\n").forEach(function (text) {
      const textHtml = "<p>" + text + "</p>";
      htmlArr.push(textHtml);
    });

    return { __html: htmlArr.join("") };
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={replace(content)}></div>
    </div>
  );
}
