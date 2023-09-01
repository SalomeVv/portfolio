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

class Projects {
  constructor(projects, parent) {
    this.projects = projects;
    this.parent = parent;
    this.display(this.parent);
    this.initListeners();
  }

  display(parent) {
    const wrapper = makeEl("div", parent, [["classList", "wrapper"]]);
    this.projects.forEach((project, i) => {
      const bg = [
        "src/assets/images/m51_edit_b_noBG_100.png",
        "src/assets/images/440676main_STScI-2007-04a-full_full_edit_b_noBG_100.png",
        "src/assets/images/pexels-robert-gruszecki-9956995_edit_b_noBG_100.png",
        "src/assets/images/pexels-jeremy-muller-6444367-edit_b_noBG_100.png",
      ];
      const projectBlock = makeEl("div", wrapper, [["classList", "project"]]);
      makeEl("img", projectBlock, [
        ["classList", "project-img"],
        ["src", project.img[0]],
        ["alt", `${project.name} Screenshot`],
      ]);
      const title = makeEl("h4", projectBlock, [["textContent", project.name]]);
      const button = makeEl("button", projectBlock, [
        ["classList", "more-button"],
        ["textContent", "<"],
      ]);
      title.style.backgroundImage =
        button.style.backgroundImage = `url(${project.img[0]})`;
      const projectMore = makeEl("div", projectBlock, [
        ["classList", "project-more"],
      ]);
      makeEl("p", projectMore, [["textContent", project.desc]]);
      makeEl("a", projectMore, [
        ["classList", "project-link icon"],
        ["href", project.link],
      ]);
      makeEl("a", projectMore, [
        ["classList", "project-github icon"],
        ["href", project.github],
      ]);
      let bg_i = i % bg.length;
      projectBlock.style.backgroundImage = `url(${bg[bg_i]})`;
    });
  }
  initListeners() {
    const projectsDom = document.querySelectorAll(".project");
    projectsDom.forEach((project) => {
      const moreButton = project.querySelector(".more-button");
      moreButton.addEventListener("click", () => {
        if (!project.className.includes("more")) {
          project.classList.add("more");
          moreButton.textContent = ">";
        } else {
          project.classList.remove("more");
          moreButton.textContent = "<";
        }
      });
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
  async checkForm() {
    this.inputs.forEach((input) => {
      this.checkInputValidity(input);
    });
    let errors = document.querySelectorAll(".error");
    if (errors.length == 0) {
      let submitted = await this.submitForm();
      console.log("submitted ", submitted);
      // if (submitted) {
      this.dom.replaceChildren();
      makeEl("div", this.dom, [
        ["id", "contactFormSent"],
        ["textContent", "Message sent"],
      ]);
      // }
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
let projects = [
  {
    name: "Age Calculator",
    img: ["src/assets/images/project_age_calculator_screen.png"],
    desc: "",
    github: "",
    link: "",
  },
  {
    name: "Dictionary",
    img: [
      "src/assets/images/project_dictionary_light_screen.png",
      "src/assets/images/project_dictionary_dark_screen.png",
    ],
    desc: "",
    github: "",
    link: "",
  },
  {
    name: "Weather App",
    img: ["src/assets/images/project_weather_app_home_screen.png"],
    desc: "",
    github: "",
    link: "",
  },
];

new Skills(skills, document.getElementById("aboutSkills"));
new Projects(projects, document.getElementById("projects"));
new Form("contactForm");

document.querySelector(".light-switch").addEventListener("click", () => {
  const projects = document.querySelectorAll(".project");
  if (!document.documentElement.classList.contains("light")) {
    document.documentElement.classList.add("light");
    projects.forEach((project) => {
      project.style.backgroundSize = "0%";
    });
  } else {
    document.documentElement.classList.remove("light");
    projects.forEach((project) => {
      project.style.backgroundSize = "cover";
    });
  }
});
