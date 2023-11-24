import { readdirSync, existsSync } from "fs";
import path from "path";
import autocompletePrompt from "inquirer-autocomplete-prompt";
import util from "util";
import * as childProcess from "child_process";
import { env } from "process";
const exec = util.promisify(childProcess.exec);

const { INSTALL_DIR, PWD } = env;
const pathPostfix = INSTALL_DIR || "packages";
const basePath = PWD || "/";
const compPath = path.resolve(basePath, pathPostfix);

const toKebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const isFileExists = (filePath) => {
  try {
    return existsSync(filePath);
  } catch (err) {
    console.error("isFileExists error:", err);
  }
  return false;
};

const getDirList = (path) => {
  return readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

const groupsList = getDirList(compPath);

const getComponentsList = (input) => {
  if (!input || input === "") return groupsList;
  return groupsList.filter((group) => group.includes(input));
};

const validateInput = (input) => {
  if (input && input !== "") {
    return /^[a-zA-Z.-]+$/.test(input);
  }
  return false;
};

const checkDuplicateComponent = (name) => {
  let message = "";
  const status = groupsList.some((group) => {
    const dirList = getDirList(`${compPath}/${group}`);
    if (dirList.includes(name)) {
      message = `duplicate component name ${name} at ${group}`;
      return true;
    }
  });
  return { status, message };
};

export default function Main (plop) {
  plop.setDefaultInclude({ helpers: true });

  plop.setPrompt("getGroup", autocompletePrompt);

  plop.setActionType("validateFields", function (answers, config, plop) {
    const { group, name } = answers || {};
    const nameValid = validateInput(name);
    const groupValid = validateInput(group);
    if (!nameValid || !groupValid) {
      throw new Error(
        `[${!nameValid && "component name"}${
          !groupValid && ", group name"
        }}] invalid` // can refer to a conventions url here once ready
      );
    }
    const { status, message } = checkDuplicateComponent(
      name
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase()
    );
    if (status) {
      throw new Error(message);
    }
    return "fields valid";
  });

  plop.setActionType("installDependencies", function (answers, config, plop) {
    const { name } = answers;
    console.log("installing dependencies");
    const foundationDev = `lerna add typescript --scope=@monorepo/${toKebabCase(
      name
    )} --dev`;
    return exec(`${foundationDev}`)
      .then(() => "dependencies installed successfully")
      .catch((err) => `error installing dependencies: ${err}`);
  });

  plop.setGenerator("component", {
    description: "Creating new react components",
    prompts: [
      {
        type: "getGroup",
        name: "group",
        message: "Choose component group",
        source: function (answersSoFar, input) {
          return getComponentsList(input);
        },
      },
      {
        type: "input",
        message: "Enter component name",
        name: "name",
      },
    ],
    actions: [
      {
        type: "validateFields",
      },
      {
        type: "add",
        templateFile: "templates/package.json.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/package.json`,
      },
      {
        type: "add",
        templateFile: "templates/tsconfig.json.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/tsconfig.json`,
      },
      {
        type: "add",
        templateFile: "templates/types.ts.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/src/types.ts`,
      },
      {
        type: "add",
        templateFile: "templates/styles.ts.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/src/styles.ts`,
      },
      {
        type: "add",
        templateFile: "templates/jest.config.js.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/jest.config.js`,
      },
      {
        type: "add",
        templateFile: "templates/index.ts.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/src/index.ts`,
      },
      {
        type: "add",
        templateFile: "templates/main-component.tsx.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/src/{{kebabCase name}}.tsx`,
      },
      {
        type: "add",
        templateFile: "templates/stories.mdx.hbs",
        path: `${compPath}/{{kebabCase group}}/{{kebabCase name}}/src/stories/{{pascalCase name}}.stories.mdx`,
      },
      {
        type: "installDependencies",
      },
    ],
  });
}