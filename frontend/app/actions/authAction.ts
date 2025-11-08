export async function userSignUp(previousState: unknown, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    name,
    email,
    password,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log(data);
}
