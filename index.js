const form = document.querySelector("form");
const daySelect = document.getElementById("day");
const timeSlotSelect = document.getElementById("time-slot");
const instructorSelect = document.getElementById("instructor");
const courseSelect = document.getElementById("course");
const table = document.createElement("table");
const clearButton = document.getElementById("Clear");

// Create table header
const headerRow = document.createElement("tr");
headerRow.appendChild(document.createElement("th"));
for (let i = 0; i < timeSlotSelect.options.length; i++) {
  const timeSlot = timeSlotSelect.options[i].value;
  const th = document.createElement("th");
  th.textContent = timeSlot;
  headerRow.appendChild(th);
  if (i === 2) {
    // Add break column at 3rd position (0-indexed)
    const breakTh = document.createElement("th");
    breakTh.textContent = "Break";
    headerRow.appendChild(breakTh);
  }
}
table.appendChild(headerRow);

clearButton.addEventListener("click", function() {
  // Loop through each table cell
  table.querySelectorAll("td").forEach(function(cell) {
    // Clear the cell if it's not in the first row or column
    if (cell.cellIndex !== 0 && cell.parentNode.rowIndex !== 0) {
      cell.innerHTML = "";
    }
  });
});

// Create table body
for (let i = 0; i < daySelect.options.length; i++) {
  const day = daySelect.options[i].value;
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = day;
  tr.appendChild(th);
  for (let j = 0; j < timeSlotSelect.options.length; j++) {
    const timeSlot = timeSlotSelect.options[j].value;
    const td = document.createElement("td");
    td.setAttribute("data-day", day);
    td.setAttribute("data-time", timeSlot);
    tr.appendChild(td);
    if (j === 2) {
      // Add empty break column at 3rd position (0-indexed)
      const breakTd = document.createElement("td");
      tr.appendChild(breakTd);
    }
  }
  table.appendChild(tr);
}

document.body.appendChild(table);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const day = daySelect.value;
  const timeSlot = timeSlotSelect.value;
  const instructor = instructorSelect.value;
  const course = courseSelect.value;

  const td = table.querySelector(
    `[data-day='${day}'][data-time='${timeSlot}']`
  );
  td.innerHTML = `${course} <br> ${instructor}`;
  form.reset();
});
