// Máscara dinâmica de telefone/WhatsApp
const phoneInput = document.getElementById('leadPhone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 6) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length > 2) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            e.target.value = value;
        }
    });
}

// Envio do formulário com redirecionamento amigável para o WhatsApp comercial
function handleLeadSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('leadName').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const goal = document.getElementById('leadGoal').value;
    const alertBox = document.getElementById('formSuccessAlert');
    const submitBtn = document.getElementById('submitBtn');

    if (!name || !phone || !goal) return;

    // Feedback visual imediato
    submitBtn.innerHTML = '<span>Enviando solicitação...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        alertBox.style.display = 'block';
        submitBtn.innerHTML = '<span>Aula Agendada com Sucesso!</span>';
        
        // Monta o link para o WhatsApp oficial com a mensagem pré-preenchida
        const cleanPhone = phone.replace(/\D/g, '');
        const message = encodeURIComponent(`Olá equipe Iron House! Meu nome é ${name}, meu objetivo é "${goal}" e acabei de agendar minha Aula Experimental Gratuita pelo site.`);
        const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;

        // Redireciona o lead diretamente para fechar no WhatsApp após 1.2 segundos
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1200);
    }, 700);
}

document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.querySelector("#cookie-banner")
    const btnAcceptCookie = document.querySelector("#btn-accept-cookies")

    if(!localStorage.getItem("cookiesAceitos")) {
        cookieBanner.style.display = "flex"
    } else {
        cookieBanner.style.display = "none"
    }

    btnAcceptCookie.addEventListener("click", () => {
        localStorage.setItem("cookiesAceitos", "true")
        cookieBanner.style.display = "none"
    })
})