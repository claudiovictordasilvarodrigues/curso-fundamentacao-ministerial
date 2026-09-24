// =========================================
// FORMULÁRIO DE INSCRIÇÃO
// =========================================

const form = document.getElementById("registrationForm");

const steps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");

const nextButtons = document.querySelectorAll(".next-step");
const prevButtons = document.querySelectorAll(".prev-step");

const situacaoRadios = document.querySelectorAll(
    'input[name="situacao"]'
);

const campoAfastamento =
    document.getElementById("campoAfastamento");

const tempoAfastada =
    document.getElementById("tempoAfastada");

let currentStep = 1;


// =========================================
// INICIALIZAÇÃO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    showStep(1);

    setupInputFormatting();

});


// =========================================
// MOSTRAR ETAPA
// =========================================

function showStep(stepNumber) {

    currentStep = stepNumber;

    steps.forEach((step) => {

        step.classList.remove("active");

    });


    const activeStep = document.querySelector(
        `.form-step[data-step="${stepNumber}"]`
    );


    if (activeStep) {

        activeStep.classList.add("active");

    }


    // Atualiza os indicadores

    stepIndicators.forEach((indicator, index) => {

        const indicatorNumber = index + 1;

        indicator.classList.toggle(
            "active",
            indicatorNumber === stepNumber
        );

    });


    // Scroll para o início do formulário

    document
        .getElementById("inscricao")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


// =========================================
// CRIAR MENSAGEM DE ERRO
// =========================================

function showError(field, message) {

    clearError(field);


    field.classList.add("input-error");


    const error = document.createElement("small");

    error.className = "field-error";

    error.textContent = message;


    field.parentElement.appendChild(error);

}


// =========================================
// REMOVER ERRO
// =========================================

function clearError(field) {

    field.classList.remove("input-error");


    const existingError =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (existingError) {

        existingError.remove();

    }

}


// =========================================
// VALIDAR EMAIL
// =========================================

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


// =========================================
// VALIDAR TELEFONE
// =========================================

function validatePhone(phone) {

    const numbers =
        phone.replace(/\D/g, "");

    return (
        numbers.length === 10 ||
        numbers.length === 11
    );

}


// =========================================
// VALIDAR DATA
// =========================================

function validateBirthDate(date) {

    if (!date) {
        return false;
    }


    const birthDate =
        new Date(date);

    const today =
        new Date();


    if (birthDate > today) {
        return false;
    }


    // Impede datas muito antigas
    const minimumYear =
        today.getFullYear() - 120;


    if (
        birthDate.getFullYear() <
        minimumYear
    ) {
        return false;
    }


    return true;

}


// =========================================
// VALIDAR ETAPA 1
// =========================================

function validateStep1() {

    let valid = true;


    const nome =
        document.getElementById("nome");


    const nascimento =
        document.getElementById("nascimento");


    const whatsapp =
        document.getElementById("whatsapp");


    const email =
        document.getElementById("email");


    // Nome

    if (nome.value.trim().length < 5) {

        showError(
            nome,
            "Digite seu nome completo."
        );

        valid = false;

    } else {

        clearError(nome);

    }


    // Data

    if (!validateBirthDate(nascimento.value)) {

        showError(
            nascimento,
            "Informe uma data de nascimento válida."
        );

        valid = false;

    } else {

        clearError(nascimento);

    }


    // WhatsApp

    if (!validatePhone(whatsapp.value)) {

        showError(
            whatsapp,
            "Informe um número de WhatsApp válido."
        );

        valid = false;

    } else {

        clearError(whatsapp);

    }


    // Email

    if (!validateEmail(email.value.trim())) {

        showError(
            email,
            "Informe um e-mail válido."
        );

        valid = false;

    } else {

        clearError(email);

    }


    return valid;

}


// =========================================
// VALIDAR ETAPA 2
// =========================================

function validateStep2() {

    let valid = true;


    // Situação

    const situacao =
        document.querySelector(
            'input[name="situacao"]:checked'
        );


    if (!situacao) {

        showGroupError(
            "situacao",
            "Selecione uma opção."
        );

        valid = false;

    } else {

        clearGroupError("situacao");

    }


    // Campo condicional "tempo afastada"

    if (
        situacao &&
        situacao.value === "afastada" &&
        tempoAfastada.value.trim().length === 0
    ) {

        showError(
            tempoAfastada,
            "Informe há quanto tempo você está afastada."
        );

        valid = false;

    } else if (tempoAfastada) {

        clearError(tempoAfastada);

    }


    // Dom

    const dom =
        document.querySelector(
            'input[name="dom"]:checked'
        );


    if (!dom) {

        showGroupError(
            "dom",
            "Selecione uma opção."
        );

        valid = false;

    } else {

        clearGroupError("dom");

    }


    // Objetivo

    const objetivo =
        document.getElementById("objetivo");


    if (objetivo.value.trim().length === 0) {

        showError(
            objetivo,
            "Conte um pouco sobre o que deseja viver no curso."
        );

        valid = false;

    } else {

        clearError(objetivo);

    }


    return valid;

}


// =========================================
// VALIDAR ETAPA 3
// =========================================

function validateStep3() {

    const turno =
        document.querySelector(
            'input[name="turno"]:checked'
        );


    if (!turno) {

        showGroupError(
            "turno",
            "Escolha um turno para continuar."
        );

        return false;

    }


    clearGroupError("turno");

    return true;

}


// =========================================
// VALIDAR ETAPA 4
// =========================================

function validateStep4() {

    const compromisso =
        document.getElementById(
            "compromisso"
        );


    if (!compromisso.checked) {

        showError(
            compromisso,
            "Você precisa aceitar o termo de compromisso."
        );

        return false;

    }


    clearError(compromisso);

    return true;

}


// =========================================
// VALIDAR ETAPA ATUAL
// =========================================

function validateCurrentStep() {

    switch (currentStep) {

        case 1:
            return validateStep1();

        case 2:
            return validateStep2();

        case 3:
            return validateStep3();

        case 4:
            return validateStep4();

        default:
            return false;

    }

}


// =========================================
// ERRO PARA GRUPOS DE RADIO
// =========================================
//
// CORREÇÃO: antes disso usava apenas
// firstRadio.closest(".form-group"), que
// retornava null para o grupo "turno"
// (essas cards não têm um ancestral com
// a classe .form-group), e o appendChild
// seguinte lançava um erro não tratado,
// travando o botão "Continuar" no meio
// do clique.
//
// Agora buscamos o melhor container
// disponível, com fallback em cascata,
// e nunca quebramos o script.
// =========================================

function getGroupContainer(firstRadio) {

    return (
        firstRadio.closest(".form-group") ||
        firstRadio.closest(".turno-grid") ||
        firstRadio.closest("fieldset") ||
        firstRadio.parentElement
    );

}


function showGroupError(
    groupName,
    message
) {

    clearGroupError(groupName);


    const firstRadio =
        document.querySelector(
            `input[name="${groupName}"]`
        );


    if (!firstRadio) {
        return;
    }


    const group =
        getGroupContainer(firstRadio);


    if (!group) {
        return;
    }


    const error =
        document.createElement("small");


    error.className =
        "field-error group-error";


    error.textContent =
        message;


    group.appendChild(error);

}


// =========================================
// LIMPAR ERRO DO GRUPO
// =========================================

function clearGroupError(groupName) {

    const firstRadio =
        document.querySelector(
            `input[name="${groupName}"]`
        );


    if (!firstRadio) {
        return;
    }


    const group =
        getGroupContainer(firstRadio);


    if (!group) {
        return;
    }


    const error =
        group.querySelector(
            ".group-error"
        );


    if (error) {
        error.remove();
    }

}


// =========================================
// BOTÕES CONTINUAR
// =========================================

nextButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            if (
                !validateCurrentStep()
            ) {
                return;
            }


            if (
                currentStep <
                steps.length
            ) {

                showStep(
                    currentStep + 1
                );

            }

        }
    );

});


// =========================================
// BOTÕES VOLTAR
// =========================================

prevButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            if (currentStep > 1) {

                showStep(
                    currentStep - 1
                );

            }

        }
    );

});


// =========================================
// SITUAÇÃO MINISTERIAL
// =========================================

situacaoRadios.forEach((radio) => {

    radio.addEventListener(
        "change",
        () => {

            clearGroupError(
                "situacao"
            );


            if (
                radio.value ===
                "afastada" &&
                radio.checked
            ) {

                campoAfastamento.hidden =
                    false;

            } else {

                campoAfastamento.hidden =
                    true;

                tempoAfastada.value =
                    "";

                clearError(tempoAfastada);

            }

        }
    );

});


// =========================================
// LIMPAR ERROS AO DIGITAR
// =========================================

const textInputs =
    form.querySelectorAll(
        "input, textarea"
    );


textInputs.forEach((input) => {

    input.addEventListener(
        "input",
        () => {

            clearError(input);

        }
    );

});


// =========================================
// LIMPAR ERRO AO ESCOLHER TURNO
// =========================================

const turnoRadios =
    document.querySelectorAll(
        'input[name="turno"]'
    );


turnoRadios.forEach((radio) => {

    radio.addEventListener(
        "change",
        () => {

            clearGroupError("turno");

        }
    );

});


// =========================================
// LIMPAR ERRO AO ESCOLHER DOM
// =========================================

const domRadios =
    document.querySelectorAll(
        'input[name="dom"]'
    );


domRadios.forEach((radio) => {

    radio.addEventListener(
        "change",
        () => {

            clearGroupError("dom");

        }
    );

});


// =========================================
// FORMATAÇÃO DO WHATSAPP
// =========================================

function setupInputFormatting() {

    const whatsapp =
        document.getElementById(
            "whatsapp"
        );


    whatsapp.addEventListener(
        "input",
        () => {

            let value =
                whatsapp.value.replace(
                    /\D/g,
                    ""
                );


            if (value.length > 11) {

                value =
                    value.substring(
                        0,
                        11
                    );

            }


            if (value.length <= 10) {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                value =
                    value.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                value =
                    value.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );

            }


            whatsapp.value =
                value;

        }
    );

}


// =========================================
// ENVIO DO FORMULÁRIO
// =========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYndQN4ukCgEoGsmqQizIrpfSSH-8oBAQZIG_wedlYdSYXlQ3i5BrESr5o4vqyZ1AJ/exec";


form.addEventListener("submit", async event => {

    event.preventDefault();


    // =========================================
    // VALIDAÇÃO FINAL
    // =========================================

    if (!validateStep4()) {
        return;
    }


    if (!validateStep1()) {
        showStep(1);
        return;
    }


    if (!validateStep2()) {
        showStep(2);
        return;
    }


    if (!validateStep3()) {
        showStep(3);
        return;
    }


    // =========================================
    // COLETAR DADOS
    // =========================================

    const situacao =
        document.querySelector(
            'input[name="situacao"]:checked'
        );


    const dom =
        document.querySelector(
            'input[name="dom"]:checked'
        );


    const turno =
        document.querySelector(
            'input[name="turno"]:checked'
        );


    const compromisso =
        document.getElementById(
            "compromisso"
        );


    const dados = {

        nome:
            document.getElementById("nome").value.trim(),

        nascimento:
            document.getElementById("nascimento").value,

        whatsapp:
            document.getElementById("whatsapp").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        situacao:
            situacao ? situacao.value : "",

        tempo_afastada:
            document.getElementById("tempoAfastada").value.trim(),

        dom:
            dom ? dom.value : "",

        objetivo:
            document.getElementById("objetivo").value.trim(),

        turno:
            turno ? turno.value : "",

        compromisso:
            compromisso.checked ? "sim" : ""

    };


    // =========================================
    // ENVIAR PARA O GOOGLE APPS SCRIPT
    // =========================================

    try {

        const resposta =
            await fetch(SCRIPT_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(dados)

            });


        const resultado =
            await resposta.json();


        // =====================================
        // VERIFICAR RESPOSTA DO BACKEND
        // =====================================

        if (resultado.sucesso) {

            window.location.href =
                "confirmacao.html";

        } else {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar a inscrição."
            );

        }

    } catch (erro) {

        console.error(
            "Erro ao enviar inscrição:",
            erro
        );


        alert(
            "Não foi possível conectar ao servidor. " +
            "Verifique sua conexão e tente novamente."
        );

    }

});