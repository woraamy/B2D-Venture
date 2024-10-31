document.addEventListener("DOMContentLoaded", function () {
    // Handle modal opening and closing
    document.querySelectorAll("[data-modal-target]").forEach((button) => {
      const modalTarget = button.getAttribute("data-modal-target");
      const modal = document.getElementById(modalTarget);
  
      button.addEventListener("click", () => {
        modal.classList.remove("hidden");
      });
  
      modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });
  
    // Handle form submissions
    const editForm = document.getElementById("editForm");
    const createForm = document.getElementById("createForm");
  
    editForm?.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(editForm);
      const response = await fetch("/api/edit-campaign", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Campaign updated successfully!");
      } else {
        alert("Error updating campaign.");
      }
    });
  
    createForm?.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(createForm);
      const response = await fetch("/api/create-campaign", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Campaign created successfully!");
      } else {
        alert("Error creating campaign.");
      }
    });
  });
  