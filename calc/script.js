document.querySelector(".done").addEventListener("click", function () {
  const a = Number(document.querySelector(".a").value);
  const b = Number(document.querySelector(".b").value);

  const result = a + b;
  document.querySelector(".operator").classList.remove("hidden");
  document.querySelector(".equals").classList.remove("hidden");
  document.querySelector(".equals").textContent = result;
});
