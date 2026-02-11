const btnAdd = document.getElementById("Add");
const btnGalxe = document.getElementById("galxeAdd");
const btnGuild = document.getElementById("guildAdd");
const btnAddList = document.getElementById("addList");
const btnWaitlist = document.getElementById("waitlistAdd");
const btnRandom = document.getElementById("randomAdd");
const btnMonad = document.getElementById("randomNad");
const close = document.getElementById("close");

const tBodyDashboard = document.querySelector("#dashboard tbody");
const tBodyGalxe = document.querySelector("#galxe tbody");
const tBodyWaitlist = document.querySelector("#waitlist tbody");
const tBodyGuild = document.querySelector("#guild tbody");
const tBodyRandom = document.querySelector("#random tbody");
const tBodyMonad = document.querySelector("#monad tbody");

const input1 = document.getElementById("1"); // project
const input2 = document.getElementById("2"); // image
const input3 = document.getElementById("3"); // link
const input4 = document.getElementById("4"); // twitter
const input5 = document.getElementById("5"); // discord
const input7 = document.getElementById("7"); // date
const input8 = document.getElementById("8"); // stage
const input9 = document.getElementById("9"); // type

// Jam sekarang
const waktu = new Date()

const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"]

let date = waktu.getDate()
let day = waktu.getDay()
let month = waktu.getMonth()
let years = waktu.getFullYear()

function jams() {
  let waktu = new Date(); // bikin object Date baru tiap kali dipanggil
  let hrs = String(waktu.getHours()).padStart(2, "0");
  let min = String(waktu.getMinutes()).padStart(2, "0");
  let scn = String(waktu.getSeconds()).padStart(2, "0");

  document.querySelector(".day").innerHTML = `${hari[day - 1]}, ${date} ${bulan[month]} ${years} / ${hrs}:${min}:${scn}`;
}

jams()

setInterval(jams, 1000); 



let activeTable = "dashboard";
let editingRow = null; 

function getBodyContainingRow(row) {
  if (tBodyDashboard && tBodyDashboard.contains(row)) return tBodyDashboard;
  if (tBodyGalxe && tBodyGalxe.contains(row)) return tBodyGalxe;
  if (tBodyGuild && tBodyGuild.contains(row)) return tBodyGuild;
  if (tBodyWaitlist && tBodyWaitlist.contains(row)) return tBodyWaitlist;
  if (tBodyRandom && tBodyRandom.contains(row)) return tBodyRandom;
  if (tBodyMonad && tBodyMonad.contains(row)) return tBodyMonad;
  return null;
}

// NAV & form open/close (tidak diubah banyak)
const startDaily = document.getElementById("start");
startDaily.addEventListener("click", () => {
  const datas = document.querySelectorAll(".status-ok");
datas.forEach(cell => {
  cell.textContent = "❌";
});


  saveData();
});

const navLinks = document.querySelectorAll('.navbar .menu > a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const targetId = link.getAttribute('href'); 
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector(targetId).classList.add('active');
  });
});

btnAdd.addEventListener("click", () => {
  activeTable = "dashboard";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
btnGalxe.addEventListener("click", () => {
  activeTable = "galxe";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
btnGuild.addEventListener("click", () => {
  activeTable = "guild";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
btnWaitlist.addEventListener("click", () => {
  activeTable = "waitlist";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
btnRandom.addEventListener("click", () => {
  activeTable = "random";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
btnMonad.addEventListener("click", () => {
  activeTable = "monad";
  if (document.getElementById("addList").textContent === "Update") {
    document.getElementById("addList").textContent = "Tambah";
  }
  document.querySelector(".form").classList.add("active");
});
close.addEventListener("click", () => {
  document.querySelector(".form").classList.remove("active");
  resetForm();
});

// reset form
function resetForm() {
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  input5.value = "";
  input7.value = "";
  input8.value = "";
  input9.value = "";
  editingRow = null;
}

// Tambah / Update
btnAddList.addEventListener("click", () => {
  if (editingRow) {
    editingRow.querySelector(".cell-image img").src = input2.value || "";
    editingRow.querySelector(".name-text").textContent = input1.value || "";
    const linkEl = editingRow.querySelector(".cell-link a");
    if (linkEl) linkEl.href = input3.value || "";
    const tEl = editingRow.querySelector(".cell-twitter a");
    if (tEl) tEl.href = input4.value || "";
    const dEl = editingRow.querySelector(".cell-discord a");
    if (dEl) dEl.href = input5.value || "";
    const dateEl = editingRow.querySelector(".cell-date");
    if (dateEl) dateEl.textContent = input7.value || "";
    const stageEl = editingRow.querySelector(".cell-stage span");
    if (stageEl) stageEl.textContent = input8.value || "";
    const typeEl = editingRow.querySelector(".cell-type span");
    if (typeEl) typeEl.textContent = input9.value || "";

    // simpan sesuai tabel row itu ada di mana
    const container = getBodyContainingRow(editingRow);
    editingRow = null;
    if (container === tBodyGalxe) {
      saveDataGalxe();
    } else if (container === tBodyGuild) {
      saveDataGuild();
    } else {
      saveData();
    }
  } else {
    // === MODE ADD NEW ===
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    const now = new Date();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
    const nowStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} / ${hours}:${minutes}:${seconds}`;

    tr.innerHTML = `
      <td class="cell-image">
        <img src="${input2.value || ''}"> 
        <span class="name-text">${input1.value || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${input3.value || ''}" target="_blank"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${input4.value || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${input5.value || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">❌</td>
      <td class="cell-date">${input7.value || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${input8.value || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${input9.value || ''}</span></td>
      <td class="cell-last"><span>${nowStr}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;

    const targetMap = {
      dashboard: tBodyDashboard,
      galxe: tBodyGalxe,
      guild: tBodyGuild,
      waitlist: tBodyWaitlist,
      random: tBodyRandom,
      monad: tBodyMonad
    };
    const targetBody = targetMap[activeTable];
    if (!targetBody) {
      console.warn("Target body tidak ditemukan untuk:", activeTable);
      return;
    }
    targetBody.appendChild(tr);

    // pasang event
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  

    feather.replace();

    // save data
    if (activeTable === "galxe") {
      saveDataGalxe();
    }
     else if (activeTable === "guild") {
      saveDataGuild();
    }
     else if (activeTable === "waitlist") {
      saveDataWaitlist();
    }
     else if (activeTable === "random") {
      saveDataRandom();
    }
     else if (activeTable === "monad") {
      saveDataMonad();
    }
     else {
      saveData();
    }
  }

  resetForm();
  document.querySelector(".form").classList.remove("active");
});


let draggedRow = null;

function addDragEvent(row) {
  row.addEventListener("dragstart", () => {
    draggedRow = row;
    row.classList.add("dragging");
  });

  row.addEventListener("dragend", () => {
    row.classList.remove("dragging");
    draggedRow = null;

    // setelah selesai drag → save ulang
    const container = getBodyContainingRow(row);

    if (container === tBodyGalxe) saveDataGalxe();
    else if (container === tBodyGuild) saveDataGuild();
    else if (container === tBodyWaitlist) saveDataWaitlist();
    else if (container === tBodyRandom) saveDataRandom();
    else if (container === tBodyMonad) saveDataMonad();
    else saveData();
  });
}

function enableDragSort(tbody) {
  if (!tbody) return;

  tbody.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(tbody, e.clientY);
    if (afterElement == null) {
      tbody.appendChild(draggedRow);
    } else {
      tbody.insertBefore(draggedRow, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("tr:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}


// === addLinkEvent: update last & simpan ===
function addLinkEvent(row) {
  const link = row.querySelector(".cell-link a");
  const statusCell = row.querySelector(".status-ok");

  if (!link || !statusCell) return;

  link.addEventListener("click", () => {

    // ubah status jadi centang
    statusCell.textContent = "✔";
    statusCell.classList.remove("reminder");

    // update last activity
    const lastCell = row.querySelector(".cell-last");
    const now = new Date();
    let h = String(now.getHours()).padStart(2, "0");
    let m = String(now.getMinutes()).padStart(2, "0");
    let s = String(now.getSeconds()).padStart(2, "0");

    const timeStr = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} / ${h}:${m}:${s}`;

    lastCell.innerHTML = `
      <span>${timeStr}</span>
      <button class="btn-del"><i class="dell" data-feather="trash-2"></i></button>
    `;

    addDeleteEvent(row);
    feather.replace();

    // save ulang sesuai tabel
    const container = getBodyContainingRow(row);

    if (container === tBodyGalxe) saveDataGalxe();
    else if (container === tBodyGuild) saveDataGuild();
    else if (container === tBodyWaitlist) saveDataWaitlist();
    else if (container === tBodyRandom) saveDataRandom();
    else if (container === tBodyMonad) saveDataMonad();
    else saveData();
  });
}


// === addDeleteEvent: cari tbody via getBodyContainingRow ===
function addDeleteEvent(row) {
  const btn = row.querySelector(".btn-del");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!confirm("Yakin mau hapus data ini?")) return;

    // cari container tbody yang mengandung row (lebih reliable)
    const container = getBodyContainingRow(row);

    // hapus baris dari DOM
    row.remove();

    if (!container) {
      console.warn("Container tbody tidak ditemukan untuk row:", row);
      return;
    }

    // simpan ulang sesuai container
    if (container === tBodyGalxe) {
      saveDataGalxe();
      // tidak perlu langsung loadDataGalxe(); load dipakai saat page reload,
      // namun kalau ada logic yang bergantung ke render sekarang bisa dipanggil.
      loadDataGalxe();
    } else if (container === tBodyGuild) {
      saveDataGuild();
      loadDataGuild();
    }else if (container === tBodyWaitlist) {
      saveDataWaitlist();
      loadDataWaitlist();
    }else if (container === tBodyRandom) {
      saveDataRandom();
      loadDataRandom();
    } 
    else if (container === tBodyMonad) {
      saveDataMonad();
      loadDataMonad();
    } 
     else {
      saveData();
      loadData();
    }
  }, { once: false });
}

// === addEditEvent: pakai class selector untuk prefill ===
function addEditEvent(row) {
  const btn = row.querySelector(".btn-edit");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.getElementById("addList").textContent = "Update";
    editingRow = row;
    document.querySelector(".form").classList.add("active");

    input1.value = row.querySelector(".name-text")?.textContent.trim() || "";
    input2.value = row.querySelector(".cell-image img")?.src || "";
    input3.value = row.querySelector(".cell-link a")?.href || "";
    input4.value = row.querySelector(".cell-twitter a")?.href || "";
    input5.value = row.querySelector(".cell-discord a")?.href || "";
    input7.value = row.querySelector(".cell-date")?.textContent || "";
    input8.value = row.querySelector(".cell-stage span")?.textContent || "";
    input9.value = row.querySelector(".cell-type span")?.textContent || "";
  });
}

// ========== SAVE / LOAD functions (use class selectors) ==========
// Dashboard
function saveData() {
  let rows = [];
  if (!tBodyDashboard) return;
  tBodyDashboard.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".status-ok")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdrops", JSON.stringify(rows));
  console.log("✅ Data dashboard disimpan:", rows);
}
function loadData() {
  let rows = JSON.parse(localStorage.getItem("airdrops") || "[]");
  if (!tBodyDashboard) return;
  tBodyDashboard.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok ${item.reminder ? 'reminder' : ''}">
  ${item.reminder ? '❌' : '✔'}
</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyDashboard.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  
  });
  feather.replace();
}

// Galxe
function saveDataGalxe() {
  let rows = [];
  if (!tBodyGalxe) return;
  tBodyGalxe.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".cell-link a")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdropsGalxe", JSON.stringify(rows));
  console.log("✅ Data galxe disimpan:", rows);
}
function loadDataGalxe() {
  let rows = JSON.parse(localStorage.getItem("airdropsGalxe") || "[]");
  if (!tBodyGalxe) return;
  tBodyGalxe.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank" class="${item.reminder ? 'reminder' : ''}"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">✔</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyGalxe.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  
  });
  feather.replace();
}

// Guild
function saveDataGuild() {
  let rows = [];
  if (!tBodyGuild) return;
  tBodyGuild.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".cell-link a")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdropsGuild", JSON.stringify(rows));
  console.log("✅ Data guild disimpan:", rows);
}
function loadDataGuild() {
  let rows = JSON.parse(localStorage.getItem("airdropsGuild") || "[]");
  if (!tBodyGuild) return;
  tBodyGuild.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank" class="${item.reminder ? 'reminder' : ''}"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">✔</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyGuild.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  
  });
  feather.replace();
}
// Waitlist
function saveDataWaitlist() {
  let rows = [];
  if (!tBodyWaitlist) return;
  tBodyWaitlist.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".cell-link a")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdropsWaitlist", JSON.stringify(rows));
  console.log("✅ Data Waitlist disimpan:", rows);
}
function loadDataWaitlist() {
  let rows = JSON.parse(localStorage.getItem("airdropsWaitlist") || "[]");
  if (!tBodyWaitlist) return;
  tBodyWaitlist.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank" class="${item.reminder ? 'reminder' : ''}"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">✔</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyWaitlist.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  
  });
  feather.replace();
}
// Random
function saveDataRandom() {
  let rows = [];
  if (!tBodyRandom) return;
  tBodyRandom.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".cell-link a")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdropsRandom", JSON.stringify(rows));
  console.log("✅ Data Random disimpan:", rows);
}
function loadDataRandom() {
  let rows = JSON.parse(localStorage.getItem("airdropsRandom") || "[]");
  if (!tBodyRandom) return;
  tBodyRandom.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank" class="${item.reminder ? 'reminder' : ''}"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">✔</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyRandom.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addDragEvent(tr);  
  });
  feather.replace();
}
// Eco Monad
function saveDataMonad() {
  let rows = [];
  if (!tBodyMonad) return;
  tBodyMonad.querySelectorAll("tr").forEach(tr => {
    rows.push({
      image: tr.querySelector(".cell-image img")?.src || "",
      name: tr.querySelector(".name-text")?.textContent.trim() || "",
      link: tr.querySelector(".cell-link a")?.href || "",
      twitter: tr.querySelector(".cell-twitter a")?.href || "",
      discord: tr.querySelector(".cell-discord a")?.href || "",
      date: tr.querySelector(".cell-date")?.textContent || "",
      stage: tr.querySelector(".cell-stage span")?.textContent || "",
      type: tr.querySelector(".cell-type span")?.textContent || "",
      last: tr.querySelector(".cell-last span")?.textContent || "",
      reminder: tr.querySelector(".cell-link a")?.classList.contains("reminder") || false
    });
  });
  localStorage.setItem("airdropsMonad", JSON.stringify(rows));
  console.log("✅ Data Random disimpan:", rows);
}
function loadDataMonad() {
  let rows = JSON.parse(localStorage.getItem("airdropsMonad") || "[]");
  if (!tBodyMonad) return;
  tBodyMonad.innerHTML = "";
  rows.forEach(item => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="cell-image">
        <img src="${item.image || ''}"> 
        <span class="name-text">${item.name || ''}</span>
        <button class="btn-edit"><i data-feather="edit"></i></button>
      </td>
      <td class="cell-link"><a href="${item.link || ''}" target="_blank" class="${item.reminder ? 'reminder' : ''}"><i data-feather="external-link"></i></a></td>
      <td class="cell-twitter"><a href="${item.twitter || ''}" target="_blank"><i data-feather="twitter"></i></a></td>
      <td class="cell-discord"><a href="${item.discord || ''}" target="_blank"><i data-feather="monitor"></i></a></td>
      <td class="status-ok">✔</td>
      <td class="cell-date">${item.date || ''}</td>
      <td class="cell-stage"><span class="badge badge-mainnet">${item.stage || ''}</span></td>
      <td class="cell-type"><span class="badge badge-claim">${item.type || ''}</span></td>
      <td class="cell-last"><span>${item.last || ''}</span><button class="btn-del"><i class="dell" data-feather="trash-2"></i></button></td>
    `;
    tBodyMonad.appendChild(tr);
    addEditEvent(tr);
    addLinkEvent(tr);
    addDeleteEvent(tr);
    addEditEvent(tr);
addDragEvent(tr);  
  });
  feather.replace();
}

// initial load
window.addEventListener("DOMContentLoaded", () => {

  
  loadData();
  loadDataGalxe();
  loadDataGuild();
  loadDataWaitlist();
  loadDataRandom();
  loadDataMonad();

  enableDragSort(tBodyDashboard);
enableDragSort(tBodyGalxe);
enableDragSort(tBodyGuild);
enableDragSort(tBodyWaitlist);
enableDragSort(tBodyRandom);
enableDragSort(tBodyMonad);


});
