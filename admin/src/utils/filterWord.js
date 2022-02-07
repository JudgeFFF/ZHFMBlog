export default function filterWord(content) {
  const sensitivewords = [
    "fuck",
    "tmd",
    "sb",
    "nmsl",
    "mlgb",
    "叼你",
    "妈的",
    "傻逼",
    "伞兵",
    "草你",
  ];
  for (var i = 0; i < sensitivewords.length; i++) {
    var r = new RegExp(sensitivewords[i], "ig");
    content = content.replace(r, "*");
  }
  return content;
}
