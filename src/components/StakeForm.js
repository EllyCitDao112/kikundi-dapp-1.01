
export function StakeForm() {
  const form = document.createElement('div');
  form.innerHTML = '<input type="number" placeholder="Amount"> <button>Stake</button>';
  document.body.appendChild(form);
}
