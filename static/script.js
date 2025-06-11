let encryptedText = "";

// Enkripsi
async function encrypt() {
  const plaintext = document.getElementById("plaintext").value;
  if (!plaintext.trim()) {
    alert("Silakan masukkan plaintext terlebih dahulu!");
    return;
  }

  const response = await fetch("/encrypt", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({plaintext})
  });

  const data = await response.json();
  showResult("asciiDisplay", data.ascii.join(' '));
  showResult("encryptedDisplay", data.encrypted);
  encryptedText = data.encrypted;
}

// Dekripsi
async function decrypt() {
  if (!encryptedText) {
    alert("Belum ada data terenkripsi!");
    return;
  }

  const response = await fetch("/decrypt", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({encrypted: encryptedText})
  });

  const data = await response.json();
  showResult("asciiToPlaintext", `ASCII: ${data.ascii.join(' ')}\nPlaintext: ${data.plaintext}`);
}

// Tampilkan dengan animasi
function showResult(id, text) {
  const el = document.getElementById(id);
  el.classList.remove("show");
  setTimeout(() => {
    el.innerText = text;
    el.classList.add("show");
  }, 100);
}

// Reset semua kolom
function resetAll() {
  document.getElementById("plaintext").value = "";
  ["asciiDisplay", "encryptedDisplay", "asciiToPlaintext"].forEach(id => {
    const el = document.getElementById(id);
    el.innerText = "";
    el.classList.remove("show");
  });
  encryptedText = "";
}

// Toggle dark mode
function toggleDarkMode() {
  document.getElementById("body").classList.toggle("dark-mode");
}
