export const getUserId = () => {
  let storedUserId = localStorage.getItem("auth.user_id")
  if (storedUserId) {
    return storedUserId
  }

  let userId = crypto.randomUUID();
  localStorage.setItem("auth.user_id", userId);

  return userId;
}
