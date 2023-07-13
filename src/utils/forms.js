export function handleInputChange(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

export function handleKeyDown(event) {
  const allowedKeys = [
    8, 9, 13, 27, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 91, 92,
    93, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105
  ];
  if (!allowedKeys.includes(event.keyCode)) {
    event.preventDefault();
  }
}
