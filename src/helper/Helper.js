export function formatCpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', options);
}

export const callSeller = (title, id) => {
  const phoneNumber = '551132229446'; // Coloque aqui o número com DDI (55), DDD (11), e o número (999999999)
  const message = `Olá, gostaria de saber mais sobre o produto ${title}, com id: ${id}.`;
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;
  window.open(url, '_blank'); // Abre em nova aba
};
