import "./css/style.scss";

/**
 * Create an element and add it to the DOM
 * makeEl("type", parent, [["property","value"], ["property","value"], etc], before);
 * @param {string} type required
 * @param {var} parent required
 * @param {array} properties optional
 * @param {var} before optional
 */
function makeEl(type, parent, properties, before) {
  const el = document.createElement(type);
  if (
    properties !== undefined &&
    properties !== null &&
    properties.length > 0
  ) {
    for (let i = 0; i < properties.length; i++) {
      el[properties[i][0]] = properties[i][1];
    }
  }
  if (before !== undefined && before !== null) {
    parent.insertBefore(el, before);
  } else {
    parent.appendChild(el);
  }
  return el;
}

class Skills {
  constructor(skills, parent) {
    this.skills = skills;
    this.parent = parent;
    this.display(this.parent);
  }

  display(parent) {
    const wrapper = makeEl("div", parent, [["classList", "skill-wrapper"]]);
    this.skills.forEach((skill) => {
      const skillBlock = makeEl("div", wrapper, [["classList", "skill"]]);
      const skillLevel = makeEl("div", skillBlock, [
        ["classList", "skill-level"],
      ]);
      skillLevel.style.width = `${skill.level}%`;
      makeEl("p", skillBlock, [
        ["classList", "skill-label"],
        ["textContent", skill.name],
      ]);
    });
  }
}

class Form {
  constructor(id) {
    this.dom = document.getElementById(id);
    this.inputs = Array.from(
      document.querySelectorAll("#" + id + " input")
    ).concat(Array.from(document.querySelectorAll("#" + id + " textarea")));
    this.initListeners();
  }
  checkInputValidity(input) {
    if (!input.validity.valid) {
      let errorMessage;
      if (input.validity.typeMismatch) {
        errorMessage = "Invalid " + input.type;
      } else if (input.validity.valueMissing) {
        errorMessage = input.id + " cannot be empty";
        errorMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);
      }
      input.classList.add("error");
      input.nextElementSibling.textContent = errorMessage;
    } else {
      input.classList.remove("error");
      input.nextElementSibling.textContent = "";
    }
  }
  async submitForm() {
    let formContent = {};
    this.inputs.forEach((input) => {
      formContent[`${input.id}`] = input.value;
    });
    fetch("message.php", {
      method: "POST",
      body: JSON.stringify(formContent),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json.messageSent;
      });
  }
  checkForm() {
    this.inputs.forEach((input) => {
      this.checkInputValidity(input);
    });
    let errors = document.querySelectorAll(".error");
    if (errors.length == 0) {
      let submitted = this.submitForm();
      if (submitted) {
        this.dom.replaceChildren();
        makeEl("div", this.dom, [
          ["id", "contactFormSent"],
          ["textContent", "Message sent"],
        ]);
      }
    }
  }
  initListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
      });
    });

    this.dom.addEventListener("submit", (event) => {
      event.preventDefault();
      this.checkForm();
    });
  }
}

let skills = [
  { name: "html5", level: 98 },
  { name: "css3", level: 94 },
  { name: "sass", level: 60 },
  { name: "js", level: 70 },
  { name: "php", level: 70 },
];

new Skills(skills, document.getElementById("aboutSkills"));
const form = new Form("contactForm");
