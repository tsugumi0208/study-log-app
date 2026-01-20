const form = document.getElementById("logForm");
const titleInput = document.getElementById("title");
const timeInput = document.getElementById("time");
const totalTimeEl = document.getElementById("totalTime");
const list = document.getElementById("logList");
const comment = document.getElementById("serverComment");

function updateTotalTime() {
  const total = logs.reduce((sum, log) => sum + log.time, 0);
  totalTimeEl.textContent = `合計学習時間：${total} 分`;
}

const logs = JSON.parse(localStorage.getItem("logs")) || [];
logs.forEach(addLogToList);
updateTotalTime();

form.addEventListener("submit", e => {
  e.preventDefault();

  const log = {
    title: titleInput.value,
    time: Number(timeInput.value),
    date: new Date().toLocaleString()
  };

  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));

  addLogToList(log);
  updateTotalTime();

  fetch("/.netlify/functions/saveLog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  });

  titleInput.value = "";
  timeInput.value = "";
});

function addLogToList(log) {
  const li = document.createElement("li");
  li.textContent = `${log.date}｜${log.title}（${log.time}分）`;
  list.appendChild(li);
}
