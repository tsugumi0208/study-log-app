const form = document.getElementById("logForm");
const titleInput = document.getElementById("title");
const timeInput = document.getElementById("time");
const list = document.getElementById("logList");
const comment = document.getElementById("serverComment");

const logs = JSON.parse(localStorage.getItem("logs")) || [];
logs.forEach(addLogToList);

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

  fetch("/.netlify/functions/saveLog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log)
  })
    .then(res => res.json())
    .then(data => {
      comment.textContent = data.comment;
    });

  titleInput.value = "";
  timeInput.value = "";
});

function addLogToList(log) {
  const li = document.createElement("li");
  li.textContent = `${log.date}｜${log.title}（${log.time}分）`;
  list.appendChild(li);
}
