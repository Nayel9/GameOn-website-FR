// Cette fonction est utilisée pour modifier la navigation.
// Elle vérifie si l'élément avec l'ID "myTopnav" a la classe "topnav".
// Si c'est le cas, elle ajoute "responsive" à la classe,
// sinon elle réinitialise la classe à "topnav".
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
// const formData = document.querySelectorAll(".formData")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

//  Cette fonction est utilisée pour afficher la fenêtre modale.
//  Elle modifie la propriété CSS "display" de modalbg à "block",
//  ce qui rend l'élément visible.
function launchModal() {
  modalbg.style.display = "block"
}

// close modal form
let closebtn = document.querySelector(" .close")
closebtn.addEventListener("click", closeModal)

//Cette fonction est utilisée pour fermer la fenêtre modale.
// Elle modifie la propriété CSS "display" de modalbg à "none",
// ce qui rend l'élément invisible.
function closeModal() {
  modalbg.style.display = "none"
}

//Cette fonction est utilisée pour réinitialiser et fermer la fenêtre modale.
// Elle appelle closeModal et réinitialise le formulaire.
function resetCloseModal() {
  modalbg.style.display = "none"
  document.querySelector(".modal-body").style.display = "block"
  document.querySelector(".modal-body--over").style.display = "none"
  // Sélectionner le formulaire et réinitialiser tous les champs
  let form = document.querySelector("form")
  form.reset()
}
let closeform = document.querySelector(" .btn-close")
closeform.addEventListener("click", resetCloseModal)

//Cette fonction est utilisée pour afficher un message d'erreur.
// Elle prend en paramètre un message et un identifiant d'élément,
// crée un nouvel élément span, lui attribue le message d'erreur et
// l'ajoute à l'élément avec l'identifiant spécifié.
    function afficherMessageErreur(message, elementId) {
  let spanErreurMessage = document.getElementById("erreurMessage-" + elementId)
  let element = document.getElementById(elementId)
  if (!spanErreurMessage) { // Si le message d'erreur n'existe pas, le crée
    spanErreurMessage = document.createElement("span")// Crée un nouvel élément span
    spanErreurMessage.id = "erreurMessage-" + elementId// Attribue un identifiant unique à l'élément span
    if (elementId === "checkbox1") {// Verifie si l'element est la checkbox1
      let label = document.querySelector(`label[for=${elementId}]`)
      label.style.display = "block" // Force le label à prendre toute la width du parent ce qui permet de passer à la ligne
      label.insertAdjacentElement('afterend', spanErreurMessage)// Insère le message d'erreur juste apres la checkbox au lieu de la fin de la balise formdata
    }else if (elementId === "radio") { // Verifie si l'element est radio
      let formDataRadio = document.getElementById("radio")
      formDataRadio.style.display = "block"
      formDataRadio.insertAdjacentElement('afterend', spanErreurMessage)// Insère le message d'erreur à la fin de la div "formData" pour le radio
    }else {
      element.parentElement.append(spanErreurMessage)// Insère le message d'erreur à la fin de l'élément parent
    }
  }
  spanErreurMessage.innerText = message // Attribue le message d'erreur à l'élément span
  spanErreurMessage.style.color = "#fe142f" // Change la couleur du texte du message d'erreur en rouge
  spanErreurMessage.style.fontSize = "12px" // Change la taille de la police du message d'erreur en 12px

  // Change la bordure de l'élément en rouge avec une largeur de 2px
  element.style.borderColor = "#fe142f"
  element.style.borderWidth = "2px"
}

//Cette fonction est utilisée pour supprimer un message d'erreur.
// Elle prend en paramètre un identifiant d'élément,
// trouve l'élément avec cet identifiant et le supprime.
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

//Cette fonction est utilisée pour valider le prénom.
// Elle supprime tout message d'erreur précédent et
// vérifie si la longueur du prénom est inférieure à 2.
// Si c'est le cas, elle lance une exception avec un message d'erreur.
function validateFirstName(prenom) {
  removeErrorMessage("first")
  if (prenom.length < 2) {
    throw { message: "Merci de saisir un Prénom valide. ", elementId: "first"}
  }
}

//Cette fonction est utilisée pour valider le nom.
// Elle supprime tout message d'erreur précédent et
// vérifie si la longueur du prénom est inférieure à 2.
// Si c'est le cas, elle lance une exception avec un message d'erreur.
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
  let selectedDate = new Date(date)// Crée un objet Date à partir de la date de naissance
  let currentDate = new Date()// Crée un objet Date à partir de la date actuelle

  // Enlève l'heure de la date pour ne comparer que la date
  selectedDate.setHours(0,0,0,0)
  currentDate.setHours(0,0,0,0)

  // Calcule l'âge
  let age = currentDate.getFullYear() - selectedDate.getFullYear()// Calcule l'année
  let m = currentDate.getMonth() - selectedDate.getMonth()// Calcule le mois
  //Cette condition vérifie si l'utilisateur a déjà eu son anniversaire cette année.
  // Si le mois actuel est inférieur au mois de naissance (m < 0) ou
  // si le mois actuel est le même que le mois de naissance mais que le jour actuel est inférieur au jour de naissance,
  // alors l'utilisateur n'a pas encore eu son anniversaire cette année et l'âge est décrémenté de 1
  if (m < 0 || (m === 0 && currentDate.getDate() < selectedDate.getDate())) {
    age--//Décrémente l'âge de 1
  }
  //Cette condition vérifie si la date de naissance entrée par l'utilisateur est valide.
  // Si la date de naissance est dans le futur ou si aucun date n'a été entrée,
  // une exception est lancée avec un message d'erreur indiquant que l'utilisateur doit entrer une date de naissance valide.
  if (selectedDate > currentDate || date === "") {
    throw { message: "Merci de saisir une date de naissance valide. ", elementId: "birthdate"}
  //Cette condition vérifie si l'utilisateur a au moins 18 ans.
  // Si l'âge calculé est inférieur à 18 (age < 18),
  // une exception est lancée avec un message d'erreur indiquant que l'utilisateur doit avoir au moins 18 ans.
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

// Gestion de l'événement submit sur le formulaire de contact.
//Cette ligne ajoute un écouteur d'événements à l'événement "submit". Lorsque le formulaire est soumis,
// la fonction anonyme est appelée.
addEventListener("submit", (event) => {
  event.preventDefault()
    // Cette ligne appelle la fonction gererFormulaire() qui effectue des validations sur les données du formulaire
  // et renvoie un tableau d'erreurs. Si le tableau est vide, cela signifie qu'il n'y a pas d'erreurs.
  let errors = gererFormulaire()

  // Cette partie du code crée un objet JavaScript pour stocker les données du formulaire.
  // Chaque propriété de l'objet correspond à un champ du formulaire.
  let formulaireData = {
    prenom: document.getElementById("first").value,
    nom: document.getElementById("last").value,
    email: document.getElementById("email").value,
    date: document.getElementById("birthdate").value,
    quantityValue: document.getElementById("quantity").value,
    radioValue: document.querySelector("input[type=radio]:checked").value,
    requiredCheckbox: document.getElementById("checkbox1").checked
  }

  // Cette ligne convertit l'objet JavaScript en une chaîne JSON pour un stockage facile.
  let formulaireDataJson = JSON.stringify(formulaireData)

  // Cette ligne stocke la chaîne JSON dans le stockage local du navigateur.
  // Cela permet de conserver les données du formulaire même si l'utilisateur ferme le navigateur.
  localStorage.setItem("formulaireData", formulaireDataJson)

  // Cette ligne affiche la chaîne JSON dans la console pour vérification.
  console.log(formulaireDataJson)

  //Cette condition vérifie si le tableau d'erreurs est vide.
  // Si c'est le cas, cela signifie que toutes les validations ont réussi et
  // le code à l'intérieur du bloc if est exécuté.
  // Ce code modifie les propriétés CSS "display" de certains éléments div pour afficher ou cacher certaines parties de l'interface utilisateur.
  if (errors.length === 0) {
    // Modifier les propriétés CSS "display" des éléments div concernés
    document.querySelector(".modal-body").style.display = "none"
    document.querySelector(".modal-body--over").style.display = "flex"
  }
})
// Cette fonction est utilisée pour gérer le formulaire.
// Elle récupère les valeurs de chaque champ du formulaire,
// effectue des validations sur ces valeurs et renvoie un tableau d'erreurs.
// Si une validation échoue, une erreur est ajoutée au tableau.
// Si toutes les validations réussissent, le tableau d'erreurs est vide.
function gererFormulaire() {
  let prenom = document.getElementById("first").value
  let nom = document.getElementById("last").value
  let email = document.getElementById("email").value
  let date = document.getElementById("birthdate").value
  let quantityValue = document.getElementById("quantity").value
  let listeBtnRadio = document.querySelectorAll("input[type=radio]")
  let requiredCheckbox = document.getElementById("checkbox1")
  let radioValue = ""; // Initialise radioValue à une chaîne vide
  for (let i = 0; i < listeBtnRadio.length; i++) {
    if (listeBtnRadio[i].checked) {
      radioValue = listeBtnRadio[i].value
      break
    }
  }
  let errors = []// Créer un tableau pour stocker toutes les erreurs

// Validation de chaque champ du formulaire

  try {// Essaie de valider le prénom
    validateFirstName(prenom)// Appelle la fonction validateFirstName() pour valider le prénom
  } catch(erreur) {// Si une erreur est lancée, elle est capturée ici
    errors.push(erreur)// Ajoute l'erreur au tableau des erreurs
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

  // Cette partie du code est utilisée pour
  // afficher tous les messages d'erreur qui ont été générés lors de la validation du formulaire.
  errors.forEach(erreur => {//Pour chaque erreur, elle exécute la fonction afficherMessageErreur.
    afficherMessageErreur(erreur.message, erreur.elementId)
  })
  //Cette ligne renvoie le tableau errors.
  // Cela permet à la fonction qui a appelé gererFormulaire de savoir
  // quelles erreurs se sont produites lors de la validation du formulaire.
  return errors
}
