let totalTime = 0;

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  totalTime += data.time;

  let comment = "";

  if (totalTime < 30) {
    comment = "いいスタート！少しずつ続けよう 👍";
  } else if (totalTime < 120) {
    comment = "順調です！この調子 💪";
  } else {
    comment = "素晴らしい集中力！！🔥";
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `今回 ${data.time} 分学習しました。合計 ${totalTime} 分！\n${comment}`
    })
  };
};
