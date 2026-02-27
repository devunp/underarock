window.addEventListener("DOMContentLoaded", () => {
  const key = "underarock-visitor-count";
  const current = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(current));

  const countEl = document.getElementById("visitor-count");
  if (countEl) {
    countEl.textContent = String(current);
  }

  const updatedEl = document.getElementById("last-updated");
  if (updatedEl) {
    updatedEl.textContent = new Date().toLocaleDateString();
  }

  const orderForm = document.getElementById("order-form");
  const itemSelect = document.getElementById("order-item");
  const statusEl = document.getElementById("order-status");
  const params = new URLSearchParams(window.location.search);
  const requestedItem = params.get("item");

  if (itemSelect && requestedItem) {
    const optionExists = Array.from(itemSelect.options).some((opt) => opt.value === requestedItem);
    if (optionExists) {
      itemSelect.value = requestedItem;
    }
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(orderForm);
      const item = data.get("item");
      const size = data.get("size");
      const qty = data.get("qty");
      const name = data.get("name");
      const email = data.get("email");
      const notes = data.get("notes");

      const subject = encodeURIComponent(`Under A Rock order request: ${item}`);
      const body = encodeURIComponent(
        [
          "New order request",
          "",
          `Item: ${item}`,
          `Size: ${size}`,
          `Quantity: ${qty}`,
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Notes:",
          `${notes}`
        ].join("\n")
      );

      window.location.href = `mailto:orders@under-a-rock.org?subject=${subject}&body=${body}`;

      if (statusEl) {
        statusEl.textContent =
          "Mail app opened with your order draft. If it did not open, email orders@under-a-rock.org.";
      }
    });
  }
});
