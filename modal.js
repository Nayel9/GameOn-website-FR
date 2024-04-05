// Fonction pour modifier la navigation
function editNav() {
  let x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// close modal form
let closebtn = document.querySelector(" .close")
closebtn.addEventListener("click", closeModal)
function closeModal() {
  modalbg.style.display = "none"
}

function afficherMessageErreur(message, elementId) {
  let spanErreurMessage = document.getElementById("erreurMessage-" + elementId)
  let element = document.getElementById(elementId)
  if (!spanErreurMessage) {
    let element = document.getElementById(elementId)
    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id = "erreurMessage-" + elementId
    // Insère le message d'erreur juste apres la checkbox au lieu de la fin de la balise formdata
    if (elementId === "checkbox1") {
      let label = document.querySelector(`label[for=${elementId}]`)
      label.style.display = "block" // Force le label à prendre toute la width du parent ce qui permet de passer à la ligne
      label.insertAdjacentElement('afterend', spanErreurMessage)
    } else {
      element.parentElement.append(spanErreurMessage)
    }
  }
  spanErreurMessage.innerText = message
  spanErreurMessage.style.color = "#fe142f" // Change la couleur du texte du message d'erreur en rouge
  spanErreurMessage.style.fontSize = "12px" // Change la taille de la police du message d'erreur en 12px

  // Change la bordure de l'élément en rouge avec une largeur de 2px
  element.style.borderColor = "#fe142f"
  element.style.borderWidth = "2px"
}

//Fonction pour supprimer le message d'erreur
function removeErrorMessage(elementId) {
  let element = document.getElementById(elementId)
  let spanErreurMessage = document.getElementById("erreurMessage-" + elementId)
  if (spanErreurMessage) {
    spanErreurMessage.remove()
  }
  // Réinitialise la bordure de l'élément à son état d'origine
  element.style.borderColor = ""
  element.style.borderWidth = ""
}
// Fonctions de validation pour chaque champ du formulaire
function validateFirstName(prenom) {
  removeErrorMessage("first")
  if (prenom.length < 2) {
    throw { message: "Merci de saisir un Prénom valide. ", elementId: "first"}
  }
}

function validateLastName(nom) {
  removeErrorMessage("last")
  if (nom.length < 2) {
    throw { message: "Merci de saisir un Nom valide. ", elementId: "last"}
  }
}

function validateEmail(email) {
  removeErrorMessage("email")
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw { message: "Merci de saisir un email valide. ", elementId: "email"}
  }
}

function validateBirthdate(date) {
  removeErrorMessage("birthdate")
  let selectedDate = new Date(date)
  let currentDate = new Date()

  // Enlève l'heure de la date pour ne comparer que la date
  selectedDate.setHours(0,0,0,0)
  currentDate.setHours(0,0,0,0)

  // Calcule l'âge
  let age = currentDate.getFullYear() - selectedDate.getFullYear()
  let m = currentDate.getMonth() - selectedDate.getMonth()
  if (m < 0 || (m === 0 && currentDate.getDate() < selectedDate.getDate())) {
    age--
  }

  if (selectedDate > currentDate || date === "") {
    throw { message: "Merci de saisir une date de naissance valide. ", elementId: "birthdate"}
  } else if (age < 18) {
    throw { message: "Vous devez avoir au moins 18 ans. ", elementId: "birthdate"}
  }
}

function validateQuantity(quantityValue) {
  removeErrorMessage("quantity")
  if (quantityValue === "") {
    throw { message: "Merci de saisir une quantité de tournois valide. ", elementId: "quantity"}
  }
}

function validateRadio(radioValue) {
  removeErrorMessage("radio")
  if (radioValue === "") {
    throw { message: "Merci de choisir une ville. ", elementId: "radio"}
  }
}

function validerCheckboxCgu(requiredCheckbox) {
  removeErrorMessage("checkbox1")
  if (requiredCheckbox.checked !== true) {
    throw { message: "Merci d'accepter les conditions générales d'utilisation", elementId: "checkbox1"}
  }
}

// Fonction pour gérer le formulaire
function gererFormulaire() {
  let prenom = document.getElementById("first").value
  let nom = document.getElementById("last").value
  let email = document.getElementById("email").value
  let date = document.getElementById("birthdate").value
  let quantityValue = document.getElementById("quantity").value
  let listeBtnRadio = document.querySelectorAll("input[type=radio]")
  let requiredCheckbox = document.getElementById("checkbox1")
  let radioValue
  for (let i = 0; i < listeBtnRadio.length; i++) {
    if (listeBtnRadio[i].checked) {
      radioValue = listeBtnRadio[i].value
      break
    }
  }

  // Créer un tableau pour stocker toutes les erreurs
  let errors = []

  try {
    validateFirstName(prenom)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validateLastName(nom)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validateEmail(email)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validateBirthdate(date)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validateQuantity(quantityValue)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validateRadio(radioValue)
  } catch(erreur) {
    errors.push(erreur)
  }

  try {
    validerCheckboxCgu(requiredCheckbox)
  } catch(erreur) {
    errors.push(erreur)
  }

  // Afficher tous les messages d'erreur
  errors.forEach(erreur => {
    afficherMessageErreur(erreur.message, erreur.elementId)
  })
}


// Gestion de l'événement submit sur le formulaire de contact.
addEventListener("submit", (event) => {
  event.preventDefault()
  gererFormulaire()
})