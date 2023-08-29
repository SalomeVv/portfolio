import './css/style.scss';

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
        const wrapper = makeEl("div", parent, [["classList","skill-wrapper"]]);
        this.skills.forEach(skill => {
            const skillBlock = makeEl("div", wrapper, [["classList", "skill"]]);
            const skillLevel = makeEl("div", skillBlock, [["classList", "skill-level"]]);
            skillLevel.style.width = `${skill.level}%`;
            makeEl("p", skillBlock, [["classList", "skill-label"], ["textContent", skill.name]]);
        })
    }
}

let skills =[{name: "html5", level:98}, {name: "css3", level:94}, {name: "sass", level:60}, {name: "js", level:70}, {name: "php", level:70}];
new Skills(skills, document.getElementById("aboutSkills"));