let totalTime = 0;

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  totalTime += data.time;

  let comment = "コツコツ頑張っていますね！";
  if (totalTime > 120) comment = "かなり集中しています！";
  if (totalTime > 300) comment = "素晴らしい学習量です！";

  return {
    statusCode: 200,
    body: JSON.stringify({
      totalTime,
      comment
    })
  };
};
