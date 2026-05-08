const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ================= ENQUIRY =================
export const postEnquiry = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/enquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit enquiry");
  }

  return res.json();
};

// ================= PRODUCTS =================
export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};